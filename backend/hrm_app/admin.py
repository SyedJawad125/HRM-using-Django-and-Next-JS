from django.contrib import admin
from import_export import resources
from import_export.admin import ImportExportModelAdmin
from .models import Employee, Department

# Define a resource class for the model
# class EmployeeResource(resources.ModelResource):
#     class Meta:
#         model = Employee
#         fields = ('id', 'first_name', 'last_name', 'email', 'phone_number','date_of_birth',
#                   'hire_date','salary','image', 'employee_has_dept')  # Fields to include in the import/export
        
#         export_order = ('id', 'first_name', 'last_name', 'email', 'phone_number','date_of_birth',
#                         'hire_date','salary','image', 'employee_has_dept')  # Order of fields in the exported file

# # Register the model using ImportExportModelAdmin
# @admin.register(Employee)
# class EmployeeAdmin(ImportExportModelAdmin):
#     resource_class = EmployeeResource,
#     list_display = ('first_name', 'last_name', 'phone_number')
#     search_fields = ('phone_number',)
#     list_filter = ('phone_number',)



class DepartmentResource(resources.ModelResource):
    class Meta:
        model = Department
        fields = ('id', 'dept_name', 'dept_description', 'dept_location', 'dept_budget','dept_projects',
                  'dept_goals')  # Fields to include in the import/export
        
        export_order = ('id', 'dept_name', 'dept_description', 'dept_location', 'dept_budget','dept_projects',
                  'dept_goals')  # Order of fields in the exported file

# Register the model using ImportExportModelAdmin
@admin.register(Department)
class DepartmentAdmin(ImportExportModelAdmin):
    resource_class = DepartmentResource,
    list_display = ('dept_name', 'dept_description', 'dept_location', 'dept_projects')
    search_fields = ('dept_name',)
    list_filter = ('dept_name',)

