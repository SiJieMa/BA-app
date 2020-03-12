'use strict';

/**
 *获取销售手下的门店 以及门店对应的排班信息
 */
function get_sale_balist() {
	get_sale_ordershoplist();
	//	var url = 'ActionApi/T_WorkReport/Get_StoreByUser';
	//	var json = {'userid': $api.getStorage("id")};
	//	$kunchi.kunchipost(url, json, function(ret,err){
	//		console.log(JSON.stringify(ret) + "==" + JSON.stringify(err));
	//		if(ret){
	//			//保存一下标记：如果已经获取过一次销售负责的门店的话，那么再用户不手动触发的情况下 不会再自动获取
	//			$api.setStorage('ismendiandown', '1');
	//			$api.setStorage("saleshopba",ret);
	//			getT_DirTable();
	//		}else{
	//			hideloadinfo();
	//			var errorel = document.getElementById("errorid");
	//			$api.css(errorel, "display: block;");
	//			getT_DirTable();
	//		}
	//	}, 60);
}

function get_sale_ordershoplist() {
	var url = 'ActionApi/T_WorkReport/Get_StoreByUserId';
	var json = { 'userid': $api.getStorage("id") };
	$kunchi.kunchipost(url, json, function (ret, err) {
		//console.log("28"+JSON.stringify(ret) + "==" + JSON.stringify(err));
		console.log("获取到的长度:" + ret.length);
		if (ret) {
			$api.setStorage("SELECTSHOP", ret);
			get_sale_orderlist();
		} else {
			hideloadinfo();
			var errorel = document.getElementById("errorid");
			$api.css(errorel, "display: block;");
		}
	}, 60);
}

function get_sale_orderlist() {
	var url = 'ActionApi/T_WorkReport/Get_BAByUserId';
	var json = { 'userid': $api.getStorage("id") };
	$kunchi.kunchipost(url, json, function (ret, err) {
		//		console.log(JSON.stringify(ret) + "==" + JSON.stringify(err));
		if (ret) {
			//保存一下标记：如果已经获取过一次销售负责的门店的话，那么再用户不手动触发的情况下 不会再自动获取
			$api.setStorage("SELECTBA", ret);
			$api.setStorage('ismendiandown', '2');
			getT_DirTable();
		} else {
			hideloadinfo();
			var errorel = document.getElementById("errorid");
			$api.css(errorel, "display: block;");
		}
	}, 60);
}

/**
 *获取未处理的货单的数量
 */
function getHuoDanNum() {
	var body = new Object();
	body.userId = $api.getStorage("id");
	$kunchi.kunchipost("ActionApi/T_Orders/GetOrderStatistical", body, function (ret, err) {
		// console.log(JSON.stringify(ret) + "==" + JSON.stringify(err));
		if (ret) {
			var allcount = 0;
			for (var a = 0; a < ret.length; a++) {
				if (ret[a].StateName == '待审批') {
					var count = ret[a].count;
					allcount += count;
				}
				if (ret[a].StateName == '已发货') {
					var count = ret[a].count;
					allcount += count;
				}
				if (ret[a].StateName == '主管提醒') {
					if ($api.getStorage("roleName") == '业务主管') {
						document.getElementById("zhoumocunum").innerHTML = ret[a].count;;
					}
				}
				if (ret[a].StateName == '经理提醒') {
					if ($api.getStorage("roleName") != '业务主管' && $api.getStorage("roleName") != 'BA人员') {
						document.getElementById("zhoumocunum").innerHTML = ret[a].count;;
					}
				}
			}
			document.getElementById("huodannum").innerHTML = allcount;
		}
	});
	api.addEventListener({
		name: 'gethuodanonnum'
	}, function (ret, err) {
		//getHuoDanNum();
		document.getElementById("huodannum").innerHTML = ret.value.key1;
	});
}

/**
 *获取当前用户有多少未读消息
 */
function get_noread_messagenum() {
	var json = { 'userid': $api.getStorage("id") };
	$kunchi.kunchipost("ActionApi/T_InBox/T_InBoxNoReadCount", json, function (ret, err) {
		//		console.log(JSON.stringify(ret) + "==" + JSON.stringify(err));
		//		{"Count":0}
		if (ret) {
			document.getElementById("messagenum").innerHTML = ret.Count;
			api.setAppIconBadge({
				badge: parseInt(ret.Count)
			});
		} else {
			document.getElementById("messagenum").innerHTML = '?';
		}
	});
	api.addEventListener({
		name: 'noreadmessagenum'
	}, function (ret, err) {
		get_noread_messagenum();
	});
}

/**
 *获取销售对应的自己的排班系统
 */
