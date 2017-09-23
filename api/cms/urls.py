#coding:utf-8


from django.conf.urls import url,include

from api.cms import views

urlpatterns = [
    url(r'^$',views.index,name='cms_index'),
    url(r'^login/$',views.cms_login,name='cms_login'),
    url(r'^logout/$',views.cms_logout,name='cms_logout'),
    url(r'addarticle/$',views.add_article,name='cms_addarticle'),
    url(r'settings/$',views.settings,name='cms_settings'),
    url(r'test/$',views.test)
]

