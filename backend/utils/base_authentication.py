import jwt
from django.contrib.auth import get_user_model
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authentication import BaseAuthentication
from rest_framework import exceptions
from utils.custom_exceptions import SessionExpired
from utils.reusable_methods import decrypt_token
from hrm import settings
from user_auth.models import Token, User


class AuthenticationBackend(object):
    def authenticate(self, request, username=None, password=None, **kwargs):
        User = get_user_model()
        try:
            user = User.objects.get(username=username, is_active=True)  # real
            # user = User.objects.get(email=username, is_active=True)
            
        except User.DoesNotExist:
            return None
        else:
            if getattr(user, 'is_active', False) and user.check_password(password): # False was 'INACTIVE'
                return user
        return None

    def get_user(self, user_id):
        User = get_user_model()
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None
        


class JWTAuthentication(BaseAuthentication):
    """
        custom authentication class for DRF and JWT
        https://github.com/encode/django-rest-framework/blob/master/rest_framework/authentication.py
    """
    @csrf_exempt
    def authenticate(self, request):
        authorization_header = request.headers.get('Authorization')
        if not authorization_header:
            raise exceptions.AuthenticationFailed('Token not provided')
        try:
            access_token = authorization_header.split(' ')[1]
            if not Token.objects.filter(token=access_token).exists():
                raise SessionExpired()
            access_token = decrypt_token(access_token)
            payload = jwt.decode(access_token, settings.JWT_ENCODING_SECRET_KEY, algorithms=['HS256'])
        except IndexError:
            raise exceptions.AuthenticationFailed('Token prefix missing')
        except jwt.ExpiredSignatureError:
            raise SessionExpired()
        except jwt.InvalidTokenError:
            raise exceptions.NotAcceptable('Invalid token')

        user = User.objects.filter(username=payload['username']).first()  # real
        # user = User.objects.filter(email=payload['email']).first()
        if user is None or not user.is_active:
            raise exceptions.AuthenticationFailed('Invalid User.')
        return user, None

