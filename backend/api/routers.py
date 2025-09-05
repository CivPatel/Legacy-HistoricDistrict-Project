from rest_framework.routers import DefaultRouter
from apps.people.viewsets import OwnerViewSet, TenantViewSet
from apps.properties.viewsets import PropertyViewSet, AddressViewSet, PhotoViewSet, FlagViewSet
from apps.documents.viewsets import DocumentViewSet, OCRTextViewSet
from apps.applications.viewsets import ApplicationViewSet, ApplicationAttachmentViewSet, ApplicationLogViewSet
from apps.calendarapp.viewsets import CalendarEventViewSet, EventLinkViewSet
from apps.searchapp.views import UnifiedSearchViewSet

router = DefaultRouter()
router.register(r'owners', OwnerViewSet)
router.register(r'tenants', TenantViewSet)
router.register(r'properties', PropertyViewSet)
router.register(r'addresses', AddressViewSet)
router.register(r'photos', PhotoViewSet)
router.register(r'flags', FlagViewSet)
router.register(r'documents', DocumentViewSet, basename='documents')
router.register(r'ocrtexts', OCRTextViewSet)
router.register(r'applications', ApplicationViewSet)
router.register(r'app_attachments', ApplicationAttachmentViewSet)
router.register(r'app_logs', ApplicationLogViewSet)
router.register(r'events', CalendarEventViewSet)
router.register(r'event_links', EventLinkViewSet)
router.register(r'search', UnifiedSearchViewSet, basename='search')