function get_sale_worklist(date) {

	var isshowbtn = 0;
	if (changedatetomillon(date) * 1000 > get_today_millisecond()) {
		isshowbtn = 1;
	}
	var url = 'ActionApi/T_WorkReport/Get_StoreByOnlyUser';
	var json = { 'userid': $api.getStorage("id"), 'startime': date, 'endtime': date };
	//	console.log(JSON.stringify(json));
	$kunchi.kunchipost(url, json, function (ret, err) {
		tingzhi();
		//		console.log(JSON.stringify(ret) + "==" + JSON.stringify(err));
		//[{"iStoreId":17261,"cStoreFullName":"明珠店","cStoreCode":"RT000115","cLon":"117.208247","cLat":"31.781295","iUserId":"30981d57-8442-4926-bf21-500b32b3c6b4","dtPlantTime":"2018-01-02T16:22:27.343"}]
		if (ret) {
			document.getElementById("list").innerHTML = "";
			if (ret.length != 0) {
				var el = document.getElementById("list");
				for (var a = 0; a < ret.length; a++) {
					if (isshowbtn == 0) {
						var li = '<li id="' + ret[a].iRorptId + 'li">' + '<span tabmode="huise" class="title" tabmode="huise">' + ret[a].cStoreFullName + '</span>' + '</li>';
						$api.append(el, li);
					} else {
						var li = '<li id="' + ret[a].iRorptId + 'li">' + '<span tabmode="huise" class="title" tabmode="huise">' + ret[a].cStoreFullName + '</span>' + '<span onclick="showmenucaozuoshan(this)" iRorptId="' + ret[a].iRorptId + '" class="caozuo">〈操作</span>' + '</li>';
						$api.append(el, li);
					}
				}
			} else {
				api.toast({
					msg: '当日无排班计划',
					duration: 3000,
					location: 'middle'
				});
			}
		} else {
			alert("当前网络不稳定,请确认网络通畅并重新点击日期获取.");
		}
	});
}

/**
 *多选操作流程
 */
function show_all_worklist() {

	var zidianvalue = $api.getStorage("showallworklist_zidian");
	var el = document.getElementById("list");
	document.getElementById("list").innerHTML = "";

	var canshunum = 0;

	for (var a = 0; a < zidianvalue.length; a++) {
		var html = '<li iReportType="' + zidianvalue[a].id + '" iStoreId="" value="' + canshunum + '" id="li' + canshunum + '" onclick="changestatues(this);">' + '<i id="fa' + canshunum + '" class="fa fa-circle-o" aria-hidden="true"></i>' + '<span id="' + canshunum + '" codemendian="nodaihao" class="worktype">' + zidianvalue[a].cDictName + '</span>' + '<span class="daihao"></span>' + '</li>';
		$api.append(el, html);
		canshunum++;
	}

	var saleshopba = $api.getStorage("SELECTSHOP");
	if (typeof saleshopba == 'undefined') {
		api.hideProgress();
		api.toast({
			msg: '没有门店信息'
		});
		return;
	}

	for (var a = 0; a < saleshopba.length; a++) {
		var html = '<li iReportType="0" iStoreId="' + saleshopba[a].iStoreId + '" id="li' + canshunum + '" value="' + canshunum + '" onclick="changestatues(this);">' + '<i id="fa' + canshunum + '" class="fa fa-circle-o" aria-hidden="true"></i>' + '<span id="' + canshunum + '" codemendian="' + saleshopba[a].cStoreCode + '" class="worktype">' + saleshopba[a].cStoreFullName + '</span>' + '<span class="daihao">' + saleshopba[a].cStoreCode + '</span>' + '</li>';
		$api.append(el, html);
		canshunum++;
	}
	setTimeout("closeprogress_caozuo()", 5000);
}

/**
 *单选操作流程
 */
function show_all_worklist_oneday(codeShop) {
	var zidianvalue = $api.getStorage("danxuanworklistzidian");
	listviewList = new Array();
	var canshunum = 0;
	for (var a = 0; a < zidianvalue.length; a++) {

		var itemboject = new Object();
		itemboject.uid = canshunum;
		itemboject.title = zidianvalue[a].cDictName;
		itemboject.subTitle = '';
		itemboject.remark = '';
		itemboject.iStoreId = "";
		itemboject.iReportType = zidianvalue[a].id;
		listviewList.push(itemboject);
		canshunum++;
	}

	var saleshopba = $api.getStorage("SELECTSHOP");
	if (typeof saleshopba == 'undefined') {
		var UIListView = api.require('UIListView');
		UIListView.reloadData({
			data: listviewList
		}, function (ret) {});
		api.hideProgress();
		api.toast({
			msg: '没有门店信息'
		});
		return;
	}
	for (var a = 0; a < saleshopba.length; a++) {

		if (codeShop != '') {
			if (saleshopba[a].cStoreCode.indexOf(codeShop) > -1 || saleshopba[a].cStoreFullName.indexOf(codeShop) > -1) {
				var itemboject = new Object();
				itemboject.uid = canshunum;
				itemboject.title = saleshopba[a].cStoreFullName;
				itemboject.subTitle = '';
				itemboject.remark = saleshopba[a].cStoreCode;
				itemboject.iStoreId = saleshopba[a].iStoreId;
				itemboject.iReportType = "0";
				listviewList.push(itemboject);
			}
		} else {
			var itemboject = new Object();
			itemboject.uid = canshunum;
			itemboject.title = saleshopba[a].cStoreFullName;
			itemboject.subTitle = '';
			itemboject.remark = saleshopba[a].cStoreCode;
			itemboject.iStoreId = saleshopba[a].iStoreId;
			itemboject.iReportType = "0";
			listviewList.push(itemboject);
		}
		canshunum++;
	}
	var UIListView = api.require('UIListView');
	UIListView.reloadData({
		data: listviewList
	}, function (ret) {});
	api.hideProgress();
}

