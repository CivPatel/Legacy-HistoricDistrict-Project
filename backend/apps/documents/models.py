from django.db import models
from django.contrib.auth import get_user_model
from apps.properties.models import Property
class Document(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name='documents')
    uploaded_by = models.ForeignKey(get_user_model(), on_delete=models.SET_NULL, null=True, blank=True)
    file = models.FileField(upload_to='documents/')
    doc_type = models.CharField(max_length=100, blank=True)
    source = models.CharField(max_length=100, blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)
class OCRText(models.Model):
    document = models.OneToOneField(Document, on_delete=models.CASCADE, related_name='ocr')
    text = models.TextField(blank=True)
    confidence = models.FloatField(default=0)
