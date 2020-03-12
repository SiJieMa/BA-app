
var queryline = function(){}

//网络请求的名称 防止一个页面重复进行多个重复的请求
queryline.prototype.pagename = "";

/**
 * 
 * @param {Object} ifModified 只有上次请求响应改变时，才允许请求成功。
 * @param {Object} timeout 当前请求超时 单位为毫秒
 */
queryline.prototype.post = function(data, timeout){
	var thismain = this;
	if(thismain.pagename != ""){
		api.toast({
	        msg:'请稍等'
        });
		return;
	}

	$.ajax({
		url: "",
		type: "POST",
		contentType: "application/json",
		headers: {
//			'Content-Type' : 'application/json',
			'Authorization' : 'bearer ' + $api.getStorage("token")
		},
		data: data,
		timeout: timeout,
		beforeSend: function(jqXHR, settings){
			console.log('准备请求');
		},
		complete: function(jqXHR, textStatus){
			console.log("complete:"+textStatus);
			
		},
		success: function(data, textStatus, jqXHR){
			console.log("success:"+JSON.stringify(data) + "===" + textStatus);
			
		},
		error: function(jqXHR, textStatus, errorThrown){
			console.log("error:"+JSON.stringify(errorThrown) + "===" + textStatus);
			
		}
	})
}