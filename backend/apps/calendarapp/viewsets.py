from rest_framework import viewsets
from .models import CalendarEvent, EventLink
from .serializers import CalendarEventSerializer, EventLinkSerializer
class CalendarEventViewSet(viewsets.ModelViewSet):
    queryset = CalendarEvent.objects.all().order_by('start')
    serializer_class = CalendarEventSerializer
class EventLinkViewSet(viewsets.ModelViewSet):
    queryset = EventLink.objects.all()
    serializer_class = EventLinkSerializer
