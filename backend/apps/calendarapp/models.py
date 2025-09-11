"""
MODELS — the shapes of our data.
Each model = one table in the database.
Example: Property(name, address, year_built, ...)
If you add/change a field:
  1) python manage.py makemigrations
  2) python manage.py migrate
"""

from django.db import models
from apps.properties.models import Property
from apps.applications.models import Application
class CalendarEvent(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name='events')
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    start = models.DateTimeField()
    end = models.DateTimeField()
    all_day = models.BooleanField(default=False)
    is_public = models.BooleanField(default=True)
    flag_key = models.CharField(max_length=50, blank=True)
class EventLink(models.Model):
    event = models.ForeignKey(CalendarEvent, on_delete=models.CASCADE, related_name='links')
    application = models.ForeignKey(Application, on_delete=models.SET_NULL, null=True, blank=True)
