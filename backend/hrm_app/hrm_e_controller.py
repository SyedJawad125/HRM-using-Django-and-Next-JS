from datetime import date, timedelta
from django.db import transaction
from hrm_app.filters import AttendanceFilter, DepartmentFilter, EmployeeFilter, RankFilter, SalaryFilter
from hrm_app.hrm_e_serializer import AttendanceSerializer, DepartmentSerializer, EmployeeSerializer, RankSerializer, SalarySerializer
from hrm_app.models import Attendance, Department, Employee, Rank, Salary
from utils.helper import create_response, paginate_data
from rest_framework.response import Response
from utils.reusable_methods import get_first_error_message


class EmployeeController:
    serializer_class = EmployeeSerializer
    filterset_class = EmployeeFilter

 
    def create(self, request):
        try:
            request.POST._mutable = True
            request.data["created_by"] = request.user.guid
            request.POST._mutable = False

            # if request.user.role in ['admin', 'manager'] or request.user.is_superuser:  # roles
            validated_data = EmployeeSerializer(data=request.data)
            if validated_data.is_valid():
                response = validated_data.save()
                response_data = EmployeeSerializer(response).data
                return Response({'data': response_data}, 200)
            else:
                error_message = get_first_error_message(validated_data.errors, "UNSUCCESSFUL")
                return Response({'data': error_message}, 400)
            # else:
            #     return Response({'data': "Permission Denaied"}, 400)
        except Exception as e:
            return Response({'error': str(e)}, 500)

    # mydata = Member.objects.filter(firstname__endswith='s').values()
    def get_employee(self, request):
        try:

            instances = self.serializer_class.Meta.model.objects.all()

            filtered_data = self.filterset_class(request.GET, queryset=instances)
            data = filtered_data.qs

            paginated_data, count = paginate_data(data, request)

            serialized_data = self.serializer_class(paginated_data, many=True).data
            response_data = {
                "count": count,
                "data": serialized_data,
            }
            return create_response(response_data, "SUCCESSFUL", 200)


        except Exception as e:
            return Response({'error': str(e)}, 500)

    def update_employee(self, request):
        try:
            if "id" in request.data:
                # finding instance
                instance = Employee.objects.filter(id=request.data["id"]).first()

                if instance:
                    request.POST._mutable = True
                    request.data["updated_by"] = request.user.guid
                    request.POST._mutable = False

                    # updating the instance/record
                    serialized_data = EmployeeSerializer(instance, data=request.data, partial=True)
                    # if request.user.role in ['admin', 'manager'] or request.user.is_superuser:  # roles
                    if serialized_data.is_valid():
                        response = serialized_data.save()
                        response_data = EmployeeSerializer(response).data
                        return Response({"data": response_data}, 200)
                    else:
                        error_message = get_first_error_message(serialized_data.errors, "UNSUCCESSFUL")
                        return Response({'data': error_message}, 400)
                    # else:
                    #     return Response({'data': "Permission Denaied"}, 400)
                else:
                    return Response({"data": "NOT FOUND"}, 404)
            else:
                return Response({"data": "ID NOT PROVIDED"}, 400)

        except Exception as e:
            return Response({'error': str(e)}, 500)

    def delete_employee(self, request):
        try:
            if "id" in request.query_params:
                instance = Employee.objects.filter(id=request.query_params['id']).first()

                if instance:
                    instance.delete()
                    return Response({"data": "SUCESSFULL"}, 200)
                else:
                    return Response({"data": "RECORD NOT FOUND"}, 404)
            else:
                return Response({"data": "ID NOT PROVIDED"}, 400)
        except Exception as e:
            return Response({'error': str(e)}, 500)
        

class DepartmentController:
    serializer_class = DepartmentSerializer
    filterset_class = DepartmentFilter
    def create(self, request):
        try:
            request.POST._mutable = True
            request.data["dept_added_by_user"] = request.user.guid
            request.POST._mutable = False

            
            validated_data = DepartmentSerializer(data=request.data)
            if validated_data.is_valid():
                response = validated_data.save()
                response_data = DepartmentSerializer(response).data
                return Response({'data':response_data} , 200)
            else:
                error_message = get_first_error_message(validated_data.errors, "UNSUCCESSFUL")
                return Response({'data':error_message}, 400)
            
        except Exception as e:
            return Response({'error':str(e)}, 500)
        
    def get_department(self, request):
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
    
    
    def update_department(self, request):
        try:
            if "id" in request.data:
                #finding instance
                instance = Department.objects.filter(id=request.data["id"]).first()

                if instance:
                    request.POST._mutable = True
                    request.data["dept_updated_by_user"] = request.user.guid
                    request.POST._mutable = False

                    # updating the instance/record
                    serialized_data = DepartmentSerializer(instance, data=request.data, partial=True)
                    
                    if serialized_data.is_valid():
                        response = serialized_data.save()
                        response_data = DepartmentSerializer(response).data
                        return Response({"data":response_data}, 200)
                    else:
                        error_message = get_first_error_message(serialized_data.errors, "UNSUCCESSFUL")
                        return Response({'data':error_message}, 400)

                else:
                    return Response({"data":"NOT FOUND"}, 404)
            else:
                return Response({"data":"ID NOT PROVIDED"}, 400)
            
        except Exception as e:
            return Response({'error':str(e)}, 500)

    def delete_department(self, request):
        try:
            if "id" in request.query_params:
                instance = Department.objects.filter(id=request.query_params['id']).first()

                if instance:
                    instance.delete()
                    return Response({"data":"SUCESSFULL"}, 200)
                else:
                    return Response({"data":"RECORD NOT FOUND"}, 404) 
            else:
                return Response({"data":"ID NOT PROVIDED"}, 400)
        except Exception as e:
            return Response({'error':str(e)}, 500)
        


