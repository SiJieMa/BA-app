//打开相机
var DiyCarmer_item1;
var DiyCarmer_item2;
var DiyCarmer_item3;
/**
 *item1  门店名称
 * item2 照片类型
 *  item3 照片类型
 */
function openDiyCarmerPaiZhao(item1, item2, item3) {
	DiyCarmer_item1 = item1;
	DiyCarmer_item2 = item2;
	DiyCarmer_item3 = item3;
	var CarmerTypeUserSet = $api.getStorage('CarmerTypeUserSet');
	//系统相机
	if (isemptynew(CarmerTypeUserSet)) {
		openPhoneDBCarmer();
	} else {
		//系统相机
		if (CarmerTypeUserSet == 'xitong') {
			openPhoneDBCarmer();
		} else if (CarmerTypeUserSet == 'zidingyi') {
			//自定义相机
			openDiyCarmer();
		}
	}
}

/**
 *打开两个不同的相机
 * 并开始上传服务器
 */
function openDiyCarmer() {
	api.addEventListener({
		name : 'DIYCarmer'
	}, function(ret, err) {
		var typename = ret.value.typename;
		if (typename == 'cancel') {
			api.closeWin({
				name : 'DIYCarmerWin'
			});
			api.toast({
				msg : '用户取消拍照'
			});
		} else if (typename == 'ok') {
			api.closeWin({
				name : 'DIYCarmerWin'
			});
			api.closeWin({
				name : 'showCarmerPicSale'
			});
			//图片拍照完成
			var diycarmerpic = ret.value.diycarmer;
			ChuLiNewCarmerPic(diycarmerpic);
		}
	});
	api.openWin({
		name : 'DIYCarmerWin',
		url : 'widget://html/sale/carmer/opencarmer.html'
	});
}

function openPhoneDBCarmer() {
	var quality = 100;
	var systemType = api.systemType;
	if (systemType == 'ios') {
		quality = 40;
	}
	api.getPicture({
		sourceType : 'camera',
		encodingType : 'jpg',
		destinationType : 'url',
		quality : quality,
		mediaValue : 'pic',
		targetWidth : 500,
		destinationType : 'url',
		allowEdit : false,
		saveToPhotoAlbum : false
	}, function(ret, err) {
		if (ret) {
			if (ret.data != "") {
				ChuLiNewCarmerPic(ret.data);
			}
		} else {
			api.toast({
				msg : '用户取消拍照'
			});
		}
	});
}

function openPhoneDBAlumn(item1, item2, item3) {
	DiyCarmer_item1 = item1;
	DiyCarmer_item2 = item2;
	DiyCarmer_item3 = item3;
	var quality = 100;
	var systemType = api.systemType;
	if (systemType == 'ios') {
		quality = 40;
	}
	api.getPicture({
		sourceType : 'album',
		encodingType : 'jpg',
		destinationType : 'url',
		quality : quality,
		mediaValue : 'pic',
		targetWidth : 500,
		destinationType : 'url',
		allowEdit : false,
		saveToPhotoAlbum : false
	}, function(ret, err) {
		if (ret) {
			if (ret.data != "") {
				ChuLiNewCarmerPic(ret.data);
			}
		} else {
			api.toast({
				msg : '用户取消选择'
			});
		}
	});
}

function ChuLiNewCarmerPic(imagepath) {
	var DiyCarmerFinishChu_name = '';
	var DiyCarmerFinishChu_url = '';
	var myDate = new Date();
	var paitime = $kunchi.todaytime();
	putpic(DiyCarmer_item1, $api.getStorage("realName"), DiyCarmer_item2, DiyCarmer_item3, paitime, imagepath, function(isrue, picurl) {
		if (isrue == "yes") {
			picurl = picurl.replace("data:image/jpeg;base64,", "");
			picurl = picurl.replace("data:image/png;base64,", "");
			DiyCarmerFinishChu_name = myDate.getTime() + $api.getStorage("username") + ".jpg";
			DiyCarmerFinishChu_url = picurl;
			upload_sale_sign_pic(DiyCarmerFinishChu_name, DiyCarmerFinishChu_url, carmerli);
		} else {
			DiyCarmerFinishChu_name = myDate.getTime() + $api.getStorage("username") + ".jpg";
			DiyCarmerFinishChu_url = '手机不支持canvas';
			upload_sale_sign_pic(DiyCarmerFinishChu_name, DiyCarmerFinishChu_url, carmerli)
		}
	});
}

/**
 *直接上传销售签到图片 如果不成功则保存到本地再上传
 */
