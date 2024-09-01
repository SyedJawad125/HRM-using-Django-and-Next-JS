from django import forms
from django_filters import DateFilter, CharFilter, FilterSet, ChoiceFilter, BooleanFilter
from .models import *



class EmployeeFilter(FilterSet):
    id = CharFilter(field_name='id')
    name = CharFilter(field_name='name', lookup_expr='icontains')
    position = CharFilter(field_name='position', lookup_expr='icontains')
    salary = CharFilter(field_name='salary')
    date_from = DateFilter(field_name='created_at', lookup_expr='gte' )
    date_to = DateFilter(field_name='created_at', lookup_expr='lte' )
    

    class Meta:
        model = Employee
        fields ='__all__'

class DepartmentFilter(FilterSet):
    id = CharFilter(field_name='id')
    # dept_updated_by_user= CharFilter(field_name='id')
    # dept_added_by_user= CharFilter(field_name='id')
    date_from = DateFilter(field_name='created_at', lookup_expr='gte' )
    date_to = DateFilter(field_name='created_at', lookup_expr='lte' )
    dept_name = CharFilter(field_name='dept_name', lookup_expr='icontains')
    dept_location = CharFilter(field_name='dept_location', lookup_expr='icontains')

    class Meta:
        model = Department
        fields ='__all__'


class SalaryFilter(FilterSet):
    id = CharFilter(field_name='id')
    net_salary = CharFilter(field_name='net_salary')
    allowances = CharFilter(field_name='allowances')
    date_from = DateFilter(field_name='created_at', lookup_expr='gte' )
    date_to = DateFilter(field_name='created_at', lookup_expr='lte' )

    class Meta:
        model = Salary
        fields ='__all__'


class RankFilter(FilterSet):
    id = CharFilter(field_name='id')
    date_from = DateFilter(field_name='created_at', lookup_expr='gte' )
    date_to = DateFilter(field_name='created_at', lookup_expr='lte' )
    rank_title = CharFilter(field_name='position_title', lookup_expr='icontains')

    class Meta:
        model = Rank
        fields ='__all__'