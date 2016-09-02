
define([], function (argument) {
	var urlObj = {
		dev: {
			api: 'http://lovelog.dev.zhouxianbao.cn/',
            imgUrl:'http://7xlabr.com1.z0.glb.clouddn.com/',
		},
		test: {
			api: 'http://lovelog.dev.zhouxianbao.cn/',
            imgUrl:'http://7xlabr.com1.z0.glb.clouddn.com/',
		},
		release: {
			api: 'http://lovelog.zhouxianbao.cn/',
            imgUrl:'http://7xlabr.com1.z0.glb.clouddn.com/',
		}
	};
	var environment = 'test';
	return urlObj[environment];
});