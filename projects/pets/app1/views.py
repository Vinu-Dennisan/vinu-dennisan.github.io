from decimal import Decimal
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout as auth_logout, update_session_auth_hash
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm, PasswordChangeForm
from django.db import transaction
from django.http import HttpResponseNotAllowed
from django.shortcuts import get_object_or_404, redirect, render
from .forms import ProfileEditForm
from .models import Profile, Dogs, Bunnies, Cats, Hamster, Cart, CartItem

PET_MODELS = {
    "dogs": (Dogs, "dog"),
    "bunnies": (Bunnies, "bunny"),
    "cats": (Cats, "cat"),
    "hamster": (Hamster, "hamster"),
}

def base(request): return render(request, "base.html")
def home(request): return render(request, "home.html")
def about(request): return render(request, "about.html")
def contact(request): return render(request, "contact.html")

@transaction.atomic
def registration(request):
    if request.method == "POST":
        form = UserCreationForm(request.POST)
        required = ("name", "email", "address")
        missing = [field for field in required if not request.POST.get(field, "").strip()]
        if missing:
            messages.error(request, "Please complete all required profile fields.")
        elif form.is_valid():
            email = request.POST["email"].strip()
            if Profile.objects.filter(email__iexact=email).exists():
                messages.error(request, "An account with this email already exists.")
            else:
                user = form.save()
                Profile.objects.create(
                    user=user, name=request.POST["name"].strip(), email=email,
                    address=request.POST["address"].strip(),
                    phone=request.POST.get("phone", "").strip(),
                    gender=request.POST.get("gender", ""),
                )
                login(request, user)
                return redirect("registered")
    else:
        form = UserCreationForm()
    return render(request, "registration.html", {"form": form})

def registered(request): return render(request, "registered.html")

@login_required
def userhome(request): return render(request, "loged.html")

def signin(request):
    if request.method == "POST":
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            return redirect("userhome")
    else:
        form = AuthenticationForm(request)
    return render(request, "signin.html", {"form": form})

def logout_view(request):
    if request.method not in ("GET", "POST"):
        return HttpResponseNotAllowed(["GET", "POST"])
    auth_logout(request)
    return redirect("base")

@login_required
def profile_settings(request):
    profile, _ = Profile.objects.get_or_create(
        user=request.user,
        defaults={"name": request.user.username, "email": request.user.email or f"{request.user.username}@example.invalid", "address": ""},
    )
    return render(request, "settings.html", {"profile": profile})

@login_required
def settings_edit(request):
    profile, _ = Profile.objects.get_or_create(
        user=request.user,
        defaults={"name": request.user.username, "email": request.user.email or f"{request.user.username}@example.invalid", "address": ""},
    )
    form = ProfileEditForm(request.POST or None, instance=profile)
    if request.method == "POST" and form.is_valid():
        form.save()
        messages.success(request, "Your profile was updated.")
        return redirect("settings")
    return render(request, "settings_edit.html", {"form": form})

@login_required
def change_password(request):
    form = PasswordChangeForm(user=request.user, data=request.POST or None)
    if request.method == "POST" and form.is_valid():
        user = form.save()
        update_session_auth_hash(request, user)
        messages.success(request, "Your password was changed.")
        return redirect("settings")
    return render(request, "change_password.html", {"form": form})

def vpets(request): return render(request, "vpets.html")
def dogs(request): return render(request, "dogs.html", {"dogs": Dogs.objects.all()})
def bunnies(request): return render(request, "bunnies.html", {"bunnies": Bunnies.objects.all()})
def cats(request): return render(request, "cats.html", {"cats": Cats.objects.all()})
def hamster(request): return render(request, "hamster.html", {"hamsters": Hamster.objects.all()})
def booking(request): return render(request, "booking.html")
def buy(request): return render(request, "buy.html")

def handle_payment(request):
    if request.method != "POST":
        return HttpResponseNotAllowed(["POST"])
    method = request.POST.get("payment_method")
    if method not in {"credit_card", "upi", "cash_on_delivery"}:
        messages.error(request, "Please select a valid payment method.")
    else:
        messages.warning(request, "Payment is not enabled in this demo. No payment was taken.")
    return redirect("buy")

@login_required
def add_to_cart(request, pet_type, pet_id):
    if request.method != "POST":
        return HttpResponseNotAllowed(["POST"])
    if pet_type not in PET_MODELS:
        messages.error(request, "Unknown pet category.")
        return redirect("vpets")
    model, field = PET_MODELS[pet_type]
    pet = get_object_or_404(model, pk=pet_id)
    cart, _ = Cart.objects.get_or_create(user=request.user, completed=False)
    lookup = {"cart": cart, field: pet}
    item, created = CartItem.objects.get_or_create(**lookup)
    if not created:
        item.quantity += 1
        item.save(update_fields=["quantity"])
    messages.success(request, f"{item.pet_name} was added to your cart.")
    return redirect("cart_summary")

@login_required
def cart_summary(request):
    cart, _ = Cart.objects.get_or_create(user=request.user, completed=False)
    items = list(cart.cartitems.select_related("dog", "bunny", "cat", "hamster"))
    total = sum((item.pet_price * item.quantity for item in items), Decimal("0"))
    return render(request, "cart_summary.html", {"cart": cart, "cart_items": items, "total_price": total})

def card(request): return render(request, "card.html")
