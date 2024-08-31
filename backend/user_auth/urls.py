from django.urls import path
from user_auth.views import *

urlpatterns = [
    path('register', RegisterAPIView.as_view({"post": "create"}), name='register'),
    path('login', LoginAPIView.as_view({"post": "login"}), name='login'),
    path('logout', LogoutAPIView.as_view({"post": "logout"}), name='logout'),
    path('forget-password', ForgetPasswordAPIView.as_view({"post": "post"}), name='forget_password'),
    path('verify-otp', VerifyOtpAPIView.as_view({"post": "post"}), name='verify_otp'),
    path('change-password', ChangePasswordAPIView.as_view({"post": "post"}), name='change_password'),
]