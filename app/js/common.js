/**
 * Created by knowthis on 16/6/18.
 */
define(['zepto','bmob','template'],function ($,Bmob,template) {
    var main = {
        debug:true,
        imgUrl:'http://7xlabr.com1.z0.glb.clouddn.com/',
        tokenUrl:'http://lovelog.zhouxianbao.cn/api/admin/php/token.php',
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
        },
        loadingStart:function(){
            var loadingWrapper = document.createElement('div');
            loadingWrapper.setAttribute('id','loadingWrapper');
            loadingWrapper.style.width=window.screen.width+'px';
            loadingWrapper.style.height=window.screen.height+'px';
            loadingWrapper.style.position='fixed';
            loadingWrapper.style.left= 0;
            loadingWrapper.style.top= 0;
            loadingWrapper.style.backgroundColor='rgba(0,0,0,0.4)';
            loadingWrapper.style.textAlign='center';
            var loadingGIF = document.createElement('img');
            loadingGIF.src='assets/img/loading.svg';
            loadingGIF.setAttribute('class','loadingGIF');
            loadingWrapper.appendChild(loadingGIF);
            document.body.appendChild(loadingWrapper);
            document.body.style.overflow='hidden';
        },
        loadingEnd:function () {
            var loadingWrapper = document.getElementById('loadingWrapper');
            document.body.removeChild(loadingWrapper);
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
            body.find(".message").addClass("active");
            setTimeout(function () {
                body.find(".message").removeClass("active");
            },1200)

        },
    };
    return main;
    
});