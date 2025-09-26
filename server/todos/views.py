from django.shortcuts import render, redirect, get_object_or_404
from todos.models import Todo
from todos.forms import TodoForm
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.utils import timezone

# Add new todo
@login_required
def add_todo(request):
    user = request.user

    # Count incomplete todos for the user
    incomplete_count = Todo.objects.filter(user=user, is_completed=False).count()

    if request.method == "POST":
        form = TodoForm(request.POST)
        if incomplete_count >= 20:
            messages.error(request, "You cannot have more than 20 incomplete todos.")
            return redirect("todo_list")

        if form.is_valid():
            todo = form.save(commit=False)
            todo.user = user
            todo.save()
            messages.success(request, "Todo added successfully!")
            return redirect("todo_list")
    else:
        form = TodoForm()

    return render(request, "todos/add_todo.html", {"form": form, "incomplete_count": incomplete_count})


# List all todos for the current user
@login_required
def mark_complete(request, pk):
    todo = get_object_or_404(Todo, pk=pk, user=request.user)
    today = timezone.now().date()
    
    # Allow marking complete only if due_date is today or passed
    if not todo.due_date or todo.due_date <= today:
        todo.is_completed = True
        todo.save()
    return redirect('todo_list')


@login_required
def mark_incomplete(request, pk):
    todo = get_object_or_404(Todo, pk=pk, user=request.user)
    today = timezone.now().date()

    # Allow marking incomplete only if due_date is today or passed
    if not todo.due_date or todo.due_date <= today:
        todo.is_completed = False
        todo.save()
    return redirect('todo_list')


@login_required
def todo_list(request):
    todos = Todo.objects.filter(user=request.user).order_by("-created_at")
    completed_count = todos.filter(is_completed=True).count()
    incomplete_count = todos.filter(is_completed=False).count()
    today = timezone.now().date()

    return render(
        request,
        "todos/todo_list.html",
        {
            "todos": todos,
            "completed_count": completed_count,
            "incomplete_count": incomplete_count,
            "today": today,
        }
    )

# Delete a todo
@login_required
def delete_todo(request, pk):
    todo = get_object_or_404(Todo, pk=pk, user=request.user)
    if request.method == "POST":
        todo.delete()
        messages.success(request, "Todo deleted successfully!")
        return redirect("todo_list")
    return render(request, "todos/delete_todo.html", {"todo": todo})


@login_required
def update_todo(request, pk):
    todo = get_object_or_404(Todo, pk=pk, user=request.user)
    user = request.user

    # Count incomplete todos excluding the one being updated
    incomplete_count = Todo.objects.filter(user=user, is_completed=False).exclude(pk=todo.pk).count()

    if request.method == "POST":
        form = TodoForm(request.POST, instance=todo)

        # If trying to mark incomplete and user already has 20
        is_marking_incomplete = not todo.is_completed and request.POST.get("is_completed") == "False"
        if incomplete_count >= 20 and is_marking_incomplete:
            messages.error(request, "You cannot have more than 20 incomplete todos.")
            return redirect("todo_list")

        if form.is_valid():
            form.save()
            messages.success(request, "Todo updated successfully!")
            return redirect("todo_list")
    else:
        form = TodoForm(instance=todo)

    return render(request, "todos/update_todo.html", {"form": form, "todo": todo})




@login_required
def todo_details(request, pk):
    """
    View to show details of a single Todo.
    """
    todo = get_object_or_404(Todo, pk=pk)
    return render(request, "todos/todo_details.html", {"todo": todo})
