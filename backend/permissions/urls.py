from django.urls import path
from .views import RoleViews, PermissionViews

urlpatterns=[
    path('role', RoleViews.as_view({"get":"get_role",
                            "post":"post_role",
                            "patch":"update_role",
                            "delete":"delete_role"})),

    path('permission', PermissionViews.as_view({"get":"get_permission",
                            "post":"post_permission",
                            "patch":"update_permission",
                            "delete":"delete_permission"})),

    # path('rolepermission', RolepermissionViews.as_view({"get":"get_rolepermission"})),

]