import datetime
import jwt
import random
import ast                                                         
from cryptography.fernet import Fernet
from rest_framework.utils.serializer_helpers import ReturnList
from hrm.settings import JWT_ENCODING_SECRET_KEY, JWT_TOKEN_EXPIRY_DELTA
from rest_framework.pagination import LimitOffsetPagination


def encrypt_token(token):
    """Encrypt the jwt token so users cannot see token content"""
    secret_key_bytes = b"LD7i4Pe_VDdXhRyHSQrQe3RpIJ8RymjbU_zA0Yi4Hlg="
    fernet = Fernet(secret_key_bytes)
    return fernet.encrypt(token.encode()).decode("utf-8")


def decrypt_token(encrypted_token):
    """Decrypt the encrypted token string to get the original jwt token"""
    secret_key_bytes = b"LD7i4Pe_VDdXhRyHSQrQe3RpIJ8RymjbU_zA0Yi4Hlg="
    fernet = Fernet(secret_key_bytes)
    return fernet.decrypt(encrypted_token.encode()).decode()


def generate_access_token(user):
    # nbf: Defines the time before which the JWT MUST NOT be accepted for processing
    access_token_payload = {
        'username': user.username,
        'iat': datetime.datetime.utcnow(),
    }
    exp_claim = {
        "exp": access_token_payload.get("iat") + datetime.timedelta(seconds=int(JWT_TOKEN_EXPIRY_DELTA))}
    # Add expiry claim to token_payload
    token_payload = {**access_token_payload, **exp_claim}
    encoded_token = jwt.encode(token_payload, JWT_ENCODING_SECRET_KEY, algorithm='HS256')
    jwt_token = encrypt_token(encoded_token)
    return jwt_token


def get_first_error_message(serialized_errors, default_message=""):
    if not serialized_errors:
        return default_message
    try:
        serialized_error_dict = serialized_errors
        if isinstance(serialized_errors, ReturnList):
            serialized_error_dict = serialized_errors[0]

        serialized_errors_keys = list(serialized_error_dict.keys())
        print(serialized_errors_keys)
        try:
            message = serialized_error_dict[serialized_errors_keys[0]][0].replace("This", serialized_errors_keys[0])
            print(message)
            return message
        except:
            return serialized_error_dict[serialized_errors_keys[0]][0]
    except Exception as e:
        return default_message
    
    
def generate_six_length_random_number():
    random_number = random.SystemRandom().randint(100000, 999999)
    return random_number


def paginate_data(data, request):
    limit = request.query_params.get('limit')
    offset = request.query_params.get('offset')
    if limit and offset:
        pagination = LimitOffsetPagination()
        data = pagination.paginate_queryset(data, request)
        return data
    else:
        return data


def get_params(name, instance, kwargs):
    instance = check_for_one_or_many(instance)
    if type(instance) == list or type(instance) == tuple:
        kwargs[f"{name}__in"] = instance
    elif type(instance) == str and instance.lower() in ["true", "false"]:
        kwargs[f"{name}"] = bool(instance.lower() == "true")
    else:
        kwargs[f"{name}"] = instance
    return kwargs


def check_for_one_or_many(instances):
    try:
        instance = ast.literal_eval(instances)
        return instance
    except Exception as e:
        print(e)
        return instances