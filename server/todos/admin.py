from django.contrib import admin
from todos.models import Todo

class TodoAdmin(admin.ModelAdmin):
    list_display = ("user", "title", "priority", "due_date")
    list_filter = ("title", "priority", "due_date")
    list_per_page = 100
admin.site.register(Todo, TodoAdmin)