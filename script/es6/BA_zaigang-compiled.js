'use strict';

function initlist(time) {
	var functime = time;
	api.showProgress({
		modal: true
	});
	var body = new Object();
	body.userid = $api.getStorage('id');
	body.startime = functime;
	$kunchi.kunchipost("ActionApi/KPI/KPI_BAHasWorkByUserid", body, function (ret, err) {
		//console.log(JSON.stringify(ret) + "==" + JSON.stringify(err));
		api.hideProgress();
		if (ret) {
			showlist(ret);
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

function showlist(ret) {
	var isshow = ret.length == 0 ? false : true;
	if (isshow) {
		var balistnew = new Array();
		ret.forEach(function (value, index) {
			var name = value.RealName;
			var shopname = value.cStoreFullName;
			var ishas = false;
			var ishasindex = 0;
			balistnew.forEach(function (value1, index1) {
				var RealName = value1.RealName;
				var cStoreFullName = value1.cStoreFullName;
				if (name == RealName && shopname == cStoreFullName) {
					ishas = true;
					ishasindex = index1;
				}
			});
			var BrandName = value.BrandName;
			if (ishas) {
				var brandlistthis = balistnew[ishasindex].brandlist;
				if (BrandName != "") {
					balistnew[ishasindex].brandlist = balistnew[ishasindex].brandlist + "、" + BrandName;
				}
			} else {
				var listitem = new Object();
				listitem.cStoreFullName = shopname;
				listitem.RealName = name;
				listitem.UserName = value.Telephone == "" ? value.UserName : value.Telephone;
				listitem.brandlist = BrandName;
				balistnew.push(listitem);
			}
		});
		balistnew.filter(function (value) {
			value.brandlist = value.brandlist == "" ? "无" : value.brandlist;
		});
		appvue.balist = balistnew;
	}
}
