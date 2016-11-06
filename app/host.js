
define([], function (argument) {
	var urlObj = {
		dev: {
			api: '//lovelog.dev.zhouxianbao.cn/',
            imgUrl:'http://7xlabr.com1.z0.glb.clouddn.com/',
		},
		test: {
			api: '//lovelog.dev.zhouxianbao.cn/',
            imgUrl:'http://7xlabr.com1.z0.glb.clouddn.com/',
		},
		release: {
			api: '//lovelog.zhouxianbao.cn/',
            imgUrl:'http://7xlabr.com1.z0.glb.clouddn.com/',
		}
	};
	var environment = 'release';
	return urlObj[environment];
});