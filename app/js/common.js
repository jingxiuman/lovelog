/**
 * Created by knowthis on 16/6/18.
 */
define(['zepto','template','host'],function ($,template,host) {
    var main = {
        debug:true,
        hostType:'dev',
        host:host,
        tokenUrl:host.api+'pic/token',
        isOwnEmpty :function (obj) {
            for(var name in obj)
            {
                if(obj.hasOwnProperty(name))
                {
                    return false;
                }
            }
            return true;
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
            var msgMain = body.find(".message");
            if(!msgMain.hasClass('active')){
                msgMain.addClass("active");
            }


        },
        msgShowDelay:function (msg,time) {
            this.msgShow(msg);
            setTimeout(function () {
                $("body").find(".message").removeClass("active");
            },time*1000)
        },
        msgStop:function () {
            var body = $("body");
            var msgMain = body.find(".message");
            if(msgMain.hasClass('active')){
                msgMain.removeClass("active");
            }
        },
        strLimit:function (str,num) {

            if(str.length > num){
                return str.slice(0,num)+'...'
            }else{
                return str
            }
        },
        renderUI: function (domID, id, data) {
            return $("#" + domID).html(template(id, {main: data}))
        },
        renderUI_p: function (domID, id, data) {
            return $("#" + domID).append(template(id, {main: data}))
        },
        setLocal: function (data) {
            if(typeof(data.value)=='object'){
                window.localStorage.setItem(data.key, JSON.stringify(data.value));
            } else if(typeof(data.value)=='string'){
                window.localStorage.setItem(data.key, data.value);
            }
        },
        getLocal: function (key) {
            var val = window.localStorage.getItem(key) || "";
            if(val.search(/:/i)>0){
                val = JSON.parse(val);
            }
            return val;
        },
        /**
         * 跳转页面
         * url:页面名称 例如index.html
         * data:参数 {key:value} == ?key=value
         * @param url
         * @param data
         */
        gotoPage: function (url, data) {
            var path = window.location.pathname,
                that = this,
                parameter = '?';
            if (url) {
                if (!that.checkObjectNull(data)) {
                    Object.keys(data).forEach(function (item, i) {
                        if (i == 0) {
                            parameter += item + '=' + data[item];
                        } else {
                            parameter += "&" + item + '=' + data[item];
                        }
                    });
                }
                var pathArr = path.split("/"),
                    pathArrNew = pathArr.splice(0, pathArr.length - 1);
                path = "";
                pathArrNew.forEach(function (item) {
                    if (item) {
                        path += "/" + item;
                    }

                });
                path += "/" + url + parameter;
                if(that.getLocationParam().page != data.page){
                    window.location.href = (window.location.origin + path);
                }

               //
            }


        },
        checkIsLogin:function () {
            var self =this;
            if((self.getLocal('token') == '' || self.getLocal('token') == undefined) ||
                (self.getLocal('info') == '' || self.getLocal('info') == undefined)){
                return false;
            }else{
                return true;
            }
        },
        /**
         * 检测对象是否为空
         * 如果对象为空 true ,反之 相反
         * @param obj
         * @returns {boolean}
         */
        checkObjectNull: function (obj) {
            for (var name in obj) {
                if (obj.hasOwnProperty(name)) {
                    return false;
                }
            }
            return true;

        },
        getLocationParam: function () {
            var url = window.location.search;
            var params = url.toString().slice(1).split("&");
            var returnObject = {};
            for (var i = 0; i != params.length; i++) {
                var index = params[i].indexOf("=");
                returnObject[params[i].slice(0, index)] = params[i].slice(index + 1);
            }
            return returnObject;
        },
        getParam: function (url) {
            var params = url ? url.toString().split("&"):[];
            var returnObject = {};

            for (var i = 0; i != params.length; i++) {
                var index = params[i].indexOf("=");
                returnObject[params[i].slice(0, index)] = params[i].slice(index + 1);
            }
            return returnObject;
        },
        getCookie: function (name) {
            return document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)")) == null ? null : decodeURIComponent(RegExp.$2);
        },
        setCookie: function (c_name, value, day) {
            day = day || 700;
            var exdate = new Date();
            if (day >= 1) {
                exdate.setDate(exdate.getDate() + day);
                exdate.setHours(0);
                exdate.setMinutes(0);
                exdate.setSeconds(0);
            } else {
                var h = Math.floor(24 * day);
                exdate.setDate(exdate.getDate());
                exdate.setHours(exdate.getHours() + h);
                exdate.setMinutes(exdate.getMinutes());
                exdate.setSeconds(exdate.getSeconds());
            }

            document.cookie = c_name + "=" + escape(value) + ";expires=" + exdate.toGMTString();
        },
        doCallback: function(callback, response) {

            if (!callback) return;
            var callbackFunc = callback.func,
                callbackContext = callback.context;
            callbackFunc && typeof(callbackFunc) == 'function' && callbackFunc.call(callbackContext, response.data);
        },
        ajaxFunc:function (url,data,callback) {
            var that =this;
            if(url != 'users/login'){
                data.token = that.getLocal('token');
                data.info = that.getLocal('info')
            }

            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: host.api + url,
                data: data,
                success: function(response) {
                    if (+response.code == 0) {
                        that.doCallback(callback, response);
                    } else{
                        localStorage.clear();
                        that.msgShowDelay(response.msg,3);

                       // that.gotoPage('index.html',{page:'login'})
                    }
                },
                error: function(response) {
                   console.log(response)
                }
            });
        },
        register:function (data,callback) {
            this.ajaxFunc('users/login',data,callback)
        },
        getBoxList:function (data,callback) {
            this.ajaxFunc('box/all',data,callback)
        },
        createBox:function (data,callback) {
            this.ajaxFunc('box/create',data,callback)
        }
    };
    main.init =function () {

    };
    main.init();
    return main;
    
});