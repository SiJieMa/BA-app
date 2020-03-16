var ajpush;
function initgetuiSDK() {
	ajpush = api.require('ajpush');
	var systemType = api.systemType;
	if (systemType != "ios") {
		ajpush.init(function(ret) {
			if (ret && ret.status) {
				setTAG();
			}
		});
	}else{
		setTAG();
	}
}

function setTAG() {
	var param = {
		alias : $api.getStorage("username"),
		tags : [$api.getStorage("realName"), $api.getStorage("username"), $api.getStorage("roleName")]
	};
	ajpush.bindAliasAndTags(param, function(ret) {
		var statusCode = ret.statusCode;
		get_noticelcick();
	});
}

function get_noticelcick() {
	api.addEventListener({
		name : 'appintent'
	}, function(ret, err) {
		var appParam = ret.appParam;
		var ajpush = ret.appParam.ajpush;
        var id = ajpush.id;
        var title = ajpush.title;
        var content = ajpush.content;
        var extra = ajpush.extra;//用来判断推送类型 {"type":"1"} 1为跳转到排班页面 2消息列表 3不跳
        
        var type = extra.type;
        if(type == 1){
        	if($api.getStorage("roleName") == "BA人员"){
	        	openpage("Check_workwin", "Check_workframe", "排班计划", "widget://html/BA/Check_work.html", "");
        	}else{
        		api.openWin({
                    name: 'planeList_win',
                    url: 'widget://html/sale/planeList_win.html',
                    slidBackEnabled: false
                });
        	}
        }else if(type == 2){
        	openpage("message_win", "message_frame", "拜访计划", "widget://html/tools/message.html", "");
        }else if(type == 3){
        	alert(content);
        }
        
	});
	api.addEventListener({
		name : 'noticeclicked'
	}, function(ret, err) {
		var ajpush = ret.value;
        var content = ajpush.content;
        var extra = ajpush.extra;
        
        var type = extra.type;
        if(type == 1){
        	if($api.getStorage("roleName") == "BA人员"){
	        	openpage("Check_workwin", "Check_workframe", "排班计划", "widget://html/BA/Check_work.html", "");
        	}else{
        		api.openWin({
                    name: 'planeList_win',
                    url: 'widget://html/sale/planeList_win.html'
                });
        	}
        }else if(type == 2){
        	openpage("message_win", "message_frame", "拜访计划", "widget://html/tools/message.html", "");
        }else if(type == 3){
        	alert(content);
        }
	});
}
