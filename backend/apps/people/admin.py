"""
ADMIN — registers models so they show up in Django Admin.
add list_display, search_fields to make admin nicer.
"""

from django.contrib import admin
from .models import Owner, Tenant
admin.site.register(Owner); admin.site.register(Tenant)
