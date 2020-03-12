/**
 *判断当前的网络状态
 */
function connectionType() {
	api.addEventListener({
		name : 'online'
	}, function(ret, err) {
		if (ret) {
			$api.setStorage('connectionType', ret.connectionType);
		}
	});
	api.addEventListener({
		name : 'offline'
	}, function(ret, err) {
		$api.setStorage('connectionType', 'offline');
	});
}

/**
 *监听项目退到后台的时间
 * 如果超过了一个小时的话
 * 则重新启动APP
 */
var aaaa = 0;
function resumeAPP() {
	api.addEventListener({
		name : 'pause'
	}, function(ret, err) {
		//console.log("应用进入后台");
		var myDatehoutai = new Date();
		var time = myDatehoutai.getTime();
		$api.setStorage('pausetime', time);
		aaaa = 1;
	});
	
	api.addEventListener({
		name : 'resume'
	}, function(ret, err) {
		api.sendEvent({
	        name:'huidaoqiantai'
        });
        
        localTimeRight();
        
		var timehoutai = $api.getStorage('pausetime');
		if (!isempty(timehoutai)) {
			var myDatehoutai = new Date();
			var time = myDatehoutai.getTime();
			var chatime = time - timehoutai;
			//3600000
			if(3600000 < chatime){
				api.rebootApp();
			}
		}
	});
}

/******************
 *
 * 如果网络不好没有签到成功的话 暂时保存到本地
 * 等网络好了之后 同步签到数据
 *
 */
function save_signdata(json, shangxia) {
	var signature = api.require('signature');
	var value = signature.aesSync({
		data : JSON.stringify(json),
		key : 'zhangdandeprivatekey'
	});
	var filename = today() + '_' + shangxia + '_' + $api.getStorage('id');
	save_signtoFile(filename, value, function(msg) {
//		alert(msg);
		if (msg == 'ok') {
			
		}
	});
}

function get_signdata(data) {
	var signature = api.require('signature');
	var value = signature.aesDecodeSync({
		data : data,
		key : 'zhangdandeprivatekey'
	});
	return $api.strToJson(value);
}
/**
 *保存签到信息到本地 
 */
function save_signtoFile(filename, valuemi, callBack) {
	var fs = api.require('fs');
	var retistrue = fs.existSync({
		path : 'fs://.' + $api.getStorage("id")
	});
//	console.log(JSON.stringify(retistrue));
	if (retistrue.exist) {
		//如果存在则直接存
		var retcreatfile = fs.createFileSync({
			path : 'fs://.' + $api.getStorage("id") + '/' + filename + '.txt'
		});
//		alert(JSON.stringify(retcreatfile) +'=====9');
		if (retcreatfile.status) {
			//创建成功之后 读取 然后写入
			var retopenfile = fs.openSync({
				path : 'fs://.' + $api.getStorage("id") + '/' + filename + '.txt',
				flags : 'read_write'
			});
			if (retopenfile.status) {
				var retwritefile = fs.writeSync({
					fd : retopenfile.fd,
					data : valuemi,
					offset : 0
				});
				if (retwritefile.status) {
					callBack('ok');
				} else {
					callBack('no');
				}
			} else {
				callBack('no');
			}
		} else {
			if(retcreatfile.code == '7'){
				//创建成功之后 读取 然后写入
				var retopenfile = fs.openSync({
					path : 'fs://.' + $api.getStorage("id") + '/' + filename + '.txt',
					flags : 'read_write'
				});
				if (retopenfile.status) {
					var retwritefile = fs.writeSync({
						fd : retopenfile.fd,
						data : valuemi,
						offset : 0,
						overwrite: true
					});
					if (retwritefile.status) {
						callBack('ok');
					} else {
						callBack('no');
					}
				} else {
					callBack('no');
				}
			}else{
				callBack('no');
			}
		}
	} else {
		//如果没有则直接创建
		var retcreatdir = fs.createDirSync({
			path : 'fs://.' + $api.getStorage("id")
		});
		if (retcreatdir.status) {
			//如果存在则直接存
			var retcreatfile = fs.createFileSync({
				path : 'fs://.' + $api.getStorage("id") + '/' + filename + '.txt'
			});
			if (retcreatfile.status) {
				//创建成功之后 读取 然后写入
				var retopenfile = fs.openSync({
					path : 'fs://.' + $api.getStorage("id") + '/' + filename + '.txt',
					flags : 'read_write'
				});
				if (retopenfile.status) {
					var retwritefile = fs.writeSync({
						fd : retopenfile.fd,
						data : valuemi,
						offset : 0
					});
					if (retwritefile.status) {
						callBack('ok');
					} else {
						callBack('no');
					}
				} else {
					callBack('no');
				}
			} else {
				if(retcreatfile.code == '7'){
					//创建成功之后 读取 然后写入
					var retopenfile = fs.openSync({
						path : 'fs://.' + $api.getStorage("id") + '/' + filename + '.txt',
						flags : 'read_write'
					});
					if (retopenfile.status) {
						var retwritefile = fs.writeSync({
							fd : retopenfile.fd,
							data : valuemi,
							offset : 0,
							overwrite: true
						});
						if (retwritefile.status) {
							callBack('ok');
						} else {
							callBack('no');
						}
					} else {
						callBack('no');
					}
				}else{
					callBack('no');
				}
			}
		}
	}
}

