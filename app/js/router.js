/**
 * Created by knowthis on 16/6/18.
 */
define(['url','zepto','boxList','addBox','about'],function (url, $,boxList,addBox,about) {
    var main = {
        init :function () {
            this.list();

        },
        getUrl:function(type){
            return url(type,location.href)
        },

        list:function(){
            var self = this;
            var pageName = this.getUrl('?page');

            switch (pageName){
                case 'index':
                    boxList.init();
                    break;
                case 'about':
                    about.init();
                    break;
                case 'add':
                    addBox.init();
                    break;
                default:
                    //boxList.init();
                    break;
            }
        },
        goTo:function (page,data) {
            var self = this;
            if(page == self.getUrl('?page')){
                window.location.reload();
            }else{
                window.location.href = "?page="+page;
            }


        }
    };
    Object.defineProperty(window,'router',{
        value:main
    });
    return main;
});