function closeprogress_caozuo() {
	api.hideProgress();
}

/**
 *获取销售当天的出行计划
 */
//需要记录一下开店照图片列表 也就是获取的整个的计划用来传递参数
var rettodayplan;
function get_today_salelist(date) {

	var url = 'ActionApi/T_WorkReport/Get_StoreByOnlyUser';
	var json = { 'userid': $api.getStorage("id"), 'startime': date, 'endtime': date };
	// console.log(JSON.stringify(json));
	$kunchi.kunchipost(url, json, function (ret, err) {
		tingzhi();
		api.refreshHeaderLoadDone();
		//console.log(JSON.stringify(ret) + "==" + JSON.stringify(err));
		if (ret) {
			rettodayplan = ret;
			document.getElementById("list").innerHTML = "";
			if (ret.length != 0) {
				var el = document.getElementById("list");
				for (var a = 0; a < ret.length; a++) {

					var status = "未完成";
					if (ret[a].iStatue == 1) {
						status = "已完成";
					}

					var hasFlag = ret[a].hasFlag;
					var iPlantFlag = ret[a].iPlantFlag;

					var jihuawaihtml = '<i class="typejihua">(计划外)</i>';
					var cstorecode = ret[a].cStoreCode;
					if (typeof cstorecode == 'undefined') {
						cstorecode = '暂无';
					}
					if (ret[a].iWorkType == 0) {
						jihuawaihtml = "";
						var li = '<li id="' + ret[a].iRorptId + '" class="mui-table-view-cell">' + '<div cCustomerFullName="' + ret[a].cCustomerFullName + '" iRorptListTime="' + ret[a].dtPlantTime.split("T")[0] + '" cStoreCode="' + cstorecode + '" iStoreId="' + ret[a].iStoreId + '" cLon="' + ret[a].cLon + '" cLat="' + ret[a].cLat + '" iRorptId="' + ret[a].iRorptId + '" cStoreFullName="' + ret[a].cStoreFullName + '" hasFlag="' + hasFlag + '" iPlantFlag="' + iPlantFlag + '" onclick="opendetial(this)" class="mui-slider-handle">' + '<span class="namelist">' + jihuawaihtml + ret[a].cStoreFullName + '<br/>门店编码:<i class="mendiancode">' + cstorecode + '</i></span>' + '<span class="stauteslist">' + status + '</span>' + '</div>' + '</li>';

						$api.append(el, li);
					} else {
						var li = '<li id="' + ret[a].iRorptId + '" class="mui-table-view-cell">' + '<div class="mui-slider-right mui-disabled">' + '<a class="mui-btn mui-btn-red">删除</a>' + '</div>' + '<div cCustomerFullName="' + ret[a].cCustomerFullName + '" iRorptListTime="' + ret[a].dtPlantTime.split("T")[0] + '" cStoreCode="' + cstorecode + '" iStoreId="' + ret[a].iStoreId + '" cLon="' + ret[a].cLon + '" cLat="' + ret[a].cLat + '" iRorptId="' + ret[a].iRorptId + '" cStoreFullName="' + ret[a].cStoreFullName + '" hasFlag="' + hasFlag + '" iPlantFlag="' + iPlantFlag + '" onclick="opendetial(this)" class="mui-slider-handle">' + '<span class="namelist">' + jihuawaihtml + ret[a].cStoreFullName + '<br/>门店编码:<i class="mendiancode">' + cstorecode + '</i></span>' + '<span class="stauteslist">' + status + '</span>' + '</div>' + '</li>';

						$api.append(el, li);
					}

					createvenlist(ret[a].iStoreId, ret[a].cStoreFullName, ret[a].cStoreCode, ret[a].cLon, ret[a].cLat, ret[a].dtPlantTime, ret[a].iRorptId, ret[a].iWorkType, ret[a].iStatue);
				}
			} else {
				alert("当日无排班计划");
			}
		} else {
			alert("当前网络不稳定,请确认网络通畅并重新点击日期获取.");
		}
	});
}
