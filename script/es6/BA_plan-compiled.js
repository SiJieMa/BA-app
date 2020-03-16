"use strict";

function initplan(ret) {
	var retdata = ret;
	retdata.map(function (item) {
		var dtPlantTime = item.dtPlantTime;
		dtPlantTime = dtPlantTime.split("T")[0];
		item.dtPlantTime = dtPlantTime;

		item.ListMain.filter(function (value, index) {
			var listmain = value.NotDoBA;
			listmain = panduandunhao(listmain, value.NotDoManager);
			listmain = panduandunhao(listmain, value.NotDoDisplay);
			listmain = panduandunhao(listmain, value.NotDoSku);
			listmain = panduandunhao(listmain, value.NotDoTrySku);
			listmain = panduandunhao(listmain, value.NotDoGetData);
			value.listmain = listmain;
		});
	});
	appvue.noplanlist = retdata;
}

function panduandunhao(listmain, NotDo) {
	if (listmain == "") {
		if (NotDo != "") {
			listmain = NotDo;
		}
	} else {
		if (NotDo != "") {
			listmain = listmain + "、" + NotDo;
		}
	}
	return listmain;
}
