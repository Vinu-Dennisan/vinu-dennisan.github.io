from django.contrib import admin
from .models import Profile, Dogs, Bunnies, Cats, Hamster, Cart, CartItem

admin.site.register([Profile, Dogs, Bunnies, Cats, Hamster, Cart, CartItem])
