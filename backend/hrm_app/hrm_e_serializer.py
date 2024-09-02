from rest_framework import serializers # type: ignore
from hrm_app.models import Attendance, Department, Employee, Rank, Salary
from user_auth.user_serializer import UserListingSerializer


class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['created_by'] = UserListingSerializer(instance.created_by).data if instance.created_by else None
        data['updated_by'] = UserListingSerializer(instance.updated_by).data if instance.updated_by else None
        # data['rank'] = RankSerializerlisting(instance.rank).data if instance.rank else None

        # data['created_at_date'] = instance.created_at.date()

        return data


class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields='__all__'

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['dept_added_by_user'] = UserListingSerializer(instance.dept_added_by_user).data if instance.dept_added_by_user else None
        data['dept_updated_by_user'] = UserListingSerializer(instance.dept_updated_by_user).data if instance.dept_updated_by_user else None
        return data
    

class SalarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Salary
        fields='__all__'

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['sal_added_by_user'] = UserListingSerializer(instance.sal_added_by_user).data if instance.sal_added_by_user else None
        data['sal_updated_by_user'] = UserListingSerializer(instance.sal_updated_by_user).data if instance.sal_updated_by_user else None
        return data
    
# class SalaryListingSerializer(serializers.ModelSerializer):
#         class Meta:
#             model = Salary
#             fields = ['id', 'net_salary']

    
class RankSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rank
        fields = '__all__'
        
    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['rank_added_by_user'] = UserListingSerializer(instance.rank_added_by_user).data if instance.rank_added_by_user else None
        data['rank_updated_by_user'] = UserListingSerializer(instance.rank_updated_by_user).data if instance.rank_updated_by_user else None
        # data['dept_has_position'] = DepartmentListingSerializer(instance.dept_has_position).data if instance.dept_has_position else None
        # data['rank_has_salary'] = SalaryListingSerializer(instance.posi_has_salary).data if instance.posi_has_salary else None
        return data
    

class AttendanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendance
        fields = '__all__'
        
    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['atten_added_by_user'] = UserListingSerializer(instance.atten_added_by_user).data if instance.atten_added_by_user else None
        data['atten_updated_by_user'] = UserListingSerializer(instance.atten_updated_by_user).data if instance.atten_updated_by_user else None
        # data['dept_has_position'] = DepartmentListingSerializer(instance.dept_has_position).data if instance.dept_has_position else None
        # data['rank_has_salary'] = SalaryListingSerializer(instance.posi_has_salary).data if instance.posi_has_salary else None
        return data
    
class RankSerializerlisting(serializers.ModelSerializer):
    class Meta:
        model = Rank
        fields = ['id', 'rank_title']