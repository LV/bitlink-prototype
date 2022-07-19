from rest_framework import generics

from payments.models import Customer
from .serializers import CustomerSerializer


class CustomerAPIView(generics.ListAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
