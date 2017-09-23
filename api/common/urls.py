from django.conf.urls import url,include
from api.common import views

urlpatterns = [
    url(r'^captcha/',views.captcha,name='common_captcha')
]