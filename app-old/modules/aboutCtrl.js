/**
 * Created by knowthis on 16/7/31.
 */

define(['router','template','common'],function (router,template,common) {
    var main = {
        init:function () {
            common.loadingStart();
            this.render()
        },
        render:function(){
            common.renderUI('app','template_about',{});
            $("#footer").html(template('template_footer',{type:'index'}));
            common.loadingEnd();
        },
        bindUI:function () {

        }
    };
    return main
});