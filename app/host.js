'use strict';

define([], function (argument) {
	var urlObj = {
		dev: {
			api: 'http://lovelog.dev.zhouxianbao.cn/',
		},
		test: {
			api: 'http://lovelog.dev.zhouxianbao.cn/'
		},
		release: {
			api: 'http://lovelog.zhouxianbao.cn/',
		}
	};
	var environment = 'test';
	return urlObj[environment];
});