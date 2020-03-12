//陈列拍照

//图片添加到那个拍照布局里面
var addhtmlthis;
function paizhaochenlie(obj){
	addhtmlthis = obj;
	guid = $(obj).attr("uploadguid");
	startNewPhoto("陈列基础", "陈列基础");
}
function paizhaoxinpin(obj){
	addhtmlthis = obj;
	guid = $(obj).attr("uploadguid");
	startNewPhoto("新品陈列", "新品陈列");
}

function paizhaochenliewuliaoyouwu(obj){
	addhtmlthis = obj;
	guid = $(obj).attr("uploadguid");
	startNewPhoto("陈列物料", "陈列物料");
}

function paizhaochenliewuliaoposun(obj){
	addhtmlthis = obj;
	guid = $(obj).attr("uploadguid");
	startNewPhoto("是否破损", "是否破损");
}

function shifouteshuchenlie(obj){
	addhtmlthis = obj;
	var brandname = $(obj).attr("brandname");
	var name = $(obj).attr("name");
	guid = $(obj).attr("uploadguid");
	startNewPhoto(brandname, name);
}

		
//点击拍照进行打卡
function startNewPhoto(title1, title2){
	api.addEventListener({
	    name: 'PaiPicFinish'
	}, function(ret, err) {
	    var PaiPicFinish = ret.value.PaiPicFinish;
	    if(PaiPicFinish == 'ok'){
	    	api.closeWin({
			    name: 'DIYCarmerWin'
			});
			api.closeWin({
			    name: 'showCarmerPicSale'
			});
			api.removeEventListener({
			    name: 'PaiPicFinish'
			});
	    }
	});
	openDiyCarmerPaiZhao(api.pageParam.page.cStoreFullName, title1, title2);
}

//初始化添加图片 一共有多少数量了
function GetPicList(paizhaoaddhtmlku){
	if(paizhaoaddhtmlku == null){
		return;
	}
	var parement = paizhaoaddhtmlku.parentNode;
	var PicListAll = $api.domAll(parement, ".itempic");
	var PicListLength = PicListAll.length;
	if(PicListLength == 6){
		$(addhtmlthis).css("display", "none");
	}else if(PicListLength < 6){
		$(addhtmlthis).css("display", "block");
	}
}

//删除成功之后判断当前元素的父元素中还有多少个元素如果只有一个就全显示
var delmotherhtml;
function jisuanshifouxianshi(){
	var PicListAll = $api.domAll(delmotherhtml, ".itempic");
	var PicListLength = PicListAll.length;
	if(PicListLength == 1){
		$(PicListAll[0]).css("display", "block");
	}
}

function openpicdetial(phonenumphonenum){
	api.openFrame({
			name: 'showpic_sale',
			url: 'widget://html/sale/showpic.html',
			rect: {
					x: 0,
					y: 0,
					w: 'auto',
					h: 'auto'
			},
			bounces: false,
			bgColor: 'rgba(0,0,0,0.3)',
			pageParam: {
					url: $("#abimg"+phonenumphonenum).attr('src'),
					id: $("#abimg"+phonenumphonenum).attr('onlineid'),
					divid: "ab"+phonenumphonenum
			}
	});

	api.addEventListener({
		name: 'delthis'
	}, function(ret, err) {
		var id456 = ret.value.key2;
		var id123 = ret.value.key1;
		addhtmlthis = document.getElementById(id456);
		var value = $(addhtmlthis).attr("value");
		var valuepiclist = value+'piclist';
		var parement = addhtmlthis.parentNode;
		var onlineis = $(addhtmlthis).attr("online");
		api.toast({
		    msg:'正在删除'
	    });
		if(onlineis == 'true'){
			//console.log(id123 + "==" + id456);
		    if(id123.length == 36){
		    	oUseTool.DELpicall(id123, function(states){
					delxml(id456);
					setTimeout(function(){
		            	var PicListAll = $api.domAll(parement, ".itempic");
						var PicListLength = PicListAll.length;
						console.log("PicListLength:"+PicListLength);
						if(PicListLength < 6){
							for(var a = 0; a < PicListLength; a++){
								$(PicListAll[a]).css("display", "block");
							}
						}
		            }, 400);
				});
				return;
		    }
			var url = "ActionApi/T_Pics/DeleteT_Pics";
			$kunchi.kunchipost(url, {
				id : id123
			}, function(aa, bb) {
				if (aa) {
					delxml(id456);
			    	api.toast({
	                    msg:'已删除',
	                    duration: 1000
	                });
					setTimeout(function(){
		            	var PicListAll = $api.domAll(parement, ".itempic");
						var PicListLength = PicListAll.length;
						if(PicListLength < 6){
							for(var a = 0; a < PicListLength; a++){
								$(PicListAll[a]).css("display", "block");
							}
						}
		            }, 400);
				} else {
					api.toast({
						msg : '删除失败,请重试.',
						duration : 3000,
						location : 'middle'
					});
				}
			});
		}else{
			delxml(id456);
	    	api.toast({
	            msg:'已删除',
	            duration: 1000
	        });
	        setTimeout(function(){
            	var PicListAll = $api.domAll(parement, ".itempic");
				var PicListLength = PicListAll.length;
				if(PicListLength < 6){
					for(var a = 0; a < PicListLength; a++){
						$(PicListAll[a]).css("display", "block");
					}
				}
            }, 400);
		}
	});
}

function showPicToHmtl(DiyCarmerFinishChu_name, DiyCarmerFinishChu_url, id, paizhaoaddhtmlku){
	var html = '<div online="true" id="ab'+id+'" class="itempic upload" DiyCarmerFinishChu_name="'+DiyCarmerFinishChu_name+'">'
			+		'<img onlineid="'+id+'" id="abimg'+id+'" src="'+DiyCarmerFinishChu_url+'" />'
			+	'</div>';
	$(paizhaoaddhtmlku).before(html);
	$("#ab"+id).bind('click', id, function(msg){
		var thisid = msg.data;
		openpicdetial(thisid);
	});
	GetPicList(paizhaoaddhtmlku);
	api.hideProgress();
}

function delxml(htmlid) {
	var eventdel = document.getElementById(htmlid);
	if (eventdel != null) {
		delmotherhtml = eventdel.parentNode;
		eventdel.parentNode.removeChild(eventdel);
	}
	jisuanshifouxianshi();
}
/******************************************************************************************/
