/**
 * Created by benbentime on 2015/8/11.
 */
mui.init({
	swipeBack:true
});
 // 检测更新
		function checkUpdate(version){
		    plus.nativeUI.showWaiting("检测更新...");
		    var xhr=new XMLHttpRequest();
		    xhr.onreadystatechange=function(){
		        switch(xhr.readyState){
		            case 4:
		            plus.nativeUI.closeWaiting();
		            if(xhr.status==200){
		                console.log("检测更新成功："+xhr.responseText);
		                var newVer=JSON.parse(xhr.responseText);
		                if(newVer.code == 1){
		                	console.log("1")
		                    downWgt(newVer.add)  // 下载升级包
		                }else if(newVer.code == 0){
		                	plus.nativeUI.toast("已经是最新了~~");
		                }
		            }else{
		                console.log("检测更新失败！");
		            }
		            break;
		            default:
		            break;
		        }
		    }
		    xhr.open('GET',"http://lovelog.zhouxianbao.cn/check.php?version="+version);
		    xhr.send();
		}
		// 下载wgt文件
		function downWgt(wgtUrl){
		    plus.nativeUI.showWaiting("下载wgt文件...");
		    console.log(wgtUrl);
		    plus.downloader.createDownload( wgtUrl, {method:'GET',filename:"update/"}, function(d,status){
		        if ( status == 200 ) { 
		            console.log("下载wgt成功："+d.filename);
		            installWgt(d.filename); // 安装wgt包
		        } else {
		            console.log("下载wgt失败！");
		            plus.nativeUI.alert("下载wgt失败！");
		        }
		        plus.nativeUI.closeWaiting();
		    }).start();
		}
		// 更新应用资源
		function installWgt(path){
		    plus.nativeUI.showWaiting("安装wgt文件...");
		    plus.runtime.install(path,{},function(){
		        plus.nativeUI.closeWaiting();
		        console.log("安装wgt文件成功！");
		        plus.nativeUI.alert("应用资源更新完成！",function(){
		            plus.runtime.restart();
		        });
		    },function(e){
		        plus.nativeUI.closeWaiting();
		        console.log("安装wgt文件失败["+e.code+"]："+e.message);
		        plus.nativeUI.alert("安装wgt文件失败["+e.code+"]："+e.message);
		    });
		}
	
