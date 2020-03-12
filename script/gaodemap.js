function saveLngLat(longitude, latitude) {
	this.longitude = longitude;
	this.latitude = latitude;
}

function getjingweiDistance(start, end) {
	var d1 = 0.01745329251994329;
	var d2 = start.longitude;
	var d3 = start.latitude;
	var d4 = end.longitude;
	var d5 = end.latitude;
	d2 *= d1;
	d3 *= d1;
	d4 *= d1;
	d5 *= d1;
	var d6 = Math.sin(d2);
	var d7 = Math.sin(d3);
	var d8 = Math.cos(d2);
	var d9 = Math.cos(d3);
	var d10 = Math.sin(d4);
	var d11 = Math.sin(d5);
	var d12 = Math.cos(d4);
	var d13 = Math.cos(d5);
	var arrayOfDouble1 = [];
	var arrayOfDouble2 = [];
	arrayOfDouble1.push(d9 * d8);
	arrayOfDouble1.push(d9 * d6);
	arrayOfDouble1.push(d7);
	arrayOfDouble2.push(d13 * d12);
	arrayOfDouble2.push(d13 * d10);
	arrayOfDouble2.push(d11);
	var d14 = Math.sqrt((arrayOfDouble1[0] - arrayOfDouble2[0]) * (arrayOfDouble1[0] - arrayOfDouble2[0]) + (arrayOfDouble1[1] - arrayOfDouble2[1]) * (arrayOfDouble1[1] - arrayOfDouble2[1]) + (arrayOfDouble1[2] - arrayOfDouble2[2]) * (arrayOfDouble1[2] - arrayOfDouble2[2]));

	return (Math.asin(d14 / 2.0) * 12742001.579854401);
}


/**
 *获取两个经纬度点之间的距离
 */
function getdistance(lon1, lat1, lon2, lat2, callBack) {
//	console.log(lon1+"----"+lat1+"----"+lon2+"----"+lat2);
	if(isempty(lon1)||isempty(lat1)||isempty(lon2)||isempty(lat2)){
		callBack(0);
		return;
	}
	var start = new saveLngLat(lon1, lat1);
	var end = new saveLngLat(lon2, lat2);
	callBack(getjingweiDistance(start, end).tofixedlonlat(2));
}



function get_lonlat_address(lon, lat, callBack){
	api.showProgress({
	    title: '请稍等',
	    text: '正在转换地址',
	    modal: true
	});
	api.ajax({
	    url: 'http://restapi.amap.com/v3/geocode/regeo?key=d9c4b037da5e158434da52b52880f00d&location='+lon+','+lat+'&radius=200&extensions=base&batch=false&roadlevel=0',
	    method: 'get',
	    timeout: 5
	}, function(ret, err) {
		//{"status":"1","info":"OK","infocode":"10000","regeocode":{"formatted_address":"天津市和平区南市街道南马路中原·麦购时代广场","addressComponent":{"country":"中国","province":"天津市","city":[],"citycode":"022","district":"和平区","adcode":"120101","township":"南市街道","towncode":"120101006000","neighborhood":{"name":[],"type":[]},"building":{"name":[],"type":[]},"streetNumber":{"street":"南马路","number":"14号","location":"117.188944,39.1368519","direction":"西","distance":"21.8828"},"businessAreas":[{"location":"117.18309210416666,39.142099941176504","name":"鼓楼","id":"120104"},{"location":"117.1967737207546,39.128999333962255","name":"和平路","id":"120101"},{"location":"117.18461108780487,39.13023676097562","name":"荣业大街","id":"120101"}]}}}
	    callBack(ret, err);
	    api.hideProgress();
	});
}
