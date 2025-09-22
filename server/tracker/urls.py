from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include("base.urls")),

    # accounts url and api routes
    path('', include("accounts.urls")),
    path('api/accounts/', include('accounts.api.urls')),  # include your API URLs

    # todo url and api routes
    path('todo/', include("todos.urls")),
    path('api/todo/', include("todos.api.urls")),

    # contacts url and api routes
    path('contact/', include("contacts.urls")),
    path('api/contact/', include("contacts.api.urls")),

    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
if settings.DEBUG:
    # Include django_browser_reload URLs only in DEBUG mode
    urlpatterns += [
        path("__reload__/", include("django_browser_reload.urls")),
    ]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
