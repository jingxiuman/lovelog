/**
 * Created by knowthis on 16/6/18.
 */
define(['url','zepto','boxList','addBox'],function (url, $,boxList,addBox) {
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
                case 'news':

                    break;
                case 'add':
                    addBox.init();
                    break;
                default:
                    boxList.init();
                    break;
            }
        },
        goTo:function (page,data) {
            var self = this;
            console.log(page)
            if(page == self.getUrl('?page')){
                //location.reload();
            }else{
                  location.search = "?page="+page;
            }


        }
    };
    return main;
});