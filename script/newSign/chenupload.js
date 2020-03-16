var uploadchenlie = new Array();
function chenliejichu(){
	uploadchenlie = new Array();
	var object1 = new Object();
	object1.id = newguid();
	
	var id642no = $("#642no").hasClass("native");
	var id642yes = $("#642yes").hasClass("native");
	if(!id642no&&!id642yes){
		alert(api.pageParam.cProductType+"请完善基础陈列全部内容");
		return;
	}
	var iFlag = 0;
	if(id642no){
		iFlag = 0;
	}
	if(id642yes){
		iFlag = 1;
	}
	object1.iDisplayItem = '642';
	object1.cDisplayItem = '摆放是否符合标准';//2层
	object1.cExtraoldType = '';//1层
	object1.cCompetitor = '';//3层
	object1.iFlag = iFlag;
	
	object1.iDisplayType = '621';
	object1.cDisplayType = '基础陈列';
	
	object1.cProductType = api.pageParam.cProductType;
	object1.iStoreId = api.pageParam.page.iStoreId;
	object1.iBrandId = api.pageParam.brandid;
	object1.iReportID = api.pageParam.page.iRorptId;
	
	object1.iProductType = '';
	object1.iExtraoldType = '';
	object1.iCompetitorType = '';
	
	uploadchenlie.push(object1);
	//完成
	
	
	
	var object2 = new Object();
	object2.id = newguid();
	var id643no = $("#643no").hasClass("native");
	var id643yes = $("#643yes").hasClass("native");
	if(!id643no&&!id643yes){
		alert(api.pageParam.cProductType+"请完善基础陈列全部内容");
		return;
	}
	var iFlag = 0;
	if(id643no){
		iFlag = 0;
	}
	if(id643yes){
		iFlag = 1;
	}
	object2.cExtraoldType = '';//1层
	object2.cCompetitor = '';//3层
	object2.iDisplayItem = '643';
	object2.cDisplayItem = '是否有做清洁';//2层
	object2.iFlag = iFlag;
	object2.iDisplayType = '621';
	object2.cDisplayType = '基础陈列';
	object2.cProductType = api.pageParam.cProductType;
	object2.iStoreId = api.pageParam.page.iStoreId;
	object2.iBrandId = api.pageParam.brandid;
	object2.iReportID = api.pageParam.page.iRorptId;
	
	object2.iProductType = '';
	object2.iExtraoldType = '';
	object2.iCompetitorType = '';
	
	uploadchenlie.push(object2);
	
	
	var object3 = new Object();
	object3.id = $("#addpic621").attr("uploadguid");
	object3.cDisplayType = '基础陈列';
	object3.iDisplayType = '621';
	object3.cProductType = api.pageParam.cProductType;
	object3.iStoreId = api.pageParam.page.iStoreId;
	object3.iBrandId = api.pageParam.brandid;
	object3.iReportID = api.pageParam.page.iRorptId;
	object3.iProductType = '';
	object3.iExtraoldType = '';
	object3.iCompetitorType = '';
	uploadchenlie.push(object3);
	
	//console.log(JSON.stringify(uploadchenlie));
	teshuchenliewuliaolist();
}

//图片拍照需要改为 点击按钮只生成一个guid 绑定在父类以及拍照按钮上面  形成一个数组

