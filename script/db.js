function opendb() {
	var db = api.require('db');
	var ret = db.openDatabaseSync({
	    name: 'kunchidb'
	});
	if(ret.status){
		is_creat_db();
	}else{
		api.alert({
		    title: '提示',
		    msg: '创建本地信息库失败,请检查APP权限是否开启',
		}, function(ret, err) {
		});
	}
}

function begin_transction(callBack) {
	var db = api.require('db');
	db.transaction({
		name : 'kunchidb',
		operation : 'begin'
	}, function(ret, err) {
		callBack("1");
	});
}

function commit_transction(callBack) {
	var db = api.require('db');
	db.transaction({
		name : 'kunchidb',
		operation : 'commit'
	}, function(ret, err) {
		callBack("1");
	});
}

function rollback_transction(callBack) {
	var db = api.require('db');
	db.transaction({
		name : 'kunchidb',
		operation : 'rollback'
	}, function(ret, err) {
		callBack("1");
	});
}

function is_creat_db() {
	var db = api.require('db');
	var ret = db.selectSqlSync({
	    name: 'kunchidb',
	    sql: 'SELECT * FROM eventlist where isupload = "已有";'
	});
	if(ret.status){
		//已经创建了表了
//		alert("创建了表了已经");
		AlterDB();
	}else{
		//还没有创建表
		creat_all_db();
	}
}

//用来补充数据库的 如果该数组据已经创建过了 则增加对应的字段
function AlterDB(){
	var db = api.require('db');
	var piclist = db.executeSqlSync({
	    name: 'kunchidb',
	    sql: 'ALTER TABLE piclist ADD filepath varchar(255)'
	});
	if(piclist.status){
	}
}

