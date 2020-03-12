"use strict";

function initlist(tag) {
	//tag.errorlist
	var errlist = api.pageParam.newoldlist;
	tag.errorlist = errlist.map(function (value) {
		value.panleftmenu = value.iKucunOpening == "-1" ? "盘亏原因" : "盘盈原因";
		value.selectreson = "";
		value.inputone = "";
		value.inputtwo = "";
		return value;
	});
	console.log(JSON.stringify(api.pageParam.newoldlist));
}

function btnupload(tag) {
	var iscontinue = true;
	tag.errorlist.forEach(function (value) {
		if (value.selectreson == "") {
			iscontinue = false;
		} else {
			if (value.selectreson == "盘错" || value.selectreson == "丢件" || value.selectreson == "其他") {
				var inputoneel = value.inputone;
				if (inputoneel.trim().length == 0) {
					iscontinue = false;
				}
			}
		}
	});
	if (!iscontinue) {
		vant.Toast('有尚未填写原由的商品');
		return;
	}

	var twowornglist = [];

	var wronglist = tag.errorlist.filter(function (value) {

		var iswrong = false;
		var iReceiptNumber = value.iReceiptNumber;
		var iCurrentInventory = value.iCurrentInventory;
		var inputoneel = value.inputone;

		switch (value.selectreson) {
			case '盘错':
				if (inputoneel != iCurrentInventory) {
					iswrong = true;
				}
				break;
			case '丢件':
				if (parseInt(inputoneel) + parseInt(iReceiptNumber) != iCurrentInventory) {
					iswrong = true;
				}
				break;
			case '其他':

				if (value.panleftmenu == "盘亏原因") {
					if (parseInt(iReceiptNumber) + parseInt(inputoneel) != iCurrentInventory) {
						iswrong = true;
					}
				} else {
					if (parseInt(iReceiptNumber) - parseInt(inputoneel) != iCurrentInventory) {
						iswrong = true;
					}
				}
				break;
			case '未处理单据':
				if (parseInt(iReceiptNumber) != iCurrentInventory) {
					iswrong = true;
				}
				break;
		}

		if (!iswrong) {
			return value;
		} else {
			twowornglist.push(value);
		}
	});

	if (wronglist.length > 0) {
		//没错的数据直接提交
		var pankui = $api.getStorage("pankui");
		var panying = $api.getStorage("panying");
		api.showProgress();
		var uploadlist = wronglist.map(function (value) {
			var upobj = {};

			if (value.panleftmenu == "盘亏原因") {
				pankui.forEach(function (pankuiitem) {
					if (pankuiitem.cDictName == value.selectreson) {
						upobj.cReportSkuType = pankuiitem.cDictName;
						upobj.cReportSkuTypeId = pankuiitem.id;
					}
				});
			} else {
				panying.forEach(function (panyingitem) {
					if (panyingitem.cDictName == value.selectreson) {
						upobj.cReportSkuType = panyingitem.cDictName;
						upobj.cReportSkuTypeId = panyingitem.id;
					}
				});
			}

			if (value.selectreson == "丢件" || value.selectreson == "其他") {
				upobj.cErrorCount = value.inputone;
				upobj.cErrorContent = value.inputtwo;
			} else {
				upobj.cErrorCount = "";
				upobj.cErrorContent = "";
			}
			var iReceiptNumber = value.iReceiptNumber;
			var iCurrentInventory = value.iCurrentInventory;
			if (value.selectreson == "未处理单据") {
				if (iReceiptNumber == iCurrentInventory) {
					upobj.isSame = 1;
					upobj.iAuthorizeId = value.iAuthorizeId;
					upobj.iDirectorId = value.iDirectorId;
				} else {
					upobj.iAuthorizeId = "";
					upobj.iDirectorId = value.iDirectorId;
					upobj.isSame = 0;
				}
				upobj.iDirectorStatue = 0;
				upobj.iAuthorizeStatue = 0;
			} else {
				upobj.iAuthorizeId = value.iAuthorizeId;
				upobj.iDirectorId = value.iDirectorId;
				upobj.isSame = 0;
				upobj.iDirectorStatue = 0;
				upobj.iAuthorizeStatue = 0;
			}

			upobj.iProuductId = value.iProuductId;
			upobj.iKucunOpening = value.iKucunOpening;
			// upobj.iDeliveryMonth 没有这个字段
			// upobj.iSaleMonth  没有这个字段
			upobj.iCurrentInventory = value.iCurrentInventory;
			upobj.iSalesCount = value.iSalesCount;
			upobj.iSalesAmount = twowornglist.length == 0 ? 0 : 1; //一次为0  两次 第一个1第二个2
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

			upobj.cReportSkuCode = value.cReportSkuCode;

			upobj.cLogisticsNo = "";
			upobj.cLogisticsName = "";
			upobj.cRemark = value.inputtwo;
			upobj.id = value.id;

			return upobj;
		});
		console.log(JSON.stringify(uploadlist));
		var posturl = 'ActionApi/T_Inventory/SaveHistoryInventoryErrorPanDianDetail';
		$kunchi.kunchipost(posturl, uploadlist, function (ret, err) {
			//[{"id":12,"iProuductId":1,"iKucunOpening":null,"iDeliveryMonth":null,"iSaleMonth":null,"iCurrentInventory":0,"iSalesCount":0,"iSalesAmount":0,"iReceiptNumber":5,"cReportType":"SKU日销报告","iTaskId":null,"dtReportTime":"2018-01-26T00:00:00","dtCreateTime":"2018-01-26T17:33:47.523","iStoreId":"00000000-0000-0000-0000-000000000000","iUserId":"9b7c6dc5-39e4-4e51-8484-e9e030d52ef9","iInventoryId":null,"T_Task":null}]----""
			console.log(JSON.stringify(ret) + "----" + JSON.stringify(err));
			api.hideProgress();
			if (ret) {
				if (twowornglist.length > 0) {
					api.openWin({
						name: 'panDian_erroreason_two_win',
						url: 'widget://html/panDian/error/panDian_erroreason_two.html',
						pageParam: {
							wronglist: twowornglist,
							closename: api.pageParam.closename
						}
					});
				} else {
					var vant1 = vant.Toast.success('提交成功');

					api.sendEvent({
						name: 'uploadhistorylist'
					});

					setTimeout(function () {
						vant1.clear();
						// api.closeToWin({
						//     name: api.pageParam.closename
						// });closecreatemenu
						var cReportSkuCode = ret[0].cReportSkuCode;
						api.openWin({
							name: 'panDian_errordetail_win',
							url: 'widget://html/panDian/error/panDian_errordetail.html',
							pageParam: {
								creportskucode: cReportSkuCode,
								closeotherwin: "closeerrorlist"
							}
						});
					}, 2000);
				}
			} else {
				vant.Toast.fail('提交失败');
			}
		});
	} else {
		//有错得数据需要去另外一个页面重新提交
		api.openWin({
			name: 'panDian_erroreason_two_win',
			url: 'widget://html/panDian/error/panDian_erroreason_two.html',
			pageParam: {
				wronglist: twowornglist,
				closename: api.pageParam.closename
			}
		});
	}
}

