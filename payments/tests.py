from django.test import TestCase
from django.urls import reverse

from .models import Customer


class CustomerTests(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.customer = Customer.objects.create(
            name="Bob Bobson",
            email="lavp@pm.me",
        )

    def test_customer_content(self):
        self.assertEqual(self.customer.name, "Bob Bobson")
        self.assertEqual(self.customer.email, "lavp@pm.me")

    def test_customer_listview(self):
        response = self.client.get(reverse("home"))
        self.assertEqual(response.status_code, 200)     # Status code 200 = Success
        self.assertContains(response, "Bob Bobson")
        self.assertTemplateUsed(response, "payments/customer_list.html")