function creat_all_db(){

	//四大分类  洗护类1、护肤类2、口腔类3、彩妆类4


	var db = api.require('db');
	//创建拜访时间列表
	var eventlist = db.executeSqlSync({
	    name: 'kunchidb',
	    sql: 'CREATE TABLE eventlist(isupload varchar(255), iStoreId varchar(255), cStoreFullName varchar(255), cStoreCode varchar(255), cLon varchar(255), cLat varchar(255), dtPlantTime varchar(255), iRorptId varchar(255), iWorkType varchar(255), iStatue varchar(255))'
	});
	if(eventlist.status){
	}
	//创建进店时间列表
	var signin = db.executeSqlSync({
	    name: 'kunchidb',
	    sql: 'CREATE TABLE signinlist(isupload varchar(255), signpicname varchar(255), signlon varchar(255), signlat varchar(255), signaddress varchar(255), signtime varchar(255), iRorptId varchar(255))'
	});
	if(signin.status){
	}
	//创建离店时间列表
	var signoutlist = db.executeSqlSync({
	    name: 'kunchidb',
	    sql: 'CREATE TABLE signoutlist(isupload varchar(255), signpicname varchar(255), signlon varchar(255), signlat varchar(255), signaddress varchar(255), signtime varchar(255), iRorptId varchar(255))'
	});
	if(signoutlist.status){
	}
	/**
	 * zidianname 陈列报告在字典中的名字
	 * zidianid 陈列报告在字典中的id
	 * pinpainame 对应品牌名称
	 * pinpaiid 对应品牌id
	 * iRorptListTime 在获取的报告列表中的创建时间
	 * chenliecreattime 本条记录的创建时间
	 * fenleiname, fenleiid 口腔类等在字典中的名字和id
	 */
	var chenlielist = db.executeSqlSync({
	    name: 'kunchidb',
	    sql: 'CREATE TABLE chenlielist(userid varchar(255), leftgood varchar(255), rightgood varchar(255), hascuxiao varchar(255), chenlie text, cuxiao text, jingpin text,'
	    +' zidianname varchar(255), zidianid varchar(255), zidiantype varchar(255), pinpainame varchar(255), pinpaiid varchar(255), fenleiname varchar(255), fenleiid varchar(255), '
	    +'iRorptId varchar(255), iRorptListTime varchar(255), chenliecreattime varchar(255) ,iStoreId varchar(255), bei1 varchar(255), bei2 varchar(255), bei3 varchar(255), bei4 varchar(255), '
	    +'bei5 varchar(255), bei6 varchar(255), bei7 text, bei8 text, cStoreCode varchar(255))'
	});
	if(chenlielist.status){
	}
	var quehuolist = db.executeSqlSync({
	    name: 'kunchidb',
	    sql: 'CREATE TABLE quehuolist(userid varchar(255), zidianname varchar(255), zidianid varchar(255), zidiantype varchar(255), pinpainame varchar(255), pinpaiid varchar(255), '
	    +'iRorptId varchar(255), iRorptListTime varchar(255), iStoreId varchar(255), cStoreCode varchar(255), goodname varchar(255), goodid varchar(255),'
	    +'bei1 varchar(255), bei2 varchar(255), bei3 varchar(255), bei4 varchar(255), bei5 varchar(255), bei6 varchar(255), bei7 text, bei8 text)'
	});
	if(quehuolist.status){
	}
	var daijiaofenlist = db.executeSqlSync({
	    name: 'kunchidb',
	    sql: 'CREATE TABLE daijiaofenlist(bauserid ,userid varchar(255), zidianname varchar(255), zidianid varchar(255), zidiantype varchar(255), pinpainame varchar(255), pinpaiid varchar(255), '
	    +'pingjianame varchar(255), pingjiaid varchar(255), normalfen varchar(255), pingfen varchar(255), iRorptId varchar(255), iRorptListTime varchar(255) ,iStoreId varchar(255),'
	    +' cStoreCode varchar(255), bei1 varchar(255), bei2 varchar(255), bei3 varchar(255), bei4 varchar(255), bei5 varchar(255), bei6 varchar(255), bei7 text, bei8 text)'
	});
	if(daijiaofenlist.status){
	}

	var daijiaopiclist = db.executeSqlSync({
	    name: 'kunchidb',
	    sql: 'CREATE TABLE daijiaopiclist(bauserid, userid varchar(255), thisfudao varchar(255), nextfudao varchar(255), bapiclist varchar(255), pinggupiclist varchar(255), iRorptId varchar(255),'
	+' iRorptListTime varchar(255), iStoreId varchar(255), cStoreCode varchar(255), zidianname varchar(255), zidianid varchar(255), zidiantype varchar(255), pinpainame varchar(255), pinpaiid varchar(255),'
	    	+'bei1 varchar(255), bei2 varchar(255), bei3 varchar(255), bei4 varchar(255), bei5 varchar(255), bei6 varchar(255), bei7 text, bei8 text)'
	});
	if(daijiaopiclist.status){
	}

	var chenlielist = db.executeSqlSync({
	    name: 'kunchidb',
	    sql: 'CREATE TABLE reportlist(userid varchar(255), context text, zidianname varchar(255), zidianid varchar(255), zidiantype varchar(255), iRorptId varchar(255),'
	    +'bei1 varchar(255), bei2 varchar(255), bei3 varchar(255), bei4 varchar(255), bei5 varchar(255), bei6 varchar(255), bei7 text, bei8 text)'
	});
	if(chenlielist.status){
	}






	//每个填表的事件的总结
	var shijianlist = db.executeSqlSync({
	    name: 'kunchidb',
	    sql: 'CREATE TABLE shijianlist(Id_P int,eventid int, leixingid int,jianchalistid int, fourtypeid int,leftgood varchar(255), rightgood varchar(255), issale varchar(255), chenlie array, cuxiao array, jingpin array)'
	});
	if(shijianlist.status){
//		console.log("shijianlist");
	}
	//进店之后的三个 陈列报告 缺货报告 BA带教报告 的列表
	var jianchalist = db.executeSqlSync({
	    name: 'kunchidb',
	    sql: 'CREATE TABLE jianchalist(Id_P int,eventid int, jindu varchar(255))'
	});
	if(jianchalist.status){
//		console.log("jianchalist");
	}

	var piclist = db.executeSqlSync({
	    name: 'kunchidb',
	    sql: 'CREATE TABLE piclist(picurl BLOB, picname varchar(255), isupload int, filepath varchar(255))'
	});
	if(piclist.status){
//		console.log("piclist");
	}


	var ribaonumupdate = db.executeSqlSync({
	    name: 'kunchidb',
	    sql: 'CREATE TABLE ribaonumupdate(sumbittime varchar(255), taskid varchar(255))'
	});
	if(ribaonumupdate.status){
	}


	var ribaonum = db.executeSqlSync({
	    name: 'kunchidb',
	    sql: 'CREATE TABLE ribaonum(sumbittime varchar(255), taskid varchar(255), pinpaiid varchar(255), onedaysale int)'
	});
	if(ribaonum.status){
	}
	/**
	 *pictype 品牌类型为促销图片还是陈列图片 促销或陈列  1陈列图片 2促销图片
	 */
	var ribaopic = db.executeSqlSync({
	    name: 'kunchidb',
	    sql: 'CREATE TABLE ribaopic(sumbittime varchar(255), taskid varchar(255), pinpaiid varchar(255), pictype varchar(255), picname varchar(255))'
	});
	if(ribaopic.status){
	}

	var ribaopicupdate = db.executeSqlSync({
	    name: 'kunchidb',
	    sql: 'CREATE TABLE ribaopicupdate(sumbittime varchar(255), taskid varchar(255))'
	});
	if(ribaopicupdate.status){
	}
}

function executeSql(sql, callBack) {
	var db = api.require('db');
	var ret = db.executeSqlSync({
	    name: 'kunchidb',
	    sql: sql
	});

//	console.log(JSON.stringify(ret) + "----" + sql);
	if(ret.status){
		callBack("1");
	}else{
		callBack("2");
	}
}

function exexutesqlother(sql, callBack){
	//{"data":[],"status":true}
	var db = api.require('db');
	var ret = db.selectSqlSync({
	    name: 'kunchidb',
	    sql: sql
	});
	if(ret.status){
		if(ret.data.length == 0){
			callBack("no");
		}else{
			callBack(ret);
		}
	}else{
		//还没有创建表
		callBack("no");
	}
}


function copydb(){
	var db = api.require('db');
	db.subfile({
			directory: ''
	}, function(ret, err) {
			if (ret.status) {
					console.log(JSON.stringify(ret));
					for(var a = 0; a < ret.files.length; a++){
						var fs = api.require('fs');
						fs.copyTo({
								oldPath: ret.files[a],
								newPath: 'fs://floderdb'
						}, function(ccc, ddd) {
								if (ret.status) {
										console.log(JSON.stringify(ccc));
								} else {
										console.log(JSON.stringify(ddd));
								}
						});
					}
			} else {
					console.log(JSON.stringify(err));
			}
	});
}