//分享
function outLine(err){
	plus.nativeUI.toast(err);
}
function shareAction(s, ex) {
    outLine("分享操作：");
    if (!s) {
        outLine("无效的分享服务！");
        return;
    }
    
    if (s.authenticated) {
        outLine("---已授权---");
        shareMessage(s, ex);
    } else {
        outLine("---未授权---");
        s.authorize(function() {
            shareMessage(s, ex);
        }, function(e) {
            outLine("认证授权失败：" + e.code + " - " + e.message);
        });
    }
}
function shareMessage(s,ex){
    var msg={
    	content:"这个软件好好用啊，我已经记录好多东西",
    	href:"http://lovelog.zhouxianbao.cn",
    	title:"事件倒计时软件",
    	pictures:['../img/app_icon.png'],
    	thumbs:['../img/app_icon.png'],
    	extra:{scene:ex}
    	};
    	var pic ;
    	if(pic&&pic.realUrl){
        	msg.pictures=[pic.realUrl];
    	}
    s.send( msg, function(){
        alert( "分享到\""+s.description+"\"成功！ " );
    }, function(e){
        alert( "分享到\""+s.description+"\"失败: "+e.code+" - "+e.message );
    } );
}
function cancelAuth(){try{

    for ( var i in shares ) {
        var s = shares[i];
        if ( s.authenticated ) {
            outLine( "取消\""+s.description+"\"");
        }
        s.forbid();
    }
    // 取消授权后需要更新服务列表
    updateServices();
    outLine( "操作成功！" );}catch(e){alert(e);}
}
function shareClose(){

		$(".share_main").hide();
		
}
mui.plusReady(function(){
	$("#update").on("tap", function(){
	//检测版本是否是最新的
		 plus.runtime.getProperty(plus.runtime.appid,function(inf){
	        wgtVer=inf.version;
	      	checkUpdate(wgtVer);
	    });
	   });
	
	$("#main_add").on('tap', function () {
	  	mui.openWindow({
    		url: 'addBox.html', 
    		id:'addBox',
    		 styles:{
		        top:'45px',//子页面顶部位置
		        bottom:'45px'//子页面底部位置
      		},
      		show:{
      			duration:'200',
      			aniShow:'fade-in',
      		},
      		waiting:{
		      title:'正在加载...'//等待对话框上显示的提示内容
      		},
      		options:{
      			width:'100%',
      			height:'100%'
      		}
    	})
    });
    $("#home").on('tap', function(){
    	mui.openWindow({
    		url :'main.html',
    		id:'main',
      		show:{
      			aniShow:'pop-in'
      		},
      		createNew:false,
      		waiting:{
		      title:'正在加载...'//等待对话框上显示的提示内容
		      },
      		options:{
      			width:'100%',
      			height:'100%'
      		}
    	})
    });
	
	//分享	
	
	$("#share").on("tap", function(){
		$(".share_main").show();
		plus.share.getServices(function(ss) {
		    var list = $(".share_list");
		    list.html(" ");
		    for (var i in ss ) {
		        var s = ss[i];
		        var item = document.createElement("li");
		        item.setAttribute("class", "mui-table-view-cell");
		        item.setAttribute("onclick",   "shareAction(this.plusShare)");
		        item.innerText = s.description;
		        item.plusShare = s;
		        list.append(item);
    		}
		}, function(e) {
		    alert("获取分享服务列表失败：" + e.message);
		});
	
	});

	
	//
	var first = null;
	mui.back = function() {
			//首次按键，提示‘再按一次退出应用’
			if (!first) {
				first = new Date().getTime();
				mui.toast('再按一次退出应用');
				setTimeout(function() {
					first = null;
				}, 1000);
			} else {
				if (new Date().getTime() - first < 1000) {
					plus.runtime.quit();
				}
			}
	};
	//初始化
	var localUsername = localStorage.getItem("token") || "";  
	var usernameMD5 = plus.device.uuid;
	localStorage.setItem("token", usernameMD5);
	//盒子模型
	require(['FFF', 'zepto'], function (FFF, $) {
	var F = FFF.FFF;
	var Widget = F.Widget;
	
	function Box(){
	    Widget.apply(this, arguments);
	}
	Box.ATTRS = {
		boundingBox: {
	            value: $('<div class="box"></div>')
	        },
	        boxDay:{
	            value:''
	        },
	        boxInfo:{
	            value:''
	        },
	        
	        boxID:{
	            value:''
	        },
	        boxType:{
	        	value:''
	        }
	};    
	
		 F.extend(Box, Widget, {
	        initialize: function (obj) {
	            if(obj.boxInfo.trim()  != ""){
		            var nowDay = new Date(),dayNum;
		            var nowTime = nowDay.getTime();
		            if(nowTime > obj.boxDay){
		            	 dayNum = parseInt((nowTime- obj.boxDay) / 86400000);
		            	 this.setBoxType('过去');
		            }else{
		            	dayNum = parseInt((obj.boxDay - nowTime) / 86400000);
		            	 this.setBoxType('未来');
		            }
		            this.setBoxDay(dayNum);
	            	this.setBoxInfo(obj.boxInfo);
		         	this.setBoxID(obj.boxId);
	            }else{
	            	mui.nativeUI.toast("请按照提示输入时间")
	            }
	        },
	        renderUI: function () {
	            var that = this;
	            var box = that.getBoundingBox();
	            var boxTime = $('<div class="box_time"><span class="box_day_num"></span><span class="box_day_name">天</span></div>');
	            var boxInfo = $('<div class="box_event"></div>');
	            var boxDel = $('<div class="box_del">X</div>');
	            var boxType = $("<div class='box_type'></div>")
	            boxTime.find(".box_day_num").text(that.getBoxDay());
	            boxInfo.text(that.getBoxInfo());
	            //console.log(that.getBoxInfo())
	            if(that.getBoxType() == "未来"){
	            	boxType.html('<span class="mui-badge mui-badge-primary " id="box_type">'+that.getBoxType()+'</span>');
	            }else if(that.getBoxType() == "过去"){
	            	boxType.html('<span class="mui-badge mui-badge-success " id="box_type">'+that.getBoxType()+'</span>');
	            }
	            box.append(boxTime);
	            box.append(boxType);
	            box.append(boxInfo);
	            box.append(boxDel);
	           
	        },
	        bindUI: function () {
	            var that = this;
	            var box  = that.getBoundingBox();
	            box.find('.box_del').on("tap", function () {
	            	var boxId = that.getBoxID();
	            	plus.nativeUI.confirm("确认删除？",function(e){
		            	if(e.index == 0){
		            		var newUsername = localStorage.getItem("token");
		            		var ref = new Wilddog("ttps://lovelog.wilddogio.com/boxList/"+newUsername+"/" +that.getBoxID());
		            		ref.remove();
		            		
		            		box.remove();
		            		plus.nativeUI.toast("删除成功")
		            	}else if(e.index == 1){
		            		plus.nativeUI.toast("取消")
		            	}
	            	},"警告",["确定","取消"]);
	               
	            })
	        }
	    });
	    
	    
	  	
	  	//实例盒子
	  	var newUsername = localStorage.getItem("token");
	  	plus.nativeUI.showWaiting("正在加载你的数据")
		var rootRef = new Wilddog('https://lovelog.wilddogio.com/boxList/'+newUsername);
		rootRef.on("value",function(snapshot){
			var value = snapshot.val();
			if(value){}
			else{
				plus.nativeUI.toast("点击下面的按钮，新建一个")
				plus.nativeUI.closeWaiting()
			}
		}, function(err){
			console.log("The read failed: " + errorObject.code);
			plus.nativeUI.closeWaiting()
		})
		
		rootRef.on("child_added",function(snapshot){
			plus.nativeUI.closeWaiting()
			var value = snapshot.val();
				//console.log(all)
			if(value){
				//console.log(snapshot.key());
				var box = new Box({
				   	boxDay: value.eventTime,
			        boxInfo:value.eventName,
			        boxId:snapshot.key()
				});
				box.render({
				   	container: $("#box_contain"),
		            type:'append'
				});
			}else{
				
				plus.nativeUI.toast("点击下面的按钮，新建一个")
			}
		}, function(err){
			console.log("The read failed: " + errorObject.code);
			plus.nativeUI.closeWaiting()
		})	;
		
});
});
