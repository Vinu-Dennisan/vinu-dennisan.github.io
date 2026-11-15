from django.db import models
from django.contrib.auth.models import User
from django import forms
#cart
from django.conf import settings
import uuid

class Profile(models.Model):
    GENDER_CHOICES = [
        ('M', 'Male'),
        ('F', 'Female'),
        ('O', 'Other')
    ]

    name = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15, blank=True, null=True)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES, null=True, blank=True)
    
    def __str__(self):
        return self.user.username
    
class Dogs(models.Model):
    d_id=models.DecimalField(max_digits=10, decimal_places=2)
    dog_name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    age = models.IntegerField()
    breed = models.CharField(max_length=100)
    image = models.ImageField(upload_to='pet_images')

    def __str__(self):
        return self.dog_name
    
class Bunnies(models.Model):
    b_id=models.DecimalField(max_digits=10, decimal_places=2)
    b_name = models.CharField(max_length=255)
    price = models.IntegerField()
    b_age = models.IntegerField()
    b_breed = models.CharField(max_length=255)
    b_image = models.ImageField(upload_to='pet_images')

    def __str__(self):
        return self.b_name

class Cats(models.Model):
    c_id=models.DecimalField(max_digits=10, decimal_places=2)
    cat_name = models.CharField(max_length=255)
    price = models.IntegerField()
    cat_age = models.IntegerField()
    cat_breed = models.CharField(max_length=255)
    cat_image = models.ImageField(upload_to='pet_images')

    def __str__(self):
        return self.cat_name
    
class Hamster(models.Model):
    h_id=models.DecimalField(max_digits=10, decimal_places=2)
    h_name = models.CharField(max_length=255)
    price = models.IntegerField()
    h_age = models.IntegerField()
    h_breed = models.CharField(max_length=255)
    h_image = models.ImageField(upload_to='pet_images')

    def __str__(self):
        return self.h_name
    
#cart


class Cart(models.Model):
    id=models.UUIDField(default=uuid.uuid4,primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    completed=models.BooleanField(default=False)

    def __str__(self):
        return str(self.id)
    # You might also want to add other fields such as created_at, updated_at, etc.

class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE,related_name="cartitems")
    dog = models.ForeignKey(Dogs, on_delete=models.CASCADE,related_name="cart")
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return self.dog.dog_name