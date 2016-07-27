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
        info:{},
        init:function () {
            var self =this;
            common.bmobInit();
            if(QC.Login.check()){
                self.saveOpenID('hasLogin');
                router.init();
            }else{
                QC.Login({
                    btnId:"qqLoginBtn",
                    size: "A_XL"
                },function (reqData, opts) {
                    console.log(reqData);
                    self.info.username = reqData.nickname;
                    self.info.pic = reqData.figureurl_qq_2 != ''?reqData.figureurl_qq_2:reqData.figureurl_qq_1
                    self.saveOpenID('login');


                })
            }


        },
        saveOpenID:function (type) {
            var self =this;
            QC.Login.getMe(function (openId, accessToken) {
                self.info.openId = openId;
                self.info.accessToken = accessToken;
                console.log(self.info);
                common.setLocal({
                    key:'uuid',
                    value:openId
                });
                if(type == 'login') {
                    self.saveUser();
                }
            });
        },

        saveUser:function () {
            var boxObj = Bmob.Object.extend("userInfo");
            var box = new boxObj();
            box.save({
                username: reqData.nickname,
                user_pic: reqData.figureurl_qq_2 != ''?reqData.figureurl_qq_2:reqData.figureurl_qq_1,
                sex: reqData.gender,
                province:reqData.province,
                city:reqData.city,
                openid:self.info.openId
            }, {
                success: function (object) {
                    self.info.userID = object.id;
                    common.msgShow("登录成功");
                    router.init();
                },
                error: function (model, error) {
                    common.msgShow(error)
                }
            });
        },
        render:function () {

        }
    };
   main.init()


});