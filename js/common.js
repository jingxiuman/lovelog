/**
 * Created by knowthis on 16/6/18.
 */
define(['zepto','bmob'],function ($,Bmob) {
    var main = {
        debug:true,
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
        bmobInit:function () {
            var self = this;
            if(self.debug){
                Bmob.initialize(self.config.dev.appKey,self.config.dev.apiKey);
            }else{
                Bmob.initialize(self.config.release.appKey,self.config.release.apiKey);
            }
        }
    };
    return main;
    
});