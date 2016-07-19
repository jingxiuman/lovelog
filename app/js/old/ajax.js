

require(['FFF', 'zepto'], function (FFF, $){
	var F = FFF.FFF;
	var base = F.Base;
	
	function boxAjax(){
		 Base.apply(this, arguments);
	}
	boxAjax.ATTRS ={
		boxList:{
			value:''
		}
	}
	F.extend(boxAjax, base, {
		initialise: function(){
			var that = this;
			if(localStorage.getItem("boxList")){
				that.setBoxList(localStorage.getItem("boxList"))
			}
		},
		bind: function(){
			
		},
		send: function(){
			   mui.ajax('http://lovelogapi.zhouxianbao.cn/api.php', {
	            	data:{
	            		boxDay: obj.boxDay,
	            		boxInfo: obj.boxInfo,
	            		type:'addBox'
	            	},
	            	type:'post',
	            	dataType: 'text',
	            	success:function(data){
	            		if(data.code == 101){
            				plus.nativeUI.toast("保存到远端成功")
	            		}else if(data.code == 100){
	            			plus.nativeUI.toast("保存到远端失败");
	            		}else if(data.code == 105){
	            			plus.nativeUI.toast("该事件已经在远端存在了")
	            		}else if(data.code == 103){
	            			plus.nativeUI.toast("登陆时间超时了，请重新登陆");
	            			mui.openWindow('index.html');
	            		}else if(data.code == 102){
	            			plus.nativeUI.toast("请重新登陆");
	            			mui.openWindow("index.html");
	            		}
	            	},
	            	error: function (xhr,type,errorThrown){
	            		console.log(type,xhr,errorThrown);
	            	}
	            })
		}
	})
	
})