from django.urls import path
from contacts.views import (
    add_contact, contact_list, contact_details, 
    update_contact, delete_contact, sort_contacts, 
    filter_contacts, 
)

urlpatterns = [
    path('add/', add_contact, name='add_contact'),
    path('list/', contact_list, name='contact_list'),
    path('sort/', sort_contacts, name='sort_contacts'),
    path('filter/', filter_contacts, name='filter_contacts'),

    path('details/<int:pk>/', contact_details, name='contact_details'),
    path('update/<int:pk>/', update_contact, name='update_contact'),
    path('delete/<int:pk>/', delete_contact, name='delete_contact'),
]

