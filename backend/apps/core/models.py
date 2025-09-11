"""
MODELS — the shapes of our data.
Each model = one table in the database.
Example: Property(name, address, year_built, ...)
If you add/change a field:
  1) python manage.py makemigrations
  2) python manage.py migrate
"""

from django.db import models
class TimeStampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    class Meta:
        abstract = True
