/**
 * Created by knowthis on 16/6/18.
 */
define(['router','template','common'],function (router,template,common) {
    var main = {

        dataObj:{},
        init:function () {
            common.loadingStart();
            var self =this;
            if(common.checkIsLogin()) {
                common.getBoxList({}, {
                    func: self.getDataFunc,
                    context: self
                })
            }
        },
        render:function(id,data){
            $("#app").html(template(id,data));
            $("#footer").html(template('template_footer',{type:'index'}));
            common.loadingEnd();
            this.bindUI();
        },
        bindUI:function () {
            var that =this;
            $(".index-box").on('swipeLeft',function (e) {
                e.preventDefault();
                e.stopImmediatePropagation();

                var current = $(this).attr('data-id');
                if(confirm("确认删除?")) {
                    that.dataObj.get(current, {
                        success: function (gameScore) {
                            gameScore.set('isDel', true);
                            gameScore.save();
                            window.location.reload(true);
                        },
                        error: function (object, error) {

                        }
                    });
                }
                return false;
            })
        }
    };
    main.data =[];
    main.getDataFunc = function(response){
        var that =this;
        if(common.checkIsLogin()) {
            console.log(response);
            var num  = response.count,
                data  = response.data;
            var nowTime = new Date().getTime(), interval, type, year, day, dateStr;
            if ( num> 0) {
                data.forEach(function (item) {
                    item.eventTime *=1000;
                    if (item.eventTime > nowTime) {
                        type = '未来';

                    } else {
                        type = '过去';
                    }
                    interval = Math.round(Math.abs((item.eventTime - nowTime) / 86400000));


                    year = parseInt(interval / 365);
                    day = parseInt(interval % 365);

                    var timS = item.eventTime / 1;

                    var date = new Date(timS),
                        date_year = date.getFullYear(),
                        date_month = date.getMonth()+1;

                    dateStr = '距离' + date_year + '年' + date_month + '月' + date.getDate() + '日';
                   // console.log("总共"+interval+'天'+"--"+year+'年'+day+'天,时间:'+dateStr);
                    var img_t = item.img;
                    //console.log(img_t)
                    main.data.push({
                        id:item.id,
                        eventName: item.eventName,
                        eventTime: dateStr,
                        eventYear: year,
                        eventDay: day,
                        eventType: type,
                        img: (img_t == undefined || img_t == '')? 'assets/img/index_temp.jpg' : (img_t + "?imageView2/0/w/300")

                    });
                });
                //main.render('boxList', {list: main.data})

            } else {
                common.msgShow("你的数据被偷走了，下面加一个")
            }
            main.render('boxList', {list: main.data})

        }else{

            common.loadingEnd();
            common.msgShow("是否正确登录");
            //common.gotoPage('index.html',{page:''})
        }


    };
    return main
});