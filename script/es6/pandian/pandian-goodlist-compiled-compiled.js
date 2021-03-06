"use strict";

function initpandian(tag) {

	var that = tag;

	function posturl() {
		var body = new Object();
		body.istoreid = that.istoreid;
		body.houseid = that.houseid;
		$kunchi.kunchipost("ActionApi/T_Inventory/GetInventoryByStoreIdAndHouseId", body, function (ret, err) {
			console.log(JSON.stringify(ret) + "---" + JSON.stringify(err));
			if (ret) {
				if (ret.length == 0) {
					vant.Toast.fail('暂无商品');
				} else {
					that.isallowbtn = 1;
					vant.Toast.success('完成');
					initgoodlist(ret);
					getAuthorPeople();
				}
			} else {
				vant.Dialog.confirm({
					title: '网络错误',
					message: '获取商品列表失败,是否重新获取?'
				}).then(function () {
					// on confirm
					posturl();
				}).catch(function () {
					// on cancel
					api.closeWin();
				});
			}
		});
	}

	function initgoodlist(ret) {
		var newret = ret.map(function (value) {
			var object = {
				code: value.cProductProductCode,
				name: value.cProductFullName,
				show: true,
				kucun: "",
				iProuductId: value.iProuductId,
				iInventoryId: value.iInventoryId,
				iCurrentInventory: value.iCurrentInventory
			};
			return object;
		});
		that.goodlist = newret;
	}

	function getAuthorPeople() {
		var body = new Object();
		body.userid = $api.getStorage('id');
		body.ordertype = $api.getStorage('diaohuodan');
		$kunchi.kunchipost("ActionApi/T_Orders/GetUserAuthor", body, function (ret, err) {
			console.log(JSON.stringify(ret) + "---" + JSON.stringify(err));
			if (ret) {
				that.authorlist = ret;
				that.authorresult = true;
			} else {
				that.authorresult = false;
				vant.Dialog.confirm({
					title: '网络错误',
					message: '获取审核信息失败,是否重新获取?'
				}).then(function () {
					// on confirm
					getAuthorPeople();
				}).catch(function () {
					// on cancel
					api.closeWin();
				});
			}
		});
	}

	posturl();
}

function searchevent(tag, text, num) {
	if (num == '0') {
		if (text.length != 0) {
			tag.goodlist.filter(function (value) {
				if (value.name.includes(text) || value.code.includes(text)) {
					value.show = true;
				} else {
					value.show = false;
				}
			});
		}
	} else if (num == '1') {
		if (text.length == 0) {
			tag.goodlist.filter(function (value) {
				value.show = true;
			});
		}
	} else if (num == '2') {
		tag.goodlist.filter(function (value) {
			value.show = true;
		});
	}
}

function uploadPanDian(tag) {

	if (tag.authorresult == false) {
		vant.Toast.fail('尚未获取到审批信息,请返回重新进入获取.');
		return;
	}
	api.showProgress();

	//开始处理审核列表信息
	var authorlistlen = tag.authorlist.length;
	var authorobj = {};
	switch (authorlistlen) {
		case 2:
			tag.authorlist.forEach(function (value) {
				if (value.RoleName == '业务主管') {
					authorobj.iDirectorId = value.UserID;
				} else {
					authorobj.iAuthorizeId = value.UserID;
				}
			});
			break;
		case 1:
			authorobj.iDirectorId = tag.authorlist[0].UserID;
			authorobj.iAuthorizeId = tag.authorlist[0].UserID;
			break;
		default:
			authorobj.iDirectorId = null;
			authorobj.iAuthorizeId = null;
			break;
	}

	var newuploadpandianlist = [];
	var uploadlist = tag.goodlist.forEach(function (value) {

		if (value.kucun != "") {
			var uploadobject = {};
			uploadobject.iProuductId = value.iProuductId;
			uploadobject.iKucunOpening = '';
			uploadobject.iDeliveryMonth = '';
			uploadobject.iSaleMonth = '';
			uploadobject.iCurrentInventory = value.iCurrentInventory;
			uploadobject.iSalesCount = 0;
			uploadobject.iSalesAmount = 0;
			uploadobject.iReceiptNumber = value.kucun;
			uploadobject.cReportType = '实盘';
			uploadobject.iTaskId = '';
			uploadobject.dtReportTime = $kunchi.todaydate();
			uploadobject.dtCreateTime = '';
			uploadobject.iStoreId = tag.istoreid;
			uploadobject.iUserId = $api.getStorage('id');
			uploadobject.iInventoryId = value.iInventoryId;
			uploadobject.iStoreHouseId = tag.houseid;
			uploadobject.iDirectorId = authorobj.iDirectorId;
			uploadobject.iAuthorizeId = authorobj.iAuthorizeId;
			newuploadpandianlist.push(uploadobject);
		}
	});

	console.log(JSON.stringify(newuploadpandianlist));
	if (newuploadpandianlist.length == 0) {
		api.hideProgress();
		vant.Toast('请至少填写一条盘点信息');
		return;
	}
	var posturl = 'ActionApi/T_Inventory/SaveInventoryPanDian';
	$kunchi.kunchipost(posturl, newuploadpandianlist, function (ret, err) {
		//[{"id":12,"iProuductId":1,"iKucunOpening":null,"iDeliveryMonth":null,"iSaleMonth":null,"iCurrentInventory":0,"iSalesCount":0,"iSalesAmount":0,"iReceiptNumber":5,"cReportType":"SKU日销报告","iTaskId":null,"dtReportTime":"2018-01-26T00:00:00","dtCreateTime":"2018-01-26T17:33:47.523","iStoreId":"00000000-0000-0000-0000-000000000000","iUserId":"9b7c6dc5-39e4-4e51-8484-e9e030d52ef9","iInventoryId":null,"T_Task":null}]----""
		console.log(JSON.stringify(ret) + "----" + JSON.stringify(err));
		api.hideProgress();
		if (ret) {
			tag.showtijiaosucess = true;
			var cReportSkuCode = ret[0].cReportSkuCode;
			setTimeout(function () {
				api.openWin({
					name: 'panDian_errorlist_win',
					url: 'widget://html/panDian/error/panDian_errorlist.html',
					pageParam: {
						creportskucode: cReportSkuCode,
						closename: 'panDian_menu_win'
					}
				});
			}, 3000);
		} else {
			vant.Toast.fail('提交失败');
		}
	});
}
