/**
 * Created by knowthis on 2016/10/26.
 * auther website:http://zhouxianbao.cn
 */
define(['router','common'],function (router,common) {
    var exports = {
        bindUI:function(){
            var that =this;
            $("#box_save_btn").on('click',function(){
                common.msgShow("开始保存");
                var title= $("#idea_title").val().trim(),
                    content= $("#idea_content").val().trim();

                if(title !=''  && content !=''){
                    that.submitData(title,content);
                }else{
                    common.msgShowDelay("都是必填项目哦～",1)
                }

            });

        },
        renderUI:function () {
            common.renderUI('footer','template_footer',{type:'add'});
            common.renderUI('app','template_idea');
            this.bindUI()
        },
        submitData:function(title,content){
            common.addIdea({
                title:title,
                content:content
            },{
                func:function (response) {
                    $("#idea_title").val('');
                    $("#idea_content").val('');
                    common.msgShowDelay('保存成功，感谢你的意见',1)
                },
                context:self
            })
        }

    };
    exports.init = function () {
       this.renderUI()
    };
    return exports
});