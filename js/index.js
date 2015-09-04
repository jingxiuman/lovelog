requirejs.config({
	paths: {
		zepto : 'lib/zepto_1.1.3',
		muiMain: 'lib/mui.min',
		app : 'app'
	},
	shim:{
		'app':['muiMain']
	}
});
/*
 * 首页
 */
require(['muiMain', 'app'],function(){
	mui.init();
	mui.plusReady(function(){
		if(app.getState().token){
			var lognBtn = document.getElementById("loginBtn"),
			username = document.getElementById("username"), 
			password = document.getElementById("password");
			loginBtn.addEventListener('tap', function(){
				if(app.getState().token){
					var loginInfo = {
						username : username.value,
						password : password.value
					};
					app.login(loginInfo, function(err){
						if(err){
							plus.nativeUI.toast(err);
							app.setState()
							return ;
						}
					})
				}else{
					plus.nativeUI.toast("已经登陆了！")
					mui.openWindow({
						url:'main.html',
						id:'main'
					})
				}
			})
		}else{
			plus.nativeUI.toast("已经登陆了！")
			mui.openWindow({
				url:'main.html',
				id:'main'
			})
		}
	})
})