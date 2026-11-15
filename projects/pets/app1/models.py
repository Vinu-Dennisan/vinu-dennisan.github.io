import uuid
from django.conf import settings
from django.db import models

class Profile(models.Model):
    GENDER_CHOICES = [("M", "Male"), ("F", "Female"), ("O", "Other")]
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="profile")
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15, blank=True, null=True)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES, null=True, blank=True)

    def __str__(self):
        return self.user.username

class Dogs(models.Model):
    d_id = models.DecimalField(max_digits=10, decimal_places=2)
    dog_name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    age = models.IntegerField()
    breed = models.CharField(max_length=100)
    image = models.ImageField(upload_to="pet_images")
    def __str__(self):
        return self.dog_name

class Bunnies(models.Model):
    b_id = models.DecimalField(max_digits=10, decimal_places=2)
    b_name = models.CharField(max_length=255)
    price = models.IntegerField()
    b_age = models.IntegerField()
    b_breed = models.CharField(max_length=255)
    b_image = models.ImageField(upload_to="pet_images")
    def __str__(self):
        return self.b_name

class Cats(models.Model):
    c_id = models.DecimalField(max_digits=10, decimal_places=2)
    cat_name = models.CharField(max_length=255)
    price = models.IntegerField()
    cat_age = models.IntegerField()
    cat_breed = models.CharField(max_length=255)
    cat_image = models.ImageField(upload_to="pet_images")
    def __str__(self):
        return self.cat_name

class Hamster(models.Model):
    h_id = models.DecimalField(max_digits=10, decimal_places=2)
    h_name = models.CharField(max_length=255)
    price = models.IntegerField()
    h_age = models.IntegerField()
    h_breed = models.CharField(max_length=255)
    h_image = models.ImageField(upload_to="pet_images")
    def __str__(self):
        return self.h_name

class Cart(models.Model):
    id = models.UUIDField(default=uuid.uuid4, primary_key=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    completed = models.BooleanField(default=False)

    def __str__(self):
        return str(self.id)

class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name="cartitems")
    dog = models.ForeignKey(Dogs, on_delete=models.CASCADE, related_name="cart", null=True, blank=True)
    bunny = models.ForeignKey(Bunnies, on_delete=models.CASCADE, null=True, blank=True)
    cat = models.ForeignKey(Cats, on_delete=models.CASCADE, null=True, blank=True)
    hamster = models.ForeignKey(Hamster, on_delete=models.CASCADE, null=True, blank=True)
    quantity = models.PositiveIntegerField(default=1)

    @property
    def pet(self):
        return self.dog or self.bunny or self.cat or self.hamster

    @property
    def pet_name(self):
        pet = self.pet
        if not pet:
            return "Unavailable pet"
        return getattr(pet, "dog_name", None) or getattr(pet, "b_name", None) or getattr(pet, "cat_name", None) or getattr(pet, "h_name", None)

    @property
    def pet_price(self):
        return self.pet.price if self.pet else 0

    def __str__(self):
        return self.pet_name
