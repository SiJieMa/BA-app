'use strict';

function initpage(ret) {

	var thismonthret = ret;
	/**
  * datetime: "2019-12-12",size: "20px",backcolor: "#ffff00", //可以使用rgba进行上传,color: "#FFFFFF", //文字颜色num: '6'
  */
	var zonghe = 0;
	var promise = new Promise(function (resolve, reject) {
		var datadatearray = [];
		thismonthret.map(function (value) {
			var dtPlantTime = value.dtPlantTime;
			var amount = value.amount;
			var backcolor = void 0;
			if (amount > 6) backcolor = '#14D6D7';else if (5 <= amount && amount <= 6) backcolor = '#FFB574';else if (amount < 5) backcolor = '#FF5973';

			var io = Object.create({});
			io.datetime = dtPlantTime.split("T")[0];
			io.size = '20px';
			io.backcolor = backcolor;
			io.color = "#FFFFFF";
			io.num = amount;
			datadatearray.push(io);
			zonghe = zonghe + amount;
		});
		if (resolve) {
			resolve({
				datadatearray: datadatearray,
				zonghe: zonghe
			});
		} else if (reject) {
			reject("no");
		}
	});

	promise.then(function (resolve) {
		appvue.datalist = resolve.datadatearray;
		appvue.zongji = resolve.zonghe;
		appvue.showcalendar();
	});

	promise.catch(function (reject) {
		appvue.apptoastmsg();
	});

	promise.then(function () {
		if (appvue.isfirstshow == 0) {
			appvue.isfirstshow = 1;
			appvue.postonedaydb();
		}
	});
}

function reloadrili(datetime) {
	var ryear = datetime.split("-")[0];
	var rmonth = datetime.split("-")[1];
	appvue.year = ryear;
	appvue.month = rmonth;
	var ym = appvue.year + "-" + appvue.month;
	appvue.postdata(ym);
}

function showdetail(ret) {
	var retdata = ret;
	retdata.map(function (item) {
		var datetime = item.dtinStore;
		var time = datetime.split("T")[1];
		item.dtinStore = time;
		var ioffset = item.ioffset;
		item.ioffset = ioffset > 1000 ? (ioffset / 1000).toFixed(2) + 'KM' : ioffset.toFixed(2) + 'M';
	});
	appvue.everydata = retdata.length == 0 ? [] : retdata;
	appvue.isshowdetail = retdata.length == 0 ? false : true;
}
