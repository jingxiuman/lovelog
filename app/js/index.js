/**
 * Created by knowthis on 16/6/18.
 */
var version = "1.0.1";

requirejs.config({
    paths:{
        zepto:'../assets/lib/zepto/zepto.min',
        touch:'../assets/lib/zeptojs/src/touch',
        bmob:'../assets/lib/bmob/bmob',
        template:'../assets/lib/artTemplate/dist/template',
        common:'./common',
        router:'./router',
        url:'../assets/lib/js-url/url.min',
        dataPick:'../assets/lib/date/zepto.mdatetimer',
        boxList:'../modules/indexCtrl',
        addBox:'../modules/addBox',
        plupload:'../assets/lib/plupload/js/plupload.full.min',
        qiniu:'../assets/lib/qiniu/dist/qiniu.min',
       // mui:'../assets/lib/mui/dist/js/mui.min'
        
    },
    shim:{
        zepto:{
            exports:'$'
        },
        touch:{
          deps:['zepto']
        },
        bmob:{
            exports:'Bmob'
        },
        url:{
            exports:'url'
        },
        template:{
            exports:'template'
        },
        dataPick:{
            deps:['zepto']
        },
        qiniu:{
            deps:['plupload'],
            exports:'Qiniu'
        },
        plupload:{
            exports:'plupload'
        }
    },
    urlArgs:'v='+version
    //urlArgs:'v='+new Date().getTime()
});
require(['common','router','template','dataPick','touch'],function (common,router) {
    console.log('版本号:'+version);
    var main = {
        checkAPP:false,
        init:function () {
            var that =this;
            common.bmobInit();

            if(window.plus){
                that.bindUI()
            }else{
                document.addEventListener("plusready",that.bindUI,false);
            }
            router.init();

        },
        bindUI:function () {
            var that =this;
                if (window.plus) {
                    // $('.content').html(that.plus.device.uuid)

                    that.checkAPP = true;
                    common.setLocal({
                        key: 'uuid',
                        value: plus.device.uuid
                    })
                } else {
                    that.checkAPP = false;
                    common.msgShow("请使用APP登录")
                }
                var webview = plus.webview.currentWebview();
            $(".header").on('click',function () {
                //$(".content").html(JSON.stringify(webview));
                alert(webview.getURL())
            });
            $(".share.iconfont").on('click',function () {
                webview.reload();
            })

        }
    };
    main.init();

});