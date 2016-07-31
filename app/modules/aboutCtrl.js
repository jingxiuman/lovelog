/**
 * Created by knowthis on 16/7/31.
 */

define(['router','template','bmob','common'],function (router,template,Bmob,common) {
    var main = {
        uuid:'',
        dataObj:{},
        init:function () {
            this.render()
        },
        render:function(){
            common.renderUI('template_about',{});
            $("#footer").html(template('template_footer',{type:'index'}));
            common.loadingEnd();
        },
        bindUI:function () {

        }
    };
    return main
});