class SalaryController:
    serializer_class = SalarySerializer
    filterset_class = SalaryFilter

    def create(self, request):
        try:
            request.POST._mutable = True
            request.data["sal_added_by_user"] = request.user.guid
          
            request.POST._mutable = False
            validated_data = SalarySerializer(data=request.data)
            if validated_data.is_valid():
                response = validated_data.save()
                response_data = SalarySerializer(response).data

                # message = f"""You have assigned salary in the organization.
                #         salary_id {response.id},  net_salary {response.net_salary}, pay_grade {response.pay_grade},"""
                #                     # ,dept_name {response.dept_has_position.dept_name}
                # email_list = ['syedjawadali92@gmail.com']
        
                # beta = threading.Thread(target=send_mail, args=("Subject of Email", message , EMAIL_HOST_USER, email_list))
                # beta.start()


                return Response({'data':response_data} , 200)
            else:
                error_message = get_first_error_message(validated_data.errors, "UNSUCCESSFUL")
                return Response({'data':error_message}, 400)
            
        except Exception as e:
            return Response({'error':str(e)}, 500)
    
#mydata = Member.objects.filter(firstname__endswith='s').values()
    def get_salary(self, request):
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
    
    
    def update_salary(self, request):
        try:
            if "id" in request.data:
                #finding instance
                instance = Salary.objects.filter(id=request.data["id"]).first()

                if instance:
                    # updating the instance/record
                    request.POST._mutable = True
                    request.data["sal_updated_by_user"] = request.user.guid
                    request.POST._mutable = False
                    serialized_data = SalarySerializer(instance, data=request.data, partial=True)

                   
                    if serialized_data.is_valid():
                        response = serialized_data.save()
                        response_data = SalarySerializer(response).data
                        return Response({"data":response_data}, 200)
                    else:
                        error_message = get_first_error_message(serialized_data.errors, "UNSUCCESSFUL")
                        return Response({'data':error_message}, 400)
                    
                else:
                    return Response({"data":"NOT FOUND"}, 404)
            else:
                return Response({"data":"ID NOT PROVIDED"}, 400)
            
        except Exception as e:
            return Response({'error':str(e)}, 500)

    def delete_salary(self, request):
        try:
            if "id" in request.query_params:
                instance = Salary.objects.filter(id=request.query_params['id']).first()

                if instance:
                    instance.delete()
                    return Response({"data":"SUCESSFULL"}, 200)
                else:
                    return Response({"data":"RECORD NOT FOUND"}, 404) 
            else:
                return Response({"data":"ID NOT PROVIDED"}, 400)
        except Exception as e:
            return Response({'error':str(e)}, 500)


class RankController:
    serializer_class = RankSerializer
    filterset_class = RankFilter
    def create(self, request):
        try:
            request.POST._mutable = True
            request.data["rank_added_by_user"] = request.user.guid
            
            request.POST._mutable = False

            validated_data = RankSerializer(data=request.data)
            if validated_data.is_valid():
                response = validated_data.save()
                response_data = RankSerializer(response).data

                # message = f"""You have assigned position/role in the organization.
                #         position_id {response.id},  position_title {response.position_title}, net_salary {response.posi_has_salary.net_salary}
                #         dept_name {response.dept_has_position.dept_name}"""

                # email_list = ['syedjawadali92@gmail.com']
                

                # beta = threading.Thread(target=send_mail, args=("Subject of Email", message , EMAIL_HOST_USER, email_list))
                # beta.start()

                return Response({'data':response_data} , 200)
            else:
                error_message = get_first_error_message(validated_data.errors, "UNSUCCESSFUL")
                return Response({'data':error_message}, 400)
            
        except Exception as e:
            return Response({'error':str(e)}, 500)
    
