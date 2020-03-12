"use strict";

function initbalist() {
	api.showProgress({
		modal: true
	});
	var idarray = [];
	var idobject = new Object();
	idobject.userid = $api.getStorage("id");
	idarray.push(idobject);
	$kunchi.kunchipost("ActionApi/KPI/KPI_BAAchievementDetailByUserid", idarray, function (ret, err) {
		console.log(JSON.stringify(ret) + "==" + JSON.stringify(err));
		api.hideProgress();
		if (ret) {
			dealxml(ret);
		} else {
			api.alert({
				title: '提示',
				msg: '当前网络错误,请稍后重试.'
			}, function (ret, err) {
				api.closeWin({});
			});
		}
	});
}

function dealxml(ret) {
	var listdata = [];
	ret.map(function (value, index) {

		var ishas = false;
		var oneindex = 0;
		listdata.filter(function (value1, index1) {
			if (value.RealName == value1.name && value.cStoreFullName == value1.storename) {
				ishas = true;
				oneindex = index1;
			}
		});

		if (ishas) {
			var twoobj = new Object();
			twoobj.brandname = value.BrandName;
			twoobj.money = value.xiaoshoue + "元";
			twoobj.percent = typeof value.BAKPI == "undefined" ? 0 : value.BAKPI;
			twoobj.color = appvue.showcolor();

			listdata[oneindex].brandlist.push(twoobj);
		} else {
			var oneobj = new Object();
			oneobj.name = value.RealName;
			oneobj.storename = value.cStoreFullName;

			var onebrandlist = [];
			var _twoobj = new Object();
			_twoobj.brandname = value.BrandName;
			_twoobj.money = value.xiaoshoue + "元";
			_twoobj.percent = typeof value.BAKPI == "undefined" ? 0 : value.BAKPI;
			_twoobj.color = appvue.showcolor();
			onebrandlist.push(_twoobj);
			oneobj.brandlist = onebrandlist;
			listdata.push(oneobj);
		}
	});

	appvue.listdata = listdata;
	//console.log(JSON.stringify(listdata));
}
