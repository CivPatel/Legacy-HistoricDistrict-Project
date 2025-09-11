"""
MODELS — the shapes of our data.
Each model = one table in the database.
Example: Property(name, address, year_built, ...)
If you add/change a field:
  1) python manage.py makemigrations
  2) python manage.py migrate
"""

from django.db import models
class Owner(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    phone = models.CharField(max_length=40, blank=True)
    email = models.EmailField(blank=True)
    notes = models.TextField(blank=True)
    def __str__(self): return f"{self.first_name} {self.last_name}"
class Tenant(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    phone = models.CharField(max_length=40, blank=True)
    email = models.EmailField(blank=True)
    notes = models.TextField(blank=True)
    def __str__(self): return f"{self.first_name} {self.last_name}"
