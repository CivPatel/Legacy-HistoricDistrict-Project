from rest_framework import viewsets, decorators, response
from django.utils import timezone
from .models import Application, ApplicationAttachment, ApplicationLog
from .serializers import ApplicationSerializer, ApplicationAttachmentSerializer, ApplicationLogSerializer
class ApplicationViewSet(viewsets.ModelViewSet):
    queryset = Application.objects.all().order_by('-created_at')
    serializer_class = ApplicationSerializer
    @decorators.action(detail=True, methods=['post'])
    def autosend(self, request, pk=None):
        app = self.get_object()
        if app.status == 'DRAFT':
            app.status = 'SUBMITTED'
            app.submitted_at = timezone.now()
            app.save()
            ApplicationLog.objects.create(application=app, action='AUTOSEND', actor=request.user if request.user.is_authenticated else None, note='Auto-sent stub.')
        return response.Response(ApplicationSerializer(app).data)
class ApplicationAttachmentViewSet(viewsets.ModelViewSet):
    queryset = ApplicationAttachment.objects.all()
    serializer_class = ApplicationAttachmentSerializer
class ApplicationLogViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ApplicationLog.objects.all().order_by('-at')
    serializer_class = ApplicationLogSerializer
