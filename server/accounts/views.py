from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import login, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from .forms import UserRegisterForm, UserLoginForm, UserUpdateForm, UserDeleteForm
from .models import CustomUser


def register_user(request):
    if request.method == "POST":
        form = UserRegisterForm(request.POST, request.FILES)
        if form.is_valid():
            user = form.save(commit=False)
            user.set_password(form.cleaned_data["password"])
            user.save()
            messages.success(request, "Registration successful! You can now log in.")
            return redirect("login_user")
    else:
        form = UserRegisterForm()
    return render(request, "accounts/register.html", {"form": form})


def login_user(request):
    if request.method == "POST":
        form = UserLoginForm(request, data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            messages.success(request, f"Welcome back {user.username}!")
            return redirect("user_profile")
    else:
        form = UserLoginForm()
    return render(request, "accounts/login.html", {"form": form})


@login_required
def logout_user(request):
    if request.method == "POST":
        logout(request)
        messages.success(request, "You have been logged out.")
        return redirect("login_user")
    return render(request, "accounts/logout_confirm.html")  # confirmation template


@login_required
def user_profile(request):
    return render(request, "accounts/profile.html", {"user": request.user})


@login_required
def update_user(request):
    user = request.user
    if request.method == "POST":
        form = UserUpdateForm(request.POST, request.FILES, instance=user)
        if form.is_valid():
            form.save()
            messages.success(request, "Profile updated successfully!")
            return redirect("user_profile")
    else:
        form = UserUpdateForm(instance=user)
    return render(request, "accounts/update_user.html", {"form": form})


@login_required
def delete_user(request):
    user = request.user
    if request.method == "POST":
        form = UserDeleteForm(user, request.POST)
        if form.is_valid():
            user.delete()
            messages.success(request, "Your account has been deleted.")
            return redirect("register_user")
    else:
        form = UserDeleteForm(user)
    return render(request, "accounts/delete_user.html", {"form": form})
