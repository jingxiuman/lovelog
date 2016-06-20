/**
 * Created by knowthis on 16/6/18.
 */
define(['router','template','bmob'],function (router,template,Bmob) {
    var main = {
        init:function () {
            main.getDataFunc();
        },
        render:function(id,data){

            $("#app").html(template(id,data))
        }
    };
    main.data =[];
    main.getDataFunc = function(){
        var boxDataClass = Bmob.Object.extend('boxlist');
        var boxData = new Bmob.Query(boxDataClass);
        boxData.equalTo('machineId', '869322021132608');
        boxData.find({
            success:function(response){
                var nowTime = new Date().getTime(),interval,type,year,day,dateStr;
                if(response.length > 0){
                    response.forEach(function (item) {

                        if(item.get('eventTime') > nowTime){
                            type = '未来' ;

                        }else{
                            type = '过去';
                        }
                        interval = Math.round( Math.abs((item.get('eventTime') - nowTime)/86400000));
                        

                        year = parseInt(interval/365);
                        day = parseInt(interval%365);

                        var timS = item.get('eventTime')/1;

                        var date = new Date(timS),
                            date_year = date.getFullYear(),
                            date_month = date.getMonth();
                        
                        dateStr = '距离'+date_year+'年' +date_month+'月'+date.getDay()+'日';
                        console.log("总共"+interval+'天'+"--"+year+'年'+day+'天,时间:'+dateStr);
                        main.data.push({
                            eventName:item.get('eventName'),
                            eventTime:dateStr,
                            eventYear:year,
                            eventDay:day,
                            eventType:type,

                        });
                    });
                    main.render('boxList',{list:main.data})

                }else{
                    plus.nativeUI.toast("你的数据被偷走了，下面加一个")
                }
            },error:function(error){

                plus.nativeUI.toast("当前错误："+error)
            }
        })


    };
    return main
})