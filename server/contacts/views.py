from django.shortcuts import render


def add_contact(request):
    return render(request, 'contacts/add_contact.html')


def update_contact(request):
    return render(request, 'contacts/update_contact.html')


def delete_contact(request):
    return render(request, 'contacts/delete_contact.html')


def contact_list(request):
    return render(request, 'contacts/contact_list.html')


def contact_details(request):
    return render(request, 'contacts/contact_details.html')


def search_contacts(request):
    return render(request, 'contacts/search_contacts.html')


def filter_contacts(request):
    return render(request, 'contacts/filter_contacts.html')


def sort_contacts(request):
    return render(request, 'contacts/sort_contacts.html')

