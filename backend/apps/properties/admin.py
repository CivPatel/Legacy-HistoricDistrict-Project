from django.contrib import admin
from .models import Property, Address, Photo, Flag, PropertyOwner, PropertyTenant
for m in (Property, Address, Photo, Flag, PropertyOwner, PropertyTenant):
    admin.site.register(m)
