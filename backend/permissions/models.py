from django.db import models

# from  e_commerce.settings import AUTH_USER_MODEL

# Create your models here.

class Role(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField()
    permissions = models.ManyToManyField('Permission', related_name='roles')


class Permission(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField()
    code = models.CharField(max_length=50)

