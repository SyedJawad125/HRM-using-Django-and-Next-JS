from django.db import models

from permissions.models import Role
from user_auth.models import User

# Create your models here.

class Department(models.Model):
    dept_name = models.CharField(max_length=50)
    dept_description = models.TextField()
    dept_location = models.TextField()
    dept_budget = models.PositiveBigIntegerField()
    dept_projects = models.TextField()
    dept_goals = models.TextField()
    dept_added_by_user = models.ForeignKey(User, on_delete=models.CASCADE,related_name='dept_added_by_user', null=True, blank=True)
    dept_updated_by_user = models.ForeignKey(User, on_delete=models.CASCADE,related_name='dept_updated_by_user', null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_dept', null=True, blank=True)

    def __str__(self):
        return self.dept_name 

class Employee(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    date_of_birth = models.DateField()
    hire_date = models.DateField()
    salary = models.DecimalField(max_digits=10, decimal_places=2)
    is_active = models.BooleanField(default=True)
    image = models.FileField(upload_to='employee_images/', blank=True, null=True)
    employee_has_dept = models.ForeignKey(Department, on_delete=models.CASCADE,related_name='dept_employee', null=True, blank=True)
    employee_has_role = models.ForeignKey(Role, on_delete=models.CASCADE,related_name='role_of_employee', null=True, blank=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE,related_name='employee_created_by', null=True, blank=True)
    updated_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='employee_updated_by', null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user1', null=True,blank=True)
    
    def __str__(self):
        return f"{self.first_name} {self.last_name}"

class Rank(models.Model):
    rank_title = models.CharField(max_length=50)
    rank_description = models.TextField()
    day_of_week = models.CharField(max_length=20)  # e.g., Monday, Tuesday, etc.
    shift_start_time = models.TimeField(null=True, blank=True)
    shift_end_time = models.TimeField(null=True, blank=True)
    # dept_has_rank = models.ForeignKey(Department, on_delete=models.CASCADE,related_name='dep_has_rank1', null=True, blank=True) 
    emp_has_rank = models.ForeignKey(Employee, on_delete=models.CASCADE,related_name='rank_of_emp', null=True, blank=True) 
    user= models.ForeignKey(User, on_delete=models.CASCADE,related_name='user3', null=True, blank=True)
    rank_added_by_user = models.ForeignKey(User, on_delete=models.CASCADE,related_name='rank_added_by_user1', null=True, blank=True)
    rank_updated_by_user = models.ForeignKey(User, on_delete=models.CASCADE,related_name='rank_updated_by_user1', null=True, blank=True)
    
    def __str__(self):
        return self.rank_title

class Salary(models.Model):
    base_salary = models.PositiveIntegerField()
    gross_salary = models.PositiveIntegerField()
    net_salary = models.PositiveIntegerField()
    PAY_FREQUENCY_CHOICES = [
        ('Monthly', 'Monthly'),
        ('Bi-Weekly', 'Bi-Weekly'),
        ('Weekly', 'Weekly'),
    ]
    pay_frequency = models.CharField(max_length=20, choices=PAY_FREQUENCY_CHOICES)
    pay_grade = models.CharField(max_length=100)
    allowances = models.CharField(max_length=100)
    employee_has_salary = models.ForeignKey(Employee, on_delete=models.CASCADE, related_name='employee_salary', null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_salary', null=True, blank=True)
    sal_added_by_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sal_added_by_user', null=True, blank=True)
    sal_updated_by_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sal_updated_by_user', null=True, blank=True)
    
    def __str__(self):
        return f"{self.employee_has_salary.user.username} - {self.pay_grade}"

class Attendance(models.Model):
    date = models.DateField()
    check_in_time = models.TimeField()
    check_out_time = models.TimeField(blank=True, null=True)
    status = models.CharField(
        max_length=10,
        choices=[('Present', 'Present'), ('Absent', 'Absent'), ('Leave', 'Leave')],
        default='Absent'
    )
    employee_has_atten = models.ForeignKey(Employee, on_delete=models.CASCADE,related_name='atten_of_employee', null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE,related_name='user4', null=True, blank=True)
    atten_added_by_user = models.ForeignKey(User, on_delete=models.CASCADE,related_name='atten_added_by_user', null=True, blank=True)
    atten_updated_by_user = models.ForeignKey(User, on_delete=models.CASCADE,related_name='atten_updated_by_user', null=True, blank=True)
    # total_hours = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    # remarks = models.TextField(blank=True, null=True)
    
    def __str__(self):
        return f"{self.employee_has_atten.user.username} - {self.date}"

class Payroll(models.Model):
    month = models.DateField()
    basic_salary = models.DecimalField(max_digits=10, decimal_places=2)
    deductions = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    bonuses = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    overtime = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    net_salary = models.DecimalField(max_digits=10, decimal_places=2)
    emp_payroll = models.ForeignKey(Employee, on_delete=models.CASCADE, related_name='payroll_of_employee', null=True, blank=True)

    def __str__(self):
            return f"{self.emp_payroll.user.username} - {self.month}"