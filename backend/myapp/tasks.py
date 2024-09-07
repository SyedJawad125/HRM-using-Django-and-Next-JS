# myapp/tasks.py
from celery import shared_task
from django.core.mail import send_mail

@shared_task
def send_welcome_email(user_email):
    subject = 'Welcome!'
    message = 'Thank you for signing up!'
    email_from = 'syedjawadali92@gmail.com'
    recipient_list = [user_email]
    send_mail(subject, message, email_from, recipient_list)
    return f'Email sent to {user_email}'
