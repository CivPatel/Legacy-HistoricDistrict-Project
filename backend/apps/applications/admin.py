
"""
ADMIN — registers models so they show up in Django Admin.
add list_display, search_fields to make admin nicer.  yet to do this
"""
from django.contrib import admin
from .models import Application, ApplicationAttachment, ApplicationLog
for m in (Application, ApplicationAttachment, ApplicationLog):
    admin.site.register(m)