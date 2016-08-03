/**
 * Created by knowthis on 16/6/18.
 */
var version = "2.0.3";

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
        about:'../modules/aboutCtrl',
        plupload:'../assets/lib/plupload/js/plupload.full.min',
        qiniu:'../assets/lib/qiniu/dist/qiniu.min'
        
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
        dataObj:{},
        init:function () {
            var self =this;
            self.initBmob();
            if(self.checkIsLogin()){
                common.loadingStart();
                router.init();
                if(common.isOwnEmpty(self.userInfo) ) {
                    self.getUserInfo();
                }

            }else{
                var temp = common.renderUI('template_login',{data:{type:'QQ'}});
                temp.find('.login-qq').on('click',function () {
                    window.location.href ='http://lovelog.zhouxianbao.cn/api/qqLogin/oauth'
                });
            }


        },
        initLocalData:function () {
            var self =this;
            this.objID = common.getLocal('objectId');
            this.userInfo = common.getLocal('userInfo')?JSON.parse(common.getLocal('userInfo')):{};
            this.info.openid = common.getLocal('uuid');
            self.renderUI();
            self.bindUI();
        },
        initBmob:function () {
            common.bmobInit();
            var self =this;
            var boxObj = Bmob.Object.extend("userInfo");
            self.dataObj.userInfo = boxObj;
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
        /**
         * 获取用户信息
         */
        getUserInfo:function () {
            var self =this;
            var temp = new Bmob.Query(self.dataObj.userInfo);
            temp.equalTo('openid',self.info.openid);
            temp.first({
                success: function (result) {
                    if(common.tools.checkNull(result)){
                        console.log("数据库没有该数据");
                        var firstBox = Bmob.Object.extend("boxlist");
                        var firstbox = new firstBox();
                        firstbox.save({
                            eventTime: new Date().getTime()+'',
                            eventName: " 第一次使用事件纪念日",
                            machineId: common.getLocal('uuid'),
                            img: '',
                            isDel:false
                        }, {
                            success: function (object) {
                                console.log(object);
                                router.init();
                            },
                            error: function (model, error) {
                               console.log(error)
                            }
                        });
                        common.getQQinfo({
                            func: self.saveUser,
                            context: self
                        })
                    }else{
                        console.log("数据库存有该数据");
                        common.setLocal({
                            key: 'userInfo',
                            value: JSON.stringify({
                                username: result.get('username'),
                                user_pic: result.get('user_pic'),
                                sex: result.get('sex'),
                                province:result.get('province'),
                                city:result.get('city'),
                                openid:result.get('openid')
                            })
                        });
                        common.setLocal({
                            key: 'objectId',
                            value: result.id
                        });
                        self.initLocalData();
                    }

                },
                error: function (model, error) {
                    console.log(error.code)

                }
            });
        },
        saveUser:function ( response) {
            var self =this;
            var reqData =response;

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
            console.log(self.info.openid)
            self.userInfoObj.save(data, {
                success: function (object) {
                    self.info.userID = object.id;
                    common.msgShow("登录成功");
                    common.setLocal({
                        key: 'objectId',
                        value: object.id
                    });

                    self.initLocalData();
                },
                error: function (model, error) {
                    console.log(error.description);
                }
            });
        },
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