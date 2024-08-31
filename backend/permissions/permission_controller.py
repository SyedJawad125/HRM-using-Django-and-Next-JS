from django.utils import timezone
from django.contrib.auth import authenticate
from permissions.filters import RoleFilter, PermissionFilter
from permissions.permission_serializer import *
from permissions.models import Role, Permission
from utils.reusable_methods import get_first_error_message, generate_six_length_random_number
from rest_framework.response import Response
from django.db.models import Sum, Count, Avg, F
from utils.helper import create_response, paginate_data
# from vehicle.serializer import serializer

# from chat_site.settings import EMAIL_HOST_USER
# from django.core.mail import send_mail

import threading


class RoleController:
    serializer_class = RoleSerializer
    filterset_class = RoleFilter
    def create(self, request):
        try:
            # request.POST._mutable = True
            # request.data["role_added_by_user"] = request.user.guid
            # request.POST._mutable = False

            # if request.user.role in ['admin','manager'] or request.user.is_superuser: # roles
            validated_data = RoleSerializer(data=request.data)
            if validated_data.is_valid():
                response = validated_data.save()
                response_data = RoleSerializer(response).data
                return Response({'data':response_data} , 200)
            else:
                error_message = get_first_error_message(validated_data.errors, "UNSUCCESSFUL")
                return Response({'data':error_message}, 400)
            # else:
            #     return Response({'data':"Permission Denaied"}, 400)  
        except Exception as e:
            return Response({'error':str(e)}, 500)
    
     #mydata = Member.objects.filter(firstname__endswith='s').values()
    def get_role(self, request):
        try:
            
            instances = self.serializer_class.Meta.model.objects.all()
            
            filtered_data = self.filterset_class(request.GET, queryset=instances)
            data = filtered_data.qs
      
            paginated_data, count = paginate_data(data, request)
            
            serialized_data = self.serializer_class(paginated_data, many=True).data
            response_data = {
                "count":count,
                "data":serialized_data,
            }
            return create_response(response_data, "SUCCESSFUL", 200)


        except Exception as e:
            return Response({'error':str(e)}, 500)
    
    
    def update_role(self, request):
        try:
            if "id" in request.data:
                #finding instance
                instance = Role.objects.filter(id=request.data["id"]).first()

                if instance:
                    # request.POST._mutable = True
                    # request.data["role_updated_by_user"] = request.user.guid
                    # request.POST._mutable = False

                    # updating the instance/record
                    serialized_data = RoleSerializer(instance, data=request.data, partial=True)
                    # if request.user.role in ['admin','manager'] or request.user.is_superuser: # roles
                    if serialized_data.is_valid():
                        response = serialized_data.save()
                        response_data = RoleSerializer(response).data
                        return Response({"data":response_data}, 200)
                    else:
                        error_message = get_first_error_message(serialized_data.errors, "UNSUCCESSFUL")
                        return Response({'data':error_message}, 400)
                    # else:
                    #     return Response({'data':"Permission Denaied"}, 400)
                else:
                    return Response({"data":"NOT FOUND"}, 404)
            else:
                return Response({"data":"ID NOT PROVIDED"}, 400)
            
        except Exception as e:
            return Response({'error':str(e)}, 500)

    def delete_role(self, request):
        try:
            if "id" in request.query_params:
                instance = Role.objects.filter(id=request.query_params['id']).first()

                if instance:
                    instance.delete()
                    return Response({"data":"SUCESSFULL"}, 200)
                else:
                    return Response({"data":"RECORD NOT FOUND"}, 404) 
            else:
                return Response({"data":"ID NOT PROVIDED"}, 400)
        except Exception as e:
            return Response({'error':str(e)}, 500)


class PermissionController:
    serializer_class = PermissionSerializer
    filterset_class = PermissionFilter
    def create(self, request):
        try:
            # request.POST._mutable = True
            # request.data["per_added_by_user"] = request.user.guid
            # request.POST._mutable = False
            #
            # # if request.user.role in ['admin','manager'] or request.user.is_superuser: # roles
            validated_data = PermissionSerializer(data=request.data)
            if validated_data.is_valid():
                response = validated_data.save()
                response_data = PermissionSerializer(response).data
                return Response({'data':response_data} , 200)
            else:
                error_message = get_first_error_message(validated_data.errors, "UNSUCCESSFUL")
                return Response({'data':error_message}, 400)
            # else:
            #     return Response({'data':"Permission Denaied"}, 400)  
        except Exception as e:
            return Response({'error':str(e)}, 500)
    
     #mydata = Member.objects.filter(firstname__endswith='s').values()
    def get_permission(self, request):
        try:
            
            instances = self.serializer_class.Meta.model.objects.all()
            
            filtered_data = self.filterset_class(request.GET, queryset=instances)
            data = filtered_data.qs
      
            paginated_data, count = paginate_data(data, request)
            
            serialized_data = self.serializer_class(paginated_data, many=True).data
            response_data = {
                "count":count,
                "data":serialized_data,
            }
            return create_response(response_data, "SUCCESSFUL", 200)


        except Exception as e:
            return Response({'error':str(e)}, 500)
    
    
    def update_permission(self, request):
        try:
            if "id" in request.data:
                #finding instance
                instance = Permission.objects.filter(id=request.data["id"]).first()

                if instance:
                    # request.POST._mutable = True
                    # request.data["per_updated_by_user"] = request.user.guid
                    # request.POST._mutable = False

                    # updating the instance/record
                    serialized_data = PermissionSerializer(instance, data=request.data, partial=True)
                    # if request.user.role in ['admin','manager'] or request.user.is_superuser: # roles
                    if serialized_data.is_valid():
                        response = serialized_data.save()
                        response_data = PermissionSerializer(response).data
                        return Response({"data":response_data}, 200)
                    else:
                        error_message = get_first_error_message(serialized_data.errors, "UNSUCCESSFUL")
                        return Response({'data':error_message}, 400)
                    # else:
                    #     return Response({'data':"Permission Denaied"}, 400)
                else:
                    return Response({"data":"NOT FOUND"}, 404)
            else:
                return Response({"data":"ID NOT PROVIDED"}, 400)
            
        except Exception as e:
            return Response({'error':str(e)}, 500)

    def delete_permission(self, request):
        try:
            if "id" in request.query_params:
                instance = Permission.objects.filter(id=request.query_params['id']).first()

                if instance:
                    instance.delete()
                    return Response({"data":"SUCESSFULL"}, 200)
                else:
                    return Response({"data":"RECORD NOT FOUND"}, 404) 
            else:
                return Response({"data":"ID NOT PROVIDED"}, 400)
        except Exception as e:
            return Response({'error':str(e)}, 500)



