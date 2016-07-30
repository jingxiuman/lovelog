/**
 * Created by knowthis on 16/6/18.
 */
var version = "1.0.1";

requirejs.config({
    baseUrl:'./js',
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
    //urlArgs:'v='+version
    urlArgs:'v='+new Date().getTime()
});
require(['common','router','template','dataPick','touch'],function (common,router) {
    console.log('版本号:'+version);
    var main = {
        info:{},
        reqData:{},
        init:function () {
            var self =this;
            //self.checkQQ();
            common.bmobInit();
            if(self.checkIsLogin()){
                //alert(common.getLocal('uuid'));
                router.init();
                common.getQQinfo({
                    func:self.saveUser,
                    context:self
                })
            }else{
                var temp = common.renderUI('template_login',{type:'qq'});
                console.log(temp);
                temp.find('.login-qq').on('click',function () {
                    window.location.href ='http://lovelog.zhouxianbao.cn/api/qqLogin/oauth'
                });


            }
            self.bindUI();
        },
        checkIsLogin:function () {
          if(common.getLocal('uuid') == '' || common.getLocal('uuid') == undefined){
              if(common.getLocationParam().openid == '' || common.getLocationParam().openid == undefined){
                  return false
              }else{
                  common.setLocal({
                      key:'uuid',
                      value:common.getLocationParam().openid
                  });
                  return true;
              }

              return false;
          }else{
              return true;
          }
        },
        saveUser:function ( response) {
            var self =this;
            var reqData =self.reqData;
            var boxObj = Bmob.Object.extend("userInfo");
            var box = new boxObj();
            var data = {
                username: reqData.nickname,
                user_pic: reqData.figureurl_qq_2 != ''?reqData.figureurl_qq_2:reqData.figureurl_qq_1,
                sex: reqData.gender,
                province:reqData.province,
                city:reqData.city,
                openid:self.info.openId
            };
            console.log(data);
            common.setLocal({
                key:'userInfo',
                value:JSON.stringify(data)
            });
            box.save(data, {
                success: function (object) {
                    self.info.userID = object.id;
                    common.msgShow("登录成功");
                    common.setLocal({
                        key:'objectId',
                        value:object.id
                    })
                },
                error: function (model, error) {
                    console.log(error.description);
                }
            });
        },
        bindUI:function () {
          $(".share").on('click',function () {
              window.location.reload(true);
          })  ;
        },
        checkQQ:function () {
            var str = navigator.userAgent;
            if(str.indexOf('QQ') >0){
                $(".header").hide();
                $(".content").addClass('contentQQ')
            }
        },

    };
   main.init()


});