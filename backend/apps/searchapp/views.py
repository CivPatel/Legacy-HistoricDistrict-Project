from rest_framework import viewsets, response
from apps.properties.models import Property
from apps.properties.serializers import PropertySerializer
class UnifiedSearchViewSet(viewsets.ViewSet):
    def list(self, request):
        q = request.query_params.get('q', '')
        qs = Property.objects.filter(display_name__icontains=q)[:25] if q else Property.objects.all()[:25]
        return response.Response({"query": q, "properties": PropertySerializer(qs, many=True).data})