function teshuchenliewuliaolist(){
	var object4 = new Object();
	object4.id = newguid();
	var id646no = $("#646no").hasClass("native");
	var id646yes = $("#646yes").hasClass("native");
	if(!id646no&&!id646yes){
		alert(api.pageParam.cProductType+"请完善陈列物料");
		return;
	}
	var iFlag = 0;
	if(id646no){
		iFlag = 0;
	}
	if(id646yes){
		iFlag = 1;
	}
	
	object4.cExtraoldType = '';//1层
	object4.cCompetitor = '';//3层
	object4.iDisplayItem = '646';//2层
	object4.cDisplayItem = '是否有陈列物料';//2层
	object4.iFlag = iFlag;
	object4.iDisplayType = '623';
	object4.cDisplayType = '陈列物料';
	object4.cProductType = api.pageParam.cProductType;
	object4.iStoreId = api.pageParam.page.iStoreId;
	object4.iBrandId = api.pageParam.brandid;
	object4.iReportID = api.pageParam.page.iRorptId;
	
	object4.iProductType = '';
	object4.iExtraoldType = '';
	object4.iCompetitorType = '';
	
	uploadchenlie.push(object4);
	
	
	var object5 = new Object();
	if(iFlag == 1){
		object5.id = $("#addpic646").attr("uploadguid");
	}else{
		object5.id = newguid();
	}
	object5.iDisplayItem = '646';//2层
	object5.cDisplayItem = '是否有陈列物料';//2层
	object5.cDisplayType = '陈列物料';
	object5.iDisplayType = '623';
	object5.cProductType = api.pageParam.cProductType;
	object5.iStoreId = api.pageParam.page.iStoreId;
	object5.iBrandId = api.pageParam.brandid;
	object5.iReportID = api.pageParam.page.iRorptId;
	object5.iProductType = '';
	object5.iExtraoldType = '';
	object5.iCompetitorType = '';
	uploadchenlie.push(object5);
	
	//console.log(JSON.stringify(uploadchenlie));
	
	if(iFlag == 1){
	
		var object6 = new Object();
		object6.id = newguid();
		var id645no = $("#645no").hasClass("native");
		var id645yes = $("#645yes").hasClass("native");
		if(!id645no&&!id645yes){
			alert(api.pageParam.cProductType+"请完善陈列物料");
			return;
		}
		var iFlag = 0;
		if(id645no){
			iFlag = 0;
		}
		if(id645yes){
			iFlag = 1;
		}
		object6.cExtraoldType = '';//1层
		object6.cCompetitor = '';//3层
		object6.iDisplayItem = '645';//2层
		object6.cDisplayItem = '是否破损';//2层
		object6.iFlag = iFlag;
		object6.iDisplayType = '623';
		object6.cDisplayType = '陈列物料';
		object6.cProductType = api.pageParam.cProductType;
		object6.iStoreId = api.pageParam.page.iStoreId;
		object6.iBrandId = api.pageParam.brandid;
		object6.iReportID = api.pageParam.page.iRorptId;
		object6.iProductType = '';
		object6.iExtraoldType = '';
		object6.iCompetitorType = '';
		uploadchenlie.push(object6);
		
		
		
		var object7 = new Object();
		if(iFlag == 1){
			object7.id = $("#addpic645").attr("uploadguid");
		}else{
			object7.id = newguid();
		}
		object7.iDisplayItem = '645';//2层
		object7.cDisplayItem = '是否破损';//2层
		object7.cDisplayType = '陈列物料';
		object7.iDisplayType = '623';
		object7.cProductType = api.pageParam.cProductType;
		object7.iStoreId = api.pageParam.page.iStoreId;
		object7.iBrandId = api.pageParam.brandid;
		object7.iReportID = api.pageParam.page.iRorptId;
		object7.iProductType = '';
		object7.iExtraoldType = '';
		object7.iCompetitorType = '';
		uploadchenlie.push(object7);
	}
	
	
	//console.log(JSON.stringify(uploadchenlie));
	xinpinchenlie();
}

//判断是否有新品陈列

function xinpinchenlie(){
	var object4 = new Object();
	object4.id = newguid();
	var id644no = $("#644no").hasClass("native");
	var id644yes = $("#644yes").hasClass("native");
	if(!id644no&&!id644yes){
		alert(api.pageParam.cProductType+"请完善新品陈列内容");
		return;
	}
	var iFlag = 0;
	if(id644no){
		iFlag = 0;
	}
	if(id644yes){
		iFlag = 1;
	}
	object4.cExtraoldType = '';//1层
	object4.cCompetitor = '';//3层
	object4.iDisplayItem = '644';//2层
	object4.cDisplayItem = '新品是否已上架';//2层
	object4.iFlag = iFlag;
	object4.iDisplayType = '647';
	object4.cDisplayType = '新品陈列';
	object4.cProductType = api.pageParam.cProductType;
	object4.iStoreId = api.pageParam.page.iStoreId;
	object4.iBrandId = api.pageParam.brandid;
	object4.iReportID = api.pageParam.page.iRorptId;
	
	object4.iProductType = '';
	object4.iExtraoldType = '';
	object4.iCompetitorType = '';
	
	uploadchenlie.push(object4);
	
	
	var object5 = new Object();
	if(iFlag == 1){
		object5.id = $("#addpic647").attr("uploadguid");
	}else{
		object5.id = newguid();
	}
	object5.cDisplayType = '新品陈列';
	object5.iDisplayType = '647';
	object5.cProductType = api.pageParam.cProductType;
	object5.iStoreId = api.pageParam.page.iStoreId;
	object5.iBrandId = api.pageParam.brandid;
	object5.iReportID = api.pageParam.page.iRorptId;
	object5.iProductType = '';
	object5.iExtraoldType = '';
	object5.iCompetitorType = '';
	uploadchenlie.push(object5);
	
	//console.log(JSON.stringify(uploadchenlie));
	teshuchenlie();
}


