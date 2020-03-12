var isupdate = 0;


function getchenlielist(){
	api.showProgress({
    });
	var url = 'ActionApi/T_DisplayInfor/Get_DisplayInforList';
	var object = new Object();
    object.ireportid = api.pageParam.page.iRorptId;
    object.istoreid = api.pageParam.page.iStoreId;
    object.ibrandid = api.pageParam.brandid;
	$newapi.newpost(url, object, 30000, function(retb,err){
		//console.log(JSON.stringify(retb));
		api.hideProgress();
		if(retb){
		
			var ret = new Array();
			for(var a = 0; a < retb.length; a++){
				if(retb[a].cProductType != api.pageParam.cProductType){ continue; }
				ret.push(retb[a]);
			}
		
			if(ret.length != 0){
				isupdate = 1;
			}else{
				$("#addpic621").attr("uploadguid", newguid());
				$("#addpic647").attr("uploadguid", newguid());
				$("#addpic646").attr("uploadguid", newguid());
				$("#addpic645").attr("uploadguid", newguid());
			}
			loadinfo(ret);
		}
		//console.log(JSON.stringify(ret) + "===" + JSON.stringify(err));
	});
}

var phonenum = 0;
function loadinfo(retmsg){

	var ret = retmsg;
	var chenliename = new Array();
	var chenlieguid = new Array();
	
	
	var beforORperend = 0;//0按钮前面加  1往页面顶部加
	//循环一下 看看怎么插入进去
	for(var d = 0; d < ret.length; d++){
		if(ret[d].cProductType == api.pageParam.cProductType){
			var iDisplayType = ret[d].iDisplayType;
			if(iDisplayType == 622){
				if(ret[d].cExtraoldType == ""){
					continue;
				}
				var cExtraoldTypeNum = ret[d].cExtraoldType.slice(-1);
				if(cExtraoldTypeNum == 1){
					beforORperend = 0;
				}else{
					beforORperend = 1;
				}
				break;
			}
		}
	}
	console.log("===============");
	
	
	for(var d = 0; d < ret.length; d++){
		if(ret[d].cProductType == api.pageParam.cProductType){
			var iDisplayType = ret[d].iDisplayType;
			if(iDisplayType == 622){
				if(ret[d].cExtraoldType == ""){
					continue;
				}
				addchenliename(chenliename, ret[d].cExtraoldType);
				var PicsList = ret[d].PicsList;
				//if(PicsList.length != 0){
				if((ret[d].iFlag!= 0)&&(ret[d].iFlag!= 1)){
					addchenliename(chenlieguid, ret[d].id);
					var addjingpinbefore = document.getElementById("addjingpinbutton").parentNode;
					if(beforORperend == 0){
						$(".addjingpin").before(techenonline(ret[d].id, ret[d].cExtraoldType.slice(-1)));
					}else{
						$api.prepend(addjingpinbefore, techenonline(ret[d].id, ret[d].cExtraoldType.slice(-1)));
					}
					techennum++;
				}
			}
		}
	}

	//竞品品牌
	var jingpinbrandname = new Array();
	var jingpinguid1list = new Array();
	var jingpinguid2list = new Array();
	var jingpinguid3list = new Array();
	for(var e = 0; e < ret.length; e++){
		if(ret[e].cProductType != api.pageParam.cProductType){ continue; }
		var iDisplayType = ret[e].iDisplayType;
		if(iDisplayType == 624){
			if(ret[e].cDisplayItem == ""){
				var object = new Object();
				object.BrandName = ret[e].cExtraoldType;
				object.BrandID = ret[e].id;
				addchenliename(jingpinbrandname, object);
				addchenliename(jingpinguid1list, ret[e].id);
			}
		}
	}
	
	for(var f = 0; f < jingpinbrandname.length; f++){
		var thisbrandname = jingpinbrandname[f].BrandName;
		var guidtwo22, guidthree33;
		for(var g = 0; g < ret.length; g++){
			if(ret[g].cProductType != api.pageParam.cProductType){ continue; }
			var cExtraoldType = ret[g].cExtraoldType;
			if(thisbrandname == cExtraoldType){
				var iDisplayType = ret[g].iDisplayType;
				if(iDisplayType == 624){
					if(ret[g].iDisplayItem == '567'){
						guidtwo22 = ret[g].id;
					}
					if(ret[g].iDisplayItem == '568'){
						guidthree33 = ret[g].id;
					}
				}
			}
		}
		addchenliename(jingpinguid2list, guidtwo22);
		addchenliename(jingpinguid3list, guidthree33);
	}
	
	//console.log(JSON.stringify(jingpinbrandname));
	//console.log(JSON.stringify(jingpinguid1list));
	//console.log(JSON.stringify(jingpinguid2list));
	//console.log(JSON.stringify(jingpinguid3list));
	initjingpin(jingpinbrandname, jingpinguid1list, jingpinguid2list, jingpinguid3list);

	for(var a = 0; a < ret.length; a++){
		if(ret[a].cProductType != api.pageParam.cProductType){ continue; }
		var iDisplayType = ret[a].iDisplayType;
		
		if(iDisplayType == 621){
			if(typeof(ret[a].iFlag) == 'undefined'){
				$("#addpic621").attr("uploadguid", ret[a].id);
				if(ret[a].PicsList.length != 0){
					addhtmlthis = document.getElementById("addpic621");
					for(var b = 0; b < ret[a].PicsList.length; b++){
						var parementimg = addhtmlthis.parentNode;
						var DiyCarmerFinishChu_name_online = ret[a].PicsList[b].cPicPath.split("/")[1];
						
						var html = '<div online="true" guid="'+ret[a].PicsList[b].iTrainId+'" value="'+ret[a].iCheckType+'" id="ab'+phonenum+'" class="itempic uploadimg" DiyCarmerFinishChu_name="'+DiyCarmerFinishChu_name_online+'">'
								+		'<img onlineid="'+ret[a].PicsList[b].id+'" id="abimg'+phonenum+'" src="'+$api.posturllujie + 'Content/UploadFiles/mobile/' + ret[a].PicsList[b].cPicPath+'" />'
								+	'</div>';
						$(parementimg).prepend(html);
						$("#ab"+phonenum).bind('click', phonenum, function(msg){
							var phonenumphonenum = msg.data;
							openpicdetial(phonenumphonenum);
						});
						phonenum++;
					}
					GetPicList(addhtmlthis);
				}
			
			}else{
				//642
				if(ret[a].iDisplayItem == '642'){
					if(ret[a].iFlag == '1'){
						var iFlagID = ret[a].iDisplayItem + 'yes';
						$('#'+iFlagID).addClass("native");
					}else{
						var iFlagID = ret[a].iDisplayItem + 'no';
						$('#'+iFlagID).addClass("native");
					}
				}
				if(ret[a].iDisplayItem == '643'){
					if(ret[a].iFlag == '1'){
						var iFlagID = ret[a].iDisplayItem + 'yes';
						$('#'+iFlagID).addClass("native");
					}else{
						var iFlagID = ret[a].iDisplayItem + 'no';
						$('#'+iFlagID).addClass("native");
					}
				}
				
			}
		}
		if(iDisplayType == 647){
			if(typeof(ret[a].iFlag) == 'undefined'){
				$("#addpic647").attr("uploadguid", ret[a].id);
				if(ret[a].PicsList.length != 0){
					addhtmlthis = document.getElementById("addpic647");
					for(var b = 0; b < ret[a].PicsList.length; b++){
						var parementimg = addhtmlthis.parentNode;
						var DiyCarmerFinishChu_name_online = ret[a].PicsList[b].cPicPath.split("/")[1];
						
						var html = '<div online="true" guid="'+ret[a].PicsList[b].iTrainId+'" value="'+ret[a].iCheckType+'" id="ab'+phonenum+'" class="itempic uploadimg" DiyCarmerFinishChu_name="'+DiyCarmerFinishChu_name_online+'">'
								+		'<img onlineid="'+ret[a].PicsList[b].id+'" id="abimg'+phonenum+'" src="'+$api.posturllujie + 'Content/UploadFiles/mobile/' + ret[a].PicsList[b].cPicPath+'" />'
								+	'</div>';
						$(parementimg).prepend(html);
						$("#ab"+phonenum).bind('click', phonenum, function(msg){
							var phonenumphonenum = msg.data;
							openpicdetial(phonenumphonenum);
						});
						phonenum++;
					}
					GetPicList(addhtmlthis);
				}
			
			}else{
				//642
				if(ret[a].iDisplayItem == '644'){
					if(ret[a].iFlag == '1'){
						var iFlagID = ret[a].iDisplayItem + 'yes';
						$('#'+iFlagID).addClass("native");
						var piclist647html = document.getElementById("piclist647");
						$(piclist647html).css('display', 'block');
					}else{
						var iFlagID = ret[a].iDisplayItem + 'no';
						$('#'+iFlagID).addClass("native");
					}
				}
			}
		}
		if(iDisplayType == 623){
			if(ret[a].iDisplayItem == '646'){
				if(ret[a].iFlag == '1'){
					var iFlagID = ret[a].iDisplayItem + 'yes';
					$('#'+iFlagID).addClass("native");
					var piclist646html = document.getElementById("piclist646");
					$(piclist646html).css('display', 'block');
					$(".son646html").css('display', 'block');
				}
				if(ret[a].iFlag == '0'){
					var iFlagID = ret[a].iDisplayItem + 'no';
					$('#'+iFlagID).addClass("native");
				}
				if(typeof(ret[a].iFlag) == 'undefined'){
					$("#addpic646").attr("uploadguid", ret[a].id);
					if(ret[a].PicsList.length != 0){
						addhtmlthis = document.getElementById("addpic646");
						for(var b = 0; b < ret[a].PicsList.length; b++){
							var parementimg = addhtmlthis.parentNode;
							var DiyCarmerFinishChu_name_online = ret[a].PicsList[b].cPicPath.split("/")[1];
							
							var html = '<div online="true" guid="'+ret[a].PicsList[b].iTrainId+'" value="'+ret[a].iCheckType+'" id="ab'+phonenum+'" class="itempic uploadimg" DiyCarmerFinishChu_name="'+DiyCarmerFinishChu_name_online+'">'
									+		'<img onlineid="'+ret[a].PicsList[b].id+'" id="abimg'+phonenum+'" src="'+$api.posturllujie + 'Content/UploadFiles/mobile/' + ret[a].PicsList[b].cPicPath+'" />'
									+	'</div>';
							$(parementimg).prepend(html);
							$("#ab"+phonenum).bind('click', phonenum, function(msg){
								var phonenumphonenum = msg.data;
								openpicdetial(phonenumphonenum);
							});
							phonenum++;
						}
						GetPicList(addhtmlthis);
					}
				}
			}
			if(ret[a].iDisplayItem == '645'){
				if(ret[a].iFlag == '1'){
					var iFlagID = ret[a].iDisplayItem + 'yes';
					$('#'+iFlagID).addClass("native");
					var piclist645html = document.getElementById("piclist645");
					$(piclist645html).css('display', 'block');
				}
				if(ret[a].iFlag == '0'){
					var iFlagID = ret[a].iDisplayItem + 'no';
					$('#'+iFlagID).addClass("native");
				}
				if(typeof(ret[a].iFlag) == 'undefined'){
					$("#addpic645").attr("uploadguid", ret[a].id);
					if(ret[a].PicsList.length != 0){
						addhtmlthis = document.getElementById("addpic645");
						for(var b = 0; b < ret[a].PicsList.length; b++){
							var parementimg = addhtmlthis.parentNode;
							var DiyCarmerFinishChu_name_online = ret[a].PicsList[b].cPicPath.split("/")[1];
							
							var html = '<div online="true" guid="'+ret[a].PicsList[b].iTrainId+'" value="'+ret[a].iCheckType+'" id="ab'+phonenum+'" class="itempic uploadimg" DiyCarmerFinishChu_name="'+DiyCarmerFinishChu_name_online+'">'
									+		'<img onlineid="'+ret[a].PicsList[b].id+'" id="abimg'+phonenum+'" src="'+$api.posturllujie + 'Content/UploadFiles/mobile/' + ret[a].PicsList[b].cPicPath+'" />'
									+	'</div>';
							$(parementimg).prepend(html);
							$("#ab"+phonenum).bind('click', phonenum, function(msg){
								var phonenumphonenum = msg.data;
								openpicdetial(phonenumphonenum);
							});
							phonenum++;
						}
						GetPicList(addhtmlthis);
					}
				}
			}
		}
		
		if(iDisplayType == 622){
			//iDisplayItem
			if(ret[a].iDisplayItem == '658'){
				if(ret[a].iFlag == '1'){
					var iFlagID = ret[a].iDisplayItem + 'yes';
					$('#'+iFlagID).addClass("native");//piclist622
					$("#piclist622").css("display", "block");
				}else{
					var iFlagID = ret[a].iDisplayItem + 'no';
					$('#'+iFlagID).addClass("native");
				}
			}
			var cExtraoldType = ret[a].cExtraoldType;
			for(var x = 0; x < chenliename.length; x++){
				if(cExtraoldType == chenliename[x]){
					var iDisplayItem = ret[a].iDisplayItem;
					var iFlag = ret[a].iFlag;
					var guidhtml = chenlieguid[x];
					if(iDisplayItem == '655'){
						var guidhtmloneno = '655'+guidhtml+'oneno';
						var guidhtmloneyes = '655'+guidhtml+'oneyes';
						if(iFlag == 1){
							$("#"+guidhtmloneyes).addClass("native");
						}else{
							$("#"+guidhtmloneno).addClass("native");
						}
					}
					if(iDisplayItem == '656'){
						var guidhtmltwono = '656'+guidhtml+'twono';
						var guidhtmltwoyes = '656'+guidhtml+'twoyes';
						if(iFlag == 1){
							$("#"+guidhtmltwoyes).addClass("native");
						}else{
							$("#"+guidhtmltwono).addClass("native");
						}
					}
					if(iDisplayItem == '657'){
						var guidhtmlthreeno = '657'+guidhtml+'threeno';
						var guidhtmlthreeyes = '657'+guidhtml+'threeyes';
						if(iFlag == 1){
							$("#"+guidhtmlthreeyes).addClass("native");
						}else{
							$("#"+guidhtmlthreeno).addClass("native");
						}
					}
				}
			}
			if(ret[a].PicsList != 0){
				var piclistid = ret[a].id;
				var piclistaddbutton = 'tianjiatupian'+piclistid;
				
				addhtmlthis = document.getElementById(piclistaddbutton);
				for(var b = 0; b < ret[a].PicsList.length; b++){
					var parementimg = addhtmlthis.parentNode;
					var DiyCarmerFinishChu_name_online = ret[a].PicsList[b].cPicPath.split("/")[1];
					
					var html = '<div online="true" guid="'+ret[a].PicsList[b].iTrainId+'" value="'+ret[a].iCheckType+'" id="ab'+phonenum+'" class="itempic uploadimg" DiyCarmerFinishChu_name="'+DiyCarmerFinishChu_name_online+'">'
							+		'<img onlineid="'+ret[a].PicsList[b].id+'" id="abimg'+phonenum+'" src="'+$api.posturllujie + 'Content/UploadFiles/mobile/' + ret[a].PicsList[b].cPicPath+'" />'
							+	'</div>';
					$(parementimg).prepend(html);
					$("#ab"+phonenum).bind('click', phonenum, function(msg){
						var phonenumphonenum = msg.data;
						openpicdetial(phonenumphonenum);
					});
					phonenum++;
				}
				GetPicList(addhtmlthis);
			}
			
		}
		if(iDisplayType == 624){
			if(ret[a].PicsList != 0){
				var piclistid = ret[a].id;
				var piclistaddbutton = 'tjjp'+piclistid;
				addhtmlthis = document.getElementById(piclistaddbutton);
				for(var b = 0; b < ret[a].PicsList.length; b++){
					if(addhtmlthis == null){
						continue;
					}
					var parementimg = addhtmlthis.parentNode;
					var DiyCarmerFinishChu_name_online = ret[a].PicsList[b].cPicPath.split("/")[1];
					
					var html = '<div online="true" guid="'+ret[a].PicsList[b].iTrainId+'" value="'+ret[a].iCheckType+'" id="ab'+phonenum+'" class="itempic uploadimg" DiyCarmerFinishChu_name="'+DiyCarmerFinishChu_name_online+'">'
							+		'<img onlineid="'+ret[a].PicsList[b].id+'" id="abimg'+phonenum+'" src="'+$api.posturllujie + 'Content/UploadFiles/mobile/' + ret[a].PicsList[b].cPicPath+'" />'
							+	'</div>';
					$(parementimg).prepend(html);
					$("#ab"+phonenum).bind('click', phonenum, function(msg){
						var phonenumphonenum = msg.data;
						openpicdetial(phonenumphonenum);
					});
					phonenum++;
				}
				GetPicList(addhtmlthis);
				
			}
		}
	}
	
	for(var i = 0; i < jingpinbrandname.length; i++){
		var thisbrandname = jingpinbrandname[i].BrandName;
		for(var a = 0; a < ret.length; a++){
			if(ret[a].cProductType != api.pageParam.cProductType){ continue; }
			var cExtraoldType = ret[a].cExtraoldType;
			if(thisbrandname == cExtraoldType){
				if(ret[a].iDisplayItem == '567'){
					var jponeno = jingpinguid2list[i] + 'oneno';
					var jponeyes = jingpinguid2list[i] + 'oneyes';
					var jponehtml = jingpinguid2list[i] + 'one';
					if(ret[a].iFlag == 1) {
						$("#" + jponeyes).addClass("native");
						$("#" + jponeno).removeClass("native");
						$("#"+jponehtml).css('display', 'block');
					} else {
						$("#" + jponeno).addClass("native");
						$("#" + jponeyes).removeClass("native");
					}
				}
				if(ret[a].iDisplayItem == '568'){
					var jptwono = jingpinguid3list[i] + 'twono';
					var jptwoyes = jingpinguid3list[i] + 'twoyes';
					var jptwohtml = jingpinguid3list[i] + 'two';
					if(ret[a].iFlag == 1) {
						$("#" + jptwoyes).addClass("native");
						$("#" + jptwono).removeClass("native");
						$("#"+jptwohtml).css('display', 'block');
					} else {
						$("#" + jptwono).addClass("native");
						$("#" + jptwoyes).removeClass("native");
					}
				}
			}
		}
	}
	//console.log(document.getElementById("body").innerHTML);
	getLocalPicList();
}


function addchenliename(array, name){
	var ishas = 0;
	for(var cc = 0; cc < array.length; cc++){
		if(array[cc] == name){
			ishas = 1;
		}
	}
	if(ishas == 0){
		array.push(name);
	}
}
function addjingpinid(array, id, updown){
	var ishas = 0;
	for(var cc = 0; cc < array.length; cc++){
		if(array[cc] == id){
			ishas = 1;
		}
	}
	if(ishas == 0){
		if(updown == 567){
			array.splice(0,0,id);
		}else if(updown == 568){
			array.push(id);
		}
	}
}


