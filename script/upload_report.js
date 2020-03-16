function upload_report_sale_signout(iRorptId) {
	var objectarray = new Array();
	//首先查询陈列检查列表
	var db = api.require('db');

	var ret_chenlie = db.selectSqlSync({
		name : 'kunchidb',
		sql : 'SELECT * FROM chenlielist WHERE iRorptId="' + iRorptId + '" AND userid="' + $api.getStorage("id") + '"'
	});


	var ret_quehuo = db.selectSqlSync({
		name : 'kunchidb',
		sql : 'SELECT * FROM quehuolist WHERE iRorptId="' + iRorptId + '" AND userid="' + $api.getStorage("id") + '"'
	});

	var ret_daijiaofen = db.selectSqlSync({
		name : 'kunchidb',
		sql : 'SELECT * FROM daijiaofenlist WHERE iRorptId="' + iRorptId + '" AND userid="' + $api.getStorage("id") + '"'
	});

	var ret_daijiaopic = db.selectSqlSync({
		name : 'kunchidb',
		sql : 'SELECT * FROM daijiaopiclist WHERE iRorptId="' + iRorptId + '" AND userid="' + $api.getStorage("id") + '"'
	});


	var fenlei_listzidian = $api.getStorage('fenlei_listzidian');

	var allgoodtype = $api.getStorage("allgoodtype");
	for(var y = 0; y < allgoodtype.length; y++){
		var goodtype_item = allgoodtype[y].BrandName;
		for(x = 0; x < fenlei_listzidian.length; x++){
			var fenlei_itemzidian = fenlei_listzidian[x];
			if (ret_chenlie.status) {
				if (ret_chenlie.data.length != 0) {
					var piclist = new Array();

					for (var a = 0; a < ret_chenlie.data.length; a++) {
						if((ret_chenlie.data[a].pinpainame == goodtype_item)&&(ret_chenlie.data[a].fenleiname == fenlei_itemzidian)){


							var chenlieobject = new Object();
							piclist = new Array();
							chenlieobject.cBrandName = ret_chenlie.data[a].pinpainame;
							chenlieobject.cCategory = ret_chenlie.data[a].fenleiname;
							chenlieobject.cLeftProduct = ret_chenlie.data[a].leftgood;
							chenlieobject.cReportDetailName = ret_chenlie.data[a].zidianname;
							chenlieobject.cReportType = ret_chenlie.data[a].zidianid;//字典分类的id
							chenlieobject.cRightProduct = ret_chenlie.data[a].rightgood;
							chenlieobject.cSalesProduct	 = ret_chenlie.data[a].hascuxiao;
							chenlieobject.cTrainContent = "";
							chenlieobject.cTrainFollow = "";
							chenlieobject.iBrandId = ret_chenlie.data[a].pinpaiid;

							chenlieobject.iReportId = ret_chenlie.data[a].iRorptId;
							chenlieobject.iUserId = ret_chenlie.data[a].userid;
							chenlieobject.dtDateTime = ret_chenlie.data[a].chenliecreattime;
							chenlieobject.dtReportTime = ret_chenlie.data[a].iRorptListTime;

							var chenlie_piclist = change_String_Piclist(ret_chenlie.data[a].chenlie);
							var cuxiao_piclist = change_String_Piclist(ret_chenlie.data[a].cuxiao);
							var jingpin_piclist = change_String_Piclist(ret_chenlie.data[a].jingpin);
							if (chenlie_piclist.length != 0) {
								if (chenlie_piclist[0] != 0) {
									for (var b = 0; b < chenlie_piclist.length; b++) {
										var picobject = new Object();
										picobject.cPicClass = ret_chenlie.data[a].zidianname;
										picobject.cPicPath = $kunchi.gettodaydate() + '/' + chenlie_piclist[b];
										picobject.cPicType = ret_chenlie.data[a].zidiantype;
										picobject.cRoleName = $api.getStorage("realName");
										picobject.cUserName = $api.getStorage("username");
										picobject.iBrandName = ret_chenlie.data[a].pinpainame;
										picobject.iStoreId = ret_chenlie.data[a].iStoreId;
										picobject.iReportId = ret_chenlie.data[a].iRorptId;
										picobject.iTrainId = "";
										picobject.iSize = 0;
										picobject.iUserId = ret_chenlie.data[a].userid;
										picobject.dtUploadTime = $kunchi.todaytime();
										piclist.push(picobject);
									}
								}
							}
							if (cuxiao_piclist.length != 0) {
								if (cuxiao_piclist[0] != 0) {
									for (var b = 0; b < cuxiao_piclist.length; b++) {
										var picobject = new Object();
										picobject.cPicClass = ret_chenlie.data[a].zidianname;
										picobject.cPicPath = $kunchi.gettodaydate() + '/' + cuxiao_piclist[b];
										picobject.cPicType = ret_chenlie.data[a].zidiantype;
										picobject.cRoleName = $api.getStorage("realName");
										picobject.cUserName = $api.getStorage("username");
										picobject.iBrandName = ret_chenlie.data[a].pinpainame;
										picobject.iStoreId = ret_chenlie.data[a].iStoreId;
										picobject.iReportId = ret_chenlie.data[a].iRorptId;
										picobject.iTrainId = "";
										picobject.iSize = 0;
										picobject.iUserId = ret_chenlie.data[a].userid;
										picobject.dtUploadTime = $kunchi.todaytime();
										piclist.push(picobject);
									}
								}
							}
							if (jingpin_piclist.length != 0) {
								if (jingpin_piclist[0] != 0) {
									for (var b = 0; b < chenlie_piclist.length; b++) {
										var picobject = new Object();
										picobject.cPicClass = ret_chenlie.data[a].zidianname;
										picobject.cPicPath = $kunchi.gettodaydate() + '/' + jingpin_piclist[b];
										picobject.cPicType = ret_chenlie.data[a].zidiantype;
										picobject.cRoleName = $api.getStorage("realName");
										picobject.cUserName = $api.getStorage("username");
										picobject.iBrandName = ret_chenlie.data[a].pinpainame;
										picobject.iStoreId = ret_chenlie.data[a].iStoreId;
										picobject.iReportId = ret_chenlie.data[a].iRorptId;
										picobject.iTrainId = "";
										picobject.iSize = 0;
										picobject.iUserId = ret_chenlie.data[a].userid;
										picobject.dtUploadTime = $kunchi.todaytime();
										piclist.push(picobject);
									}
								}
							}
							if(piclist.length != 0){
								chenlieobject._pic = piclist;
							}
							objectarray.push(chenlieobject);
						}
					}
				}
			}
		}
	}


	if(ret_quehuo.status){
		if(ret_quehuo.data.length != 0){
			var quehuoobject = new Object();
			quehuoobject.cBrandName = "";
			quehuoobject.cCategory = "";
			quehuoobject.cLeftProduct = "";
			quehuoobject.cReportDetailName = ret_quehuo.data[0].zidianname;
			quehuoobject.cReportType = ret_quehuo.data[0].zidianid;//字典分类的id
			quehuoobject.cRightProduct = "";
			quehuoobject.cSalesProduct = "";
			quehuoobject.cTrainContent = "";
			quehuoobject.cTrainFollow = "";
			quehuoobject.iBrandId = "";

			quehuoobject.iReportId = ret_quehuo.data[0].iRorptId;
			quehuoobject.iUserId = ret_quehuo.data[0].userid;
			quehuoobject.dtDateTime = ret_quehuo.data[0].iRorptListTime;
			quehuoobject.dtReportTime = ret_quehuo.data[0].iRorptListTime;
			var Stocklist = new Array();
			for(var a = 0; a < ret_quehuo.data.length; a++){
				var objectquehuo = new Object();
				objectquehuo.cBrandName = ret_quehuo.data[a].pinpainame;
				objectquehuo.cProductName =  ret_quehuo.data[a].goodname;
				objectquehuo.iBrandId = ret_quehuo.data[a].pinpaiid;
				objectquehuo.iProductId = ret_quehuo.data[a].goodid;
				objectquehuo.iReportId = ret_quehuo.data[a].iRorptId;
				objectquehuo.isHave = 1;
				Stocklist.push(objectquehuo);
			}
			quehuoobject._stock = Stocklist;
			objectarray.push(quehuoobject);
		}
	}





	/**
	 * 保存评分的列表中的BA德id
	 */
	var ba_pingfen_list = new Array();
	for(var a = 0; a < ret_daijiaofen.data.length; a++){
		has_ThisString(ba_pingfen_list, ret_daijiaofen.data[a].bauserid);
	}

	var allgoodtype = $api.getStorage("allgoodtype");

	for(var abc = 0; abc < ba_pingfen_list.length; abc++){

		for(var y = 0; y < allgoodtype.length; y++){

			/**
			 * 判断该品牌的BA带教报告是否需要保存
			 */
			var ifsavethisreport = 0;

			var goodtype_item = allgoodtype[y].BrandName;
			var daijiaofenobject = new Object();

			var Gradeslist = new Array();
			var Gradeslist_object = new Object();

			if((ret_daijiaofen.status)||(ret_daijiaopic.status)){
				if((ret_daijiaofen.data.length != 0)||(ret_daijiaopic.data.length != 0)){
					daijiaofenobject.cBrandName = goodtype_item;
					daijiaofenobject.cCategory = "";
					daijiaofenobject.cLeftProduct = "";
					daijiaofenobject.cReportDetailName = ret_daijiaofen.data[0].zidianname;
					daijiaofenobject.cReportType = ret_daijiaofen.data[0].zidianid;//字典分类的id
					daijiaofenobject.cRightProduct = "";
					daijiaofenobject.cSalesProduct	 = "";
					daijiaofenobject.cTrainContent = "";
					daijiaofenobject.cTrainFollow = "";
					daijiaofenobject.iBrandId = allgoodtype[y].rBrandID;
					daijiaofenobject.iReportId = ret_daijiaofen.data[0].iRorptId;
					daijiaofenobject.iUserId = ret_daijiaofen.data[0].userid;
					daijiaofenobject.dtDateTime = ret_daijiaofen.data[0].iRorptListTime;
					daijiaofenobject.dtReportTime = ret_daijiaofen.data[0].iRorptListTime;
					daijiaofenobject.iBAUserID = ba_pingfen_list[abc];
					var daijiaofen_grade = new Array();
					for(var a = 0; a < ret_daijiaofen.data.length; a++){
						if((ret_daijiaofen.data[a].pinpainame == goodtype_item)&&(ret_daijiaofen.data[a].bauserid == ba_pingfen_list[abc])){
							var object_daijiaofen = new Object();
							object_daijiaofen.cDictName = ret_daijiaofen.data[a].pingjianame;

							var pingfen = ret_daijiaofen.data[a].pingfen;
							if(isempty(pingfen)){
								pingfen = 0;
							}
							object_daijiaofen.iGradeNumber = pingfen;
							object_daijiaofen.iReportId = ret_daijiaofen.data[a].iRorptId;
							object_daijiaofen.iTotalNumber = ret_daijiaofen.data[a].normalfen;
							object_daijiaofen.iTrainiId = '';
							daijiaofen_grade.push(object_daijiaofen);
						}
					}

					if(daijiaofen_grade.length != 0){
						ifsavethisreport = 1;
					}

					Gradeslist_object._grade = daijiaofen_grade;

					for(var a = 0; a < ret_daijiaopic.data.length; a++){
						if((ret_daijiaopic.data[a].pinpainame == goodtype_item)&&(ret_daijiaopic.data[a].bauserid == ba_pingfen_list[abc])){

							var chenlieobject = new Object();
							var piclist = new Array();

							var chenlie_piclist = change_String_Piclist(ret_daijiaopic.data[a].bapiclist);
							var cuxiao_piclist = change_String_Piclist(ret_daijiaopic.data[a].pinggupiclist);
							if (chenlie_piclist.length != 0) {
								if (chenlie_piclist[0] != 0) {
									for (var b = 0; b < chenlie_piclist.length; b++) {
										var picobject = new Object();
										picobject.cPicClass = "BA人员拍照";
										picobject.cPicPath = $kunchi.gettodaydate() + '/' + chenlie_piclist[b];
										picobject.cPicType = "PhotoType";
										picobject.cRoleName = $api.getStorage("realName");
										picobject.cUserName = $api.getStorage("username");
										picobject.iBrandName = ret_daijiaopic.data[a].pinpainame;
										picobject.iStoreId = ret_daijiaopic.data[a].iStoreId;
										picobject.iReportId = ret_daijiaopic.data[a].iRorptId;
										picobject.iTrainId = "";
										picobject.iSize = 0;
										picobject.iUserId = ret_daijiaopic.data[a].userid;
										picobject.dtUploadTime = $kunchi.todaytime();
										piclist.push(picobject);
									}
								}
							}
							if (cuxiao_piclist.length != 0) {
								if (cuxiao_piclist[0] != 0) {
									for (var b = 0; b < cuxiao_piclist.length; b++) {
										var picobject = new Object();
										picobject.cPicClass = "评估表拍照";
										picobject.cPicPath = $kunchi.gettodaydate() + '/' + cuxiao_piclist[b];
										picobject.cPicType = "PhotoType";
										picobject.cRoleName = $api.getStorage("realName");
										picobject.cUserName = $api.getStorage("username");
										picobject.iBrandName = ret_daijiaopic.data[a].pinpainame;
										picobject.iStoreId = ret_daijiaopic.data[a].iStoreId;
										picobject.iReportId = ret_daijiaopic.data[a].iRorptId;
										picobject.iTrainId = "";
										picobject.iSize = 0;
										picobject.iUserId = ret_daijiaopic.data[a].userid;
										picobject.dtUploadTime = $kunchi.todaytime();
										piclist.push(picobject);
									}
								}
							}
							if(piclist.length != 0){
								Gradeslist_object._pic = piclist;
							}
							if(piclist.length != 0){
								ifsavethisreport = 1;
							}
						}
					}
					if(ifsavethisreport == 1){
						Gradeslist.push(Gradeslist_object);
						daijiaofenobject._Grades = Gradeslist;
						objectarray.push(daijiaofenobject);
					}
				}
			}

		}

	}


	/**for(var abc = 0; abc < ba_pingfen_list.length; abc++){

		for(var y = 0; y < allgoodtype.length; y++){
			var goodtype_item = allgoodtype[y].BrandName;
			if(ret_daijiaopic.status){
				if(ret_daijiaopic.data.length != 0){
					for(var a = 0; a < ret_daijiaopic.data.length; a++){
						if((ret_daijiaopic.data[a].pinpainame == goodtype_item)&&(ret_daijiaopic.data[a].bauserid == ba_pingfen_list[abc])){

							var chenlieobject = new Object();
							var piclist = new Array();
							chenlieobject.cBrandName = ret_daijiaopic.data[a].pinpainame;
							chenlieobject.cCategory = "";
							chenlieobject.cLeftProduct = "";
							chenlieobject.cReportDetailName = ret_daijiaopic.data[a].zidianname;
							chenlieobject.cReportType = ret_daijiaopic.data[a].zidianid;//字典分类的id
							chenlieobject.cRightProduct = "";
							chenlieobject.cSalesProduct	 = "";
							chenlieobject.cTrainContent = ret_daijiaopic.data[a].thisfudao;
							chenlieobject.cTrainFollow = ret_daijiaopic.data[a].nextfudao;
							chenlieobject.iBrandId = ret_daijiaopic.data[a].pinpaiid;

							chenlieobject.iReportId = ret_daijiaopic.data[a].iRorptId;
							chenlieobject.iUserId = ret_daijiaopic.data[a].userid;
							chenlieobject.dtDateTime = ret_daijiaopic.data[a].iRorptListTime;
							chenlieobject.dtReportTime = ret_daijiaopic.data[a].iRorptListTime;
							chenlieobject.iBAUserID = ba_pingfen_list[abc];

							var chenlie_piclist = change_String_Piclist(ret_daijiaopic.data[a].bapiclist);
							var cuxiao_piclist = change_String_Piclist(ret_daijiaopic.data[a].pinggupiclist);
							if (chenlie_piclist.length != 0) {
								if (chenlie_piclist[0] != 0) {
									for (var b = 0; b < chenlie_piclist.length; b++) {
										var picobject = new Object();
										picobject.cPicClass = "BA人员拍照";
										picobject.cPicPath = chenlie_piclist[b];
										picobject.cPicType = "PhotoType";
										picobject.cRoleName = $api.getStorage("realName");
										picobject.cUserName = $api.getStorage("username");
										picobject.iBrandName = ret_daijiaopic.data[a].pinpainame;
										picobject.iStoreId = ret_daijiaopic.data[a].iStoreId;
										picobject.iReportId = ret_daijiaopic.data[a].iRorptId;
										picobject.iTrainId = "";
										picobject.iSize = 0;
										picobject.iUserId = ret_daijiaopic.data[a].userid;
										picobject.dtUploadTime = $kunchi.todaytime();
										piclist.push(picobject);
									}
								}
							}
							if (cuxiao_piclist.length != 0) {
								if (cuxiao_piclist[0] != 0) {
									for (var b = 0; b < cuxiao_piclist.length; b++) {
										var picobject = new Object();
										picobject.cPicClass = "评估表拍照";
										picobject.cPicPath = cuxiao_piclist[b];
										picobject.cPicType = "PhotoType";
										picobject.cRoleName = $api.getStorage("realName");
										picobject.cUserName = $api.getStorage("username");
										picobject.iBrandName = ret_daijiaopic.data[a].pinpainame;
										picobject.iStoreId = ret_daijiaopic.data[a].iStoreId;
										picobject.iReportId = ret_daijiaopic.data[a].iRorptId;
										picobject.iTrainId = "";
										picobject.iSize = 0;
										picobject.iUserId = ret_daijiaopic.data[a].userid;
										picobject.dtUploadTime = $kunchi.todaytime();
										piclist.push(picobject);
									}
								}
							}
							chenlieobject._pic = piclist;
							if(piclist.length != 0){
								objectarray.push(chenlieobject);
							}
						}
					}
				}
			}
		}
	}**/
//	console.log(JSON.stringify(objectarray));

	if(objectarray.length == 0){
//		openpage("signoutwin", "signoutframe", "离店拍照", "widget://html/sale/signout.html", {
//			iReportId: api.pageParam.page.iReportId,
//			iStoreId: api.pageParam.page.iStoreId,
//			cStoreFullName : api.pageParam.page.cStoreFullName,
//			iRorptId: api.pageParam.page.iRorptId,
//			cLon: api.pageParam.page.cLon,
//			cLat: api.pageParam.page.cLat,
//			iStoreId: api.pageParam.page.iStoreId
//		});
		api.openWin({
		    name: "signoutwin",
		    url: 'widget://html/sale/signoutwin.html',
		    slidBackEnabled: false,
		    pageParam: {
		        data: {
		        	iReportId: api.pageParam.page.iReportId,
					iStoreId: api.pageParam.page.iStoreId,
					cStoreFullName : api.pageParam.page.cStoreFullName,
					iRorptId: api.pageParam.page.iRorptId,
					cLon: api.pageParam.page.cLon,
					cLat: api.pageParam.page.cLat,
					iStoreId: api.pageParam.page.iStoreId
		        }
		    }
		});
		
		return;
	}

	jiazai();

	/**
	 * 上传报告的时候 要停止后台上传图片否则无法离店
	 */
	$api.setStorage("iscloseupload","1");
	api.cancelAjax({
	    tag: 'uploadpic'
	});

	$kunchi.kunchipost('ActionApi/T_ReportTrain/T_ReportTrainAddGrades', objectarray, function(ret, err) {
		//console.log(JSON.stringify(ret) + "---" + JSON.stringify(err));
		tingzhi();

		$api.setStorage("iscloseupload","0");
		api.sendEvent({
	        name:'upload_databasepic'
        });

		if (ret) {
//			openpage("signoutwin", "signoutframe", "离店拍照", "widget://html/sale/signout.html", {
//				iReportId: api.pageParam.page.iReportId,
//				iStoreId: api.pageParam.page.iStoreId,
//				cStoreFullName : api.pageParam.page.cStoreFullName,
//				iRorptId: api.pageParam.page.iRorptId,
//				cLon: api.pageParam.page.cLon,
//				cLat: api.pageParam.page.cLat,
//				iStoreId: api.pageParam.page.iStoreId
//			});
			
			api.openWin({
			    name: "signoutwin",
			    url: 'widget://html/sale/signoutwin.html',
			    slidBackEnabled: false,
			    pageParam: {
			        data: {
			        	iReportId: api.pageParam.page.iReportId,
						iStoreId: api.pageParam.page.iStoreId,
						cStoreFullName : api.pageParam.page.cStoreFullName,
						iRorptId: api.pageParam.page.iRorptId,
						cLon: api.pageParam.page.cLon,
						cLat: api.pageParam.page.cLat,
						iStoreId: api.pageParam.page.iStoreId
			        }
			    }
			});
			
		} else {
			//post_other_errorinfo(JSON.stringify(objectarray), $api.getStorage("id"), 'ActionApi/T_ReportTrain/T_ReportTrainAddGrades', JSON.stringify(err));
			if(err.statusCode == '406'){
				alert(err.msg);
			}else{
				alert("提交报告失败,请检查网络是否可用.");
			}
		}
	});

}


