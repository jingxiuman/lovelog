/**
 * 演示程序当前的 “注册/登录” 等操作，是基于 “本地存储” 完成的
 * 当您要参考这个演示程序进行相关 app 的开发时，
 * 请注意将相关方法调整成 “基于服务端Service” 的实现。
 **/
(function($, owner) {
	/**
	 * 用户登录
	 **/
	owner.login = function(loginInfo, callback) {
		callback = callback || $.noop;
		loginInfo = loginInfo || {};
		loginInfo.username = loginInfo.username || '';
		loginInfo.password = loginInfo.password || '';
		if (loginInfo.username.length < 5) {
			return callback('账号最短为 5 个字符');
		}
		if (loginInfo.password.length < 6) {
			return callback('密码最短为 6 个字符');
		}
		if(loginInfo.username.length == 0 || loginInfo.password.length == 0){
			return callback("账号和密码不能为空")
		}
		/*var users = JSON.parse(localStorage.getItem('$users') || '[]');
		var authed = users.some(function(user) {
			return loginInfo.account == user.account && loginInfo.password == user.password;
		});
		if (authed) {
			return owner.createState(loginInfo.account, callback);
		} else {
			return callback('用户名或密码错误');
		}*/
		//console.log(loginInfo.username,loginInfo.password)
		mui.ajax('http://lovelogapi.zhouxianbao.cn/api.php',{
			data: {
				username : loginInfo.username,
				password : loginInfo.password,
				type:'login'
			},
			type:'post',
			dataType: 'json',
			success: function(data){
				if(data == 101 ){
					owner.createState()
					callback("登陆成功");
					mui.openWindow({
						url:'main.html',
						id: 'main',
						 show:{
      						autoShow:true,//页面loaded事件发生后自动显示，默认为true
      						aniShow:"slide-in-right",//页面显示动画，默认为”slide-in-right“；
      						duration:"100"//页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
    					},
    					waiting:{
      autoShow:true,//自动显示等待框，默认为true
      title:'正在加载...',//等待对话框上显示的提示内容
      options:{
        width:'100%',//等待框背景区域宽度，默认根据内容自动计算合适宽度%
        height:'100%',//等待框背景区域高度，默认根据内容自动计算合适高度
    
      }
    }
					})
				}else if(data == 100){
					callback("用户名或密码错误");
				}else if(data == 102){
					callback("用户名和密码不为空");
				}
			}
			
		})

	};

	owner.createState = function(callback) {
		var state = owner.getState();
		state.account = plus.getCookie('14c4b06b824ec593239362517f538b29');
		state.token = plus.getCookie("token");
		owner.setState(state);
		return callback();
	};

	/**
	 * 新用户注册
	 **/
	owner.reg = function(regInfo, callback) {
		callback = callback || $.noop;
		regInfo = regInfo || {};
		regInfo.account = regInfo.account || '';
		regInfo.password = regInfo.password || '';
		if (regInfo.account.length < 5) {
			return callback('用户名最短需要 5 个字符');
		}
		if (regInfo.password.length < 6) {
			return callback('密码最短需要 6 个字符');
		}
		if (!checkEmail(regInfo.email)) {
			return callback('邮箱地址不合法');
		}
		mui.ajax("http://lovelogapi.zhouxianbao.cn/api.php", {
			data:{
				type:'register',
				username: regInfo.account,
				password: regInfo.password,
				email: regInfo.email
			},
			dataType:'json',
			type:'post',
			success: function (data) {
				if(data == 1){
				
					mui.openWindow({
						url:'index.html',
						id: 'index',
						 show:{
      						autoShow:true,//页面loaded事件发生后自动显示，默认为true
      						aniShow:"slide-in-right",//页面显示动画，默认为”slide-in-right“；
      						duration:"100"//页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
    					}
					})	
					return callback("注册成功");
				}else if(data == 0){
					return callback("注册失败")
				}else if(data == 2){
					return callback("该用户已经注册了")
				}
			}
		})
		/*var users = JSON.parse(localStorage.getItem('$users') || '[]');
		users.push(regInfo);
		localStorage.setItem('$users', JSON.stringify(users));*/
		/*return callback();*/
	};
	

	/**
	 * 获取当前状态
	 **/
	owner.getState = function() {
		var stateText = localStorage.getItem('$state') || "{}";
		return JSON.parse(stateText);
	};

	/**
	 * 设置当前状态
	 **/
	owner.setState = function(state) {
		state = state || {};
		
		localStorage.setItem('$state', JSON.stringify(state));
		//var settings = owner.getSettings();
		//settings.gestures = '';
		//owner.setSettings(settings);
	};

	var checkEmail = function(email) {
		email = email || '';
		return (email.length > 3 && email.indexOf('@') > -1);
	};

	/**
	 * 找回密码
	 **/
	owner.forgetPassword = function(email, callback) {
		callback = callback || $.noop;
		if (!checkEmail(email)) {
			return callback('邮箱地址不合法');
		}
		return callback(null, '新的随机密码已经发送到您的邮箱，请查收邮件。');
	};

	/**
	 * 获取应用本地配置
	 **/
	owner.setSettings = function(settings) {
		settings = settings || {};
		localStorage.setItem('$settings', JSON.stringify(settings));
	}

	/**
	 * 设置应用本地配置
	 **/
	owner.getSettings = function() {
		var settingsText = localStorage.getItem('$settings') || "{}";
		return JSON.parse(settingsText);
	}
}(mui, window.app = {}));