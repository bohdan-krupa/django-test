# Generated by Django 3.1.5 on 2021-01-08 16:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main_app', '0003_auto_20210108_1607'),
    ]

    operations = [
        migrations.AlterField(
            model_name='group',
            name='description',
            field=models.TextField(verbose_name='Description'),
        ),
        migrations.AlterField(
            model_name='user',
            name='created',
            field=models.DateTimeField(auto_now_add=True, verbose_name='Date of creating the user'),
        ),
    ]
