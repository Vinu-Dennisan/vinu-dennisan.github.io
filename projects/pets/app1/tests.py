from decimal import Decimal
from django.contrib.auth import get_user_model
from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import TestCase
from django.urls import reverse

from .models import Bunnies, Cats, CartItem, Dogs, Hamster


class PetShopFlowTests(TestCase):
    def setUp(self):
        self.user = get_user_model().objects.create_user(
            username="shopper", password="Safe-test-password-123"
        )
        self.client.login(username="shopper", password="Safe-test-password-123")

    def make_image(self, filename):
        return SimpleUploadedFile(filename, b"test-image-bytes", content_type="image/jpeg")

    def test_home_page_loads(self):
        response = self.client.get(reverse("base"))
        self.assertEqual(response.status_code, 200)

    def test_authenticated_user_can_add_every_pet_category_to_cart(self):
        pets = [
            ("dogs", Dogs.objects.create(
                d_id=Decimal("1.00"), dog_name="Buddy", price=Decimal("8500.00"),
                age=2, breed="Golden Retriever", image=self.make_image("dog.jpg")
            )),
            ("bunnies", Bunnies.objects.create(
                b_id=Decimal("2.00"), b_name="Cotton", price=2500,
                b_age=1, b_breed="Mini Rex", b_image=self.make_image("bunny.jpg")
            )),
            ("cats", Cats.objects.create(
                c_id=Decimal("3.00"), cat_name="Luna", price=6000,
                cat_age=1, cat_breed="Persian", cat_image=self.make_image("cat.jpg")
            )),
            ("hamster", Hamster.objects.create(
                h_id=Decimal("4.00"), h_name="Peanut", price=900,
                h_age=1, h_breed="Syrian", h_image=self.make_image("hamster.jpg")
            )),
        ]

        for pet_type, pet in pets:
            response = self.client.post(
                reverse("add_to_cart", args=[pet_type, pet.pk])
            )
            self.assertRedirects(response, reverse("cart_summary"))

        self.assertEqual(CartItem.objects.count(), 4)
        response = self.client.get(reverse("cart_summary"))
        self.assertEqual(response.status_code, 200)
        for name in ("Buddy", "Cotton", "Luna", "Peanut"):
            self.assertContains(response, name)

    def test_cart_requires_login(self):
        self.client.logout()
        response = self.client.get(reverse("cart_summary"))
        self.assertEqual(response.status_code, 302)
        self.assertIn(reverse("login"), response.url)

    def test_payment_page_does_not_claim_to_process_payment(self):
        response = self.client.post(
            reverse("handle_payment"), {"payment_method": "upi"}
        )
        self.assertRedirects(response, reverse("buy"))
        self.assertEqual(response.status_code, 302)
