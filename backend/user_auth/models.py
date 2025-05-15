import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser
from permissions.models import Role
from utils.reusable_methods import generate_access_token
from utils.reusable_classes import TimeStamps

    
# class User(TimeStamps,AbstractUser):

#     guid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
#     first_name = models.CharField(max_length=100, blank=True, null=True)
#     last_name = models.CharField(max_length=100, blank=True, null=True)
#     username = models.CharField(unique=True, max_length=100)
#     email = models.EmailField(unique=True)
#     phone = models.CharField(max_length=50, blank=True, null=True)
#     password = models.CharField(max_length=100)
#     otp = models.IntegerField(null=True, blank=True)
#     last_login = models.DateTimeField(null=True, blank=True)
#     otp_generated_at = models.DateTimeField(null=True, blank=True)
#     failed_login_attempts = models.IntegerField(default=0)
#     last_failed_time = models.DateTimeField(null=True, blank=True)
#     is_active = models.BooleanField(default=True)
#     is_locked = models.BooleanField(default=False)
#     role = models.ForeignKey(Role, on_delete=models.CASCADE, related_name='user_role', null=True, blank=True)
    
#     REQUIRED_FIELDS = ["email", "password"]


from django.core.exceptions import ValidationError
from django.core.validators import EmailValidator, RegexValidator, MinLengthValidator
from django.utils import timezone
import re
import uuid
from utils.validators import *
from django.core.validators import RegexValidator


class User(TimeStamps, AbstractUser):
    alphabetic_validator = RegexValidator(
        regex='^[a-zA-Z]+$',
        message='This field accepts only alphabetic characters.',
        code='invalid_input'
    )
    numeric_validator = RegexValidator(
        regex='^[0-9]+$',
        message='Phone number must contain only digits.',
        code='invalid_phone_number'
    )
    alphanumeric_or_alpha_validator = RegexValidator(
        regex=r'^(?!^\d+$)[a-zA-Z0-9]+$',
        message='Position must contain only alphabetic or alphanumeric characters, but not only numbers.'
    )
    
    guid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    first_name = models.CharField(max_length=100, blank=True, null=True, validators=[alphabetic_validator])
    last_name = models.CharField(max_length=100, blank=True, null=True, validators=[alphabetic_validator])
    username = models.CharField(max_length=100, validators=[MinLengthValidator(3)])
    email = models.EmailField(unique=True, validators=[EmailValidator()])
    phone = models.CharField(max_length=50, blank=True, null=True, validators=[RegexValidator
                               (regex=r'^\+?1?\d{9,15}$', message="Phone number must be between 9 to 15 digits.")])
    password = models.CharField(max_length=100, validators=[MinLengthValidator(8)])
    otp = models.IntegerField(null=True, blank=True)
    last_login = models.DateTimeField(null=True, blank=True)
    otp_generated_at = models.DateTimeField(null=True, blank=True)
    failed_login_attempts = models.IntegerField(default=0)
    last_failed_time = models.DateTimeField(null=True, blank=True)
    is_active = models.BooleanField(default=True)
    is_locked = models.BooleanField(default=False)
    current_token = models.CharField(max_length=500, blank=True, null=True)
    role = models.ForeignKey(Role, on_delete=models.CASCADE, related_name='user_role', null=True, blank=True)

    REQUIRED_FIELDS = ["email", "password"]

    def clean(self):
        # Trim leading/trailing spaces in string fields
        self.first_name = self.first_name.strip() if self.first_name else self.first_name
        self.last_name = self.last_name.strip() if self.last_name else self.last_name
        self.username = self.username.strip() if self.username else self.username
        self.email = self.email.strip().lower() if self.email else self.email

        # Email Validation
        if not re.match(r'^[^@]+@[^@]+\.[^@]+$', self.email):
            raise ValidationError({'email': 'Enter a valid email address.'})

        # Phone Validation (example: allowing country codes and digits)
        if self.phone and not re.match(r'^\+?1?\d{9,15}$', self.phone):
            raise ValidationError({'phone': 'Enter a valid phone number.'})

        # OTP Validation
        if self.otp and not (100000 <= self.otp <= 999999):
            raise ValidationError({'otp': 'OTP must be a 6-digit number.'})

        # Last login and times should be in the past
        if self.last_login and self.last_login > timezone.now():
            raise ValidationError({'last_login': 'Last login cannot be in the future.'})

        if self.otp_generated_at and self.otp_generated_at > timezone.now():
            raise ValidationError({'otp_generated_at': 'OTP generation time cannot be in the future.'})

        if self.last_failed_time and self.last_failed_time > timezone.now():
            raise ValidationError({'last_failed_time': 'Last failed login time cannot be in the future.'})

        super().clean()


    def get_access_token(self):
        return generate_access_token(self)

    def get_full_name(self):
        return f"{self.first_name} {self.last_name}"


class Token(TimeStamps):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="token")
    
    token = models.TextField(max_length=500, unique=True, null=False, blank=False)






