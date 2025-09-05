from rest_framework import viewsets, filters, decorators, response
from .models import Property, Address, Photo, Flag
from .serializers import PropertySerializer, AddressSerializer, PhotoSerializer, FlagSerializer
class PropertyViewSet(viewsets.ModelViewSet):
    queryset = Property.objects.all().order_by('display_name')
    serializer_class = PropertySerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['display_name', 'description', 'addresses__line1']
    @decorators.action(detail=True, methods=['get'])
    def documents(self, request, pk=None):
        from apps.documents.models import Document
        from apps.documents.serializers import DocumentSerializer
        docs = Document.objects.filter(property_id=pk).order_by('-uploaded_at')
        return response.Response(DocumentSerializer(docs, many=True).data)
    @decorators.action(detail=True, methods=['get'])
    def events(self, request, pk=None):
        from apps.calendarapp.models import CalendarEvent
        from apps.calendarapp.serializers import CalendarEventSerializer
        evs = CalendarEvent.objects.filter(property_id=pk).order_by('start')
        return response.Response(CalendarEventSerializer(evs, many=True).data)
class AddressViewSet(viewsets.ModelViewSet):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer
class PhotoViewSet(viewsets.ModelViewSet):
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer
class FlagViewSet(viewsets.ModelViewSet):
    queryset = Flag.objects.all()
    serializer_class = FlagSerializer
