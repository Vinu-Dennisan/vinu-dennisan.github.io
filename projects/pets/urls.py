from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static
#cart
from .views import add_to_cart

urlpatterns = [
    path('', views.base, name='base'),
    path('home/', views.home, name='home'),
    path('about/', views.about, name='about'),
    path('registration/', views.registration, name='registration'),
    path('registered/', views.registered, name='registered'),
    path('login/', views.signin, name='login'),
    path('logout/', views.logout, name='logout'),
    path('contact/', views.contact, name='contact'),
    path('userhome/', views.userhome, name='userhome'),
    path('settings/', views.settings, name='settings'),
    path('settings/edit/', views.settings_edit, name='settings_edit'),
    path('settings/edit/change_password/', views.change_password, name='change_password'),
    path('userhome/vpets/',views.vpets,name='vpets'),
    path('userhome/vpets/dogs',views.dogs,name='dogs'),
    path('userhome/vpets/bunnies/',views.bunnies,name='bunnies'),
    path('userhome/vpets/cats/',views.cats,name='cats'),
    path('userhome/vpets/hamster/',views.hamster,name='hamster'),
    path('booking/', views.booking, name='booking'),
    path('buy/', views.buy, name='buy'),
    
    path('handle_payment/', views.handle_payment, name='handle_payment'),
    
    
    path('cart_summary',views.cart_summary,name='cart_summary'),
    path('add_to_cart/', views.add_to_cart, name='add_to_cart'),
    path('cart/', views.cart, name='cart'),
    path('card/',views.card,name='card'),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)