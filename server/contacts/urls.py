from django.urls import path
from contacts.views import (
    add_contact, update_contact, delete_contact, contact_list, contact_details, 
    search_contacts, filter_contacts, sort_contacts 
)

urlpatterns = [
    path('', contact_list, name="contact_list"),
    path('add/', add_contact, name="add_contact"),
    path('update/<int:pk>/', update_contact, name="update_contact"),
    path('delete/<int:pk>/', delete_contact, name="delete_contact"),
    path('details/<int:pk>/', contact_details, name="contact_details"),
    path('search/', search_contacts, name="search_contacts"),
    path('filter/', filter_contacts, name="filter_contacts"),
    path('sort/', sort_contacts, name="sort_contacts"),
]
