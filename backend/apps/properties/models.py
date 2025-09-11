"""
MODELS — the shapes of our data.
Each model = one table in the database.
Example: Property(name, address, year_built, ...)
If you add/change a field:
  1) python manage.py makemigrations
  2) python manage.py migrate
"""

from django.db import models
class Property(models.Model):
    display_name = models.CharField(max_length=200)
    built_year = models.IntegerField(null=True, blank=True)
    description = models.TextField(blank=True)
    status = models.CharField(max_length=50, default='ACTIVE')
    def __str__(self): return self.display_name
class Address(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name='addresses')
    line1 = models.CharField(max_length=255)
    line2 = models.CharField(max_length=255, blank=True)
    city = models.CharField(max_length=100, default='Hammond')
    state = models.CharField(max_length=2, default='IN')
    zip = models.CharField(max_length=10, blank=True)
    geocode_lat = models.FloatField(null=True, blank=True)
    geocode_lng = models.FloatField(null=True, blank=True)
    def __str__(self): return f"{self.line1}, {self.city} {self.state}"
class PropertyOwner(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name='property_owners')
    owner = models.ForeignKey('people.Owner', on_delete=models.CASCADE)
    role = models.CharField(max_length=50, blank=True)
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)
class PropertyTenant(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name='property_tenants')
    tenant = models.ForeignKey('people.Tenant', on_delete=models.CASCADE)
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)
class Photo(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name='photos')
    file = models.ImageField(upload_to='photos/')
    caption = models.CharField(max_length=255, blank=True)
    taken_at = models.DateField(null=True, blank=True)
class Flag(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name='flags')
    key = models.CharField(max_length=50)
    value = models.CharField(max_length=100, blank=True)
    color = models.CharField(max_length=16, blank=True)
