/**
 * Created by knowthis on 16/6/18.
 */
define(['zepto','bmob','template'],function ($,Bmob,template) {
    var main = {
        debug:true,
        hostType:'dev',
        imgUrl:'http://7xlabr.com1.z0.glb.clouddn.com/',
        tokenUrl:'http://lovelog.zhouxianbao.cn/api/admin/php/token.php',
        config:{
            dev:{
                apiKey:'a72538cabf0f9e5bc3f369752c307500', 
                appKey:'135d81f0771b7c0ac7a040ca233a2249'
            },
            release:{
                apiKey:'80972bba840af2e4d3a260d02796c1c0',
                appKey:'5c7ad2453529fe3cef9a7f840568263c'
            }
        },
        host:{
            dev:{
                api:'http://lovelog.zhouxianbao.cn/api/'
            }
        },
        getHost:function(){
            var that =this;
            return that.host[that.hostType];
        },
        bmobInit:function () {
            var self = this;
            if(self.debug){
                Bmob.initialize(self.config.dev.appKey,self.config.dev.apiKey);
            }else{
                Bmob.initialize(self.config.release.appKey,self.config.release.apiKey);
            }
        },
        isOwnEmpty :function (obj)
        {
            for(var name in obj)
            {
                if(obj.hasOwnProperty(name))
                {
                    return false;
                }
            }
            return true;
        },
        getLocationParam:function () {
            var url = window.location.search;
            var params = url.toString().slice(1).split("&");
            var returnObject = {};
            for(var i = 0; i != params.length; i++) {
                var index = params[i].indexOf("=");
                returnObject[params[i].slice(0, index)] = params[i].slice(index+1);
            }
            return returnObject;
        },
        loadingStart:function(){
            var body = $('body');

            var str = '<div id="loadingWrapper"><div class="spinner"> <div class="spinner-container container1"> <div class="circle1"></div> ' +
                '<div class="circle2"></div> <div class="circle3"></div> <div class="circle4"></div> </div> ' +
                '<div class="spinner-container container2"> <div class="circle1"></div> <div class="circle2"></div> <div class="circle3"></div> ' +
                '<div class="circle4"></div> </div> <div class="spinner-container container3"> <div class="circle1"></div> ' +
                '<div class="circle2"></div> <div class="circle3"></div> <div class="circle4"></div> </div> </div></div>';
            body.append(str);
        },
        renderUI:function (id, data) {
            return $("#app").html(template(id,data));
        },
        renderUI_append:function (id, data) {
            return $("#app").append(template(id,data));
        },
        loadingEnd:function () {
            try {
                var loadingWrapper = document.getElementById('loadingWrapper');
                document.body.removeChild(loadingWrapper);
            }catch (e){
                console.log(e);
            }
        },
        msgShow:function (msg) {
            var $dom = $(".message"),body = $("body");
            var source = '<div class="message">{{ main }}</div>';
            var render = template.compile(source);
            var html = render({
                main:msg
            });
            if($dom.get().length > 0){
                $dom.remove();
            }
            body.append(html);
            body.find(".message").addClass("active");
            setTimeout(function () {
                body.find(".message").removeClass("active");
            },1200)

        },
        tools:{
            checkNull:function (item) {
                if(item == '' || item == undefined){
                    return true;
                }else{
                    return false;
                }
            }
        },
        getLocal:function (item) {
            return localStorage.getItem(item);
        },
        setLocal:function (data) {
            return localStorage.setItem(data.key,data.value);
        },
        doCallback: function(callback, response) {

            if (!callback) return;
            var callbackFunc = callback.func,
                callbackContext = callback.context;
            callbackFunc && typeof(callbackFunc) == 'function' && callbackFunc.call(callbackContext, response.data);
        },
        ajaxFunc:function (url,data,callback) {
            var that =this;
            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: that.getHost().api + url,
                data: data,
                success: function(response) {
                    if (+response.ret == 0) {
                        that.doCallback(callback, response);
                    } else {
                        localStorage.clear();
                        alert(response);
                        that.msgShow(response.message);
                    }
                },
                error: function(response) {
                   console.log(response)
                }
            });
        },
        getQQinfo:function (callback) {
            this.ajaxFunc('qqLogin/api.php',{type:'getUserInfo'},callback)
        }
    };
    main.goTo = function (page,data) {
        var self = this;
        if(page == router.getUrl('?page')){
            window.location.reload();
        }else{
            window.location.href = "?page="+page;
        }
    };
    return main;
    
});