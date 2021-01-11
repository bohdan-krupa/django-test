from rest_framework import serializers
from ..models import User, Group


class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = '__all__'


class GroupSerializer(serializers.ModelSerializer):
  class Meta:
    model = Group
    fields = '__all__'


class UsersListRetrieveSerializer(serializers.ModelSerializer):
  group = GroupSerializer()

  class Meta:
    model = User
    fields = '__all__'