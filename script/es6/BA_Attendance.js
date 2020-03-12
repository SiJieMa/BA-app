function initdata(ret){
	let retdata = ret;
	let blistyle = new Array();
	retdata.map((item) => {
		let itemtime = item.dtTaskTime.split("T")[0];
		let isyichang = item["异常人数"];
		let itemobject = Object.create({});
		itemobject.datetime = itemtime;
		itemobject.size = "20px";
		itemobject.color = "#FF5973";
		itemobject.backcolor = "#FF5973";
		itemobject.one = item["上班人数"];
		itemobject.two = item["下班人数"];
		itemobject.three = item["异常人数"];
		blistyle.push(itemobject);
	})
	
	let promise = new Promise((res, rej) => {
		appvue.blistyle = blistyle;
		if(res){
			res(true);
		}else{
			res(false);
		}
	});
	
	promise.then((ret) => {
		appvue.showcalend();
		if(appvue.isfirst == 0){
			showdate();
			appvue.isfirst = 1;
		}
		
	})
	
}

function showdate(){
	let todaytime = appvue.todaytime;
	let datelist = appvue.blistyle;
	appvue.one = 0;
	appvue.two = 0;
	appvue.three = 0;
	datelist.map((item) => {
		if(item.datetime === todaytime){
			appvue.one = item.one;
			appvue.two = item.two;
			appvue.three = item.three;
		}
	})
	
	appvue.posttodaydata();
	
}


function showoneday(ret){
	let retdata = ret;
	let todaytime = appvue.todaytime;
	let thisarray = new Array();
	appvue.isshow = retdata.length == 0 ? false : true;
	retdata.forEach((item) => {
		let ishasitemindex;
		//首先判断一下当前数据是否已经在列表中存在了
		let ishasitem = false;
		thisarray.forEach((item2, index) => {
			if(item2.name == item.RealName){
				ishasitem = true;
				ishasitemindex = index;
			}
		})
		console.log(ishasitem + "===" + ishasitemindex + "===" + JSON.stringify(item));
		let itemObject = Object.create({});
		if(!ishasitem){
			console.log("没有");
			itemObject.name = item.RealName;
			itemObject.shopname = item.cTitle;
			if(item.cSignType == "上班打卡"){
				itemObject.upban = item.cSignType;
				if(typeof(item.dtSignTime) == "undefined"){
					itemObject.upbantime = "未打卡";
					itemObject.downbantime = "未打卡";
					
				}else{
					let iOffset = item.iOffset;
					itemObject.updistance = iOffset > 1000 ? (iOffset / 1000).toFixed(2) + 'KM' : iOffset.toFixed(2) + 'M';
					let iszhengchang = bigayTime(todaytime+' '+item.dtStartTime, todaytime+' '+item.dtSignTime);
					switch (iszhengchang){
						case 1:
							//正常
							itemObject.uptextcolor = 0;
							itemObject.upbantime = item.dtSignTime;
							break;
						case 2:
							//迟到
							itemObject.uptextcolor = 1;
							itemObject.upbantime = item.dtSignTime+"迟到";
							break;
						case 3:
							//正常
							itemObject.uptextcolor = 0;
							itemObject.upbantime = item.dtSignTime;
							break;
					}
				}
			}
			if(item.cSignType == "下班打卡"){
				itemObject.downban = item.cSignType;
				let iOffset = item.iOffset;
				itemObject.downdistance = iOffset > 1000 ? (iOffset / 1000).toFixed(2) + 'KM' : iOffset.toFixed(2) + 'M';
				let iszhengchang = bigayTime(todaytime+' '+item.dtEndTime, todaytime+' '+item.dtSignTime);
				switch (iszhengchang){
					case 1:
						//早退
						itemObject.dwontextcolor = 1;
						itemObject.downbantime = item.dtSignTime+"早退";
						break;
					case 2:
						//正常
						itemObject.dwontextcolor = 0;
						itemObject.downbantime = item.dtSignTime;
						break;
					case 3:
						//正常
						itemObject.dwontextcolor = 0;
						itemObject.downbantime = item.dtSignTime;
						break;
				}
			}
			thisarray.push(itemObject);
		}else{
			console.log("有");
			thisarray[ishasitemindex].name = item.RealName;
			thisarray[ishasitemindex].shopname = item.cTitle;
			if(item.cSignType == "上班打卡"){
				thisarray[ishasitemindex].upban = item.cSignType;
				let iszhengchang = bigayTime(todaytime+' '+item.dtStartTime, todaytime+' '+item.dtSignTime);
				switch (iszhengchang){
					case 1:
						//正常
						thisarray[ishasitemindex].uptextcolor = 0;
						thisarray[ishasitemindex].upbantime = item.dtSignTime;
						break;
					case 2:
						//迟到
						thisarray[ishasitemindex].uptextcolor = 1;
						thisarray[ishasitemindex].upbantime = item.dtSignTime+"迟到";
						break;
					case 3:
						//正常
						thisarray[ishasitemindex].uptextcolor = 0;
						thisarray[ishasitemindex].upbantime = item.dtSignTime;
						break;
				}
			}
			if(item.cSignType == "下班打卡"){
				thisarray[ishasitemindex].downban = item.cSignType;
				let iszhengchang = bigayTime(todaytime+' '+item.dtEndTime, todaytime+' '+item.dtSignTime);
				switch (iszhengchang){
					case 1:
						//早退
						thisarray[ishasitemindex].dwontextcolor = 1;
						thisarray[ishasitemindex].downbantime = item.dtSignTime+"早退";
						break;
					case 2:
						//正常
						thisarray[ishasitemindex].dwontextcolor = 0;
						thisarray[ishasitemindex].downbantime = item.dtSignTime;
						break;
					case 3:
						//正常
						thisarray[ishasitemindex].dwontextcolor = 0;
						thisarray[ishasitemindex].downbantime = item.dtSignTime;
						break;
				}
			}
		}
	})
	console.log(JSON.stringify(thisarray));
	appvue.datajson = thisarray;
}