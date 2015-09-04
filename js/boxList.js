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
        }
    };

    F.extend(Box, Widget, {
        initialize: function (obj) {
            if(obj.boxDay.length <= 10 && obj.boxDay.length>=8 && obj.boxInfo.trim()  != ""){
            	var day = new Date(obj.boxDay);
	            var nowDay = new Date();
	            var dayNum = parseInt((nowDay.getTime() - day.getTime()) / 86400000);
	            this.setBoxDay(dayNum);
            	this.setBoxInfo(obj.boxInfo);
	         
            }else{
            	plus.nativeUI.toast("请按照提示输入时间")
            }
        },
        renderUI: function () {
            var that = this;
            var box = that.getBoundingBox();
            var boxTime = $('<div class="box_time"><span class="box_day_num"></span><span class="box_day_name">天</span></div>');
            var boxInfo = $('<div class="box_event"></div>');
            var boxDel = $('<div class="box_del">X</div>');
            boxTime.find(".box_day_num").text(that.getBoxDay());
            boxInfo.text(that.getBoxInfo());
            //console.log(that.getBoxInfo());
            box.append(boxTime);
            box.append(boxInfo);
            box.append(boxDel)
        },
        bindUI: function () {
            var that = this;
            var box  = that.getBoundingBox();
            box.find('.box_del').on("tap", function () {
                box.remove();
            })
        }
    });
    var boxList = JSON.parse(localStorage.getItem("boxList"));
	boxList.forEach(function(value){
		console.log(value)
		var box = new box(value);
		box.render({
			   container: $("#box_contain"),
	            type:'append'
		})
		
	})
/* var eventName = $("#eventName"),eventTime = $("#eventTime");
        if(eventName.val().trim().length < 7 && eventTime.val().trim().length >=8 && eventTime.val().trim().length <=10  &&eventName.val().trim().length>0){
        		var box = new Box({
		            boxDay: eventTime.val().trim(),
		            boxInfo:eventName.val().trim()
        		});
        	  box.render({
	            container: $("#box_contain"),
	            type:'append'
        	});
        }else {
        	plus.nativeUI.toast("按照提示格式输入")
        }*/
});