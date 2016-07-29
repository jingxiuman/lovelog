/**
 * Created by knowthis on 16/6/18.
 */
define(['router','template','bmob','common'],function (router,template,Bmob,common) {
    var main = {
        uuid:'',
        dataObj:{},
        init:function () {
            this.uuid = common.getLocal('uuid');
            main.getDataFunc();
        },
        render:function(id,data){
            $("#app").html(template(id,data));
            $("#footer").html(template('template_footer',{type:'index'}));
            common.loadingEnd();
            this.bindUI();
        },
        bindUI:function () {
            var that =this;
            $(".index-box").on('longTap',function (e) {
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
    main.getDataFunc = function(){
        var that =this;
        if(that.uuid) {
            var boxDataClass = Bmob.Object.extend('boxlist');
            that.dataObj = new Bmob.Query(boxDataClass);
            that.dataObj.equalTo('machineId', that.uuid);
            that.dataObj.ascending('eventTime');
            that.dataObj.notEqualTo("isDel", true);
            that.dataObj.find({
                success: function (response) {
                    console.log(response);
                    var nowTime = new Date().getTime(), interval, type, year, day, dateStr;
                    if (response.length > 0) {
                        response.forEach(function (item) {

                            if (item.get('eventTime') > nowTime) {
                                type = '未来';

                            } else {
                                type = '过去';
                            }
                            interval = Math.round(Math.abs((item.get('eventTime') - nowTime) / 86400000));


                            year = parseInt(interval / 365);
                            day = parseInt(interval % 365);

                            var timS = item.get('eventTime') / 1;

                            var date = new Date(timS),
                                date_year = date.getFullYear(),
                                date_month = date.getMonth()+1;

                            dateStr = '距离' + date_year + '年' + date_month + '月' + date.getDate() + '日';
                            console.log("总共"+interval+'天'+"--"+year+'年'+day+'天,时间:'+dateStr);
                            var img_t = item.get('img');
                            //console.log(img_t)
                            main.data.push({
                                id:item.id,
                                eventName: item.get('eventName'),
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
                }, error: function (error) {
                    common.msgShow("当前错误：" + error)
                }
            });
        }else{
            common.loadingEnd();
            common.msgShow("是否正确登录")
        }


    };
    return main
});