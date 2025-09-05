from django.db import models
from django.contrib.auth import get_user_model
from apps.properties.models import Property
from apps.documents.models import Document
class Application(models.Model):
    STATUS_CHOICES = [('DRAFT','DRAFT'),('SUBMITTED','SUBMITTED'),('SCHEDULED','SCHEDULED'),('DECIDED','DECIDED')]
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name='applications')
    application_type = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    submitted_at = models.DateTimeField(null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='DRAFT')
    assigned_to = models.ForeignKey(get_user_model(), on_delete=models.SET_NULL, null=True, blank=True)
    external_ref = models.CharField(max_length=200, blank=True)
class ApplicationAttachment(models.Model):
    application = models.ForeignKey(Application, on_delete=models.CASCADE, related_name='attachments')
    document = models.ForeignKey(Document, on_delete=models.CASCADE)
class ApplicationLog(models.Model):
    application = models.ForeignKey(Application, on_delete=models.CASCADE, related_name='logs')
    action = models.CharField(max_length=100)
    actor = models.ForeignKey(get_user_model(), on_delete=models.SET_NULL, null=True, blank=True)
    note = models.TextField(blank=True)
    at = models.DateTimeField(auto_now_add=True)
