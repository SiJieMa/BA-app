function initplan(ret){
	let retdata = ret;
	retdata.map((item) => {
		let dtPlantTime = item.dtPlantTime;
		dtPlantTime = dtPlantTime.split("T")[0];
		item.dtPlantTime = dtPlantTime;
		
		item.ListMain.filter((value, index) => {
			let listmain = value.NotDoBA;
			listmain = panduandunhao(listmain, value.NotDoManager);
			listmain = panduandunhao(listmain, value.NotDoDisplay);
			listmain = panduandunhao(listmain, value.NotDoSku);
			listmain = panduandunhao(listmain, value.NotDoTrySku);
			listmain = panduandunhao(listmain, value.NotDoGetData);
			value.listmain = listmain;
		})
	});
	appvue.noplanlist = retdata;
}

function panduandunhao(listmain, NotDo){
	if(listmain == ""){
		if(NotDo != ""){
			listmain = NotDo;
		}
	}else{
		if(NotDo != ""){
			listmain = listmain + "、"+NotDo;
		}
	}
	return listmain;
}