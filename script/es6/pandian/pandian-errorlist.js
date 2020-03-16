

function initlist(tag){
	api.showProgress();
	let obj = {};
	obj.creportskucode = tag.creportskucode;
	obj.isauth = 0;
	let posturl = 'ActionApi/T_Inventory/GetHistoryInventoryErrorPanDianDetail';
	$kunchi.kunchipost(posturl, obj, function(ret,err){
		//[{"id":12,"iProuductId":1,"iKucunOpening":null,"iDeliveryMonth":null,"iSaleMonth":null,"iCurrentInventory":0,"iSalesCount":0,"iSalesAmount":0,"iReceiptNumber":5,"cReportType":"SKU日销报告","iTaskId":null,"dtReportTime":"2018-01-26T00:00:00","dtCreateTime":"2018-01-26T17:33:47.523","iStoreId":"00000000-0000-0000-0000-000000000000","iUserId":"9b7c6dc5-39e4-4e51-8484-e9e030d52ef9","iInventoryId":null,"T_Task":null}]----""
		console.log(JSON.stringify(ret) + "----" + JSON.stringify(err));
		if(ret){
			tag.oldlist = ret;
			let isshowisshowbtn = false;
			let newlist = ret.map((value)=>{
				let obj = {};
				obj.isred = value.iKucunOpening == "0" ? "" : "red";
				if(value.iKucunOpening != 0){
					isshowisshowbtn = true;
				}
				obj.name = value.cProductFullName;
				obj.count = value.iReceiptNumber;
				return obj;
			});
			tag.isshowbtn = isshowisshowbtn;
			tag.list = newlist;
			
			tag.iStoreId = ret[0].iStoreId;
			tag.iStoreHouseId = ret[0].iStoreHouseId;
			console.log();
			
			getReloadnum(tag);
		}else{
			api.hideProgress();
			vant.Toast.fail('获取失败');
		}
	});
}


function getReloadnum(tag){
	let body = new Object();
	body.istoreid = tag.iStoreId;
	body.istorehouse = tag.iStoreHouseId;
	console.log(JSON.stringify(body));
	$kunchi.kunchipost("ActionApi/T_Report_Sku/T_Report_SkusInventoryStore", body, function(ret,err){
		console.log(JSON.stringify(ret) + "----" + JSON.stringify(err));
		api.hideProgress();
		if(ret){
			if(ret.length != 0){
				tag.ontimekucun = ret.map((value)=>{
					let objitem = {};
					objitem.iInventoryId = value.iInventoryId;
					objitem.iCurrentInventory = value.iCurrentInventory;
					return objitem;
				})
			}
		}else{
			
		}
	});
}


function turnpage(tag){
	
	let newoldlist = tag.oldlist.filter((value)=>{
		let shishi = value.iCurrentInventory;
		tag.ontimekucun.forEach((value1)=>{
			if(value.iInventoryId == value1.iInventoryId){
				shishi = value1.iCurrentInventory;
			}
		})
		value.iCurrentInventory = shishi;
		return value.iKucunOpening != "0";
	})
	api.openWin({
	    name: 'panDian_erroreason_win',
	    url: 'widget://html/panDian/error/panDian_erroreason.html',
	    pageParam: {
	        newoldlist: newoldlist,
			closename: api.pageParam.closename
	    }
	});
}
