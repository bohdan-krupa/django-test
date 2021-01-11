from rest_framework import routers
from .views import UserViewSet, GroupViewSet


router = routers.SimpleRouter()
router.register('user', UserViewSet, basename='user')
router.register('group', GroupViewSet, basename='group')

urlpatterns = router.urls