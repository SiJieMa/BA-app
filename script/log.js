/**
 *
 * 本功能所需要的模块 mcm fs db
 *
 *
 * @param {即将保存到本地的路径 也就是项目名称 此处为 kunchiba} DbName  即将保存到本地的路径 也就是项目名称 此处为 kunchiba
 * @param {项目保存在res中的文件  此处为Log} ResDbNmae  项目保存在res中的文件  此处为Log
 * @param {打开数据库的时候 的数据库名称  此处为loginfo} OpenDbName  打开数据库的时候 的数据库名称  此处为loginfo
 * @param {上传到云数据库的文件名称 此处为用户手机号} uploadFileName  上传到云数据库的文件名称 此处为用户手机号
 * @param {上传到云数据库的文件名称 此处为用户手机号} appKey  项目的key
 */

var Log = function(DbName, ResDbNmae, OpenDbName, uploadFileName, appKey) {
	//直接删除本地数据库
	var fs = api.require('fs');
	var ret = fs.rmdirSync({
	    path: 'fs://.'+DbName
	});
	if (ret.status) {
	} else {
	    console.log('删除失败！');
	}
	var retpic = fs.rmdirSync({
	    path: 'fs://picture'
	});
	if (retpic.status) {
	} else {
	    console.log('删除失败！');
	}
	var retpicdiy = fs.rmdirSync({
	    path: 'fs://BAguanli'
	});
	if (retpicdiy.status) {
	} else {
	    console.log('删除失败！');
	}
}


/**
 *每次打开项目的时候 初始化此方法
 */
Log.prototype.initDBFile = function() {
}

Log.prototype.writeLogInfo = function(object){
}


Log.prototype.uploadLogInfo = function(){
}

//上传用户的报告日志
Log.prototype.uploadReportDB = function(){
}


Log.prototype.uploaderrLog = function(){
}


Log.prototype.reloadDBFile = function(){
}

Log.prototype.automaticLoadLog = function(){
}


function PanduanIsUpload(uploadnum, appk, DBpath, thistag){
}

function uploadLogUser(DBpath, thistag){
}



var GetTodayTime = function(){
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
	return (clock);
}


function writedb(logtext, phone, jiekou, postvalue, apiversion, bei1, bei2, bei3, bei4, bei5, bei6, bei7){}
//	logtext = logtext.replace(/"([^"]*)"/g, "“$1”");
//	logtext = logtext.replace(/'([^']*)'/g, "‘$1’");
//	postvalue = postvalue.replace(/"([^"]*)"/g, "“$1”");
//	postvalue = postvalue.replace(/'([^']*)'/g, "‘$1’");
