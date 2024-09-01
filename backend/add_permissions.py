import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'hrm.settings')
import django
django.setup()
from permissions.models import Permission

permissions = [
    Permission(name='Create Role', code='create_role', module_name='Role', description='User can create role'),
    Permission(name='Read Role', code='read_role', module_name='Role', description='User can read role'),
    Permission(name='Update Role', code='update_role', module_name='Role', description='User can update role'),
    Permission(name='Delete Role', code='delete_role', module_name='Role', description='User can delete role'),
   
    Permission(name='Create Department', code='create_department', module_name='Dept', description='User can create department'),
    Permission(name='Read Department', code='read_department', module_name='Dept', description='User can read department'),
    Permission(name='Update Department', code='update_department', module_name='Dept', description='User can update department'),
    Permission(name='Delete Department', code='delete_department', module_name='Dept', description='User can delete department'),
]


def add_permission():
    for permission in permissions:
        try:
            Permission.objects.get(code=permission.code)
        except Permission.DoesNotExist:
            permission.save()


if __name__ == '__main__':
    print("Populating hrm...")
    add_permission()