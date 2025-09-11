from rest_framework import serializers
from .models import Property, Address, Photo, Flag, PropertyOwner, PropertyTenant
class AddressSerializer(serializers.ModelSerializer):
    class Meta: model = Address; fields = '__all__'


class PhotoSerializer(serializers.ModelSerializer):
    class Meta: model = Photo; fields = '__all__'



class FlagSerializer(serializers.ModelSerializer):
    class Meta: model = Flag; fields = '__all__'
class PropertyOwnerSerializer(serializers.ModelSerializer):
    class Meta: model = PropertyOwner; fields = '__all__'
class PropertyTenantSerializer(serializers.ModelSerializer):
    class Meta: model = PropertyTenant; fields = '__all__'



class PropertySerializer(serializers.ModelSerializer):
    addresses = AddressSerializer(many=True, read_only=True)
    photos = PhotoSerializer(many=True, read_only=True)
    flags = FlagSerializer(many=True, read_only=True)
    class Meta: model = Property; fields = '__all__'
