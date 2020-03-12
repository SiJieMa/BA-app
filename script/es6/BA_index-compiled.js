'use strict';

function shownine(ret) {
	var retjson = ret;
	appvue.ninemenu = Array.from(retjson);

	retjson.map(function (value, index, array) {
		var count = typeof value.count == "undefined" ? 0 : value.count;
		switch (value.name) {
			case '本月促销业绩':
				appvue.baifangnum = count;
				break;

			case '今日已拜访':
				appvue.chuxiaonum = count;
				break;
		}
	});
}
