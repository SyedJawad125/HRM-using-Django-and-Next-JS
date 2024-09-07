# myapp/views.py
from django.shortcuts import render
from .tasks import send_welcome_email

def index(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        send_welcome_email.delay(email)  # Call the task asynchronously
        return render(request, 'success.html')
    return render(request, 'index.html')
