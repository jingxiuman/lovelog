/**
 * Created by knowthis on 16/6/18.
 */
var version = "1.0.1";

requirejs.config({
    paths:{
        zepto:'../assets/lib/zepto/zepto.min',
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
});
require(['common','router','template','dataPick'],function (common,router) {
    console.log('版本号:'+version);
    var main = {
        init:function () {
            common.bmobInit();
            router.init();
            this.bindUI();
            this.getPlatData();
        },
        getPlatData:function () {


               // alert( "首页加载时间: " + window.plus.runtime.launchLoadedTime + "ms" );

        },
        bindUI:function () {
            var webview = plus.webview.currentWebview();
            document.body.addEventListener('touchmove',function(event){
                event.preventDefault();
            },false);
            $(".header").on('click',function () {
                //$(".content").html(JSON.stringify(webview));
                console.log(JSON.stringify(webview.WebviewStyles));
                alert(webview.getURL())
            });
            $(".share.iconfont").on('click',function () {
                webview.reload();
            })

        }
    };
    Object.defineProperty(window, 'APP', {
        value: main
    }) ;
    main.init();

});