function upload_text_report(){

	var db = api.require('db');
	db.selectSql({
		name : 'kunchidb',
		sql : 'SELECT * FROM reportlist WHERE iRorptId="' + api.pageParam.page.iRorptId + '" AND userid="' + $api.getStorage("id") + '"'
	}, function(aaa, bbb) {
		if (aaa.status) {
			if (aaa.data.length != 0) {
				var context = aaa.data[0].context;
				var value = {
					cremark: context,
					id: api.pageParam.page.iRorptId
				};
				jiazai();
				//alert(JSON.stringify(value));
				$kunchi.kunchipost('ActionApi/T_WorkReport/T_WorkReportUpdate', value, function(ret, err) {
					//console.log(JSON.stringify(ret) + "---" + JSON.stringify(err));
					tingzhi();
					if (ret) {
//						openpage("signoutwin", "signoutframe", "离店拍照", "widget://html/sale/signout.html", {
//							iReportId: api.pageParam.page.iRorptId,
//							iStoreId: api.pageParam.page.iStoreId,
//							cStoreFullName : api.pageParam.page.cStoreFullName,
//							iRorptId: api.pageParam.page.iRorptId,
//							cLon: api.pageParam.page.cLon,
//							cLat: api.pageParam.page.cLat,
//							iStoreId: api.pageParam.page.iStoreId
//						});
						api.openWin({
						    name: "signoutwin",
						    url: 'widget://html/sale/signoutwin.html',
						    slidBackEnabled: false,
						    pageParam: {
						        data: {
						        	iReportId: api.pageParam.page.iRorptId,
									iStoreId: api.pageParam.page.iStoreId,
									cStoreFullName : api.pageParam.page.cStoreFullName,
									iRorptId: api.pageParam.page.iRorptId,
									cLon: api.pageParam.page.cLon,
									cLat: api.pageParam.page.cLat,
									iStoreId: api.pageParam.page.iStoreId
						        }
						    }
						});
					} else {
						//post_other_errorinfo(JSON.stringify(value), $api.getStorage("id"), 'ActionApi/T_WorkReport/T_WorkReportUpdate', JSON.stringify(err));
						if(err.statusCode == '406'){
							alert(err.msg);
						}else{
							alert("提交报告失败,请检查网络是否可用.");
						}
					}
				});
			}else{
				alert("您尚未填写任何报告内容,请进入填写.");
			}
		}
	});

}

/**
 * 查询数组中是否有该字段 有的话就pass 没有的话就插入进去
 */
function has_ThisString(array, string){
	var ishas = 0;
	for(var a = 0; a < array.length; a++){
		if(array[a] == string){
			ishas = 1;
		}
	}
	if((ishas == 0)&&(!isempty(string))){
		array.push(string);
	}
}
