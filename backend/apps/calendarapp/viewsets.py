from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import CalendarEvent, EventLink
from .serializers import CalendarEventSerializer, EventLinkSerializer

class CalendarEventViewSet(viewsets.ModelViewSet):
    queryset = CalendarEvent.objects.all().order_by('start')
    serializer_class = CalendarEventSerializer
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter, filters.SearchFilter]
    filterset_fields = ['is_public', 'property']
    ordering_fields = ['start']
    search_fields = ['title', 'description']

class EventLinkViewSet(viewsets.ModelViewSet):
    queryset = EventLink.objects.all()
    serializer_class = EventLinkSerializer
