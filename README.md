# Legacy Historic District Project (Historic Hammond App)

A web app for managing and sharing information about historic Hammond properties.
The system lets administrators add and edit properties, owners, tenants, documents, and calendar events, while the public site shows curated property details with photos and maps.


## Features

- Backend: Django + Django REST Framework (APIs, admin panel)
- Frontend: React + Vite + Tailwind (modern UI)
- Database: PostgreSQL (via Docker in development)
- APIs: Properties, People, Documents, Applications, Calendar, Search
- Admin Tools: Upload photos, add details, publish/unpublish properties



## Backend
```bash
cd backend
python3 -m venv .venv && source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver 127.0.0.1:8000
```

## Frontend
```bash
cd frontend
npm install
npm run dev   # http://localhost:5173