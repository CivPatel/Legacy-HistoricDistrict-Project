"""
SERIALIZERS — turn Python objects into JSON (and back).
They decide which fields appear in the API.
Example: PropertySerializer shows name, address, photos, etc.
"""



from rest_framework import serializers
from .models import Application, ApplicationAttachment, ApplicationLog
class ApplicationLogSerializer(serializers.ModelSerializer):
    class Meta: model = ApplicationLog; fields = '__all__'
class ApplicationAttachmentSerializer(serializers.ModelSerializer):
    class Meta: model = ApplicationAttachment; fields = '__all__'
class ApplicationSerializer(serializers.ModelSerializer):
    attachments = ApplicationAttachmentSerializer(many=True, read_only=True)
    logs = ApplicationLogSerializer(many=True, read_only=True)
    class Meta: model = Application; fields = '__all__'
