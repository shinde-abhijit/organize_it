from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from contacts.forms import ContactForm
from contacts.models import Contact
from django.core.paginator import Paginator
from django.contrib.auth.decorators import login_required

@login_required
def add_contact(request):
    if request.method == "POST":
        form = ContactForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            messages.success(request, "Contact added successfully!")
            return redirect("contact_list")
        else:
            # Add one generic error message
            messages.error(request, "Please correct the errors below.")

            # Add detailed field-specific errors
            for field, errors in form.errors.as_data().items():
                for err in errors:
                    messages.error(request, f"{field.capitalize()}: {err.message}")
    else:
        form = ContactForm()

    return render(request, "contacts/add_contact.html", {"form": form})

@login_required
def contact_list(request):
    contacts = Contact.objects.all().order_by('first_name', 'last_name')
    paginator = Paginator(contacts, 10)
    page_number = request.GET.get('page', 1)
    page_obj = paginator.get_page(page_number)
    return render(request, 'contacts/contact_list.html', {'page_obj': page_obj})

@login_required
def contact_details(request):
    pass

@login_required
def update_contact(request):
    pass

@login_required
def delete_contact(request):
    pass

@login_required
def sort_contacts(request):
    pass

@login_required
def filter_contacts(request):
    pass

