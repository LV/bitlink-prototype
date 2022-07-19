from django.test import TestCase

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