/**
 *批量上传多个待上传的签到数据
 */

var shunxu_num = 0;

//预防措施 最多同步6条
var maxtongbunum = 0;
//上传失败了几个 失败之后提示
var faileupload = 0;

function kaishitongbu() {
	jiazai();
	shunxu_num = 0;
	maxtongbunum = 0;
	faileupload = 0;
	uploadallsign();
}

function uploadallsign() {
	maxtongbunum++;
	var fs = api.require('fs');
	var retreadall = fs.readDirSync({
		path : 'fs://.' + $api.getStorage("id")
	});
	//{"code":0,"status":true,"data":["2018-05-03上班打卡.txt"]}
	//console.log(JSON.stringify(retreadall) + "====" + shunxu_num);
	if (retreadall.status) {
		if (shunxu_num < retreadall.data.length) {
			var path = 'fs://.' + $api.getStorage("id") + '/' + retreadall.data[shunxu_num];
			var retopen = fs.openSync({
				path : path,
				flags : 'read_write'
			});
			if (retopen.status) {
				var retread = fs.readSync({
					fd : retopen.fd,
					offset : 0
				});
				if (retread.status) {
					var numversion = retread.data;
					if(numversion == ''){
						var fs = api.require('fs');
						var retdel = fs.removeSync({
							path : path
						});
						setTimeout('uploadallsign()', 300);
					}else{
						numversion = numversion.replace(/[\r\n]/g, "");
						numversion = $api.trim(numversion);
						upload_signjson(get_signdata(numversion), path);
					}
				}
			}else{
				tingzhi();
			}
		}else{
			tingzhi();
		}
	}else{
		tingzhi();
	}
}

function upload_signjson(json, path) {

	$api.setStorage("iscloseupload", "1");
	api.cancelAjax({
		tag : 'uploadpic'
	});
	//	console.log(JSON.stringify(values));
	$kunchi.kunchipost('ActionApi/T_Sign/PostT_Sign', json, function(ret, err) {
				//console.log(JSON.stringify(ret) + "---" + JSON.stringify(err));
		tingzhi();
		$api.setStorage("iscloseupload", "0");
		api.sendEvent({
			name : 'upload_databasepic'
		});
		if (ret) {
			//console.log(path);
			var fs = api.require('fs');
			var retdel = fs.removeSync({
				path : path
			});
			//console.log(JSON.stringify(retdel));
			setTimeout('uploadallsign()', 300);
		} else {
			shunxu_num++;
			
			if(err.statusCode == 406){
				if(typeof(err.body.errorCode) != 'undefined'){
					if(err.body.errorCode == "40003"){
						var fs = api.require('fs');
						var retdel = fs.removeSync({
							path : path
						});
						setTimeout('uploadallsign()', 300);
					}else{
						setTimeout('uploadallsign()', 300);
					}
				}else{
					setTimeout('uploadallsign()', 300);
				}
			}else{
				setTimeout('uploadallsign()', 300);
			}
		}
	}, 10);
}

/**
 *获取有多少个待上传的签到没有上传
 */
function get_nohasupload() {
	var fs = api.require('fs');
	var retreadall = fs.readDirSync({
		path : 'fs://.' + $api.getStorage("id")
	});
	//{"code":0,"status":true,"data":["2018-05-03上班打卡.txt"]}
	if (retreadall.status) {
		return retreadall.data.length;
	} else {
		return 0;
	}
}


/**
 *获取当天是否有已签到的数据 
 */
