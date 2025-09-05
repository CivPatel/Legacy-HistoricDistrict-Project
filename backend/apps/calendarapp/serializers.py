from rest_framework import serializers
from .models import CalendarEvent, EventLink
class CalendarEventSerializer(serializers.ModelSerializer):
    class Meta: model = CalendarEvent; fields = '__all__'
class EventLinkSerializer(serializers.ModelSerializer):
    class Meta: model = EventLink; fields = '__all__'
