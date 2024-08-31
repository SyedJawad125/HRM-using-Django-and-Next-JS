from rest_framework.exceptions import PermissionDenied
from .models import Role

def permission_required(permissions):
    def decorator(drf_custom_method):
        def _decorator(self, *args, **kwargs):
            user = self.request.user

            # Check if the user is authenticated
            if not user.is_authenticated:
                raise PermissionDenied("User is not authenticated")

            # Allow superusers to bypass permission checks
            if user.is_superuser:
                return drf_custom_method(self, *args, **kwargs)

            # Ensure the user has a role
            if not hasattr(user, 'role') or user.role is None:
                raise PermissionDenied("User has no role assigned")

            # Check if the user's role has the required permissions
            if Role.objects.filter(id=user.role.id, permissions__code__in=permissions).exists():
                return drf_custom_method(self, *args, **kwargs)
            else:
                raise PermissionDenied("User does not have the required permissions")

        return _decorator
    return decorator
