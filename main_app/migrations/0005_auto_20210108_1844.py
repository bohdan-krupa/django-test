# Generated by Django 3.1.5 on 2021-01-08 18:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main_app', '0004_auto_20210108_1614'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='created',
            field=models.DateTimeField(auto_now=True, verbose_name='Date of creating the user'),
        ),
    ]
