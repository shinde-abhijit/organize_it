from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .viewsets import TodoViewSet

router = DefaultRouter()
router.register(r'', TodoViewSet, basename='todos')

urlpatterns = [
    path('', include(router.urls)),
]