function upload_sale_sign_pic(DiyCarmerFinishChu_name, DiyCarmerFinishChu_url, carmerlithis) {

	var carmerlithat = carmerlithis;
	api.toast({
		msg : '图片上传中'
	});
	var piclist = [];
	var myDate = new Date();

	var month = myDate.getMonth() + 1;
	if (month < 10) {
		month = '0' + month;
	}

	var day = myDate.getDate();
	if (day < 10) {
		day = '0' + day;
	}
	console.log('开始插入图片');
	var todaytime = myDate.getFullYear() + "" + month + "" + day;
	var uploadinserttime = myDate.getFullYear() + "-" + month + "-" + day;
	var thispicguid = newguid();
	//将图片保存到本地得操作
	oUseTool.INpicfile(thispicguid, DiyCarmerFinishChu_name, DiyCarmerFinishChu_url, todaytime, "", uploadinserttime, function(states){
		console.log(states);
		console.log("插入图片成功");
		if(states){
			upload_topicdbonlineNewReport(thispicguid, todaytime, DiyCarmerFinishChu_name, DiyCarmerFinishChu_url, carmerlithat);
		}
	});
	return;



	/**var carmerlithat = carmerlithis;
	api.toast({
		msg : '图片上传中'
	});
	var piclist = [];
	var myDate = new Date();

	var month = myDate.getMonth() + 1;
	if (month < 10) {
		month = '0' + month;
	}

	var day = myDate.getDate();
	if (day < 10) {
		day = '0' + day;
	}

	var todaytime = myDate.getFullYear() + "" + month + "" + day;
	var piclistitem = {
		"filename" : DiyCarmerFinishChu_name,
		"base64str" : DiyCarmerFinishChu_url,
		filepath : todaytime
	};
	piclist.push(piclistitem);
	console.log(JSON.stringify(piclist));
	$kunchi.kunchiuploadpic('api/Upload', JSON.stringify(piclist), function(ret, err) {
		console.log(JSON.stringify(ret) + "----" + JSON.stringify(err));
		if (ret) {

			upload_topicdbonlineNewReport(todaytime, DiyCarmerFinishChu_name, DiyCarmerFinishChu_url, carmerlithat);

			api.sendEvent({
				name : 'PaiPicFinish',
				extra : {
					PaiPicFinish : 'ok'
				}
			});
		} else {
			api.confirm({
				title : '提示',
				msg : '图片上传失败，点击确定继续上传，否则忽略此图片.',
				buttons : ['确定', '取消']
			}, function(ccaa, ddbb) {
				var index = ccaa.buttonIndex;
				if (index == 1) {
					upload_sale_sign_pic(DiyCarmerFinishChu_name, DiyCarmerFinishChu_url);
				}
			});
		}
	});**/
}


function postdelpiconline(motherid, onlineid) {
	api.toast({
	    msg:'正在删除'
    });
	var url = "ActionApi/T_Pics/DeleteT_Pics";
	$kunchi.kunchipost(url, {
		id : onlineid
	}, function(ret, err) {
		//console.log(JSON.stringify(ret) + "----" + JSON.stringify(err));
		if (ret) {
			delxml(motherid);
		} else {
			api.toast({
				msg : '删除失败,请重试.',
				duration : 3000,
				location : 'middle'
			});
		}
	});
}


//先将图片保存到图片库 然后再上传到对应的图片记录库
function upload_topicdbonlineNewReport(localguid, savetimefuc, DiyCarmerFinishChu_name, DiyCarmerFinishChu_url, carmerlithis) {
	var carmerlithat = carmerlithis;
	//将图片关系保存到本地
	var savetime = savetimefuc;
	var cPicPath = savetime + '/' + DiyCarmerFinishChu_name;
	var storeid;
	storeid = api.pageParam.page.iStoreId;
	var thispicguid = newguid();
	oUseTool.INpicbind(thispicguid, cPicPath, cPicClass, storeid, "PhotoType", $api.getStorage("id"), $api.getStorage("roleName"), $api.getStorage("realName"), guid, $kunchi.todaytime(), localguid, function(states){
		console.log(states);
		console.log("插入绑定成功");
		if(states){
			showPicToHmtl(DiyCarmerFinishChu_name, 'data:image/jpg;base64,'+DiyCarmerFinishChu_url, thispicguid, carmerlithat);
		}
	});
	return;
	//将图片关系保存到本地


	var carmerlithat = carmerlithis;
	var PicsAdds = new Object();
	var savetime = savetimefuc;
	PicsAdds.cPicPath = savetime + '/' + DiyCarmerFinishChu_name;
	PicsAdds.cPicClass = cPicClass;
	PicsAdds.iSize = 0;
	PicsAdds.cPicType = "PhotoType";
	PicsAdds.iStoreId = iStoreId;
	PicsAdds.iUserId = $api.getStorage("id");
	PicsAdds.cRoleName = $api.getStorage("roleName");
	PicsAdds.cUserName = $api.getStorage("realName");
	PicsAdds.iTrainId = guid;
	console.log(guid);
	//传过来的那个ID就好
	PicsAdds.dtUploadTime = $kunchi.todaytime();
	// console.log(JSON.stringify(picsaddlist));
	showPicToHmtl(DiyCarmerFinishChu_name, 'data:image/jpg;base64,'+DiyCarmerFinishChu_url, guid, carmerlithat);
	newpiclist.push(PicsAdds);
}

function isemptynew(str) {
	if (( typeof (str) == 'undefined') || (str == null) || (str == "null") || (str == "") || (str == "undefined")) {
		return true;
	} else {
		return false;
	}
}
