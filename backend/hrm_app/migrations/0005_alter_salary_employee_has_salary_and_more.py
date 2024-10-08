# Generated by Django 5.0.3 on 2024-09-03 07:52

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hrm_app', '0004_remove_employee_department_remove_employee_position'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AlterField(
            model_name='salary',
            name='employee_has_salary',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='employee_salary', to='hrm_app.employee'),
        ),
        migrations.AlterField(
            model_name='salary',
            name='pay_frequency',
            field=models.CharField(choices=[('Monthly', 'Monthly'), ('Bi-Weekly', 'Bi-Weekly'), ('Weekly', 'Weekly')], max_length=20),
        ),
        migrations.AlterField(
            model_name='salary',
            name='user',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='user_salary', to=settings.AUTH_USER_MODEL),
        ),
    ]
