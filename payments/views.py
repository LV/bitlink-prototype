from django.views.generic import ListView

from .models import Customer


class CustomerListView(ListView):
    model = Customer
    template_name = "customer_list.html"
