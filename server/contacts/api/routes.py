from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .viewsets import ContactViewSet

router = DefaultRouter()
router.register(r'', ContactViewSet, basename='contacts')

urlpatterns = [
    path('', include(router.urls)),
]
