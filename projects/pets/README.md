# Pet Shop Management System

A Django pet-shop project with registration/login, pet categories, profile settings and a shopping cart.

## Run locally

Use Python 3.10+.

```bash
cd projects/pets
python -m venv .venv
# Windows: .venv\Scripts\activate
# macOS/Linux: source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py test app1
python manage.py runserver
```

Open http://127.0.0.1:8000/.

## Configuration

Set `DJANGO_SECRET_KEY`, `DJANGO_DEBUG`, and `DJANGO_ALLOWED_HOSTS` as environment variables for deployment. Never commit production secrets or set DEBUG=True in production.

## Important deployment note

This repository is also published with GitHub Pages. GitHub Pages serves static files only; it cannot execute Django, Python views, database migrations, authentication, uploads, or server-side cart logic. The `index.html` in this folder is a static portfolio preview. Deploy the Django application to a Python-capable host and configure its database and media storage before treating the full application as production-ready.

The payment page is a UI placeholder only. No card or UPI payment is processed.
