# Generated by Django 3.1.5 on 2021-01-08 16:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main_app', '0002_auto_20210108_1605'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='created',
            field=models.DateTimeField(auto_now_add=True, null=True, verbose_name='Date of creating the user'),
        ),
    ]
