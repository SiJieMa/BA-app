/**
 *
 * 需要测试的功能
 * 1、大量的报告，图片保存到本地，报告上传服务器之后，重新打开是否会魂环
 * 2、接着第一条，删除图片，重新拍照图片之后，是否会出现照片没删掉或者新图片没有添加进去的情况
 * 3、批量上传图片之后，显示已上传图片，是否还会再未上传图片列表中出现
 * 4、已上传的图片报告，图片是否已经存在，是否有混乱的情况（） 
 * 5、已上传的图片报告，从APP中打开报告会不会正常显示
 * 6、图片上传完成之后，在APP中打开报告，再次进行删除、重新拍照、上传本地图片、查看APP及后台报告流程，确认图片是否正常。
 * 7、需要多测试失败的几种情况，4G转WIFI，WIFI转4G，上传中断网或者转网速不好 图片上传会变成什么样子
 * 
 * 
 */


//判断有没有本地数据库 有就直接打开，没有就复制一份到本地再打开
function initLocalPath() {
	var fs = api.require('fs');
	var retfs1 = fs.existSync({
		path : dbfilepath
	});
	if (retfs1.exist) {
		openLocalPath();
	} else {
		var retfs2 = fs.copyToSync({
			oldPath : 'widget://res/NewPList.db',
			newPath : 'fs://.kunchibaPIC'
		});
		if (retfs2.status) {
			openLocalPath();
		} else {
			api.toast({
				msg : '初始化本地图片库失败'
			});
		}
	}
}
//打开本地数据库  用来操作本地图片库
function openLocalPath() {
	var db = api.require('db');
	var ret = db.openDatabaseSync({
		name : dbname,
		path : dbfilepath
	});
	if (ret.status) {
		PicCKishastab(function(states){
			if(!states){
				//创建拜访时间列表
				var eventBindPic = db.executeSqlSync({
				    name: dbname,
				    sql: 'CREATE TABLE "BindPic" ("guidid"	TEXT,"cPicPath"	TEXT,"cPicClass"	TEXT,"iStoreId"	TEXT,"iSize"	TEXT,"cPicType"	TEXT,"iUserId"	TEXT,"cRoleName"	TEXT,"cUserName"	TEXT,"iTrainId"	TEXT,	"dtUploadTime"	DATE,	"localguid"	TEXT)'
				});
				//console.log(JSON.stringify(eventBindPic));
				if(eventBindPic.status){
				}
				var eventPicBase64 = db.executeSqlSync({
				    name: dbname,
				    sql: 'CREATE TABLE "PicBase64" ("localguidid" TEXT,	"filename" TEXT, "base64str" BLOB, "filepath" TEXT,	"bindguidid" TEXT, "time" DATE)'
				});
				//console.log(JSON.stringify(eventPicBase64));
				if(eventPicBase64.status){
				}
				api.toast({
					msg : '本地图片库初始化完成'
				});
			}else{
				api.toast({
					msg : '本地图片库初始化完成'
				});
			}
		});
	} else {
		api.toast({
			msg : '初始化本地图片库失败'
		});
	}
}

function PicCKishastab(callBack){
	var db = api.require('db');
	var ret = db.selectSqlSync({
	    name: dbname,
	    sql: "SELECT * FROM PicBase64 limit 1;"
	});
	//console.log(JSON.stringify(ret));
	if(ret.status){
		callBack(true);
	}else{
		callBack(false);
	}
}

//打开的数据库名称
var dbname = 'NewPList';
//数据库的本地路径
var dbfilepath = 'fs://.kunchibaPIC/NewPList.db';
//用来获取还有多少个图片没有上传
var SQL_picallnum = 'SELECT count(*) FROM "BindPic"';
//用来插入的SQL
var SQL_inbingdpic = 'INSERT INTO BindPic VALUES ("guid", "picpath", "picclass", "storeid", 0, "pictype", "userid", "rolename", "username", "iTrainId", "uploadtime")';

var PicCK = function() {
}

