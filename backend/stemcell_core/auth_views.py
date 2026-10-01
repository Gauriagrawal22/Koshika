from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from .models import UserProfile
from .auth_serializers import (
    KoshikaTokenObtainPairSerializer,
    RegisterSerializer,
    UserProfileSerializer
)


class KoshikaTokenObtainPairView(TokenObtainPairView):
    """
    POST /api/auth/login/
    Returns access + refresh JWT tokens, plus user profile and role details.
    """
    serializer_class = KoshikaTokenObtainPairSerializer


class RegisterView(APIView):
    """
    POST /api/auth/register/
    Registers a new user and returns JWT tokens immediately.
    """
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)

            # Inject custom claims
            profile = user.profile
            refresh['user_id'] = user.id
            refresh['email'] = user.email
            refresh['role'] = profile.role
            refresh['full_name'] = user.get_full_name() or user.username

            return Response({
                'message': 'Registration successful.',
                'access': str(refresh.access_token),
                'refresh': str(refresh),
                'user': {
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
            }, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserProfileView(APIView):
    """
    GET /api/auth/me/ - Get current user profile and role.
    PUT /api/auth/me/ - Update current user profile.
    """
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        profile, _ = UserProfile.objects.get_or_create(user=request.user)
        serializer = UserProfileSerializer(profile)
        return Response(serializer.data)

    def put(self, request):
        profile, _ = UserProfile.objects.get_or_create(user=request.user)
        serializer = UserProfileSerializer(profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LogoutView(APIView):
    """
    POST /api/auth/logout/
    Blacklists the refresh token to end session securely.
    """
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data.get('refresh')
            if refresh_token:
                token = RefreshToken(refresh_token)
                token.blacklist()
            return Response({'message': 'Logged out successfully.'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class DemoAccountsView(APIView):
    """
    GET /api/auth/demo-accounts/
    Returns list of seeded demo accounts for 1-click clinical testing.
    Auto-seeds accounts if they do not already exist.
    """
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        demo_users = [
            {
                'email': 'patient@koshika.ai',
                'username': 'patient_demo',
                'password': 'Patient@123',
                'role': 'patient',
                'first_name': 'Mitesh',
                'last_name': 'Sawant',
                'description': 'Verified Patient with Acute Myeloid Leukemia (AML) record',
                'organization': 'Koshika Patient Network'
            },
            {
                'email': 'doctor@koshika.ai',
                'username': 'dr_damodar',
                'password': 'Doctor@123',
                'role': 'doctor',
                'first_name': 'Dr. Sharat',
                'last_name': 'Damodar',
                'description': 'Senior Consultant & HOD, Adult Haemato-Oncology & BMT',
                'organization': 'Mazumdar Shaw Cancer Centre & Narayana Health City',
                'registration_number': 'KMC-48291',
                'specialization': 'Adult Haemato-Oncology & BMT; Cellular Therapy; CAR-T'
            },
            {
                'email': 'bank@koshika.ai',
                'username': 'bank_staff',
                'password': 'Bank@123',
                'role': 'bank_staff',
                'first_name': 'Rajesh',
                'last_name': 'Khurana',
                'description': 'Biobank Operations Director',
                'organization': 'LifeCell International Stem Cell Biobank',
                'registration_number': 'CDSCO-BIO-902',
            },
            {
                'email': 'admin@koshika.ai',
                'username': 'admin_koshika',
                'password': 'Admin@123',
                'role': 'admin',
                'first_name': 'Platform',
                'last_name': 'Administrator',
                'description': 'System & Clinical Compliance Administrator',
                'organization': 'KOSHIKA Health Systems'
            }
        ]

        # Ensure these users exist in DB
        for u in demo_users:
            user, created = User.objects.get_or_create(
                email=u['email'],
                defaults={
                    'username': u['username'],
                    'first_name': u['first_name'],
                    'last_name': u['last_name'],
                    'is_staff': u['role'] in ('admin', 'super_admin'),
                }
            )
            if created or not user.check_password(u['password']):
                user.set_password(u['password'])
                user.save()

            profile, _ = UserProfile.objects.get_or_create(user=user)
            profile.role = u['role']
            profile.organization = u.get('organization', '')
            profile.registration_number = u.get('registration_number', '')
            profile.specialization = u.get('specialization', '')
            profile.is_verified = True
            profile.save()

        return Response({
            'demo_accounts': [
                {
                    'email': u['email'],
                    'password': u['password'],
                    'role': u['role'],
                    'name': f"{u['first_name']} {u['last_name']}",
                    'description': u['description'],
                    'organization': u['organization']
                } for u in demo_users
            ]
        })
