
function initlist(tag){
	let obj = {};
	api.showProgress();
	tag.creportskucode = api.pageParam.creportskucode;
	obj.creportskucode = api.pageParam.creportskucode;
	let posturl = 'ActionApi/T_Inventory/GetInventoryCheckDetailByAuthorize';
	console.log(JSON.stringify(obj));
	$kunchi.kunchipost(posturl, obj, function(ret,err){
		console.log(JSON.stringify(ret) + "----" + JSON.stringify(err));
		api.hideProgress();
		if(ret){
			
			if(ret.length == 0){
				vant.Notify({ type: 'warning', message: '暂无信息' });
				return;
			}
			
			tag.list = ret.map((value, index)=>{
				
				if(index == 0){
					let newsplist = [];
					console.log((value.AuthorList.length - 1));
					for(let i = (value.AuthorList.length - 1); i >= 0; i--){
						let spvalue = value.AuthorList[i];
						console.log(JSON.stringify(spvalue) + "===" + i);
						let dtCreateTimeYear = spvalue.dtCreateTime.split("T")[0];
						let dtCreateTimeMonth = spvalue.dtCreateTime.split("T")[1];
						let dtCreateTimeMonthnew = dtCreateTimeMonth.split(".")[0];
						spvalue.dtCreateTime = dtCreateTimeYear+" "+dtCreateTimeMonthnew;
						if(spvalue.cAuthorNode == "待审批"){
							spvalue.cAuthorNode = "盘点创建";
						}
						newsplist.push(spvalue);
						if(i == (value.AuthorList.length - 1)){
							tag.jindu = spvalue.cAuthorNode;
						}
					}
					tag.splist = newsplist;
					/**let newsplist = value.AuthorList.filter((spvalue)=>{
						if(typeof(spvalue.iStatue) != 'undefined'){
							let dtCreateTimeYear = spvalue.dtCreateTime.split("T")[0];
							let dtCreateTimeMonth = spvalue.dtCreateTime.split("T")[1];
							let dtCreateTimeMonthnew = dtCreateTimeMonth.split(".")[0];
							spvalue.dtCreateTime = dtCreateTimeYear+" "+dtCreateTimeMonthnew;
							tag.jindu = spvalue.cAuthorNode;
							return spvalue;
						}
					})**/
				}
				
				let listobj = {};
				listobj.cProductFullName = value.cProductFullName;
				listobj.cReportSkuCode = value.cReportSkuCode;
				listobj.cReportSkuType = value.cReportSkuType;
				
				if((value.cReportSkuType == "其他")||(value.cReportSkuType == "丢件")){
					listobj.shuomingname = value.cReportSkuType == "其他"?"缺失说明:":"丢件原因:";
					listobj.shuomingtype = value.cErrorContent;
				}else{
					listobj.shuomingname = "";
					listobj.shuomingtype = "";
				}
				
				listobj.iReceiptNumber = value.iReceiptNumber;
				listobj.id = value.id;
				listobj.RealTimeInventory = value.RealTimeInventory;
				if(value.RealTimeInventory > value.iReceiptNumber){
					listobj.isyingkui = "盘亏原因："
				}else{
					listobj.isyingkui = "盘盈原因：";
				}
				return listobj;
			})
		}else{
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