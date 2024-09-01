import os
import django
# Set the Django settings module environment variable
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'hrm.settings')
# Set up Django
django.setup()
# Import get_user_model to dynamically get the user model
from django.contrib.auth import get_user_model

User = get_user_model()

def populate():
    try:
        # Check if the superuser already exists
        s_user = User.objects.get(username='adminuser1')
        print('Superuser already exists.')
    except User.DoesNotExist:
        # If the superuser does not exist, create one
        s_user = User.objects.create_superuser(
            username='adminuser1',
            email='syedjawadali92@gmail.com',
            password='password123'
        )
        print('Superuser created successfully.')

if __name__ == '__main__':
    populate()


# import os
# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'hrm.settings')
# import django
# django.setup()
# from user_auth.models import User
# from permissions.models import Role, Permission

# def populate():
#     permissions = Permission.objects.all()

#     try:
#         role = Role.objects.get(code='su')
#         role.permissions.clear()
#     except Role.DoesNotExist:
#         role = Role.objects.create(name='Super', code='su')

#     role.permissions.add(*permissions)
#     role.save()

#     try:
#         s_user = User.objects.get(username='superuser')
#     except User.DoesNotExist:
#         s_user = User.objects.create_superuser(
#             username="adminuser1",
#             password="adminuser1",
#         )
#         s_user.first_name = 'Super'
#         s_user.last_name = 'User'
#         s_user.role = Role.objects.get(code='su')
#         s_user.save()



# if __name__ == '__main__':
#     print("Populating hrm...")
#     populate()



# import os
# # Set the Django settings module environment variable
# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'hrm.settings')
# import django
# # Set up Django
# django.setup()
# from django.contrib.auth.models import User

# def populate():
#     try:
#         # Check if the superuser already exists
#         s_user = User.objects.get(username='superuser')
#         print('Superuser already exists.')
#     except User.DoesNotExist:
#         # If the superuser does not exist, create one
#         s_user = User.objects.create_superuser(
#             username='superuser',
#             email='superuser@example.com',
#             password='password123'
#         )
#         print('Superuser created successfully.')

# if __name__ == '__main__':
#     populate()
