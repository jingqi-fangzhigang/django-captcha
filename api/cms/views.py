#!/usr/bin/env python3
#_*_ coding:utf-8 _*_

from django.contrib.auth.models import User
from django.contrib.auth import authenticate,login,logout
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse,JsonResponse
from api.cms.forms import LoginForm
from django.shortcuts import render,redirect,reverse
from django.core.cache import cache


def cms_login(request):
    if request.method == 'GET':
        return render(request,'cms_login.html')
    else:
        form = LoginForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username',None)
            password = form.cleaned_data.get('password',None)
            remember = form.cleaned_data.get('remember',None)
            user = authenticate(username=username,password=password)
            if user:
                login(request,user)

                if remember:
                    request.session.set_expiry(None)
                else:
                    request.session.set_expiry(0)

                nexturl = request.GET.get('next')
                if nexturl:
                    return redirect(nexturl)
                else:
                    return redirect(reverse('cms_index'))
            else:
                return render(request,'cms_login.html',{'error':'username or password fault !'})

        else:
            return render(request,'cms_login.html',{'error':form.errors})

def cms_logout(request):
    logout(request)
    return redirect(reverse('cms_login'))

@login_required
def index(request):
    return render(request,'cms_index.html')


@login_required
def add_article(request):
	if request.method == 'GET':
		return render(request,'cms_addarticle.html')
	else:
		return HttpResponse('xxx')

def settings(request):
	# 1. 可以修改用户名
	# 2. 可以修改头像
	# 3. 可以修改邮箱
	return render(request,'cms_settings.html')

def test(request):
	cache.clear()
	return HttpResponse('success')