from django.conf.urls import patterns, include, url, handler404
from django.conf import settings
from django.conf.urls.static import static


#handler404 = 'apps.site.views.error_404'

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # index:
    url(r'^$', 'apps.site.views.index', name='index'),

    url(r'^login/$', 'apps.user.views.login', name='login'),

    # Uncomment the next line to enable the admin:
    #url(r'^admin/', include(admin.site.urls)),

    # models url:
    #url(r'^article/(?P<url>.*)$', 'apps.article.views.controller'),
    #url(r'^portfolio/(?P<url>.*)$', 'apps.portfolio.views.controller'),
    #url(r'^types_services/(?P<url>.*)$', 'apps.types_services.views.controller'),
    #url(r'^feedback/(?P<url>.*)$', 'apps.feedback.views.controller'),
    #url(r'^uploads/(?P<module>\w+)/(?P<id>\d+)/$', 'apps.upload.views.controller'),


) + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)


urlpatterns += patterns('',
                        url(r'^media/(?P<path>.*)$',
                            'django.views.static.serve',
                            {'document_root': settings.MEDIA_ROOT, }),
                        )