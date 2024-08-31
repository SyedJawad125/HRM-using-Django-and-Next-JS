from rest_framework.exceptions import APIException
from rest_framework import status

class SessionExpired(APIException):
    status_code = status.HTTP_403_FORBIDDEN
    default_detail = {'data': {}, 'message': 'Session Expired'}
    default_code = 'not_authenticated'
    
