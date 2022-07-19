from django.urls import path

from .views import CustomerAPIView


urlpatterns = [
    path('', CustomerAPIView.as_view(), name='customer_list'),
]