(function(window) {
	var u = {};
	/**
	 * 
	 * @param {Object} eventId  对应的事件ID 登录为0  点击为1 请求成功2 请求失败3 跳转页面4
	 * @param {Object} eventLabel  登录  点击 请求成功 请求失败 跳转页面
	 * @param {Object} button
	 */
	u.log = function(eventId, button) {
		var now = new Date();
		var username = $api.getStorage('username');
		if(typeof(username) == 'undefined'){
			username = '';
		}
		
		var eventLabel = '';
		switch(eventId){
			case 0:
				eventLabel = '登录';
				break;
			case 1:
				eventLabel = '点击';
				break;
			case 2:
				eventLabel = '请求成功';
				break;
			case 3:
				eventLabel = '请求失败';
				break;
			case 4:
				eventLabel = '跳转页面';
				break;
			default:
				eventLabel = '';
				break;
		}
		
		var td = api.require('talkingData');
		td.onEvent({
		    eventId: eventId,
		    eventLabel: eventLabel,
		    parameters: {
		        userphone: username,
		        phoneversion: $api.app_usevison,
		        appversion: api.appVersion,
		        systemType: api.systemType,
		        connectionType: api.connectionType,
		        button: button,
		        time: now.getTime()
		    }
		});
	}

	window.$TD = u;
})(window);
