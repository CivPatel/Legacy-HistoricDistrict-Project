# Historic District Project (Historic Hammond App)
Monorepo: Django REST API + React (Vite+TS+Tailwind). Includes calendar, document upload/OCR stub, applications wizard, property tabs, and map.

## Backend Quickstart
```bash
cd backend
python3 -m venv .venv && source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver 127.0.0.1:8000
```

## Frontend Quickstart
```bash
cd frontend
npm install
npm run dev   # http://localhost:5173
```
