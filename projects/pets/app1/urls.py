from django.urls import path
from . import views

urlpatterns = [
    path("", views.base, name="base"),
    path("home/", views.home, name="home"),
    path("about/", views.about, name="about"),
    path("contact/", views.contact, name="contact"),
    path("registration/", views.registration, name="registration"),
    path("registered/", views.registered, name="registered"),
    path("login/", views.signin, name="login"),
    path("logout/", views.logout_view, name="logout"),
    path("userhome/", views.userhome, name="userhome"),
    path("settings/", views.profile_settings, name="settings"),
    path("settings/edit/", views.settings_edit, name="settings_edit"),
    path("settings/edit/change_password/", views.change_password, name="change_password"),
    path("userhome/vpets/", views.vpets, name="vpets"),
    path("userhome/vpets/dogs/", views.dogs, name="dogs"),
    path("userhome/vpets/bunnies/", views.bunnies, name="bunnies"),
    path("userhome/vpets/cats/", views.cats, name="cats"),
    path("userhome/vpets/hamster/", views.hamster, name="hamster"),
    path("booking/", views.booking, name="booking"),
    path("buy/", views.buy, name="buy"),
    path("handle_payment/", views.handle_payment, name="handle_payment"),
    path("cart/", views.cart_summary, name="cart"),
    path("cart/summary/", views.cart_summary, name="cart_summary"),
    path("cart/add/<str:pet_type>/<int:pet_id>/", views.add_to_cart, name="add_to_cart"),
    path("card/", views.card, name="card"),
]