# from rest_framework import status
# from django.shortcuts import get_object_or_404
# from .models import Role, Permission  
# from .serializers import PermissionSerializer  # Assuming you have a PermissionSerializer

# class RolepermissionController:
#      def get_permission(self, request):
        
#         role=request.user.role
#         rolepermission= role.permissions.all()

        # user = request.user  # Get the logged-in user from the request
        # if not user:
        #     return Response({"error": "User not authenticated"}, status=status.HTTP_401_UNAUTHORIZED)

        # # Assuming the user has a 'role' field which is a ForeignKey to the Role model
        # role = user.role
        # if not role:
        #     return Response({"error": "Role not found for this user"}, status=status.HTTP_404_NOT_FOUND)

        # # Fetch the permissions associated with the role
        # permissions = Permission.objects.filter(role=role)

        # if not permissions.exists():
        #     return Response({"error": "No permissions found for this role"}, status=status.HTTP_404_NOT_FOUND)

        # # Serialize the permissions and return them in the response
        # serializer = PermissionSerializer(permissions, many=True)
        # return Response(serializer.data, status=status.HTTP_200_OK)





# class MakeController:
#     serializer_class = MakeSerializer
#     filterset_class = MakeFilter

#     def create(self, request):
#         try:

#             # if request.user.role in ['admin','manager'] or request.user.is_superuser: # roles
#             validated_data = MakeSerializer(data=request.data)
#             if validated_data.is_valid():
#                 response = validated_data.save()
#                 response_data = MakeSerializer(response).data
#                 return Response({'data': response_data}, 200)
#             else:
#                 error_message = get_first_error_message(validated_data.errors, "UNSUCCESSFUL")
#                 return Response({'data': error_message}, 400)
#             # else:
#             #     return Response({'data':"Permission Denaied"}, 400)
#         except Exception as e:
#             return Response({'error': str(e)}, 500)

#     # mydata = Member.objects.filter(firstname__endswith='s').values()
#     def get_make(self, request):
#         try:

#             instances = self.serializer_class.Meta.model.objects.all()

#             filtered_data = self.filterset_class(request.GET, queryset=instances)
#             data = filtered_data.qs

#             paginated_data, count = paginate_data(data, request)

#             serialized_data = self.serializer_class(paginated_data, many=True).data
#             response_data = {
#                 "count": count,
#                 "data": serialized_data,
#             }
#             return create_response(response_data, "SUCCESSFUL", 200)


#         except Exception as e:
#             return Response({'error': str(e)}, 500)

#     def update_make(self, request):
#         try:
#             if "id" in request.data:
#                 # finding instance
#                 instance = Make.objects.filter(id=request.data["id"]).first()

#                 if instance:
#                     # updating the instance/record
#                     serialized_data = MakeSerializer(instance, data=request.data, partial=True)
#                     # if request.user.role in ['admin','manager'] or request.user.is_superuser: # roles
#                     if serialized_data.is_valid():
#                         response = serialized_data.save()
#                         response_data = MakeSerializer(response).data
#                         return Response({"data": response_data}, 200)
#                     else:
#                         error_message = get_first_error_message(serialized_data.errors, "UNSUCCESSFUL")
#                         return Response({'data': error_message}, 400)
#                     # else:
#                     #     return Response({'data':"Permission Denaied"}, 400)
#                 else:
#                     return Response({"data": "NOT FOUND"}, 404)
#             else:
#                 return Response({"data": "ID NOT PROVIDED"}, 400)

#         except Exception as e:
#             return Response({'error': str(e)}, 500)

#     def delete_make(self, request):
#         try:
#             if "id" in request.query_params:
#                 instance = Make.objects.filter(id=request.query_params['id']).first()

#                 if instance:
#                     instance.delete()
#                     return Response({"data": "SUCESSFULL"}, 200)
#                 else:
#                     return Response({"data": "RECORD NOT FOUND"}, 404)
#             else:
#                 return Response({"data": "ID NOT PROVIDED"}, 400)
#         except Exception as e:
#             return Response({'error': str(e)}, 500)