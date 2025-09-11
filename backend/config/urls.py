
# MAP OF THE BACKEND
# URLS — the map for the backend.
# Each path leads to a view (a function/class that does work).
# URLS — the GPS/map of the backend.
# Each entry says: "When someone asks for THIS path, send them to THAT view."
# Example: /api/properties/  -> PropertyListView (returns JSON list of all properties)
# Example: /api/properties/2/ -> PropertyDetailView (returns details for one property)
# Without this map, Django wouldn’t know which code to run when someone knocks on the door.

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import RedirectView

urlpatterns = [
    path('', RedirectView.as_view(url='/api/', permanent=False)),
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
