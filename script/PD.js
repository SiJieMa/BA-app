var PDline = function() {
}

//谁先占上这个标记 就让谁执行 否则就不可以执行
PDline.prototype.allowpostsign = '';
PDline.prototype.data;
PDline.prototype.url;
//首页进行初始化
PDline.prototype.initSign = function(){
	var initSignArray = [];
	$api.setStorage("signinlist",initSignArray);
	$api.setStorage("signoutlist",initSignArray);
}

PDline.prototype.jiluhas = function(){
	var data = $api.strToJson(this.data);
	var ireportid = data.iReportId;
	var singtype = data.cInType;
	if(singtype == '236'){
		var signoutlist = $api.getStorage('signoutlist');
		signoutlist.push(ireportid);
		$api.setStorage("signoutlist",signoutlist);
	}else if(singtype == '237'){
		var signinlist = $api.getStorage('signinlist');
		signinlist.push(ireportid);
		$api.setStorage("signinlist",signinlist);
	}
}

PDline.prototype.jiluhasonline = function(data){
	var ireportid = data.iReportId;
	var singtype = data.cInType;
	if(singtype == '236'){
		var signoutlist = $api.getStorage('signoutlist');
		signoutlist.push(ireportid);
		$api.setStorage("signoutlist",signoutlist);
	}else if(singtype == '237'){
		var signinlist = $api.getStorage('signinlist');
		signinlist.push(ireportid);
		$api.setStorage("signinlist",signinlist);
	}
}


PDline.prototype.isallowsignDB = function(fn){
	var data = $api.strToJson(this.data);
	var ireportid = data.iReportId;
	var singtype = data.cInType;
	var ireportidlocal = ireportid;
	if(singtype == '236'){
		var isallow = 0;
		var signoutlist = $api.getStorage('signoutlist');
		for(var a = 0; a < signoutlist.length; a++){
			if(ireportidlocal == signoutlist[a]){
				isallow = 1;
			}
		}
		if(isallow == 0){
			fn(true);
		}else{
			fn(false);
		}
	}else if(singtype == '237'){
		var isallow = 0;
		var signinlist = $api.getStorage('signinlist');
		for(var a = 0; a < signinlist.length; a++){
			if(ireportidlocal == signinlist[a]){
				isallow = 1;
			}
		}
		if(isallow == 0){
			fn(true);
		}else{
			fn(false);
		}
	}
}


PDline.prototype.yanzheng = function(url, data, time, fn) {
	//如果没有被占用 则没事 如果被占用 则不能使用
	if(this.allowpostsign == ""){
		this.allowpostsign = time;
	}else{
		api.toast({
			msg : '请稍等'
		});
		return;
	}
	this.data = data;
	this.url = url;
	var fnjson = fn;
	var thispdline = this;
	console.log("1");
	this.isallowsignDB(function(result){
		console.log("2"+result);
		if(result){
			setTimeout(function() {
				thispdline.realpost(fnjson);
			}, 1000);
		}else{
			console.log(3);
			this.allowpostsign = "";
			fnjson(true, false);
		}
	});
}

PDline.prototype.realpost = function(fn) {
	console.log("4");
	var datajson = this.data;
	var thispdline = this;
	api.ajax({
		url : $api.posturllujie + thispdline.url,
		method : 'post',
		tag : "",
		headers : {
			'Content-Type' : 'application/json',
			'Authorization' : 'bearer ' + $api.getStorage("token")
		},
		data : {
			body : $api.strToJson(datajson)
		},
		timeout : 30
	}, function(ret, err) {
		if(ret){
			thispdline.jiluhas();
		}
		thispdline.allowpostsign = "";
		if (err) {
			setTimeout(u.senduplog(), 1000);
		}
		//console.log(JSON.stringify(ret) +'---'+ JSON.stringify(err));
		if ( typeof (err) == 'undefined') {
			fn(ret, err);
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
		} else {
			if ( typeof (err.msg) != 'undefined') {
				if ((err.msg.indexOf('<html>') > -1) && (posturl != 'ActionApi/T_Task/T_TaskByUserid')) {
					alert('系统出现错误,请联系后台管理员,' + $api.getStorage("username"));
				} else {
					fn(ret, err);
				}
			} else {
				fn(ret, err);
			}
		}
	});
}
