from rest_framework import viewsets
from .serializers import UserSerializer, GroupSerializer, UsersListRetrieveSerializer
from ..models import User, Group


class UserViewSet(viewsets.ModelViewSet):
  queryset = User.objects.all()
  serializer_class = UserSerializer

  action_to_serializer = {
    'list': UsersListRetrieveSerializer,
    'retrieve': UsersListRetrieveSerializer
  }

  def get_serializer_class(self):
    return self.action_to_serializer.get(
      self.action,
      self.serializer_class
    )


class GroupViewSet(viewsets.ModelViewSet):
  queryset = Group.objects.all()
  serializer_class = GroupSerializer