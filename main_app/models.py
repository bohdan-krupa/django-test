from django.db import models


class Group(models.Model):
  name = models.CharField(max_length=255, verbose_name='Name', unique=True)
  description = models.TextField(verbose_name='Description')

  def __str__(self) -> str:
    return self.name


class User(models.Model):
  username = models.CharField(max_length=255, verbose_name='User nickname', unique=True)
  created = models.DateTimeField(auto_now=True, verbose_name='Date of creating the user')
  group = models.ForeignKey(Group, on_delete=models.RESTRICT, verbose_name='Group')

  def __str__(self) -> str:
    return self.username