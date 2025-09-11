from django.contrib import admin
from django.urls import path, include

from .models import Property, Address, Photo, Flag, PropertyOwner, PropertyTenant
for m in (Property, Address, Photo, Flag, PropertyOwner, PropertyTenant):


    # remove
    admin.site.register(m)
    urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("api.urls")), 
]
# remove