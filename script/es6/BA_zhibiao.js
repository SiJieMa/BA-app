function initbalist(){
	api.showProgress({
		modal: true
	});
	let idarray = [];
	let idobject = new Object();
	idobject.userid = $api.getStorage("id");
	idarray.push(idobject);
	$kunchi.kunchipost("ActionApi/KPI/KPI_BAAchievementDetailByUserid", idarray, function(ret,err){
		console.log(JSON.stringify(ret) + "==" + JSON.stringify(err));
		api.hideProgress();
		if(ret){
			dealxml(ret);
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

function dealxml(ret){
	let listdata = [];
	ret.map((value, index) => {
		
		let ishas = false;
		let oneindex = 0;
		listdata.filter((value1, index1) => {
			if((value.RealName == value1.name)&&(value.cStoreFullName == value1.storename)){
				ishas = true;
				oneindex = index1;
			}
		})
		
		if(ishas){
			let twoobj = new Object();
			twoobj.brandname = value.BrandName;
			twoobj.money = value.xiaoshoue+"元";
			twoobj.percent = typeof(value.BAKPI) == "undefined" ? 0 : value.BAKPI;
			twoobj.color = appvue.showcolor();
			
			listdata[oneindex].brandlist.push(twoobj);
		}else{
			let oneobj = new Object();
			oneobj.name = value.RealName;
			oneobj.storename = value.cStoreFullName;
			
			let onebrandlist = [];
			let twoobj = new Object();
			twoobj.brandname = value.BrandName;
			twoobj.money = value.xiaoshoue+"元";
			twoobj.percent = typeof(value.BAKPI) == "undefined" ? 0 : value.BAKPI;
			twoobj.color = appvue.showcolor();
			onebrandlist.push(twoobj);
			oneobj.brandlist = onebrandlist;
			listdata.push(oneobj);
		}
		
	})
	
	appvue.listdata = listdata;
	//console.log(JSON.stringify(listdata));
}
