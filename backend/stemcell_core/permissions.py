from rest_framework import permissions
from .models import UserProfile


class IsPatient(permissions.BasePermission):
    """Allows access only to authenticated patients."""
    def has_permission(self, request, view):
        return bool(
            request.user and
            request.user.is_authenticated and
            hasattr(request.user, 'profile') and
            request.user.profile.role == UserProfile.ROLE_PATIENT
        )


class IsDoctor(permissions.BasePermission):
    """Allows access only to authenticated doctors/clinicians."""
    def has_permission(self, request, view):
        return bool(
            request.user and
            request.user.is_authenticated and
            hasattr(request.user, 'profile') and
            request.user.profile.role == UserProfile.ROLE_DOCTOR
        )


class IsBankStaff(permissions.BasePermission):
    """Allows access only to authenticated stem cell biobank staff."""
    def has_permission(self, request, view):
        return bool(
            request.user and
            request.user.is_authenticated and
            hasattr(request.user, 'profile') and
            request.user.profile.role == UserProfile.ROLE_BANK_STAFF
        )


class IsAdminRole(permissions.BasePermission):
    """Allows access to administrators and super administrators."""
    def has_permission(self, request, view):
        return bool(
            request.user and
            request.user.is_authenticated and
            (
                request.user.is_staff or
                (hasattr(request.user, 'profile') and request.user.profile.role in (UserProfile.ROLE_ADMIN, UserProfile.ROLE_SUPER_ADMIN))
            )
        )


class IsOwnerOrMedicalStaff(permissions.BasePermission):
    """
    Object-level permission allowing the owner of a record, or an authorized clinician/admin, to access it.
    """
    def has_object_permission(self, request, view, obj):
        if not request.user or not request.user.is_authenticated:
            return False

        # Admin has audit access
        if hasattr(request.user, 'profile') and request.user.profile.role in (UserProfile.ROLE_ADMIN, UserProfile.ROLE_SUPER_ADMIN):
            return True

        # Doctor has access to clinical records
        if hasattr(request.user, 'profile') and request.user.profile.role == UserProfile.ROLE_DOCTOR:
            return True

        # Owner has access
        if hasattr(obj, 'user') and obj.user == request.user:
            return True
        if hasattr(obj, 'patient') and hasattr(obj.patient, 'user') and obj.patient.user == request.user:
            return True

        return False
