from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from payments.models import Customer


class APITests(APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.customer = Customer.objects.create(
            name="Mark Zuckerberg",
            email="mark@zucc.org",
        )

    def test_api_listview(self):
        response = self.client.get(reverse('customer_list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Customer.objects.count(), 1)
        self.assertContains(response, self.customer)
