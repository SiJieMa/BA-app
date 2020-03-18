
function initlist(tag){
	let obj = {};
	api.showProgress();
	tag.creportskucode = api.pageParam.creportskucode;
	obj.creportskucode = api.pageParam.creportskucode;
	obj.iuserid = $api.getStorage("id");
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
			let AuthorListlength = ret[0].AuthorList.length - 1;
			console.log(AuthorListlength);
			tag.jindu = ret[0].AuthorList[AuthorListlength].cAuthorNode;
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


				//判断是否有复盘失败的可能
				listobj.cReportSkuTypeFU = value.iSalesAmount == "2" ? "复盘失败-" : "";

				if((value.cReportSkuType == "其他")||(value.cReportSkuType == "丢件")){
					listobj.shuomingtype = value.cErrorContent;
				}else{
					listobj.shuomingname = "";
					listobj.shuomingtype = "";
				}

				listobj.iReceiptNumber = value.iReceiptNumber;
				listobj.id = value.id;
				listobj.RealTimeInventory = value.iCurrentInventory;
				if(value.iCurrentInventory > value.iReceiptNumber){
					listobj.isyingkui = "盘亏原因："
					listobj.shuomingname = value.cReportSkuType == "其他"?"缺失说明:":"丢件原因:";
				}else{
					listobj.isyingkui = "盘盈原因：";
					listobj.shuomingname = value.cReportSkuType == "其他"?"盘盈说明:":"丢件原因:";
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
