from rest_framework import serializers
from .models import Document, OCRText
class OCRTextSerializer(serializers.ModelSerializer):
    class Meta: model = OCRText; fields = '__all__'
class DocumentSerializer(serializers.ModelSerializer):
    ocr = OCRTextSerializer(read_only=True)
    class Meta: model = Document; fields = '__all__'