#mydata = Member.objects.filter(firstname__endswith='s').values()
    def get_rank(self, request):
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
    
    
    def update_rank(self, request):
        try:
            if "id" in request.data:
                #finding instance
                instance = Rank.objects.filter(id=request.data["id"]).first()

                if instance:
                    request.POST._mutable = True
                    request.data["pos_updated_by_user"] = request.user.guid
                    request.POST._mutable = False

                    # updating the instance/record
                    serialized_data = RankSerializer(instance, data=request.data, partial=True)
                    
                    if serialized_data.is_valid():
                        response = serialized_data.save()
                        response_data = RankSerializer(response).data

                        # message = f"""Your position have change assistant Professor to Professor in the Department.
                        # position_id {response.id},  position_title {response.position_title}, net_salary {response.posi_has_salary.net_salary}
                        # dept_name {response.dept_has_position.dept_name}"""

                        # email_list = ['syedjawadali92@gmail.com']
                

                        # beta = threading.Thread(target=send_mail, args=("Subject of Email", message , EMAIL_HOST_USER, email_list))
                        # beta.start()

                        return Response({"data":response_data}, 200)
                    else:
                        error_message = get_first_error_message(serialized_data.errors, "UNSUCCESSFUL")
                        return Response({'data':error_message}, 400)
                
                else:
                    return Response({"data":"NOT FOUND"}, 404)
            else:
                return Response({"data":"ID NOT PROVIDED"}, 400)
            
        except Exception as e:
            return Response({'error':str(e)}, 500)

    def delete_rank(self, request):
        try:
            if "id" in request.query_params:
                instance = Rank.objects.filter(id=request.query_params['id']).first()

                if instance:
                    instance.delete()
                    return Response({"data":"SUCESSFULL"}, 200)
                else:
                    return Response({"data":"RECORD NOT FOUND"}, 404) 
            else:
                return Response({"data":"ID NOT PROVIDED"}, 400)
        except Exception as e:
            return Response({'error':str(e)}, 500)



class AttendanceController:
    serializer_class = AttendanceSerializer
    filterset_class = AttendanceFilter

 
    def create(self, request):
        try:
            request.POST._mutable = True
            request.data["created_by"] = request.user.guid
            request.POST._mutable = False

            # if request.user.role in ['admin', 'manager'] or request.user.is_superuser:  # roles
            validated_data = AttendanceSerializer(data=request.data)
            if validated_data.is_valid():
                response = validated_data.save()
                response_data = AttendanceSerializer(response).data
                return Response({'data': response_data}, 200)
            else:
                error_message = get_first_error_message(validated_data.errors, "UNSUCCESSFUL")
                return Response({'data': error_message}, 400)
            # else:
            #     return Response({'data': "Permission Denaied"}, 400)
        except Exception as e:
            return Response({'error': str(e)}, 500)

    # mydata = Member.objects.filter(firstname__endswith='s').values()
    def get_attendance(self, request):
        try:

            instances = self.serializer_class.Meta.model.objects.all()

            filtered_data = self.filterset_class(request.GET, queryset=instances)
            data = filtered_data.qs

            paginated_data, count = paginate_data(data, request)

            serialized_data = self.serializer_class(paginated_data, many=True).data
            response_data = {
                "count": count,
                "data": serialized_data,
            }
            return create_response(response_data, "SUCCESSFUL", 200)


        except Exception as e:
            return Response({'error': str(e)}, 500)

    def update_attendance(self, request):
        try:
            if "id" in request.data:
                # finding instance
                instance = Attendance.objects.filter(id=request.data["id"]).first()

                if instance:
                    request.POST._mutable = True
                    request.data["updated_by"] = request.user.guid
                    request.POST._mutable = False

                    # updating the instance/record
                    serialized_data = AttendanceSerializer(instance, data=request.data, partial=True)
                    # if request.user.role in ['admin', 'manager'] or request.user.is_superuser:  # roles
                    if serialized_data.is_valid():
                        response = serialized_data.save()
                        response_data = AttendanceSerializer(response).data
                        return Response({"data": response_data}, 200)
                    else:
                        error_message = get_first_error_message(serialized_data.errors, "UNSUCCESSFUL")
                        return Response({'data': error_message}, 400)
                    # else:
                    #     return Response({'data': "Permission Denaied"}, 400)
                else:
                    return Response({"data": "NOT FOUND"}, 404)
            else:
                return Response({"data": "ID NOT PROVIDED"}, 400)

        except Exception as e:
            return Response({'error': str(e)}, 500)

    def delete_attendance(self, request):
        try:
            if "id" in request.query_params:
                instance = Attendance.objects.filter(id=request.query_params['id']).first()

                if instance:
                    instance.delete()
                    return Response({"data": "SUCESSFULL"}, 200)
                else:
                    return Response({"data": "RECORD NOT FOUND"}, 404)
            else:
                return Response({"data": "ID NOT PROVIDED"}, 400)
        except Exception as e:
            return Response({'error': str(e)}, 500)