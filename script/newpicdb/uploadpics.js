//将图片信息保存到本地
var localpicList = [];
var uploaditem;
var index = 0;

//用来判断当前流程是否需要停止上传   0继续上传 1停止上传
var iscontinueupload = 0;

function saomiaoli() {
	if(iscontinueupload == 0){
		console.log(localpicList.length);
		if(localpicList.length > 0){
			uploaditem = localpicList[index];
			if(typeof(uploaditem) != 'undefined'){
				uploadLocalPicfile();
			}else{
				$("#uploadingdiv").css("display", "none");
				$("#dialogshowmsc").css("display", "none");
				$("#kaishishangchuanbtn").css("background-color","#999999");
				$("#kaishishangchuanbtn").attr("value","false");
			}
		}else{
		
			//如果当前没有图片了 就扫描一下数据库，是否还有其他图片 如果有就继续 如果没有的话 再停止
			
			oUseTool.GETallpic(0, 20, function(ret){
				if(ret != ""){
					if(ret.data.length != 0){
						localpicList = ret.data;
						saomiaoli();
					}else{
						$("#uploadingdiv").css("display", "none");
						$("#dialogshowmsc").css("display", "none");
						$("#kaishishangchuanbtn").css("background-color","#999999");
						$("#kaishishangchuanbtn").attr("value","false");
					}
				}else{
					$("#uploadingdiv").css("display", "none");
					$("#dialogshowmsc").css("display", "none");
					$("#kaishishangchuanbtn").css("background-color","#999999");
					$("#kaishishangchuanbtn").attr("value","false");
				}
			});
		}
	}
	if(iscontinueupload == 1){
		$("#uploadingdiv").css("display", "none");
		$("#dialogshowmsc").css("display", "none");
	}
}

//上传图片
function uploadLocalPicfile() {
	var piclist = [];
	console.log(uploaditem.filename);
	var piclistitem = {
		"filename" : uploaditem.filename,
		"base64str" : uploaditem.base64str,
		filepath : uploaditem.filepath
	};
	piclist.push(piclistitem);
	//console.log(JSON.stringify(piclist));
	$kunchi.kunchiuploadpic('api/Upload', JSON.stringify(piclist), function(ret, err) {
		if (ret) {
			uploadBindPicmsg();	
		} else {
			index++;
			saomiaoli();
		}
	});
}

//将绑定信息绑定上传
function uploadBindPicmsg() {

	if(uploaditem.iTrainId == "daijiaobaogao"){
		//删除数据库 删除布局 减掉一个总数
		delxml(uploaditem.guidid);
		var divpicnum = $("#shengyupic").html();
		divpicnumhtml = parseInt(divpicnum) - 1;
		$("#shengyupic").html(divpicnumhtml);
		dellocalpicone(localpicList, index);
		saomiaoli();
		return;
	}

	var picsaddlist = new Array();
	var PicsAdds = new Object();
	PicsAdds.cPicPath = uploaditem.filepath + '/' + uploaditem.filename;
	PicsAdds.cPicClass = uploaditem.cPicClass;
	PicsAdds.iStoreId = uploaditem.iStoreId;
	PicsAdds.iSize = 0;
	PicsAdds.cPicType = uploaditem.cPicType;
	PicsAdds.iUserId = uploaditem.iUserId;
	PicsAdds.cRoleName = uploaditem.cRoleName;
	PicsAdds.cUserName = uploaditem.cUserName;
	PicsAdds.iTrainId = uploaditem.iTrainId;
	//传过来的那个ID就好
	PicsAdds.dtUploadTime = uploaditem.dtUploadTime;
	picsaddlist.push(PicsAdds);
	//console.log(JSON.stringify(picsaddlist));
	$kunchi.kunchipost('ActionApi/T_Pics/T_PicsAdds', picsaddlist, function(ret, err) {
		//[{"id":12,"cPicPath":"15143451038591.jpg","cPicClass":"陈列照片","iSize":128378,"dtCreateTime":"2017-12-27T11:55:39.697","cPicType":"PhotoType","iStoreId":"3f59d20c-200e-4967-bc99-d6d8ce797169","iUserId":"b26915ea-b218-428b-a2b3-54395e2a901e","cRoleName":"BA人员","cUserName":"邵芳","iBrandName":"4"},{"id":13,"cPicPath":"15143451038591.jpg","cPicClass":"陈列照片","iSize":128378,"dtCreateTime":"2017-12-27T11:55:39.697","cPicType":"PhotoType","iStoreId":"3f59d20c-200e-4967-bc99-d6d8ce797169","iUserId":"b26915ea-b218-428b-a2b3-54395e2a901e","cRoleName":"BA人员","cUserName":"邵芳","iBrandName":"4"},{"id":14,"cPicPath":"15143451038591.jpg","cPicClass":"陈列照片","iSize":128378,"dtCreateTime":"2017-12-27T11:55:39.697","cPicType":"PhotoType","iStoreId":"3f59d20c-200e-4967-bc99-d6d8ce797169","iUserId":"b26915ea-b218-428b-a2b3-54395e2a901e","cRoleName":"BA人员","cUserName":"邵芳","iBrandName":"4"},{"id":15,"cPicPath":"15143451038591.jpg","cPicClass":"陈列照片","iSize":128378,"dtCreateTime":"2017-12-27T11:55:39.7","cPicType":"PhotoType","iStoreId":"3f59d20c-200e-4967-bc99-d6d8ce797169","iUserId":"b26915ea-b218-428b-a2b3-54395e2a901e","cRoleName":"BA人员","cUserName":"邵芳","iBrandName":"4"}]
		//console.log(JSON.stringify(ret) + "==" + JSON.stringify(err));
		if (ret) {
			oUseTool.DELonepic(uploaditem.localguidid, uploaditem.guidid, function(states){
				//删除数据库 删除布局 减掉一个总数
				delxml(uploaditem.guidid);
				var divpicnum = $("#shengyupic").html();
				divpicnumhtml = parseInt(divpicnum) - 1;
				$("#shengyupic").html(divpicnumhtml);
				dellocalpicone(localpicList, index);
				saomiaoli();			
			});
		} else {
			index++;
			saomiaoli();
		}
	});
}


/**
 * 删除某个布局
 * 将某个div或者li等等在其母布局中清空
 * 传入参数：该布局在整体布局中的id
 */
function delxml(htmlid) {
	//console.log(htmlid);
	var eventdel = document.getElementById(htmlid);
	if (eventdel != null) {
		eventdel.parentNode.removeChild(eventdel);
	}
}

//删除数组的某个元素
function dellocalpicone(array, indexnum){
	//删除第一个元素
	array.splice(indexnum,1);
}