PicCK.prototype = {
	//统计一共有多少个没有上传的图片
	picAllNum : function() {
		var db = api.require('db');
		var ret = db.selectSqlSync({
			name : dbname,
			sql : SQL_picallnum
		});
		//console.log(JSON.stringify(ret));
		if (ret.status) {
			return ret.data;
		} else {
			return false;
		}
	},
	//将图片保存到本地
	INpicfile: function(guid, filename, base64, filepath, bindguidid, uploadtime, callBack){
		var sqlpicin = 'INSERT INTO PicBase64 VALUES ("'+guid+'","'+filename+'","'+base64+'","'+filepath+'","'+bindguidid+'","'+uploadtime+'");';
		var db = api.require('db');
		//console.log("sqlpicin:"+sqlpicin);
		var ret = db.executeSqlSync({
		    name: dbname,
		    sql: sqlpicin
		});
		console.log(JSON.stringify(ret));
		if(ret.status){
			callBack(true);
		}else{
			callBack(false);
		}
	},
	//将绑定的图片信息板寸到本地
	INpicbind: function(guid, picpath, picclass, storeid, pictype, userid, rolename, username, iTrainId, uploadtime, localguid, callBack){
		var sqlinbind = 'INSERT INTO BindPic VALUES ("'+guid+'", "'+picpath+'", "'+picclass+'", "'+storeid+'", 0, "'+pictype+'", "'+userid+'", "'+rolename+'", "'+username+'", "'+iTrainId+'", "'+uploadtime+'", "'+localguid+'")';
		var db = api.require('db');
		var ret = db.executeSqlSync({
		    name: dbname,
		    sql: sqlinbind
		});
		if(ret.status){
			callBack(true);
		}else{
			callBack(false);
		}
	},
	//删除本地照片功能
	DELpicall: function(guid, callBack){
		//首先查询一下是否有绑定表得图片信息，如果有得话 顺便查询出来绑定得base64图片信息，一起删掉
		//b3e26bd4-1b3e-454e-80ed-2ab72346384b
		var selectbind = 'SELECT * FROM BindPic WHERE guidid = "'+guid+'"';
		//console.log(selectbind);
		var db = api.require('db');
		var retbind = db.selectSqlSync({
		    name: dbname,
		    sql: selectbind
		});
		//console.log(JSON.stringify(retbind));
		//{"data":[{"guidid":"d4c37eff-3b76-49a2-b19f-0900031b23fd","cPicPath":"20191125/157467076953615012603941.jpg","cPicClass":"人际沟通BA","iStoreId":"64317850-068c-4094-9cf1-0020de3c29b9","iSize":"0","cPicType":"PhotoType","iUserId":"8b92d65d-1832-47f1-9a40-f4b7989f7661","cRoleName":"业务主管","cUserName":"郑小翠","iTrainId":"4eef0724-b0e1-44ca-81d1-40603ae4d202","dtUploadTime":"2019-11-25 16:32:49","localguid":"1bc0df50-5c03-48a5-817c-25e81e840bf1"}],"status":true}
		if(retbind.status){
			//console.log(retbind.data.length);
			if(retbind.data.length > 0){
				var localpicguid = retbind.data[0].localguid;
				
				
				var selectlocal = 'SELECT * FROM PicBase64 WHERE localguidid = "'+localpicguid+'"';
				var retlocal = db.selectSqlSync({
				    name: dbname,
				    sql: selectlocal
				});
				
				//查询完成之后  删除绑定的图片
				//删除本地绑定记录
				var delbinditem = 'DELETE FROM BindPic WHERE guidid = "'+guid+'"';
				var delbinddb = db.executeSqlSync({
				    name: dbname,
				    sql: delbinditem
				});
				//console.log(delbinditem);
				//console.log(JSON.stringify(delbinddb));
				//console.log(JSON.stringify(retlocal));
				if(retlocal.status){
					if(retlocal.data.length > 0){
						
						//删除本地保存的图片
						var dellocalitem = 'DELETE FROM PicBase64 WHERE localguidid = "'+localpicguid+'"';
						//console.log(dellocalitem);
						var dellocaldb = db.executeSqlSync({
						    name: dbname,
						    sql: dellocalitem
						});
						//console.log(JSON.stringify(dellocaldb));
						callBack(true);
					}else{
						callBack(true);
					}
				}else{
					callBack(true);
				}
			}else{
				callBack(true);
			}
		}else{
			callBack(true);
		}
	},
	//查询当前图片是否在本地存在 如果存在就返回图片地址
	SELECTguidlist: function(guidarray, callBack){
		var selectpicfilenamelist = "";
		if(guidarray.length == 0){
			return false;
		}else{
			for(var a = 0; a < guidarray.length; a++){
				if(a == (guidarray.length - 1)){
					selectpicfilenamelist += ('"' + guidarray[a] + '"');
				}else{
					selectpicfilenamelist += ('"' + guidarray[a] + '"') + ',';
				}
			}
		}
	
		//var selectpicfile = 'SELECT * FROM BindPic WHERE iTrainId in ('+selectpicfilenamelist+');';
		var selectpicfile = 'SELECT t1.*,t2.* FROM BindPic as t1 LEFT JOIN PicBase64 as t2 on t2.localguidid = t1.localguid WHERE t1.iTrainId in ('+selectpicfilenamelist+');';
		
		var db = api.require('db');
		var ret = db.selectSqlSync({
		    name: dbname,
		    sql: selectpicfile
		});
		if(ret.status){
			callBack(ret);
		}else{
			callBack("");
		}
	},
	//查询当前手机所有的未上传的图片
	GETallpic: function(index , page, callBack){
		var getallpiclist = 'SELECT t1.*,t2.* FROM BindPic as t1 LEFT JOIN PicBase64 as t2 on t2.localguidid = t1.localguid LIMIT '+index+', '+page+';';
		var db = api.require('db');
		var ret = db.selectSqlSync({
		    name: dbname,
		    sql: getallpiclist
		});
		if(ret.status){
			callBack(ret);
		}else{
			callBack("");
		}
	},
	//上传本地图片使用 一张一张的删除图片以及绑定图片功能
	DELonepic: function(localguidid, guidid, callBack){
		var db = api.require('db');
		//删除本地保存的图片
		var dellocalitem = 'DELETE FROM PicBase64 WHERE localguidid = "'+localguidid+'"';
		//console.log(dellocalitem);
		var dellocaldb = db.executeSqlSync({
		    name: dbname,
		    sql: dellocalitem
		});
		var delbinditem = 'DELETE FROM BindPic WHERE guidid = "'+guidid+'"';
		var delbinddb = db.executeSqlSync({
		    name: dbname,
		    sql: delbinditem
		});
		callBack(true);
	},
	cleardblog: function(callBack){
		//清理数据库日志内存，方式占用太大空间
		var db = api.require('db');
		var cleardblogsqlPicBase64 = 'VACUUM PicBase64';
		var dellocaldbPicBase64 = db.executeSqlSync({
		    name: dbname,
		    sql: cleardblogsqlPicBase64
		});
		//console.log(JSON.stringify(dellocaldbPicBase64));
		var cleardblogsqlBindPic = 'VACUUM BindPic';
		var dellocaldbBindPic = db.executeSqlSync({
		    name: dbname,
		    sql: cleardblogsqlBindPic
		});
		//console.log(JSON.stringify(dellocaldbBindPic));
		
		callBack(true);
	},
	getdaijiaopic: function(namelist, callBack){
		//SELECT * FROM BindPic WHERE ("iTrainId", "iStoreId", "iUserId") in (("daijiaobaogao103620", "2da919be-bbd0-49a9-bc23-44c915268432", "61076e6a-7284-4f8a-a2cc-3b0c96eab854"))
		//var getallpiclist = 'SELECT * FROM BindPic WHERE cPicPath in ('+namelist+');';
		
		var selectsqlguid = "";
		for(var a = 0; a < namelist.length; a++){
			if(a == (namelist.length - 1)){
				selectsqlguid += ('"'+namelist[a]+'"');
			}else{
				selectsqlguid += ('"'+namelist[a]+'",');
			}
		}
		
		var getallpiclist = 'SELECT t1.* , t2.* FROM BindPic as t1 LEFT JOIN PicBase64 as t2 on t2.localguidid = t1.localguid WHERE t1.cPicPath in ('+selectsqlguid+');';
		var db = api.require('db');
		var ret = db.selectSqlSync({
		    name: dbname,
		    sql: getallpiclist
		});
		if(ret.status){
			callBack(ret);
		}else{
			callBack("");
		}
	}
}
