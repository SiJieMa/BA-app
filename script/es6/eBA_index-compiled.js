"use strict";

function shownine(ret) {
	var retjson = ret;
	retjson.map(function (value) {
		var count = typeof value.count == "undefined" ? 0 : value.count;
		var avg = typeof value.avg == "undefined" ? 0 : value.avg;
		switch (value.name) {
			case '本月促销业绩':
				appvue.chuxiaonum = count;
				break;

			case '今日已拜访':
				appvue.baifangnum = count;
				break;
		}
		appvue.ninemenu.filter(function (item) {
			if (item.name === value.name) {
				item.count = count;
				item.avg = avg;
			}
		});
	});
}