function check_isallow_upload(tag) {
	tag.allowclick = 1;
	return;
	api.showProgress();
	var uploadlist = {};
	uploadlist.iuserid = $api.getStorage("id");
	console.log(JSON.stringify(uploadlist));
	var posturl = 'ActionApi/T_Inventory/HasPanDianNoAuth';
	$kunchi.kunchipost(posturl, uploadlist, function (ret, err) {
		api.hideProgress();
		//[{"id":12,"iProuductId":1,"iKucunOpening":null,"iDeliveryMonth":null,"iSaleMonth":null,"iCurrentInventory":0,"iSalesCount":0,"iSalesAmount":0,"iReceiptNumber":5,"cReportType":"SKU日销报告","iTaskId":null,"dtReportTime":"2018-01-26T00:00:00","dtCreateTime":"2018-01-26T17:33:47.523","iStoreId":"00000000-0000-0000-0000-000000000000","iUserId":"9b7c6dc5-39e4-4e51-8484-e9e030d52ef9","iInventoryId":null,"T_Task":null}]----""
		console.log(JSON.stringify(ret) + "----" + JSON.stringify(err));
		api.hideProgress();
		if (ret) {
			tag.allowclick = 1;
		} else {
			if (err.statusCode == "406") {
				vant.Dialog.alert({
					title: '提示',
					message: err.msg
				}).then(function () {
					api.closeWin();
				});
			} else {
				vant.Dialog.confirm({
					title: '提示',
					message: '获取是否提交异常失败，是否重试?'
				}).then(function () {
					// on confirm
					check_isallow_upload(tag);
				}).catch(function () {
					// on cancel
					api.closeWin();
				});
			}
		}
	});
}
