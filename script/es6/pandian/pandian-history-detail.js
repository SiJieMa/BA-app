
function initlist(tag){
	let obj = {};
	api.showProgress();
	tag.creportskucode = api.pageParam.creportskucode;
	obj.creportskucode = api.pageParam.creportskucode;
	let posturl = 'ActionApi/T_Inventory/GetHistoryInventoryPanDianDetail';
	console.log(JSON.stringify(obj));
	$kunchi.kunchipost(posturl, obj, function(ret,err){
		console.log(JSON.stringify(ret) + "----" + JSON.stringify(err));
		api.hideProgress();
		if(ret){
			
			if(ret.length == 0){
				vant.Notify({ type: 'warning', message: '暂无信息' });
				return;
			}
			
			tag.list = ret.map((value)=>{
				value.isred = value.iKucunOpening == 0 ? "" : "red";
				return value;
			});
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