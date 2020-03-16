

function initlist(tag){
	api.showProgress();
	let url = '';
	if(($api.getStorage("roleName").includes("经理"))&&($api.getStorage("roleName") != "客户经理")){
		url = 'ActionApi/T_Inventory/GetInventoryCheckByAuthorize';
	}else{
		if($api.getStorage("roleName") == "客户经理"){
			url = 'ActionApi/T_Inventory/GetInventoryCheckByBrand';
		}else{
			url = 'ActionApi/T_Inventory/GetInventoryCheckByDirector';
		}
	}
	console.log(url);
	let body = new Object();
	body.iuserid = $api.getStorage("id");
	// body.iuserid = '029C9537-CA3E-46C5-B6C1-A98B9F0CB4C2';
	$kunchi.kunchipost(url, body, function(ret, err) {
		api.hideProgress();
		console.log(JSON.stringify(ret)+"---"+JSON.stringify(err));
		if (ret) {
			if (ret.length == 0) {
				vant.Toast.fail('暂无待审批记录');
			} else {
				tag.list = ret.map((value)=>{
					// let colormsg = 'hong';
					// let chulimsg = '待处理';
					// if(value.iDirectorStatue == 1 || value.iAuthorizeStatue == 1){
					// 	colormsg = 'lan';
					// 	chulimsg = '已处理';
					// }
					value.colormsg = value.cDirectorStatue == "待处理" ? "hong" : "lan";
					value.chulimsg = value.cDirectorStatue;
					value.dtReportTime = value.dtReportTime.split("T")[0];
					value.isshow = true;
					return value;
				})
			}
		} else {
			vant.Dialog.confirm({
			  title: '网络错误',
			  message: '暂无待审批列表失败,是否重新获取?'
			}).then(() => {
			  // on confirm
			  initlist(tag);
			}).catch(() => {
			  // on cancel
			  api.closeWin();
			});
		}
	});
}

function reloadlistnew(tag){
	api.addEventListener({
	    name: 'reloadpandianlist'
	}, function(aaa, bbb) {
		console.log(JSON.stringify(aaa));
		let creportskucode = aaa.value.key1;
		console.log(creportskucode);
		tag.list = tag.list.filter((value)=>{
			if(value.cReportSkuCode == creportskucode){
				value.colormsg = "lan";
				value.chulimsg = "已处理";
			}
			return value;
		})
		vant.Notify({ type: 'warning', message: '刷新完成' });
	});
}


function filterReloadList(tag){
	let pdsucerr = tag.pdstate;
	let pdtimeorder = tag.pdtime;
	
	let isrightitem = pdsucerr == -1 ? true : false;
	let timeStop = $kunchi.todaydate();
	let othertimeStop = changedatetomillon(timeStop) * 1000;
	if(pdtimeorder == 0){
		let othertimeStopMiddle = othertimeStop - (86400000 * 7);
		timeStop = $kunchi.getMillonDate(othertimeStopMiddle);
	}else if(pdtimeorder == 1){
		let othertimeStopMiddle = othertimeStop - (86400000 * 31);
		timeStop = $kunchi.getMillonDate(othertimeStopMiddle);
	}else if(pdtimeorder == 2){
		let othertimeStopMiddle = othertimeStop - (86400000 * 91);
		timeStop = $kunchi.getMillonDate(othertimeStopMiddle);
	}
	tag.list.forEach((value)=>{
		if(isrightitem){//没有正常异常得筛选
			if(pdtimeorder == -1){//也不筛选时间
				value.isshow = true;
			}else{//筛选时间
				if(bigayTime(timeStop, value.dtReportTime) == 2){
					value.isshow = true;
				}else{
					value.isshow = false;
				}
			}
		}else{//筛选正常异常
			if(pdtimeorder == -1){//不筛选时间
				if(pdsucerr == 0){//筛选状态
					value.isshow = value.chulimsg == "待处理" ? true : false;
				}else if(pdsucerr == 1){
					value.isshow = value.chulimsg == "已处理" ? true : false;
				}
			}else{
				if(bigayTime(timeStop, value.dtReportTime) == 2){
					if(pdsucerr == 0){
						value.isshow = value.chulimsg == "待处理" ? true : false;
					}else if(pdsucerr == 1){
						value.isshow = value.chulimsg == "已处理" ? true : false;
					}
				}else{
					value.isshow = false;
				}
			}
		}
	})
	tag.show = false;
}