from rest_framework import viewsets, filters
from .models import Owner, Tenant
from .serializers import OwnerSerializer, TenantSerializer
class OwnerViewSet(viewsets.ModelViewSet):
    queryset = Owner.objects.all().order_by('last_name','first_name')
    serializer_class = OwnerSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['first_name','last_name','email','phone']
class TenantViewSet(viewsets.ModelViewSet):
    queryset = Tenant.objects.all().order_by('last_name','first_name')
    serializer_class = TenantSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['first_name','last_name','email','phone']
