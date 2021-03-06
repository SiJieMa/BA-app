function initlist(tag) {
	let obj = {};
	api.showProgress();
	tag.creportskucode = api.pageParam.creportskucode;
	obj.creportskucode = api.pageParam.creportskucode;
	obj.iuserid = $api.getStorage("id");
	console.log(JSON.stringify(obj));
	let posturl = 'ActionApi/T_Inventory/GetInventoryCheckDetailByAuthorize';
	$kunchi.kunchipost(posturl, obj, function(ret, err) {
		//[{"id":12,"iProuductId":1,"iKucunOpening":null,"iDeliveryMonth":null,"iSaleMonth":null,"iCurrentInventory":0,"iSalesCount":0,"iSalesAmount":0,"iReceiptNumber":5,"cReportType":"SKU日销报告","iTaskId":null,"dtReportTime":"2018-01-26T00:00:00","dtCreateTime":"2018-01-26T17:33:47.523","iStoreId":"00000000-0000-0000-0000-000000000000","iUserId":"9b7c6dc5-39e4-4e51-8484-e9e030d52ef9","iInventoryId":null,"T_Task":null}]----""
		console.log(JSON.stringify(ret) + "----" + JSON.stringify(err));
		api.hideProgress();
		if (ret) {
			let AuthorListlength = ret[0].AuthorList.length - 1;
			console.log(JSON.stringify(ret[0].AuthorList[AuthorListlength]));
			tag.progressname = ret[0].AuthorList[AuthorListlength].cAuthorNode;
			console.log(ret[0].AuthorList[AuthorListlength].cAuthorNode);
			tag.list = ret.map((value, index) => {

				if (index == 0) {

					let newsplist = [];
					for(let i = (value.AuthorList.length - 1); i >= 0; i--){
						let spvalue = value.AuthorList[i];
						let dtCreateTimeYear = spvalue.dtCreateTime.split("T")[0];
						let dtCreateTimeMonth = spvalue.dtCreateTime.split("T")[1];
						let dtCreateTimeMonthnew = dtCreateTimeMonth.split(".")[0];
						spvalue.dtCreateTime = dtCreateTimeYear+" "+dtCreateTimeMonthnew;

						let iStatue = spvalue.iStatue;
						let cAuthorName = spvalue.cAuthorName;
						spvalue.shenheren = typeof cAuthorName == "undefined" ? "" : cAuthorName;
						spvalue.jieguo = iStatue == 1 ? "通过" : "未通过";
						if(spvalue.cAuthorNode == "待审批"){
							spvalue.cAuthorNode = "盘点创建";
							spvalue.jieguo = "";
						}else{
							spvalue.cAuthorNode = "";
						}
						newsplist.push(spvalue);
						// if(i == (value.AuthorList.length - 1)){
						// 	tag.jindu = spvalue.cAuthorNode;
						// }
					}

					tag.splist = newsplist;

					/**tag.splist = value.AuthorList.filter((spvalue) => {
						if(typeof(spvalue.iStatue) != 'undefined'){
							let dtCreateTimeYear = spvalue.dtCreateTime.split("T")[0];
							let dtCreateTimeMonth = spvalue.dtCreateTime.split("T")[1];
							let dtCreateTimeMonthnew = dtCreateTimeMonth.split(".")[0];
							spvalue.dtCreateTime = dtCreateTimeYear+" "+dtCreateTimeMonthnew;
							tag.progressname = spvalue.cAuthorNode;
							return spvalue;
						}
					})**/
				}

				let listobj = {};
				listobj.cProductFullName = value.cProductFullName;
				listobj.cReportSkuCode = value.cReportSkuCode;
				listobj.cReportSkuType = value.cReportSkuType;

				//判断是否有复盘失败的可能
				listobj.cReportSkuTypeFU = value.iSalesAmount == "2" ? "复盘失败-" : "";

				listobj.iReceiptNumber = value.iReceiptNumber;
				listobj.id = value.id;
				listobj.RealTimeInventory = value.iCurrentInventory;

				if((value.cReportSkuType == "其他")||(value.cReportSkuType == "丢件")){
					listobj.shuomingtype = value.cErrorContent;
				}else{
					listobj.shuomingname = "";
					listobj.shuomingtype = "";
				}

				if(value.iCurrentInventory > value.iReceiptNumber){
					listobj.isyingkui = "盘亏原因："
					listobj.shuomingname = value.cReportSkuType == "其他"?"缺失说明:":"丢件原因:";
				}else{
					listobj.isyingkui = "盘盈原因：";
					listobj.shuomingname = value.cReportSkuType == "其他"?"盘盈说明:":"丢件原因:";
				}
				return listobj;
			})
		} else {
			vant.Dialog.confirm({
				title: '网络错误',
				message: '获取信息失败,是否重试?'
			}).then(() => {
				initlist(tag);
			}).catch(() => {
				api.closeWin();
			});
		}
	});
}


function shenhepandian(tag, statue) {
	let tishimsg = statue == 1 ? '确定要审批通过盘点?' : '确定要拒绝盘点?'
	vant.Dialog.confirm({
		title: '提示',
		message: tishimsg
	}).then(() => {
		// on confirm
		let obj = {};
		api.showProgress();
		obj.cpandiancode = api.pageParam.creportskucode;
		let userrole = $api.getStorage("roleName");
		if (userrole == "大区经理" || userrole == "地区经理") {
			obj.iAuthorizeId = $api.getStorage("id");
			obj.iDirectorId = '';
			obj.iBrandId = '';
		} else if (userrole == "业务主管") {
			obj.iAuthorizeId = '';
			obj.iDirectorId = $api.getStorage("id");
			obj.iBrandId = '';
		} else {
			obj.iAuthorizeId = '';
			obj.iDirectorId = '';
			obj.iBrandId = $api.iBrandId;
		}
		obj.cAuthorName = $api.getStorage("realName");
		obj.statue = statue;
		console.log(JSON.stringify(obj));
		let posturl = 'ActionApi/T_Inventory/SetAuthorizeInventoryCheck';
		$kunchi.kunchipost(posturl, obj, function(ret, err) {
			console.log(JSON.stringify(ret) + "----" + JSON.stringify(err));
			api.hideProgress();
			if (ret) {
				api.sendEvent({
				    name: 'reloadpandianlist',
					extra: {
						key1: api.pageParam.creportskucode
					}
				});
				vant.Dialog.alert({
					message: '完成审批'
				}).then(() => {
					api.closeWin();
				});

			} else {
				vant.Dialog.confirm({
					title: '网络错误',
					message: '获取信息失败,是否重试?'
				}).then(() => {
					initlist(tag);
				}).catch(() => {
					api.closeWin();
				});
			}
		});
	}).catch(() => {

	});
}
