/**
 * Created by knowthis on 16/6/18.
 */
var version = 1;

requirejs.config({
    paths:{
        zepto:'../assets/lib/zepto/zepto.min',
        bmob:'../assets/lib/bmob/bmob',
        template:'../assets/lib/artTemplate/dist/template',
        common:'./common',
        router:'./router',
        url:'../assets/lib/js-url/url.min',
        
        boxList:'../modules/boxList/indexCtrl'
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
        }
    },
    urlArgs:'v='+version
});
require(['common','router','template'],function (common,router) {
    console.log('版本号:'+version);
    var main = {
        init:function () {
            
            common.bmobInit();
            router.init();
           

        }
    };
    main.init();

})