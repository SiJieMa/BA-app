/**
 * 获取当前时间  并将当前时间转换为时间戳
 * 适合苹果浏览器和其他浏览器
 */
function get_today_millisecond() {
	//一天等于多少毫秒
	var onedaymillons = 86400000;
	//获取当前时间的年月日
	var myDate = new Date();
	var year_order = myDate.getFullYear();
	var month_order = myDate.getMonth();
	var day_order = myDate.getDate();

	var now_ymdtime = year_order + "-" + (parseInt(month_order) + 1) + "-" + day_order;
	//把当前日期转换为时间戳
	now_ymdtime = now_ymdtime.replace(/-/g, '/');
	var timestamp1 = Date.parse(new Date(now_ymdtime));
	//获取当前是周几
	var weekday = myDate.getDay();
	return timestamp1;
}

//获取当天00点之前的日期
function get_today_millisecond24() {
	//一天等于多少毫秒
	var onedaymillons = 86400000;
	//获取当前时间的年月日
	var myDate = new Date();
	var year_order = myDate.getFullYear();
	var month_order = myDate.getMonth();
	var day_order = myDate.getDate();

	var now_ymdtime = year_order + "-" + (parseInt(month_order) + 1) + "-" + day_order + " 23:59:59";
	//把当前日期转换为时间戳
	now_ymdtime = now_ymdtime.replace(/-/g, '/');
	var timestamp1 = Date.parse(new Date(now_ymdtime));
	//获取当前是周几
	var weekday = myDate.getDay();
	return timestamp1;
}


/**
 *正常时间转时间戳
 */
function changedatetomillon(endTime){
	endTime = endTime.replace(/\-/g, '/');

    endTime = new Date(endTime).getTime();

    endTime = endTime / 1000;

    return endTime;
}

/**
 * 判断两个时间哪个大哪个小
 */
function bigayTime(time1, time2){
	time1 = time1.replace(/\-/g, '/');
	time1 = new Date(time1).getTime();
	
	time2 = time2.replace(/\-/g, '/');
	time2 = new Date(time2).getTime();
	
	if(time1 > time2){
		return 1;
	}else if(time1 < time2){
		return 2;
	}else{
		return 3;
	}
}


/**
 *
 * @param {新建窗口name} winname
 * @param {新建frame的name} framename
 * @param {新建窗口的题目} frametitle
 * @param {对应frame的绝对地址} frameurl
 * @param {需要传递的参数json} data
 */
function openpage(winname, framename, frametitle, frameurl, data){
	api.openWin({
	    name: winname,
	    url: 'widget://html/all_win.html',
	    slidBackEnabled: false,
	    pageParam: {
	        title: frametitle,
	        name: framename,
	        url: frameurl,
	        data: data
	    }
	});
}



function jiazai() {
	var activity = api.require('UILoading');
	activity.keyFrame({
		rect : {
			w : 222,
			h : 189
		},
		styles : {
			bg : 'rgba(0,0,0,0.1)',
			corner : 5,
			interval : 100,
			frame : {
				w : 222,
				h : 189
			}
		},
		mask: 'rgba(0,0,0,0)',
		content : [{
			frame : 'widget://icon/load/1.png'
		}, {
			frame : 'widget://icon/load/2.png'
		}, {
			frame : 'widget://icon/load/3.png'
		}, {
			frame : 'widget://icon/load/4.png'
		}, {
			frame : 'widget://icon/load/5.png'
		}, {
			frame : 'widget://icon/load/6.png'
		}, {
			frame : 'widget://icon/load/7.png'
		}, {
			frame : 'widget://icon/load/8.png'
		}, {
			frame : 'widget://icon/load/9.png'
		}, {
			frame : 'widget://icon/load/10.png'
		}, {
			frame : 'widget://icon/load/11.png'
		}, {
			frame : 'widget://icon/load/12.png'
		}, {
			frame : 'widget://icon/load/13.png'
		}, {
			frame : 'widget://icon/load/14.png'
		}, {
			frame : 'widget://icon/load/15.png'
		}, {
			frame : 'widget://icon/load/16.png'
		}, {
			frame : 'widget://icon/load/17.png'
		}]
	}, function(ret) {
	});
}

function tingzhi() {
	var uiloading = api.require('UILoading');
	uiloading.closeKeyFrame();
}


function isempty(str){
	if((typeof(str) == 'undefined')||(str == null)||(str == "null")||(str == "")||(str == "undefined")){
		return true;
	}else{
		return false;
	}
}


/**
 * 将从数据库上面获取到的时间转换为正常时间
 * 传入参数objDate "2015-12-02T08:23:10.572Z"
 * 传入参数objFormat "yyyy-MM-dd hh:mm:ss"
 * 传出参数 2015--12-.......
 */
function getTime(objDate, objFormat) {

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
/**
 *获取当前年月日
 */
function today(){
	var myDate = new Date();

	var month = myDate.getMonth() + 1;
	if(month < 10){
		month = '0'+month;
	}

	var day = myDate.getDate();
	if(day < 10){
		day = '0'+day;
	}

	var todaytime = myDate.getFullYear() + "-" + month + "-" + day;
	return todaytime;
}
/**
 *获取当前年月日
 */
function today_noyear(){
	var myDate = new Date();

	var month = myDate.getMonth() + 1;
	if(month < 10){
		month = '0'+month;
	}

	var day = myDate.getDate();
	if(day < 10){
		day = '0'+day;
	}

	var todaytime = month + "-" + day;
	return todaytime;
}

/**
 * 删除某个布局
 * 将某个div或者li等等在其母布局中清空
 * 传入参数：该布局在整体布局中的id
 */
function delxml(htmlid) {
	var eventdel = document.getElementById(htmlid);
	if (eventdel != null) {
		eventdel.parentNode.removeChild(eventdel);
	}
}


/**
 *下拉刷新功能
 */
function xiala(callBack){
	api.setCustomRefreshHeaderInfo({
	    bgColor: '#eee',
	    images: [
	        'widget://icon/load/1.png',
	        'widget://icon/load/2.png',
	        'widget://icon/load/3.png',
	        'widget://icon/load/4.png',
	        'widget://icon/load/5.png',
	        'widget://icon/load/6.png',
	        'widget://icon/load/7.png',
	        'widget://icon/load/8.png',
	        'widget://icon/load/9.png',
	        'widget://icon/load/10.png',
	        'widget://icon/load/11.png',
	        'widget://icon/load/12.png',
	        'widget://icon/load/13.png',
	        'widget://icon/load/14.png',
	        'widget://icon/load/15.png',
	        'widget://icon/load/16.png',
	        'widget://icon/load/17.png'
	    ],
	    tips: {
	        pull: '下拉刷新',
	        threshold: '松开立即刷新',
	        load: '正在刷新'
	    }
	}, function() {
		callBack("1");
	});
}
/**
 *关闭老版本 让其无法使用
 */
function openold(){
	api.openFrame({
	    name: 'nouse',
	    url: 'widget://nouse.html',
	    rect: {
		    x:0,
		    y:0,
		    w:api.winWidth,
		    h:api.winHeight
	    }
    });
}
