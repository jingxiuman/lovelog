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
    urlArgs:'v='+version
    //urlArgs:'v='+new Date().getTime()
});
require(['common','router','template','dataPick','touch'],function (common,router) {
    console.log('版本号:'+version);
    var main = {
        info:{},
        userInfo:{},
        reqData:{},
        userInfoObj:{},
        userInfoGetObJ:{},
        objID:'',
        init:function () {
            var self =this;
            self.initBmob();
            if(self.checkIsLogin()){
                common.loadingStart();
                self.initLocalData();
                router.init();
                if(common.isOwnEmpty(self.userInfo)) {
                    self.userInfoGetObJ.get(self.objID, {
                        success: function (object) {
                            common.setLocal({
                                key: 'userInfo',
                                value: JSON.stringify({
                                    username: object.username,
                                    user_pic: object.user_pic,
                                    sex: object.sex,
                                    province:object.province,
                                    city:object.city,
                                    openid:object.openid
                                })
                            });
                            self.initLocalData();
                        },
                        error: function (object, error) {
                            common.getQQinfo({
                                func: self.saveUser,
                                context: self
                            })
                        }
                    });
                }

            }else{
                var temp = common.renderUI('template_login',{type:'qq'});
                temp.find('.login-qq').on('click',function () {
                    window.location.href ='http://lovelog.zhouxianbao.cn/api/qqLogin/oauth'
                });
            }
            self.renderUI();
            self.bindUI();

        },
        initLocalData:function () {
            this.objID = common.getLocal('objectId');
            this.userInfo = common.getLocal('userInfo')?JSON.parse(common.getLocal('userInfo')):{};
            this.info.openid = common.getLocal('uuid');
        },
        initBmob:function () {
            common.bmobInit();
            var self =this;
            var boxObj = Bmob.Object.extend("userInfo");
            self.userInfoGetObJ = new Bmob.Query(boxObj);
            self.userInfoObj = new boxObj();
        },
        checkIsLogin:function () {
            var that =this;
          if(common.getLocal('uuid') == '' || common.getLocal('uuid') == undefined){
              if(common.getLocationParam().openid == '' || common.getLocationParam().openid == undefined){
                  return false
              }else{
                  that.info.openid = common.getLocationParam().openid;
                  common.setLocal({
                      key:'uuid',
                      value:that.info.openid
                  });
                  return true;
              }

          }else{
              return true;
          }
        },
        saveUser:function ( response) {
            var self =this;
            var reqData =response;

            var objectId = common.getLocal('objectId');
            var data = {
                username: reqData.nickname,
                user_pic: reqData.figureurl_qq_2 != ''?reqData.figureurl_qq_2:reqData.figureurl_qq_1,
                sex: reqData.gender,
                province:reqData.province,
                city:reqData.city,
                openid:self.info.openid
            };
            self.userInfo = data;
            common.setLocal({
                key:'userInfo',
                value:JSON.stringify(data)
            });
            if(objectId  == '') {
                self.userInfoObj.save(data, {
                    success: function (object) {
                        self.info.userID = object.id;
                        common.msgShow("登录成功");
                        common.setLocal({
                            key: 'objectId',
                            value: object.id
                        })
                    },
                    error: function (model, error) {
                        console.log(error.description);
                    }
                });
            }
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
        renderUI:function () {
            var self =this;
            $(".head-pic").css("background-image","url("+self.userInfo.user_pic+")")

        }

    };
   main.init()


});