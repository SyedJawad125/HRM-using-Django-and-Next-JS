from django.db import models

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


class Rank(models.Model):
    rank_title = models.CharField(max_length=50)
    rank_description = models.TextField()
    day_of_week = models.CharField(max_length=20)  # e.g., Monday, Tuesday, etc.
    shift_start_time = models.TimeField(null=True, blank=True)
    shift_end_time = models.TimeField(null=True, blank=True)
    dept_has_rank = models.ForeignKey(Department, on_delete=models.CASCADE,related_name='dep_has_rank1', null=True, blank=True) 
    user= models.ForeignKey(User, on_delete=models.CASCADE,related_name='user3', null=True, blank=True)
    rank_added_by_user = models.ForeignKey(User, on_delete=models.CASCADE,related_name='rank_added_by_user1', null=True, blank=True)
    rank_updated_by_user = models.ForeignKey(User, on_delete=models.CASCADE,related_name='rank_updated_by_user1', null=True, blank=True)


class Employee(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    date_of_birth = models.DateField()
    hire_date = models.DateField()
    position = models.CharField(max_length=50)
    department = models.CharField(max_length=50)
    salary = models.DecimalField(max_digits=10, decimal_places=2)
    is_active = models.BooleanField(default=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE,related_name='employee_created_by', null=True, blank=True)
    updated_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='employee_updated_by', null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user1', null=True,blank=True)
    rank = models.ForeignKey(Rank, on_delete=models.CASCADE, related_name='rank1', null=True,blank=True)


class Salary(models.Model):
    base_salary = models.PositiveIntegerField()
    gross_salary = models.PositiveIntegerField()
    net_salary = models.PositiveIntegerField()
    pay_frequency = models.CharField(max_length=100)
    pay_grade = models.CharField(max_length=100)
    allowances = models.CharField(max_length=100)
    employee_has_salary = models.ForeignKey(Employee, on_delete=models.CASCADE,related_name='rank_salary', null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE,related_name='user2', null=True, blank=True)
    sal_added_by_user = models.ForeignKey(User, on_delete=models.CASCADE,related_name='sal_added_by_user', null=True, blank=True)
    sal_updated_by_user = models.ForeignKey(User, on_delete=models.CASCADE,related_name='sal_updated_by_user', null=True, blank=True)

    