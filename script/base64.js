function changeto64(imgPath, callBack) {
	var trans = api.require('trans');
	trans.decodeImgToBase64({
		imgPath : imgPath
	}, function(ret, err) {
		if (ret.status) {
			callBack(ret.base64Str);
		} else {
			callBack("错误");
		}
	});
}


function openDiyCarmerPaiZhao(cSignType, cStoreFullName){
	var CarmerTypeUserSet = $api.getStorage('CarmerTypeUserSet');
	//系统相机
	if(isempty(CarmerTypeUserSet)){
		openPhoneDBCarmer(cSignType, cStoreFullName);
	}else{
		//系统相机
		if(CarmerTypeUserSet == 'xitong'){
			openPhoneDBCarmer(cSignType, cStoreFullName);
		}else if(CarmerTypeUserSet == 'zidingyi'){
			//自定义相机
			openDiyCarmer(cSignType, cStoreFullName);
		}
	}
}


/**
 *打开两个不同的相机
 * 并开始上传服务器
 */
function openDiyCarmer(cSignType, cStoreFullName){
	api.addEventListener({
	    name: 'DIYCarmer'
	}, function(ret, err) {
		var typename = ret.value.typename;
		if(typename == 'cancel'){
			api.closeWin({
			    name: 'DIYCarmerWin'
			});
			api.toast({
	            msg:'用户取消拍照'
            });
		}else if(typename == 'ok'){
			api.closeWin({
			    name: 'DIYCarmerWin'
			});
			api.closeWin({
			    name: 'showCarmerPicSale'
			});
			//图片拍照完成
			var diycarmerpic = ret.value.diycarmer;
			ChuLiNewCarmerPic(diycarmerpic, cSignType, cStoreFullName);
		}
	});
	api.openWin({
        name: 'DIYCarmerWin',
        url: 'widget://html/sale/carmer/DIYCarmer.html'
    });
}


function openPhoneDBCarmer(cSignType, cStoreFullName){
	var quality = 100;
	var systemType = api.systemType;
	if(systemType == 'ios'){
		quality = 40;
	}
	api.getPicture({
		sourceType : 'camera',
		encodingType : 'jpg',
		destinationType: 'url',
		quality: quality,
		mediaValue : 'pic',
		targetWidth: 500,
		destinationType : 'url',
		allowEdit : false,
		saveToPhotoAlbum : false
	}, function(ret, err) {
		if (ret) {
			if(ret.data != ""){
				ChuLiNewCarmerPic(ret.data, cSignType, cStoreFullName);
			}
		} else {
			api.toast({
	            msg:'用户取消拍照'
            });
		}
	});
}


function ChuLiNewCarmerPic(imagepath, cSignType, cStoreFullName){
	arraylist = [];
	var myDate = new Date();
	var paitime = $kunchi.todaytime();
	putpic(cStoreFullName, $api.getStorage("realName"), cSignType, cSignType, paitime, imagepath, function(isrue, picurl){
		if(isrue == "yes"){
			picurl = picurl.replace("data:image/jpeg;base64,","");
			picurl = picurl.replace("data:image/png;base64,","");
			var arraylistitem = {"filename":myDate.getTime()+$api.getStorage("username")+".jpg","base64str":picurl};
			arraylist.push(arraylistitem);
			upload_toonline();
		}else{
			changeto64(imagepath, function(msg) {
				if (msg != "错误") {
					var arraylistitem = {"filename":myDate.getTime()+$api.getStorage("username")+".jpg","base64str":msg};
					arraylist.push(arraylistitem);
					upload_toonline();
				}
			});
		}
	});
}



/**
 *待上传图片或者上传失败图片进行批量上传
 */

var isupload_yunxu = 0;
/**
 *判断是否暂时需要管理上传图片问题
 * iscloseupload 0为可以 1为不可以
 */

function upload_all_fail_piclist(){

	if($api.getStorage("iscloseupload") == "1"){
		return;
	}

	exexutesqlother('SELECT * FROM piclist where isupload = "0" ORDER BY picname limit 0,1;', function(aaa){
		if(aaa != "no"){
			var piclist = [];
			var filepath = aaa.data[0].filepath;
			if((typeof(filepath) == 'undefined')||(filepath == null)||(filepath == "null")||(filepath == "")||(filepath == "undefined")){
				filepath = 'oldPicList';
			}
			var piclistitem = {"filename":aaa.data[0].picname,"base64str":aaa.data[0].picurl, filepath: aaa.data[0].filepath};
			piclist.push(piclistitem);
      //console.log(JSON.stringify(piclist));
			$kunchi.kunchiuploadpic('api/Upload', JSON.stringify(piclist), function(ret,err){
				console.log(JSON.stringify(ret) + "----" + JSON.stringify(err));
				if (ret) {
					console.log('上传成功');
					var db = api.require('db');
					var sqlsql = 'UPDATE piclist set isupload = "1" WHERE picname = "'+piclist[0].filename + '";';
					db.executeSql({
					    name: 'kunchidb',
					    sql: sqlsql
					}, function(ccc, ddd) {
					});
				}else{
					if(isupload_yunxu < 1){
						isupload_yunxu++;
					}else{
						var db = api.require('db');
						var sqlsql = 'UPDATE piclist set isupload = "2" WHERE picname = "'+piclist[0].filename + '";';
						db.executeSql({
						    name: 'kunchidb',
						    sql: sqlsql
						}, function(ccc, ddd) {
						});
					}
				}
				setTimeout("upload_all_fail_piclist();",500);
			});
		}
	});
}

/**
 * 入参 数组 例如[1,2,3]
 * 出参 字符串  "1,2,3"
 */
function changeType_dblist(lableupdate) {
	var len = lableupdate.length;
	if (len == 0) {
		return 0;
	} else {
		var len = lableupdate.length;
		var picurl = '';
		for (var a = 0; a < len; a++) {
			if (a == (len - 1)) {
				picurl = picurl + '"' + lableupdate[a] + '"';
			} else {
				picurl = picurl + '"' + lableupdate[a] + '"' + ',';
			}
		}
		return picurl;
	}
}




function opencarmer_sale(cStoreFullName, cSignType){
	var quality = 100;
	var systemType = api.systemType;
	if(systemType == 'ios'){
		quality = 40;
	}
	api.getPicture({
		sourceType : 'camera',
		encodingType : 'jpg',
		destinationType: 'url',
		quality: quality,
		mediaValue : 'pic',
		targetWidth: 500,
		destinationType : 'url',
		allowEdit : false,
		saveToPhotoAlbum : false
	}, function(ret, err) {
		if (ret) {
			if(ret.data != ""){
				arraylist = [];
				var imagepath = ret.data;
				var myDate = new Date();
				var paitime = $kunchi.todaytime();
				putpic(cStoreFullName, $api.getStorage("realName"), cSignType, cSignType, paitime, imagepath, function(isrue, picurl){
					if(isrue == "yes"){
						picurl = picurl.replace("data:image/jpeg;base64,","");
						picurl = picurl.replace("data:image/png;base64,","");
						var arraylistitem = {"filename":myDate.getTime()+$api.getStorage("username")+".jpg","base64str":picurl};
						arraylist.push(arraylistitem);
						upload_toonline();
					}else{
						changeto64(imagepath, function(msg) {
							if (msg != "错误") {
								var arraylistitem = {"filename":myDate.getTime()+$api.getStorage("username")+".jpg","base64str":msg};
								arraylist.push(arraylistitem);
								upload_toonline();
							}
						});
					}
				});
			}

		} else {
			api.toast({
	            msg:'用户取消拍照'
            });
		}
	});
}
