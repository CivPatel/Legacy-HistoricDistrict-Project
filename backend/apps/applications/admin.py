from django.contrib import admin
from .models import Application, ApplicationAttachment, ApplicationLog
for m in (Application, ApplicationAttachment, ApplicationLog):
    admin.site.register(m)