function chenliewuliao(){
	var object6 = new Object();
	object6.id = newguid();
	var id646no = $("#646no").hasClass("native");
	var id646yes = $("#646yes").hasClass("native");
	if(!id646no&&!id646yes){
		alert(api.pageParam.cProductType+"请完善陈列物料内容");
		return;
	}
	var iFlag = 0;
	if(id646no){
		iFlag = 0;
	}
	if(id646yes){
		iFlag = 1;
	}
	object6.cExtraoldType = '';//1层
	object6.cCompetitor = '';//3层
	object6.iDisplayItem = '646';//2层
	object6.cDisplayItem = '是否有陈列物料';//2层
	object6.iFlag = iFlag;
	object6.cDisplayType = '陈列物料';
	object6.iDisplayType = '623';
	object6.cProductType = api.pageParam.cProductType;
	object6.iStoreId = api.pageParam.page.iStoreId;
	object6.iBrandId = api.pageParam.brandid;
	object6.iReportID = api.pageParam.page.iRorptId;
	object6.iProductType = '';
	object6.iExtraoldType = '';
	object6.iCompetitorType = '';
	uploadchenlie.push(object6);
	
	//console.log(JSON.stringify(uploadchenlie));
	
	teshuchenlie();
}


function teshuchenlie(){
	var object9 = new Object();
	object9.id = newguid();
	var id658no = $("#658no").hasClass("native");
	var id658yes = $("#658yes").hasClass("native");
	if(!id658no&&!id658yes){
		alert(api.pageParam.cProductType+"请完善特殊陈列");
		return;
	}
	var iFlag = 0;
	if(id658no){
		iFlag = 0;
	}
	if(id658yes){
		iFlag = 1;
	}
	object9.cExtraoldType = '';//1层
	object9.cCompetitor = '';//3层
	object9.iDisplayItem = '658';//2层
	object9.cDisplayItem = '是否有特殊陈列';//2层
	object9.iFlag = iFlag;
	object9.cDisplayType = '特殊陈列';
	object9.iDisplayType = '622';
	object9.cProductType = api.pageParam.cProductType;
	object9.iStoreId = api.pageParam.page.iStoreId;
	object9.iBrandId = api.pageParam.brandid;
	object9.iReportID = api.pageParam.page.iRorptId;
	object9.iProductType = '';
	object9.iExtraoldType = '';
	object9.iCompetitorType = '';
	uploadchenlie.push(object9);
	
	if(iFlag == 1){
		//上面先标记一个是否有特殊陈列
		var piclist622all = document.getElementById("piclist622");
		var imgbuttonlist = $api.domAll(piclist622all, '.tianjiateshuchenlie');
		for(var a = 0; a < imgbuttonlist.length; a++){
			var addpicbuttonid = $api.attr(imgbuttonlist[a], "uploadguid");
			//将有图片的报告都绑定一下
			var name = $api.attr(imgbuttonlist[a], "name");
			
			var objectc = new Object();
			objectc.cExtraoldType = name;//1层
			objectc.id = $api.attr(imgbuttonlist[a], "uploadguid");
			objectc.iDisplayType = '622';
			objectc.cDisplayType = '特殊陈列';
			objectc.cDisplayItem = '';//2层
			objectc.iDisplayItem = '';//2层
			objectc.cProductType = api.pageParam.cProductType;
			objectc.iStoreId = api.pageParam.page.iStoreId;
			objectc.iBrandId = api.pageParam.brandid;
			objectc.iReportID = api.pageParam.page.iRorptId;
			objectc.iProductType = '';
			objectc.iExtraoldType = '';
			objectc.iCompetitorType = '';
			uploadchenlie.push(objectc);
			
			
			
			var objectd = new Object();
			objectd.id = newguid();
			var idoneno = $("#655"+addpicbuttonid+"oneno").hasClass("native");
			var idoneyes = $("#655"+addpicbuttonid+"oneyes").hasClass("native");
			if(!idoneno&&!idoneyes){
				alert(api.pageParam.cProductType+"请完善特殊陈列");
				return;
			}
			var iFlag = 0;
			var cCompetitor;
			if(idoneno){
				iFlag = 0;
				cCompetitor = '统一陈列';
			}
			if(idoneyes){
				iFlag = 1;
				cCompetitor = '自主谈判';
			}
			objectd.cExtraoldType = name;//1层
			objectd.cCompetitor = cCompetitor;//3层
			objectd.cDisplayItem = '特陈性质';//2层
			objectd.iDisplayItem = '655';//2层
			objectd.iFlag = iFlag;
			objectd.cDisplayType = '特殊陈列';
			objectd.iDisplayType = '622';
			objectd.cProductType = api.pageParam.cProductType;
			objectd.iStoreId = api.pageParam.page.iStoreId;
			objectd.iBrandId = api.pageParam.brandid;
			objectd.iReportID = api.pageParam.page.iRorptId;
			objectd.iProductType = '';
			objectd.iExtraoldType = '';
			objectd.iCompetitorType = '';
			uploadchenlie.push(objectd);
			
			
			
			var objecte = new Object();
			objecte.id = newguid();
			var idtwono = $("#656"+addpicbuttonid+"twono").hasClass("native");
			var idtwoyes = $("#656"+addpicbuttonid+"twoyes").hasClass("native");
			if(!idtwono&&!idtwoyes){
				alert(api.pageParam.cProductType+"请完善特殊陈列");
				return;
			}
			var iFlag = 0;
			if(idtwono){
				iFlag = 0;
			}
			if(idtwoyes){
				iFlag = 1;
			}
			objecte.cExtraoldType = name;//1层
			objecte.cCompetitor = "";//3层
			objecte.cDisplayItem = '位置是否符合要求';//2层
			objecte.iDisplayItem = '656';//2层
			objecte.iFlag = iFlag;
			objecte.cDisplayType = '特殊陈列';
			objecte.iDisplayType = '622';
			objecte.cProductType = api.pageParam.cProductType;
			objecte.iStoreId = api.pageParam.page.iStoreId;
			objecte.iBrandId = api.pageParam.brandid;
			objecte.iReportID = api.pageParam.page.iRorptId;
			objecte.iProductType = '';
			objecte.iExtraoldType = '';
			objecte.iCompetitorType = '';
			uploadchenlie.push(objecte);
			
			
			
			
			var objectf = new Object();
			objectf.id = newguid();
			var idthreeno = $("#657"+addpicbuttonid+"threeno").hasClass("native");
			var idthreeyes = $("#657"+addpicbuttonid+"threeyes").hasClass("native");
			if(!idthreeno&&!idthreeyes){
				alert(api.pageParam.cProductType+"请完善特殊陈列");
				return;
			}
			var iFlag = 0;
			if(idthreeno){
				iFlag = 0;
			}
			if(idthreeyes){
				iFlag = 1;
			}
			objectf.cExtraoldType = name;//1层
			objectf.cCompetitor = "";//3层
			objectf.cDisplayItem = '摆放是否符合标准';//2层
			objectf.iDisplayItem = '657';//2层
			objectf.iFlag = iFlag;
			objectf.cDisplayType = '特殊陈列';
			objectf.iDisplayType = '622';
			objectf.cProductType = api.pageParam.cProductType;
			objectf.iStoreId = api.pageParam.page.iStoreId;
			objectf.iBrandId = api.pageParam.brandid;
			objectf.iReportID = api.pageParam.page.iRorptId;
			objectf.iProductType = '';
			objectf.iExtraoldType = '';
			objectf.iCompetitorType = '';
			uploadchenlie.push(objectf);
		}
	}
	//console.log(JSON.stringify(uploadchenlie));
	jingpinchenlie();
}


