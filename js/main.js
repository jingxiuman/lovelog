/**
 * Created by benbentime on 2015/8/11.
 */
mui.init();
$(function () {
    $("#main_add").on('tap', function () {
        $('.main_mask').show()
    });
    $("#save_btn").on("click", function () {
        $(".main_mask").hide();
    })
});

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
            console.log(obj.boxDay, obj.boxInfo);
            this.setBoxDay(obj.boxDay);
            this.setBoxInfo(obj.boxInfo);
            //console.log(this.getBoxInfo())
            mui.ajax("http://lovelogapi.zhouxianbao.cn/api.php", {
            	data:{
            		boxDay: obj.boxDay,
            		boxInfo: obj.boxInfo,
            		type:'addBox'
            	},
            	type:'post',
            	dataType: 'json',
            	success:function(data){
            		if(data.)
            	}
            	
            	
            })
        },
        renderUI: function () {
            var that = this;
            var box = that.getBoundingBox();
            var boxTime = $('<div class="box_time"><span class="box_day_num"></span><span class="box_day_name">天</span></div>');
            var boxInfo = $('<div class="box_event"></div>');
            var boxDel = $('<div class="box_del">X</div>');
            boxTime.find(".box_day_num").text(that.getBoxDay());
            boxInfo.text(that.getBoxInfo());
            console.log(that.getBoxInfo());
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
    $("#save_btn").on('tap', function () {
        var eventName = $("#eventName"),eventTime = $("#eventTime");
        if(eventName.val().length > 7){
        	plus.nativeUI.toast("输入的时间名称过长")
        }else if(eventTime.val().length > 8){
        	
        }else{
        	var box = new Box({
            boxDay: eventTime.val().trim(),
            boxInfo:eventName.val().trim()
        });
        }
        
       // console.log(eventName.val(), eventTime.val());
        box.render({
            container: $("#main_content"),
            type:'append'
        });


    })
});