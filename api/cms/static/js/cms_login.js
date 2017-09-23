

'use strict';

$(function() {
	$('.captcha-img').click(function() {
		//ajax擅长处理纯文本和json对象
		//对于流媒体不擅长,比较消耗资源
		//只要img的src改变了,就会重新加载图片
		var old_src = $(this).attr('src');
		var src = old_src + '?xx=' + Math.random();//添加随机数，故意制造src发生不同改变
//		var src = old_src;  //写此句不改变src，所以图片不会重新加载，可测试。
//        console.log(src)
		$(this).attr('src',src);
	});
});