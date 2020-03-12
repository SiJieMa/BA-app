class bawei{
	
	constructor(list) {
	    this.list = list;
	}
	
	showlist(){
		this.list.map((value) => {
			
			var itemobject = new Object();
			itemobject.RealName = value.RealName;
			itemobject.cStoreFullName = value.cStoreFullName;
			itemobject.UserName = value.UserName;
			itemobject.BrandName = value.BrandName;
			appvue.balist.push(itemobject);
			
		});
	}
	
	
}


function initlist(ret){
	var bawei_var = new bawei(ret);
	bawei_var.showlist();
}