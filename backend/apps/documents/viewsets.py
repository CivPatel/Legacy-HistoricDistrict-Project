from rest_framework import viewsets, decorators, response, status
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Document, OCRText
from .serializers import DocumentSerializer, OCRTextSerializer
class DocumentViewSet(viewsets.ModelViewSet):
    queryset = Document.objects.all().order_by('-uploaded_at')
    serializer_class = DocumentSerializer
    parser_classes = (MultiPartParser, FormParser)
    @decorators.action(detail=True, methods=['post'])
    def ocr(self, request, pk=None):
        doc = self.get_object()
        ocr, _ = OCRText.objects.get_or_create(document=doc)
        ocr.text = ocr.text or "OCR pending / stub result"
        ocr.confidence = max(ocr.confidence, 0.5)
        ocr.save()
        return response.Response(OCRTextSerializer(ocr).data, status=status.HTTP_202_ACCEPTED)
    @decorators.action(detail=False, methods=['post'], url_path='upload')
    def upload(self, request):
        serializer = DocumentSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        doc = serializer.save()
        return response.Response(DocumentSerializer(doc).data, status=status.HTTP_201_CREATED)
class OCRTextViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = OCRText.objects.all()
    serializer_class = OCRTextSerializer
