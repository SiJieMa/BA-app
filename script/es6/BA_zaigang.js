function initlist(time){
	let functime = time;
	api.showProgress({
		modal: true
	});
	let body = new Object();
	body.userid = $api.getStorage('id');
	body.startime = functime;
	$kunchi.kunchipost("ActionApi/KPI/KPI_BAHasWorkByUserid", body, function(ret,err){
		//console.log(JSON.stringify(ret) + "==" + JSON.stringify(err));
		api.hideProgress();
		if(ret){
			showlist(ret);
		}else{
			api.alert({
			    title: '提示',
			    msg: '当前网络错误,请稍后重试.',
			}, function(ret, err) {
				api.closeWin({
	            });
			});
		}
	});
}

function showlist(ret){
	let isshow = ret.length == 0 ? false : true;
	if(isshow){
		let balistnew = new Array();
		ret.forEach((value, index) => {
			let name = value.RealName;
			let shopname = value.cStoreFullName;
			let ishas = false;
			let ishasindex = 0;
			balistnew.forEach((value1, index1) => {
				let RealName = value1.RealName;
				let cStoreFullName = value1.cStoreFullName;
				if((name == RealName)&&(shopname == cStoreFullName)){
					ishas = true;
					ishasindex = index1;
				}
			})
			let BrandName = value.BrandName;
			if(ishas){
				let brandlistthis = balistnew[ishasindex].brandlist;
				if(BrandName != ""){
					balistnew[ishasindex].brandlist = balistnew[ishasindex].brandlist + "、" + BrandName;
				}
			}else{
				let listitem = new Object();
				listitem.cStoreFullName = shopname;
				listitem.RealName = name;
				listitem.UserName = value.Telephone == "" ? value.UserName : value.Telephone;
				listitem.brandlist = BrandName;
				balistnew.push(listitem);
			}
		});
		balistnew.filter((value) => {
			value.brandlist = value.brandlist==""?"无":value.brandlist;
		})
		appvue.balist = balistnew;
	}
}
