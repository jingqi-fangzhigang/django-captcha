
//获取cookie的方法
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


'use strict';
$(function() {
	var domain = 'http://owoh9jf3t.bkt.clouddn.com/';   //huadong

	var uploader = Qiniu.uploader({
		runtimes: 'html5,flash,html4', //上传模式，依次退化
		browse_button: 'pickfiles', //上传选择的点选按钮，必须
		container: 'container',	//上传区域DOM的ID，默认是browse_button的父元素
		drop_element: 'container', //拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
		max_file_size: '500mb', //文件最大允许的尺寸
		dragdrop: true, //是否开启拖拽上传
		chunk_size: '4mb', //分块上传时，每片的大小
		uptoken_url: '/cms/get_token/', //ajax请求token的url
		domain: domain, //图片下载时候的域名
		get_new_uptoken: false, //是否每次上传文件都要从业务服务器获取token
		auto_start: true, //是否自动上传
		log_level: 5, //log级别
		init:{
			'FilesAdded': function(up,files) {
				console.log('file added');
			},
			'BeforeUpload': function(up,file) {
				console.log('before upload');
			},
			'UploadProgress': function() {
				console.log('upload progress');
			},
			'FileUploaded': function(up,file,info) {
				console.log('file uploaded-----------');
				//发送文件名到服务器
				var avatar = domain + file.name;
				var username = $('.username-input').val();
				$.ajax({
					'url': '/cms/update_profile/',
					'method': 'post',
					'data': {
						'username': username,
						'avatar': avatar
					},
					'success': function(data) {
						console.log(data);
					},
					'error': function(error) {
						console.log(error);
					},
					'beforeSend':function(xhr,settings) {
						var csrftoken = getCookie('csrftoken');
						//2.在header当中设置csrf_token的值
						xhr.setRequestHeader('X-CSRFToken',csrftoken);
					}
				});
			},
			'Error': function(up,err,errTip) {
				console.log('error:'+err);
			}
		},
	});
});

$(function() {
	$('.submit-btn').click(function(event) {
		event.preventDefault();
		var pic = $('.avatar-input').val()
		var username = $('.username-input').val();
		if(pic){
			// 1. 先从业务服务器获取token
			// 2. 然后拿到token再上传图片
			// upload_pic();
		}else{
			// 说明客户端没有修改图片
			// 此时直接修改用户名就可以了
			$.ajax({
				'url': '/cms/update_profile/',
				'method': 'post',
				'data':{
					'username': username
				},
				'success': function(data) {
					if(data['code'] == 200){
						var alert = $('.alert-success');
						alert.html('更新成功');
						alert.show();
					}
				},
				'error': function(error) {
					console.log(error);
				},
				'beforeSend':function(xhr,settings) {
					var csrftoken = getCookie('csrftoken');
					//2.在header当中设置csrf_token的值
					xhr.setRequestHeader('X-CSRFToken',csrftoken);
				}
			});
		}
	});
});