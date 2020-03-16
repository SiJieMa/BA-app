function initpage(ret){
	
	let thismonthret = ret;
	/**
	 * datetime: "2019-12-12",size: "20px",backcolor: "#ffff00", //可以使用rgba进行上传,color: "#FFFFFF", //文字颜色num: '6'
	 */
	let zonghe = 0;
	let promise = new Promise((resolve, reject) => {
		let datadatearray = [];
		thismonthret.map((value) => {
			let dtPlantTime = value.dtPlantTime;
			let amount = value.amount;
			let backcolor;
			if(amount > 6)
				backcolor = '#14D6D7';
			else if((5 <= amount)&&(amount <= 6))
				backcolor = '#FFB574';
			else if(amount < 5)
				backcolor = '#FF5973';
			
			let io = Object.create({});
			io.datetime = dtPlantTime.split("T")[0];
			io.size = '20px';
			io.backcolor = backcolor;
			io.color = "#FFFFFF";
			io.num = amount;
			datadatearray.push(io);
			zonghe = zonghe + amount;
		})
		if(resolve){
			resolve({
				datadatearray: datadatearray, 
				zonghe: zonghe
			});
		}else if(reject){
			reject("no");
		}
	});
	
	promise.then(resolve => {
		appvue.datalist = resolve.datadatearray;
		appvue.zongji = resolve.zonghe;
		appvue.showcalendar();
	})
	
	promise.catch(reject => {
		appvue.apptoastmsg();
	})
	
	promise.then(()=>{
		if(appvue.isfirstshow == 0){
			appvue.isfirstshow = 1;
			appvue.postonedaydb();
		}
	})
	
}


function reloadrili(datetime){
	let ryear = datetime.split("-")[0];
	let rmonth = datetime.split("-")[1];
	appvue.year = ryear;
	appvue.month = rmonth;
	let ym = appvue.year + "-" + appvue.month;
	appvue.postdata(ym);
}


function showdetail(ret){
	let retdata = ret;
	retdata.map((item) => {
		let datetime = item.dtinStore;
		let time = datetime.split("T")[1];
		item.dtinStore = time;
		let ioffset = item.ioffset;
		item.ioffset = ioffset > 1000 ? (ioffset / 1000).toFixed(2) + 'KM' : ioffset.toFixed(2) + 'M';
	})
	appvue.everydata = retdata.length == 0 ? [] : retdata;
	appvue.isshowdetail = retdata.length == 0 ? false : true;
}
