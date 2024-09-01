from django.shortcuts import render
from hrm_app.hrm_e_controller import AttendanceController, DepartmentController, EmployeeController, RankController, SalaryController
from utils.base_authentication import JWTAuthentication
from rest_framework.viewsets import ModelViewSet

# Create your views here.
employee_controller = EmployeeController()
department_controller = DepartmentController()
salary_controller = SalaryController()
rank_controller = RankController()
attendance_controller = AttendanceController()




class empployeeViews(ModelViewSet):
    authentication_classes = [JWTAuthentication]

    def post_employee(self, request):
        return employee_controller.create(request)

    def get_employee(self, request):
        return employee_controller.get_employee(request)

    def update_employee(self, request):
        return employee_controller.update_employee(request)

    def delete_employee(self, request):
        return employee_controller.delete_employee(request)
    
class DepartmentViews(ModelViewSet):
    authentication_classes = [JWTAuthentication]

    def post_department(self, request):
        return department_controller.create(request)
    
    def get_department(self, request):
        return department_controller.get_department(request)
    
    def update_department(self, request):
        return department_controller.update_department(request)
    
    def delete_department(self, request):
        return department_controller.delete_department(request)
    

class SalaryViews(ModelViewSet):

    authentication_classes = [JWTAuthentication]
    
    def post_salary(self, request):
        return salary_controller.create(request)
    
    def get_salary(self, request):
        return salary_controller.get_salary(request)
    
    def update_salary(self, request):
        return salary_controller.update_salary(request)
    
    def delete_salary(self, request):
        return salary_controller.delete_salary(request)
    

class RankViews(ModelViewSet):

    authentication_classes = [JWTAuthentication]

    def post_rank(self, request):
        return rank_controller.create(request)
    
    def get_rank(self, request):
        return rank_controller.get_rank(request)
    
    def update_rank(self, request):
        return rank_controller.update_rank(request)
    
    def delete_rank(self, request):
        return rank_controller.delete_rank(request)
    

class AttendanceViews(ModelViewSet):

    authentication_classes = [JWTAuthentication]

    def post_attendance(self, request):
        return attendance_controller.create(request)
    
    def get_attendance(self, request):
        return attendance_controller.get_attendance(request)
    
    def update_attendance(self, request):
        return attendance_controller.update_attendance(request)
    
    def delete_attendance(self, request):
        return attendance_controller.delete_attendance(request)