function jingpinchenlie(){
	var brand624html = document.getElementById("brand624");
	var itempiclength = $api.domAll(brand624html, ".jingpinchenlieadd");
	var jingpinnum = 1;
	for(var a = 0; a < itempiclength.length; a = a + 3){
		
		var addpicbuttonidone = $api.attr(itempiclength[a], "uploadguid");
		var name = $api.attr(itempiclength[a], "name");
		
		var objectg = new Object();
		objectg.id = addpicbuttonidone;
		objectg.cExtraoldType = name;//1层
		
		objectg.cCompetitor = "";//3层
		objectg.cDisplayItem = '';//2层
		objectg.cDisplayType = '竞品陈列'+jingpinnum;
		objectg.iDisplayType = '624';
		objectg.cProductType = api.pageParam.cProductType;
		objectg.iStoreId = api.pageParam.page.iStoreId;
		objectg.iBrandId = api.pageParam.brandid;
		objectg.iReportID = api.pageParam.page.iRorptId;
		objectg.iProductType = '';
		objectg.iExtraoldType = '';
		objectg.iCompetitorType = '';
		uploadchenlie.push(objectg);
		
		
		
		var addpicbuttonidtwo = $api.attr(itempiclength[a+1], "uploadguid");
		var objecth = new Object();
		objecth.id = addpicbuttonidtwo;
		var idoneno = $("#"+addpicbuttonidtwo+"oneno").hasClass("native");
		var idoneyes = $("#"+addpicbuttonidtwo+"oneyes").hasClass("native");
		if(!idoneno&&!idoneyes){
			alert(api.pageParam.cProductType+"请完善竞品陈列");
			return;
		}
		var iFlag = 0;
		if(idoneno){
			iFlag = 0;
		}
		if(idoneyes){
			iFlag = 1;
		}
		if(iFlag == 0){
			objecth.id = newguid();
		}
		objecth.cExtraoldType = name;//1层
		objecth.cCompetitor = "";//3层
		objecth.cDisplayItem = '是否有特殊陈列';//2层
		objecth.iDisplayItem = '567';//2层
		objecth.iFlag = iFlag;
		objecth.cDisplayType = '竞品陈列'+jingpinnum;
		objecth.iDisplayType = '624';
		objecth.cProductType = api.pageParam.cProductType;
		objecth.iStoreId = api.pageParam.page.iStoreId;
		objecth.iBrandId = api.pageParam.brandid;
		objecth.iReportID = api.pageParam.page.iRorptId;
		objecth.iProductType = '';
		objecth.iExtraoldType = '';
		objecth.iCompetitorType = '';
		uploadchenlie.push(objecth);
		
		var addpicbuttonidthree = $api.attr(itempiclength[a+2], "uploadguid");
		var objecti = new Object();
		objecti.id = addpicbuttonidthree;
		var idtwono = $("#"+addpicbuttonidthree+"twono").hasClass("native");
		var idtwoyes = $("#"+addpicbuttonidthree+"twoyes").hasClass("native");
		if(!idtwono&&!idtwoyes){
			alert(api.pageParam.cProductType+"请完善竞品陈列");
			return;
		}
		var iFlag = 0;
		if(idtwono){
			iFlag = 0;
		}
		if(idtwoyes){
			iFlag = 1;
		}
		
		if(iFlag == 0){
			objecti.id = newguid();
		}
		
		objecti.cExtraoldType = name;//1层
		objecti.cCompetitor = "";//3层
		objecti.cDisplayItem = '当月是否有新品';//2层
		objecti.iDisplayItem = '568';//2层
		objecti.iFlag = iFlag;
		objecti.cDisplayType = '竞品陈列'+jingpinnum;
		objecti.iDisplayType = '624';
		objecti.cProductType = api.pageParam.cProductType;
		objecti.iStoreId = api.pageParam.page.iStoreId;
		objecti.iBrandId = api.pageParam.brandid;
		objecti.iReportID = api.pageParam.page.iRorptId;
		
		objecti.iProductType = '';
		objecti.iExtraoldType = '';
		objecti.iCompetitorType = '';
		uploadchenlie.push(objecti);
		jingpinnum++;
	}
	
	//console.log(JSON.stringify(uploadchenlie));
	jiancelist();
}


