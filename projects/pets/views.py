# views.py
from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate, logout as auth_logout
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm, PasswordChangeForm
from django.contrib.auth.decorators import login_required
from django.contrib.auth import update_session_auth_hash
from .models import Profile,Dogs,Bunnies,Cats,Hamster
from .forms import ProfileEditForm  # Add this import
from django.http import HttpResponseBadRequest
#cart
from django.shortcuts import get_object_or_404, redirect
from .models import Dogs, Cart, CartItem




def base(request):
    return render(request, 'base.html')

def home(request):
    return render(request, 'home.html')

def about(request):
    return render(request, 'about.html')

def contact(request):
    return render(request, 'contact.html')

def registration(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            profile = Profile.objects.create(
                user=user,
                name=request.POST['name'],
                email=request.POST['email'],
                address=request.POST['address'],
                phone=request.POST['phone'],
                gender=request.POST['gender']
            )
            profile.save()
            username = form.cleaned_data.get('username')
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=raw_password)
            login(request, user)
            return redirect('registered')
    else:
        form = UserCreationForm()
    return render(request, 'registration.html', {'form': form})

def registered(request):
    return render(request, 'registered.html')

def userhome(request):
    return render(request, 'loged.html')


def signin(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                return redirect('userhome')
    else:
        form = AuthenticationForm()
    return render(request, 'signin.html', {'form': form})

def logout(request):
    auth_logout(request)
    return redirect('base')

@login_required
def settings(request):
    profile = request.user.profile
    return render(request, 'settings.html', {'profile': profile})

@login_required
def settings_edit(request):
    if request.method == 'POST':
        form = ProfileEditForm(request.POST, instance=request.user.profile)
        if form.is_valid():
            form.save()
            return redirect('settings')
    else:
        form = ProfileEditForm(instance=request.user.profile)
    return render(request, 'settings_edit.html', {'form': form})

    

@login_required
def change_password(request):
    if request.method == 'POST':
        form = PasswordChangeForm(user=request.user, data=request.POST)
        if form.is_valid():
            user = form.save()
            update_session_auth_hash(request, user)  # Important!
            return redirect('logout')
    else:
        form = PasswordChangeForm(user=request.user)
    return render(request, 'change_password.html', {'form': form})

#admin
def vpets(request):
    return render(request, 'vpets.html')

def dogs(request):
    dogs = Dogs.objects.all()
    return render(request, 'dogs.html',{'dogs': dogs})

def bunnies(request):
    bunnies = Bunnies.objects.all()
    return render(request, 'bunnies.html',{'bunnies': bunnies})

def cats(request):
    cats = Cats.objects.all()
    return render(request, 'cats.html',{'cats': cats})

def hamster(request):
    hamsters = Hamster.objects.all()
    return render(request, 'hamster.html',{'hamsters': hamsters})

def booking(request):
    return render(request, 'booking.html')

def buy(request):
    return render(request, 'buy.html')

def handle_payment(request):
    if request.method == 'POST':
        payment_method = request.POST.get('payment_method')
        
        if payment_method == 'credit_card':
            return redirect('credit_card_page')  # Replace with your actual URL name
        elif payment_method == 'upi':
            return redirect('upi_page')  # Replace with your actual URL name
        elif payment_method == 'cash_on_delivery':
            return redirect('cash_on_delivery_page')  # Replace with your actual URL name
        else:
            return HttpResponseBadRequest("Invalid payment method selected.")
    else:
        return render(request, 'your_template.html')  # Render the form if not a POST request
    






#cart
def cart(request):
    context={}
    return render(request,"cart.html",context)


def add_to_cart(request, pet_id):
    pet = get_object_or_404(Dogs, id=pet_id)
    cart, created = Cart.objects.get_or_create(user=request.user)
    
    cart_item, created = CartItem.objects.get_or_create(cart=cart, pet=pet)
    if not created:
        cart_item.quantity += 1
        cart_item.save()
    
    return HttpResponseBadRequest('Something went wrong please try again later')  # Redirect to a cart summary page

def cart_summary(request):
    cart = Cart.objects.get(user=request.user)
    cart_item = CartItem.objects.filter(user=request.user)
    return render(request, 'cart_summary.html', {'cart': cart})

def card(request):
    return render(request,'card.html')




   


