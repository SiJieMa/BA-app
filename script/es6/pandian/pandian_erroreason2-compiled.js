'use strict';

function initlist(tag) {

	var wronglist2 = api.pageParam.wronglist;
	console.log(JSON.stringify(wronglist2));
	tag.list = wronglist2.map(function (value) {

		var iReceiptNumber = value.iReceiptNumber;
		var iCurrentInventory = value.iCurrentInventory;
		var inputoneel = value.inputone;
		var iKucunOpening1 = value.iKucunOpening;
		console.log(iKucunOpening1);
		if (iKucunOpening1 == 1) {//1盘盈

		} else if (iKucunOpening1 == -1) {//盘亏

		}

		if (parseInt(iReceiptNumber) > iCurrentInventory) {
			//盘盈
			value.yingkui = '盘盈' + (parseInt(iReceiptNumber) - iCurrentInventory) + '件';
			value.yingkuiif = 'ying';
		} else {
			//盘亏
			value.yingkui = '盘亏' + (iCurrentInventory - parseInt(iReceiptNumber)) + '件';
			value.yingkuiif = 'kui';
		}

		value.selectreson2 = '';
		return value;
	});
}

function btnupload(tag) {
	var iscontinue = true;
	tag.list.forEach(function (value) {
		if (value.selectreson2 == "") {
			iscontinue = false;
		}
	});
	if (!iscontinue) {
		vant.Toast('有尚未填写原由的商品');
		return;
	}

	/**let twowornglist = [];
 
 let wronglist = tag.list.filter((value)=>{
 	
 	let iswrong = false;
 	let iReceiptNumber = value.iReceiptNumber;
 	let iCurrentInventory = value.iCurrentInventory;
 	let inputoneel = value.inputone;
 	switch (value.selectreson2){
 		case '盘错':
 			if(inputoneel != iCurrentInventory){
 				iswrong = true;
 			}
 			break;
 		case '丢件':
 			if( (parseInt(inputoneel) + parseInt(iReceiptNumber)) != iCurrentInventory ){
 				iswrong = true;
 			}
 			break;
 		case '其他':
 			if(parseInt(iReceiptNumber) - (parseInt(inputoneel)) != iCurrentInventory ){
 				iswrong = true;
 			}
 			break;
 	}
 	
 	if(!iswrong){
 		return value;
 	}else{
 		twowornglist.push(value);
 	}
 })**/

	var pankui = $api.getStorage("pankui");
	var panying = $api.getStorage("panying");
	api.showProgress();
	var uploadlist = tag.list.map(function (value) {
		var upobj = {};

		if (value.yingkuiif == "ying") {
			panying.forEach(function (panyingitem) {
				if (panyingitem.cDictName == value.selectreson2) {
					upobj.cReportSkuType = panyingitem.cDictName;
					upobj.cReportSkuTypeId = panyingitem.id;
				}
			});
		} else if (value.yingkuiif == "kui") {
			pankui.forEach(function (pankuiitem) {
				if (pankuiitem.cDictName == value.selectreson2) {
					upobj.cReportSkuType = pankuiitem.cDictName;
					upobj.cReportSkuTypeId = pankuiitem.id;
				}
			});
		}

		if (value.selectreson2 == "丢件" || value.selectreson2 == "其他") {
			upobj.cErrorCount = value.inputone;
			upobj.cErrorContent = value.inputtwo;
		} else {
			upobj.cErrorCount = "";
			upobj.cErrorContent = "";
		}

		if (value.selectreson == "未处理单据") {
			if (value.iReceiptNumber == value.iCurrentInventory) {
				upobj.isSame = 1;
			} else {
				upobj.isSame = 0;
			}
		} else {
			upobj.isSame = 0;
		}

		upobj.iProuductId = value.iProuductId;
		upobj.iKucunOpening = value.iKucunOpening;
		// upobj.iDeliveryMonth 没有这个字段
		// upobj.iSaleMonth  没有这个字段
		upobj.iCurrentInventory = value.iCurrentInventory;
		upobj.iSalesCount = value.iSalesCount;
		upobj.iSalesAmount = "2";
		upobj.iReceiptNumber = value.iReceiptNumber;
		upobj.cReportType = value.cReportType;
		// upobj.iTaskId  没有这个字段
		upobj.dtReportTime = value.dtReportTime;
		upobj.dtCreateTime = value.dtCreateTime;
		upobj.iStoreId = value.iStoreId;
		upobj.iUserId = value.iUserId;
		upobj.iInventoryId = value.iInventoryId;
		// upobj.iAuthorizeId  没有这个字段
		// upobj.dtAuthorizeTime 没有这个字段
		// upobj.dtDirectorTime 没有这个字段
		// upobj.iDirectorStatue 没有这个字段
		// upobj.iAuthorizeStatue 没有这个字段
		upobj.cReportSkuCode = value.cReportSkuCode;

		upobj.cLogisticsNo = "";
		upobj.cLogisticsName = "";
		upobj.cRemark = value.inputtwo;
		upobj.id = value.id;

		upobj.iAuthorizeId = value.iAuthorizeId;
		upobj.iDirectorId = value.iDirectorId;

		upobj.iDirectorStatue = 0;
		upobj.iAuthorizeStatue = 0;

		return upobj;
	});
	console.log("====" + JSON.stringify(uploadlist));
	var posturl = 'ActionApi/T_Inventory/SaveHistoryInventoryErrorPanDianDetail';
	$kunchi.kunchipost(posturl, uploadlist, function (ret, err) {
		//[{"id":12,"iProuductId":1,"iKucunOpening":null,"iDeliveryMonth":null,"iSaleMonth":null,"iCurrentInventory":0,"iSalesCount":0,"iSalesAmount":0,"iReceiptNumber":5,"cReportType":"SKU日销报告","iTaskId":null,"dtReportTime":"2018-01-26T00:00:00","dtCreateTime":"2018-01-26T17:33:47.523","iStoreId":"00000000-0000-0000-0000-000000000000","iUserId":"9b7c6dc5-39e4-4e51-8484-e9e030d52ef9","iInventoryId":null,"T_Task":null}]----""
		console.log(JSON.stringify(ret) + "----" + JSON.stringify(err));
		api.hideProgress();
		if (ret) {
			var vant1 = vant.Toast.success('提交成功');
			var cReportSkuCode = ret[0].cReportSkuCode;
			api.sendEvent({
				name: 'uploadhistorylist'
			});
			setTimeout(function () {
				vant1.clear();

				api.openWin({
					name: 'panDian_errordetail_win',
					url: 'widget://html/panDian/error/panDian_errordetail.html',
					pageParam: {
						creportskucode: cReportSkuCode,
						closeotherwin: true
					}
				});

				// api.closeToWin({
				//     name: api.pageParam.closename
				// });
			}, 2000);
		} else {
			vant.Toast.fail('提交失败');
		}
	});
}