function jiancelist(){
	var bodylist = document.getElementById("body");
	var jiancelistlen = $api.domAll(bodylist, ".jiancelist");
	var isallowpiclist = 0;
	for(var a = 0; a < jiancelistlen.length; a++){
		var itemaddbutton = jiancelistlen[a].parentNode;
		var piclist = $api.domAll(itemaddbutton, ".itempic");
		if(piclist.length == 1){
			var itemaddbuttonshow = $api.cssVal(itemaddbutton,'display');
			if(itemaddbuttonshow == "block"){
				isallowpiclist = 1;
			}
		}
	}
	if(isallowpiclist == "1"){
		alert("每个项目最少拍摄一张照片");
		return;
	}
	tijiaochenlie();
}


function tijiaochenlie(){
	api.showProgress({
    });
	var url = 'ActionApi/T_DisplayInfor/PostT_DisplayInfor';
	if(isupdate == 1){
		url = 'ActionApi/T_DisplayInfor/PutT_DisplayInfor';
	}
	
	$newapi.newpost(url, uploadchenlie, 30000, function(ret,err){
		api.hideProgress();
		//console.log(JSON.stringify(ret) + "===" + JSON.stringify(err));
		if(ret){
			isupdate = 1;
			api.confirm({
			    title: '提示',
			    msg: '保存成功,是否退出.',
			    buttons: ['退出', '不退出']
			}, function(aa, bb) {
			    var index = aa.buttonIndex;
			    if(index == 1){
			    	api.closeWin({
                    });
			    }
			});
		}else{
			api.confirm({
			    title: '提示',
			    msg: '保存失败,是否重试.',
			    buttons: ['重试', '退出']
			}, function(aa, bb) {
			    var index = aa.buttonIndex;
			    if(index == 1){
			    	chenliejichu();
			    }
			    if(index == 2){
			    	api.closeWin({
                    });
			    }
			});
		}
	});
}

















