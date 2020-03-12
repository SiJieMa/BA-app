(function(window) {
	var u = {};
	/**
	 *
	 * @param {Object} url 接口地址
	 * @param {Object} data 传递的参数
	 * @param {Object} timeout 超时时间 毫秒单位
	 */
	u.newpostLog = function(path, callBack) {
		var pathfile = new Array();
		for(var a = 0; a < path.length; a++){
			pathfile.push(path[a]);
		}
		api.ajax({
		    url: 'https://logs-api-ba.ikunchi.com/ActionApi/T_IOLog/Upload',
		    method: 'post',
		    data: {
		        files: {
		            file: pathfile
		        }
		    },
			timeout: 60,
		    headers: {
		    	"username" : $api.getStorage("realName"),
				"phone": $api.getStorage("username")
		    }
		}, function(ret, err) {
			console.log(JSON.stringify(ret) + "===" + JSON.stringify(err));
			api.hideProgress();
		    if (ret) {
		        callBack(true);
		    } else {
		        callBack(false);
		    }
		});
	}
	/**
	 *
	 * @param {Object} url 接口地址
	 * @param {Object} data 传递的参数
	 * @param {Object} timeout 超时时间 毫秒单位
	 */
	u.newpost = function(url, data, timeout, callBack) {
		var Authorization = 'bearer ' + $api.getStorage("token");
		api.ajax({
			url : $api.posturllujie + url,
			method : 'post',
			headers : {
				'Content-Type' : 'application/json',
				'Authorization' : Authorization
			},
			data : {
				body: data
			},
			timeout: timeout / 1000
		}, function(ret, err) {
			//console.log(JSON.stringify(ret) + "===" + JSON.stringify(err));
			if(err){
				setTimeout(function(){
					api.sendEvent({
					    name: 'uploaderrLog'
					});
				}, 1000);
			}
			if(typeof(err) == 'undefined'){
				callBack(ret,err);
				$api.Loonlinelog((JSON.stringify(ret) + "===" + JSON.stringify(err)), $api.getStorage("username"), url, data);
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
					}
				}else{
					iscallback = 1;
				}
				if(iscallback == 1){
					callBack(ret,err);
				}
			}
			$api.Loonlinelog((JSON.stringify(ret) + "===" + JSON.stringify(err)), $api.getStorage("username"), url, data);
		});
	}

	window.$newapi = u;
})(window)