function get_today_sign(){
	var today = $kunchi.todaydate();
	var fs = api.require('fs');
	var retreadall = fs.readDirSync({
		path : 'fs://.' + $api.getStorage("id")
	});
	//{"code":0,"status":true,"data":["2018-05-03上班打卡.txt"]}
	//console.log(JSON.stringify(retreadall));
	tingzhi();
	if (retreadall.status) {
		var namelist = new Array();
		for(a = 0; a < retreadall.data.length; a++){
			if(retreadall.data[a].indexOf(today) > -1){
				namelist.push(retreadall.data[a]);
			}
		}
		showsign_database(namelist);
	}
}

/**
 *如果有签到数据 则判断好了之后显示出来 
 */
function showsign_database(namelist){
	var signin = '上班打卡';
	var signout = '下班打卡';
	var fs = api.require('fs');
	if(namelist.length > 0){
		for(var a = 0; a < namelist.length; a++){
			var nameone = namelist[a];
			if(nameone.indexOf(signin) > -1){
				var retopen = fs.openSync({
					path : 'fs://.' + $api.getStorage("id") + '/' + nameone,
					flags : 'read_write'
				});
				if (retopen.status) {
					var retread = fs.readSync({
						fd : retopen.fd,
						offset : 0
					});
//					console.log(JSON.stringify(retread) + "347");
					if (retread.status) {
						if(retread.data == ''){
							var fs = api.require('fs');
							var retdel = fs.removeSync({
								path : path
							});
						}else{
							var signjsonmi = retread.data;
							signjsonmi = signjsonmi.replace(/[\r\n]/g, "");
							signjsonmi = $api.trim(signjsonmi);
							var signjson = get_signdata(signjsonmi);
//							console.log(signjson + "===359");
							signinTypeHas = 0; 
							
							var elsignin = document.getElementById("signin");
							var elsigninaddress = document.getElementById("signinaddress");
							var elsignintime = document.getElementById("signintime");
							$api.css(elsignin,"display: none;");
							$api.css(elsigninaddress,"display: block;");
							$api.css(elsignintime,"display: block;");
							document.getElementById("signintime").innerHTML = "签到时间:<br/>" + signjson.dtCreateTime;
							document.getElementById("signinaddress").innerHTML = "上班地址:<br/>" + signjson.cTitle;
							exexutesqlother('SELECT * FROM piclist where picname = "'+signjson.cPicUrl.split("/")[1]+'";', function(aaa){
								if(aaa != "no"){
									document.getElementById("signinpic").src = 'data:image/jpg;base64,'+aaa.data[0].picurl;
								}else{
									document.getElementById("signinpic").src = $api.posturllujie+'Content/UploadFiles/mobile/'+signjson.cPicUrl;
								}
							});
						}
					}
				}
			}
			if(nameone.indexOf(signout) > -1){
				var retopen = fs.openSync({
					path : 'fs://.' + $api.getStorage("id") + '/' + nameone,
					flags : 'read_write'
				});
//				console.log(JSON.stringify(retopen));
				if (retopen.status) {
					var retread = fs.readSync({
						fd : retopen.fd,
						offset : 0
					});
//					console.log(JSON.stringify(retread));
					if (retread.status) {
						if(retread.data == ''){
							var fs = api.require('fs');
							var retdel = fs.removeSync({
								path : path
							});
						}else{
							var signjsonmi = retread.data;
							signjsonmi = signjsonmi.replace(/[\r\n]/g, "");
							signjsonmi = $api.trim(signjsonmi);
							var signjson = get_signdata(signjsonmi);
							
							signtoutTypeHas = 0; 
							
							var signout = document.getElementById("signout");
							var signoutaddress = document.getElementById("signoutaddress");
							var signouttime = document.getElementById("signouttime");
							$api.css(signout,"display: none;");
							$api.css(signoutaddress,"display: block;");
							$api.css(signouttime,"display: block;");
	//						console.log(signjson);
							document.getElementById("signouttime").innerHTML = "签到时间:<br/>" + signjson.dtCreateTime;
							document.getElementById("signoutaddress").innerHTML = "上班地址:<br/>" + signjson.cTitle;
							exexutesqlother('SELECT * FROM piclist where picname = "'+signjson.cPicUrl.split("/")[1]+'";', function(aaa){
								if(aaa != "no"){
									document.getElementById("signoutpic").src = 'data:image/jpg;base64,'+aaa.data[0].picurl;
								}else{
									document.getElementById("signoutpic").src = $api.posturllujie+'Content/UploadFiles/mobile/'+signjson.cPicUrl;
								}
							});
						}
					}
				}
			}
			
		}
	}
	//console.log('signtoutTypeHas:'+signtoutTypeHas + '****signinTypeHas:' + signinTypeHas);
}

