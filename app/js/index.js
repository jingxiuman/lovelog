/**
 * Created by knowthis on 16/6/18.
 */
var version = "2.0.8";

requirejs.config({
    baseUrl:'./js',
    paths:{
        zepto:'../assets/lib/zepto/zepto.min',
        touch:'../assets/lib/zeptojs/src/touch',
        template:'../assets/lib/artTemplate/dist/template',
        common:'./common',
        router:'./router',
        url:'../assets/lib/js-url/url.min',
        dataPick:'../assets/lib/date/zepto.mdatetimer',
        boxList:'../modules/indexCtrl',
        addBox:'../modules/addBox',
        about:'../modules/aboutCtrl',
        login:'../modules/loginCtrl',
        plupload:'../assets/lib/plupload/js/plupload.full.min',
        qiniu:'../assets/lib/qiniu/dist/qiniu.min',
        host:'../host'
        
    },
    shim:{
        zepto:{
            exports:'$'
        },
        touch:{
          deps:['zepto']
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
        init:function () {
            var self =this;
            router.init();
            if(!common.checkIsLogin()){
               common.gotoPage('index.html',{page:'login'})
            }
            self.bindUI();
        },
        /**
         * 获取用户信息
         */
        bindUI:function () {
            var self =this;
              $(".share").on('click',function () {
                  window.location.reload(true);
              })  ;
            $(".head-pic").on('click',function () {
                console.log(self.userInfo);
                self.checkPersonInfo()
            });


        },

        /**
         * 检测是否有用户信息模块
         */
        checkPersonInfo:function () {
            var self  =this,dom;
            console.log($("#app").hasClass("login"));
            if(!$("#app div").hasClass("login")) {
                dom = common.renderUI_append('template_login', {data: {type: 'person', info: self.userInfo, id: self.objID}})
            }else{
                $(".login").remove();
            }
            dom && dom.find(".person-close").on('click',function () {
                self.checkPersonInfo()
            })
        },
        checkQQ:function () {
            var str = navigator.userAgent;
            if(str.indexOf('QQ') >0){
                $(".header").hide();
                $(".content").addClass('contentQQ')
            }
        },
        renderUI:function () {
            var self =this;
            if(self.userInfo.user_pic != '' && self.userInfo.user_pic !=undefined) {
                $(".head-pic").css("background-image", "url(" + self.userInfo.user_pic + ")")
            }
        }

    };
   main.init()


});