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
	console.log(plus.device.uuid)
	boxData.equalTo('machineId',plus.device.uuid || '');
	boxData.find({
		success:function(response){
			if(response.length > 0){
				main.boxListFunc.boxList =response;
			}else{
				plus.nativeUI.toast("你的数据被偷走了，下面加一个")
			}
		},error:function(error){
		
			plus.nativeUI.toast("当前错误："+error)
		}
	})
	
	
}
main.init();

	
