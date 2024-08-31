from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from user_auth.models import User
from permissions.models import Role, Permission
from permissions.permission_serializer import PermissionSerializer



class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(
        label="old_password",
        style={"input_type": "old_password"},
        trim_whitespace=True,
        write_only=True
    )
    new_password = serializers.CharField(
        label="new_password",
        style={"input_type": "new_password"},
        trim_whitespace=True,
        write_only=True
    )
    confirm_password = serializers.CharField(
        label="confirm_password",
        style={"input_type": "confirm_password"},
        trim_whitespace=True,
        write_only=True
    )
    def validate(self, instance):
        user = self.context.get("user")
        if user.check_password(instance["old_password"]):
            if len(instance["new_password"]) < 8:
                raise serializers.ValidationError("Password must be at least 8 characters long.", 400)
            if instance["new_password"] == instance["old_password"]:
                raise serializers.ValidationError("Same Old Password.", 400)
            if instance['new_password'] != instance['confirm_password']:
                raise serializers.ValidationError("Password does not match.", 400)
            return instance
        else:
            raise serializers.ValidationError("Wrong Old Password.", 400)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

    

    def validate(self,instance):
        if len(instance["password"]) < 8:
            raise serializers.ValidationError({'password': ['Password must be at least 8 characters long.']}, code=400)
        instance['password'] = make_password(instance['password'])
        return instance


class VerifyOtpSerializer(serializers.Serializer):
    otp = serializers.CharField(
        label="otp",
        style={"input_type": "otp"},
        trim_whitespace=True,
        write_only=True
    )
    new_password = serializers.CharField(
        label="new_password",
        style={"input_type": "new_password"},
        trim_whitespace=True,
        write_only=True
    )
    confirm_password = serializers.CharField(
        label="confirm_password",
        style={"input_type": "confirm_password"},
        trim_whitespace=True,
        write_only=True
    )
    def validate(self, instance):
        user = self.context.get("user")
        if user.check_password(instance["new_password"]):
            raise SameOldPassword()
        if len(instance["new_password"]) < 7:
            raise PasswordMustBeEightChar()
        if instance['new_password'] != instance['confirm_password']:
            raise PasswordsDoesNotMatch()
        return instance


class ForgetPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField(
        label="email",
        trim_whitespace=True,
        write_only=True
    )

# class LoginSerializer(serializers.Serializer):  (Last Wala)
#     username = serializers.CharField(
#         label="username",
#         trim_whitespace=True,
#         write_only=True
#     )
#     password = serializers.CharField(
#         label="password",
#         style={"input_type": "password"},
#         trim_whitespace=True,
#         write_only=True
#     )

#     def validate(self, data):
#         username = data.get('username')
#         password = data.get('password')

#         # Check if the user exists
#         try:
#             user = User.objects.get(username=username)
#         except User.DoesNotExist:
#             raise serializers.ValidationError("Invalid username or password.", code='authentication')

#         # Check if the account is active and not locked
#         if not user.is_active or user.is_locked:
#             raise serializers.ValidationError("Your account has been deactivated or locked.", code='authentication')

#         # Check the password
#         if not user.check_password(password):
#             raise serializers.ValidationError("Invalid username or password.", code='authentication')

#         # Attach the user to the data for use in to_representation
#         data['user'] = user
#         return data

#     def to_representation(self, data):
#         user = data['user']

#         # Include user details in the response
#         response_data = {
#             'username': user.username,
#             'email': user.email,
#             'first_name': user.first_name,
#             'last_name': user.last_name,
#             'token': user.get_access_token(),
            
#         }

#         # Fetch and include the permissions related to the user's role
#         if user.role:
#             permissions = Permission.objects.filter(role=user.role)
#             response_data['permissions'] = PermissionSerializer(permissions, many=True).data
#         else:
#             response_data['permissions'] = []

#         return response_data


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(
        label="username",
        trim_whitespace=True,
        write_only=True
    )
    password = serializers.CharField(
        label="password",
        style={"input_type": "password"},
        trim_whitespace=True,
        write_only=True
    )

    def validate(self, data):
        username = data.get('username')
        password = data.get('password')

        # Check if the user exists
        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            raise serializers.ValidationError("Invalid username or password.", code='authentication')

        # Check if the account is active and not locked
        if not user.is_active or user.is_locked:
            raise serializers.ValidationError("Your account has been deactivated or locked.", code='authentication')

        # Check the password
        if not user.check_password(password):
            raise serializers.ValidationError("Invalid username or password.", code='authentication')

        # Attach the user to the data for use in to_representation
        data['user'] = user
        return data

    def to_representation(self, data):
        user = data['user']

        # Include user details in the response
        response_data = {
            'username': user.username,
            'email': user.email,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'token': user.get_access_token(),
        }

        # Fetch and include the permissions related to the user's role
        # permissions_dict = {
        #     "create_employee": False,
        #     "read_employee": False,
        #     "update_employee": False,
        #     "delete_employee": False
        # }
        permissions_dict = {perm.code: False for perm in Permission.objects.all()}


        # Check if the user is a superuser
        if user.is_superuser:
            all_permissions = Permission.objects.all()
            for perm in all_permissions:
                if perm.code in permissions_dict:
                    permissions_dict[perm.code] = True
        elif user.role:
            role_permissions = user.role.permissions.all()
            for perm in role_permissions:
                if perm.code in permissions_dict:
                    permissions_dict[perm.code] = True

        response_data['permissions'] = permissions_dict

        return response_data





# class LoginSerializer(serializers.Serializer):
#     username = serializers.CharField(
#         label="username",
#         trim_whitespace=True,
#         write_only=True
#     )
#     password = serializers.CharField(
#         label="password",
#         style={"input_type": "password"},
#         trim_whitespace = True,
#         write_only=True
#     )

                # def to_representation(self, instance):
                #     data = self.to_representation(instance)
                #     data['permissions'] = RoleSerializer(instance.role).data if instance.role else None
                #     return data
    
    # def validate(self, instance):
    #     if len(instance["password"]) < 8:
    #         raise serializers.ValidationError("Password must be at least 8 characters long.", 400)
    #     if User.objects.filter(username=instance["username"], is_active=False, is_locked=True).exists():
    #         raise serializers.ValidationError("Your account has been deactivated.", 400)
    #     return instance


class UserListingSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['guid','get_full_name', 'email']