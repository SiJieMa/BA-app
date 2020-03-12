/**
 *验证本地时间是否正确 
 */
function localTimeRight(){
	api.ajax({
	    url: $api.posturllujie+'ActionApi/SystemConfigs/GetServerTime',
	    method: 'post',
		timeout: 10
	},function(ret, err){
		if(ret){
			var cha_time = 600000;
			var righttime_online = getTime_online(ret.dtServerTime, "yyyy-MM-dd hh:mm:ss");
			console.log(righttime_online);
			var localtime_local = get_today_millisecond_online();
			$api.Losteplog(localtime_local, localtime_local);
			if(((changedatetomillon_online(righttime_online) - localtime_local)>cha_time)||((localtime_local - changedatetomillon_online(righttime_online))>cha_time)){
				api.alert({
				    title: '时间问题',
				    msg: '当前设备时间有问题,请调整.',
				}, function(aaa, bbb) {
					api.closeWidget({
	                    id: 'A6067912196305',
	                    silent: true
                    });
				});
			}
		}
	});
}


function get_today_millisecond_online() {

	var now = new Date();
	var year = now.getFullYear();
	var month = now.getMonth() + 1;
	var day = now.getDate();
	var hh = now.getHours();
	var mm = now.getMinutes();
	var ss = now.getSeconds();
	var clock = year + "-";
	if (month < 10)
		clock += "0";
	clock += month + "-";
	if (day < 10)
		clock += "0";
	clock += day + " ";
	if (hh < 10)
		clock += "0";
	clock += hh + ":";
	if (mm < 10)
		clock += '0';
	clock += mm + ":";
	if (ss < 10)
		clock += '0';
	clock += ss;

	var now_ymdtime = "";
	//把当前日期转换为时间戳
	now_ymdtime = clock.replace(/-/g, '/');
	var timestamp1 = Date.parse(new Date(now_ymdtime));
	return timestamp1;
}


/**
 *正常时间转时间戳
 */
function changedatetomillon_online(endTime){
	endTime = endTime.replace(/\-/g, '/');
    endTime = new Date(endTime).getTime();
    return endTime;
}


/**
 * 将从数据库上面获取到的时间转换为正常时间
 * 传入参数objDate "2015-12-02T08:23:10.572Z"
 * 传入参数objFormat "yyyy-MM-dd hh:mm:ss"
 * 传出参数 2015--12-.......
 */
function getTime_online(objDate, objFormat) {

	var b = new Date(objDate);
	Date.prototype.format = function(format)//author: meizz
	{
		var o = {
			"M+" : this.getMonth() + 1, //month
			"d+" : this.getDate(), //day
			"h+" : this.getHours(), //hour
			"m+" : this.getMinutes(), //minute
			"s+" : this.getSeconds(), //second
			"q+" : Math.floor((this.getMonth() + 3) / 3), //quarter
			"S" : this.getMilliseconds() //millisecond
		}
		if (/(y+)/.test(format))
			format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		for (var k in o)
		if (new RegExp("(" + k + ")").test(format))
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
		return format;
	}
	return b.format(objFormat);
}