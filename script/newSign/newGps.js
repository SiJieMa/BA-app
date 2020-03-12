/**
 *获取当前用户的地理位置
 * @param {Object} callBack
 */
function getuserelocation(callBack) {
	var myDate = new Date();
	/**var aMapLBS = api.require('aMapLBS');
	aMapLBS.configManager({
		accuracy : 'hundredMeters',
		filter : 0.5
	}, function(locationret, locationerr) {
		if (locationret.status) {
			aMapLBS.singleLocation({
			    timeout: 10
			}, function(ret, err) {
				api.hideProgress();
			    if (ret.status) {
			        callBack("0", ret.lon, ret.lat, myDate.getTime());
			    }else{
			    	callBack("1", "", "", myDate.getTime());
			    }
			});
		} else {
			callBack("1", "", "", myDate.getTime());
		}
	});**/
	/********************************************************************************/

	var amapLocation = api.require('aMapLocation');

	var param = {
		accuracy : 100,
		filter : 1,
		autoStop : true
	};
	var resultCallback = function(ret, err) {
		//console.log(JSON.stringify(ret) + "===" + JSON.stringify(err));
		if (ret.status) {
			callBack("0", ret.longitude, ret.latitude, myDate.getTime());
		} else {
			callBack("1", "", "", myDate.getTime());
		}
	}
	amapLocation.startLocation(param, resultCallback);

}

Number.prototype.tofixedlonlat = function(len) {
	var add = 0;
	var s, temp;
	var s1 = this + "";
	var start = s1.indexOf(".");
	if (s1.substr(start + len + 1, 1) >= 5)
		add = 1;
	var temp = Math.pow(10, len);
	s = Math.floor(this * temp) + add;
	return s / temp;
};
