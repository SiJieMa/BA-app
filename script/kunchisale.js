(function(window){
	var u = {};

	u.url = $api.posturllujie;
	/**
	 *POST方法  统一请求带token的方法
 * @param {访问的url 前面没有斜线} posturl
 * @param {需要传递过去的参数} bodyvalue
 * @param {返回参数} callBack
	 */
	u.kunchipost = function(posturl, bodyvalue, callBack, timeout, tag){
		if(typeof(timeout) == 'undefined'){
			timeout = 30;
		}
		if(typeof(tag) == 'undefined'){
			tag = "";
		}
		var Authorization = 'bearer ' + $api.getStorage("token");
		api.ajax({
			url : u.url+posturl,
			method : 'post',
			tag : tag,
			headers : {
				'Content-Type' : 'application/json',
				'Authorization' : Authorization
			},
			data : {
				body: bodyvalue
			},
			timeout: timeout
		}, function(ret, err) {
			//console.log("posturl:" + posturl + "===" + JSON.stringify(ret) + "===" + JSON.stringify(err));
			if(err){
				setTimeout(u.senduplog(), 1000);
			}
			if(typeof(err) == 'undefined'){
				callBack(ret,err);
				$api.Loonlinelog((JSON.stringify(ret) + "===" + JSON.stringify(err)), $api.getStorage("username"), posturl, bodyvalue);
				return;
			}
			if (err.statusCode == "401") {
				api.alert({
					title : '身份认证失败',
					msg : '身份信息到期或该账号在其他设备登陆,请重新登陆.',
				}, function(ret, err) {
					api.sendEvent({
						name : 'tokenIsOld',
						extra : {
							key1 : 'value1'
						}
					});
				});
			}else{
				var iscallback = 0;
				if(typeof(err.msg) != 'undefined'){
					if((err.msg.indexOf('<html>') > -1)&&(posturl != 'ActionApi/T_Task/T_TaskByUserid')){
						alert('系统出现错误,请联系后台管理员,'+$api.getStorage("username"));
					}else{
						iscallback = 1;
					}
				}else{
					iscallback = 1;
				}
				if(iscallback == 1){
					callBack(ret,err);
				}
			}
			$api.Loonlinelog((JSON.stringify(ret) + "===" + JSON.stringify(err)), $api.getStorage("username"), posturl, bodyvalue);
		});
	}
	u.kunchiuploadpic = function(posturl, bodyvalue, callBack){
		api.ajax({
			url : u.url+posturl,
			method : 'post',
			tag: 'uploadpic',
			headers : {
				'Content-Type' : 'application/json'
			},
			data : {
				body: bodyvalue
			},
			timeout: 40
		}, function(ret, err) {
			callBack(ret,err);
		});
	}

	u.kunchiget = function(posturl, bodyvalue, callBack, timeout){
		if(typeof(timeout) == 'undefined'){
			timeout = 30;
		}
		api.ajax({
			url : u.url+posturl,
			method : 'get',
			headers : {
				'Content-Type' : 'application/json',
				'Authorization' : 'bearer ' + $api.getStorage("token")
			},
			data : {
				values: bodyvalue
			},
			timeout: timeout
		}, function(ret, err) {
			if(err){
				setTimeout(u.senduplog(), 1000);
			}
			if(typeof(err) == 'undefined'){
				callBack(ret,err);
				$api.Loonlinelog((JSON.stringify(ret) + "===" + JSON.stringify(err)), $api.getStorage("username"), posturl, bodyvalue);
				return;
			}
			if (err.statusCode == "401") {
				api.alert({
					title : '身份认证失败',
					msg : '身份信息到期或该账号在其他设备登陆,请重新登陆.',
				}, function(ret, err) {
					api.sendEvent({
						name : 'tokenIsOld',
						extra : {
							key1 : 'value1'
						}
					});
				});
			}else{
				callBack(ret,err);
			}
			$api.Loonlinelog((JSON.stringify(ret) + "===" + JSON.stringify(err)), $api.getStorage("username"), posturl, bodyvalue);
		});
	}

	u.kunchiput = function(posturl, bodyvalue, callBack){
		api.ajax({
			url : u.url+posturl,
			method : 'put',
			headers : {
				'Content-Type' : 'application/json',
				'Authorization' : 'bearer ' + $api.getStorage("token")
			},
			data : {
				body: bodyvalue
			},
			timeout: 30
		}, function(ret, err) {
			if(err){
				setTimeout(u.senduplog(), 1000);
			}
			if(typeof(err) == 'undefined'){
				callBack(ret,err);
				$api.Loonlinelog((JSON.stringify(ret) + "===" + JSON.stringify(err)), $api.getStorage("username"), posturl, bodyvalue);
				return;
			}
			if (err.statusCode == "401") {
				api.alert({
					title : '身份认证失败',
					msg : '身份信息到期或该账号在其他设备登陆,请重新登陆.',
				}, function(ret, err) {
					api.sendEvent({
						name : 'tokenIsOld',
						extra : {
							key1 : 'value1'
						}
					});
				});
			}else{
				callBack(ret,err);
			}
			$api.Loonlinelog((JSON.stringify(ret) + "===" + JSON.stringify(err)), $api.getStorage("username"), posturl, bodyvalue);
		});
	}


	u.kunchidel = function(posturl, bodyvalue, callBack){
		api.ajax({
			url : u.url+posturl,
			method : 'delete',
			headers : {
				'Content-Type' : 'application/json',
				'Authorization' : 'bearer ' + $api.getStorage("token")
			},
			data : {
				body: bodyvalue
			}
		}, function(ret, err) {
			if(err){
				setTimeout(u.senduplog(), 1000);
			}
			if(typeof(err) == 'undefined'){
				callBack(ret,err);
				$api.Loonlinelog((JSON.stringify(ret) + "===" + JSON.stringify(err)), $api.getStorage("username"), posturl, bodyvalue);
				return;
			}
			if (err.statusCode == "401") {
				api.alert({
					title : '身份认证失败',
					msg : '身份信息到期或该账号在其他设备登陆,请重新登陆.',
				}, function(ret, err) {
					api.sendEvent({
						name : 'tokenIsOld',
						extra : {
							key1 : 'value1'
						}
					});
				});
			}else{
				callBack(ret,err);
			}
			$api.Loonlinelog((JSON.stringify(ret) + "===" + JSON.stringify(err)), $api.getStorage("username"), posturl, bodyvalue);
		});
	}

	/*
	 * 获取当日的年月日
	 */
	u.todaydate = function(){
//		var myDate = new Date();
//		var todaytime = myDate.getFullYear() + "-" + (myDate.getMonth() + 1) + "-" + myDate.getDate();
//		return todaytime;

		var now = new Date();

		var year = now.getFullYear();
		//年
		var month = now.getMonth() + 1;
		//月
		var day = now.getDate();
		//日

		var clock = year + "-";

		if (month < 10)
			clock += "0";

		clock += month + "-";

		if (day < 10)
			clock += "0";

		clock += day;
		return (clock);

	}

	/**
	* 获取给出的时间戳转正常时间
	*/
	u.getMillonDate = function(millons){
		var now = new Date(millons);

		var year = now.getFullYear();
		//年
		var month = now.getMonth() + 1;
		//月
		var day = now.getDate();
		//日

		var clock = year + "-";

		if (month < 10)
			clock += "0";

		clock += month + "-";

		if (day < 10)
			clock += "0";

		clock += day;
		return (clock);
	}

	/**
	* 获取给出的时间戳转正常时间
	*/
	u.getMillonDate_noline = function(millons){
		var now = new Date(millons);

		var year = now.getFullYear();
		//年
		var month = now.getMonth() + 1;
		//月
		var day = now.getDate();
		//日

		var clock = year + "";

		if (month < 10)
			clock += "0";

		clock += month + "";

		if (day < 10)
			clock += "0";

		clock += day;
		return (clock);
	}

	/**
	 *获取当前年月日最新格式完美
	 */
	u.gettodaydate = function(){
		var now = new Date();

		var year = now.getFullYear();
		//年
		var month = now.getMonth() + 1;
		//月
		var day = now.getDate();
		//日

		var clock = year + "";

		if (month < 10)
			clock += "0";

		clock += month + "";

		if (day < 10)
			clock += "0";

		clock += day;
		return (clock);
	}

	/**
	 *获取当日的年月日时分秒
	 */
	u.todaytime = function(){
		var now = new Date();

		var year = now.getFullYear();
		//年
		var month = now.getMonth() + 1;
		//月
		var day = now.getDate();
		//日

		var hh = now.getHours();
		//时
		var mm = now.getMinutes();
		//分
		var ss = now.getSeconds();
		//秒

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
		return (clock);
	}
	/**
	 *获取当日的年月日时分秒
	 */
	u.todayMINtime = function(){
		var now = new Date();

		var hh = now.getHours();
		//时
		var mm = now.getMinutes();
		//分
		var ss = now.getSeconds();
		//秒

		var clock = "";
		if (hh < 10)
			clock += "0";

		clock += hh + ":";
		if (mm < 10)
			clock += '0';
		clock += mm + ":";
		if (ss < 10)
			clock += '0';
		clock += ss;
		return (clock);
	}

	/**
	 *删除元素
 * @param {删除的元素对应的id} htmlid
	 */
	u.delhtml = function(htmlid){
		var eventdel = document.getElementById(htmlid);
		if (eventdel != null) {
			eventdel.parentNode.removeChild(eventdel);
		}
	}


	u.ImageHuanCun = function(urlinter, callBack){
		api.imageCache({
		    url: urlinter,
		    policy: 'cache_only'
		}, function(ret, err) {
		    var url = ret.url;
		    callBack(url);
		});
	}

	u.senduplog = function(){
		api.sendEvent({
		    name: 'uploaderrLog'
		});
		console.log('日志已发送');
	}


	window.$kunchi = u;
})(window);
