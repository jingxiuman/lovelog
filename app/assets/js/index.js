var main ={};
main.debug = true;
main.init = function(){
    if(main.debug){
        Bmob.initialize('135d81f0771b7c0ac7a040ca233a2249','a72538cabf0f9e5bc3f369752c307500');
    }else{
        Bmob.initialize('5c7ad2453529fe3cef9a7f840568263c','80972bba840af2e4d3a260d02796c1c0');

    }
	mui.init({
		swipeBack:true
	});
	
	// mui.plusReady(function(){
	// 	main.getDataFunc();
	// });
    main.getDataFunc();
	main.boxListFunc =
	new Vue({
		el:'#box_contain',
		data:{
			boxList:[]
		},
		methods:{
			boxAdd:function(){
				console.log('click');
			}
		}
	})
};
main.getDataFunc = function(){
	var boxDataClass = Bmob.Object.extend('boxlist');
	var boxData = new Bmob.Query(boxDataClass);
	boxData.equalTo('machineId', '352562076467276');
	boxData.find({
		success:function(response){
            var nowTime = new Date().getTime(),interval,type;
			if(response.length > 0){
                response.forEach(function (item) {

                    if(item.get('eventTime') > nowTime){
                        type = '未来' ;

                    }else{
                        type = '过去';
                    }
                    interval = Math.round( Math.abs((item.get('eventTime') - nowTime)/86400000));
                    console.log(interval+'');

                    // if(interval < 365){
                    //     interval = interval +'天';
                    // }else{
                    //     interval = parseInt(interval%365)+'年'
                    // }
                    main.boxListFunc.$data.boxList.push({
                        eventName:item.get('eventName'),
                        eventTime:interval,
                        eventType:type
                    });
                });

			}else{
				plus.nativeUI.toast("你的数据被偷走了，下面加一个")
			}
		},error:function(error){
		
			plus.nativeUI.toast("当前错误："+error)
		}
	})
	
	
}
main.init();

	
