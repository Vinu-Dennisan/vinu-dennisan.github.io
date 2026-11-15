from django.contrib import admin
from .models import Profile,Dogs,Bunnies,Cats,Hamster,Cart,CartItem
from django import forms

admin.site.register(Profile)
admin.site.register(Dogs)
admin.site.register(Bunnies)
admin.site.register(Cats)
admin.site.register(Hamster)

admin.site.register(Cart)
admin.site.register(CartItem)