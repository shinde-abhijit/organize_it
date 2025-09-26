from django.urls import path
from todos.views import (
    add_todo, todo_list, delete_todo, update_todo, mark_complete, mark_incomplete, todo_details
)

urlpatterns = [
    path("", todo_list, name="todo_list"),
    path("add/", add_todo, name="add_todo"),
    path("delete/<int:pk>/", delete_todo, name="delete_todo"),
    path("details/<int:pk>/", todo_details, name="todo_details"),
    path("update/<int:pk>/", update_todo, name="update_todo"),
    path('complete/<int:pk>/', mark_complete, name='mark_complete'),
    path('incomplete/<int:pk>/', mark_incomplete, name='mark_incomplete'),
]