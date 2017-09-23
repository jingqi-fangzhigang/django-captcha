from django import forms
from utils.captcha.captcha import Captcha
import json

class LoginForm(forms.Form):
    username = forms.CharField(max_length=10,min_length=4)
    password = forms.CharField(max_length=20,min_length=6)
    captcha = forms.CharField(min_length=4,max_length=4)
    remember = forms.BooleanField(required=False)

    def clean_captcha(self):
        captcha = self.cleaned_data.get('captcha',None)
        print (captcha)
        if Captcha.check_captcha(captcha):
            return self.cleaned_data
        else:
            print ('captche is fault')
            raise forms.ValidationError('captcha errors')

    def get_error(self):
        errors = self.errors.as_join()
        error_dict = json.loads(errors)
        message = ''
        for k,v in error_dict.items():
            message = v[0].get('message',None)

        return message