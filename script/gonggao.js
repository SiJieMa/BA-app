/**
 *接口获取的版本号
 *
 * 获取是否有公告 如果有则判断是否需要展示出来
 *
 *
 */
function getgonggao() {
	/**
	 *{"ID":120,"ConfigKey":"announcement","ConfigValue":"show","Description":"{\"starttime\": \"2019-09-03 08:00:00\",\"stoptime\": \"2019-09-30 08:00:00\", \"showUrl\": \"http://www.baidu.com\"}","NewZipId":"","AllZipId":""}
	 */
	api.ajax({
		url : $api.posturllujie+'api/SystemConfigs/122',
		method : 'get',
		headers : {
			'Content-Type' : 'application/json'
		},
		timeout: 10
	}, function(ret, err) {
		//console.log(JSON.stringify(ret) + "====" + JSON.stringify(err));
		if (ret) {
			jiagongdb(ret);
		}
	});
}

function jiagongdb(ret){
	var showmessage = $api.strToJson(ret.Description);
	var starttime = showmessage.starttime;
	var stoptime = showmessage.stoptime;
	var showUrl = showmessage.showUrl;
	var starttimemillon = changedatetomillon(starttime) * 1000;
	var stoptimemillon = changedatetomillon(stoptime) * 1000;
	if(get_today_millisecond() >= starttimemillon){
		if(get_today_millisecond() <= stoptimemillon){
			//展示公告地址
			api.openFrame({
	            name: 'gonggaoframe',
	            url: 'widget://html/tools/gongao.html',
	            rect: {
		            x:0,
		            y:0,
		            w:api.winWidth,
		            h:api.winHeight
	            },
	            pageParam: {
	            	url: showUrl
	            },
	            bgColor: "rgba(0,0,0,0.2)"
            });
		}
	}
	
}