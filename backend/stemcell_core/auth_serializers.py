from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import UserProfile


class KoshikaTokenObtainPairSerializer(TokenObtainPairSerializer):
    """
    Custom JWT serializer that adds role, full name, email, and verification status
    to both the token payload claims and the response dictionary.
    """
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Get or create profile
        profile, _ = UserProfile.objects.get_or_create(user=user)

        token['user_id'] = user.id
        token['username'] = user.username
        token['email'] = user.email
        token['full_name'] = user.get_full_name() or user.username
        token['role'] = profile.role
        token['is_verified'] = profile.is_verified
        token['organization'] = profile.organization or ''

        return token

    def validate(self, attrs):
        data = super().validate(attrs)

        user = self.user
        profile, _ = UserProfile.objects.get_or_create(user=user)

        data['user'] = {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'full_name': user.get_full_name() or user.username,
            'role': profile.role,
            'phone': profile.phone or '',
            'organization': profile.organization or '',
            'registration_number': profile.registration_number or '',
            'specialization': profile.specialization or '',
            'is_verified': profile.is_verified,
        }
        return data


class UserProfileSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(source='user.email', read_only=True)
    username = serializers.CharField(source='user.username', read_only=True)
    first_name = serializers.CharField(source='user.first_name')
    last_name = serializers.CharField(source='user.last_name')

    class Meta:
        model = UserProfile
        fields = [
            'id', 'username', 'email', 'first_name', 'last_name',
            'role', 'phone', 'organization', 'registration_number',
            'specialization', 'is_verified', 'created_at'
        ]
        read_only_fields = ['id', 'username', 'email', 'role', 'is_verified', 'created_at']

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', {})
        if user_data:
            user = instance.user
            if 'first_name' in user_data:
                user.first_name = user_data['first_name']
            if 'last_name' in user_data:
                user.last_name = user_data['last_name']
            user.save()

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password_confirm = serializers.CharField(write_only=True, required=True)
    role = serializers.ChoiceField(choices=UserProfile.ROLE_CHOICES, default=UserProfile.ROLE_PATIENT)
    phone = serializers.CharField(required=False, allow_blank=True)
    organization = serializers.CharField(required=False, allow_blank=True)
    registration_number = serializers.CharField(required=False, allow_blank=True)
    specialization = serializers.CharField(required=False, allow_blank=True)

    class Meta:
        model = User
        fields = [
            'email', 'username', 'password', 'password_confirm',
            'first_name', 'last_name', 'role', 'phone',
            'organization', 'registration_number', 'specialization'
        ]
        extra_kwargs = {
            'email': {'required': True},
            'first_name': {'required': True},
        }

    def validate(self, attrs):
        if attrs['password'] != attrs['password_confirm']:
            raise serializers.ValidationError({'password_confirm': 'Passwords do not match.'})

        email = attrs.get('email', '').strip().lower()
        if User.objects.filter(email__iexact=email).exists():
            raise serializers.ValidationError({'email': 'A user with this email address already exists.'})

        if not attrs.get('username'):
            attrs['username'] = email

        if User.objects.filter(username=attrs['username']).exists():
            raise serializers.ValidationError({'username': 'A user with this username already exists.'})

        return attrs

    def create(self, validated_data):
        validated_data.pop('password_confirm')
        role = validated_data.pop('role', UserProfile.ROLE_PATIENT)
        phone = validated_data.pop('phone', '')
        organization = validated_data.pop('organization', '')
        registration_number = validated_data.pop('registration_number', '')
        specialization = validated_data.pop('specialization', '')
        password = validated_data.pop('password')

        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'].lower(),
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
        )
        user.set_password(password)
        user.save()

        profile, _ = UserProfile.objects.get_or_create(user=user)
        profile.role = role
        profile.phone = phone
        profile.organization = organization
        profile.registration_number = registration_number
        profile.specialization = specialization
        if role == UserProfile.ROLE_PATIENT:
            profile.is_verified = True
        profile.save()

        return user
