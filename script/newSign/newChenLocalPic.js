function getLocalPicList(){
	api.showProgress({
	    title: '请稍等',
	    text: '正在加载本地图片'
	});
	var bodylist = document.getElementById("body");
	var jiancelistlen = $api.domAll(bodylist, ".jiancelist");
	
	var uploadguidArray = new Array();
	for(var a = 0; a < jiancelistlen.length; a++){
		var uploadguid = $api.attr(jiancelistlen[a], "uploadguid");
		uploadguidArray.push(uploadguid);
	}
	//扫描完成报告得GUID，然后开始扫描本地图片，展示对应得图片
	oUseTool.SELECTguidlist(uploadguidArray, function(ret){
		if(ret != ""){
			if(ret.data.length > 0){
				for(var b = 0; b < jiancelistlen.length; b++){
					var uploadguid = $api.attr(jiancelistlen[b], "uploadguid");
					for(var c = 0; c < ret.data.length; c++){
						var iTrainId = ret.data[c].iTrainId;
						if(uploadguid == iTrainId){
							showPicToHmtl(ret.data[c].filename, 'data:image/jpg;base64,'+ret.data[c].base64str, ret.data[c].guidid, jiancelistlen[b]);						
						}
					}
					
				}
			}
		}
		setTimeout(function(){
			api.hideProgress();
		}, 2000);
	});
}

function showeverypic(){
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
