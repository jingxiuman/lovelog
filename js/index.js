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
define(['muiMain', 'app'],function(){
	mui.init();
	var lognBtn = document.getElementById("loginBtn"),username = document.getElementById("username"), password = document.getElementById("password");
	loginBtn.addEventListener('tap', function(){
		var loginInfo = {
			username : username.value,
			password : password.value
		};
		app.login(loginInfo, function(err){
			if(err){
				plus.nativeUI.toast(err);
				return ;
			}
			
		})
	})
})