function initselectshop(){
	var body = document.body;
	var html = '<div id="selectshoplist" class="selectshoplist"><span class="xuanzeanniu" onclick="openshoplist()">点击选择门店</span></div>';
	$api.before(body, html);
	var selectshoplist = document.getElementById("selectshoplist");
	var xuanzeanniu = document.getElementById("xuanzeanniu");
	$api.css(selectshoplist,'width: 100%; height: 100%; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background-color: #FFFFFF; z-index: 999;');
	$api.css(xuanzeanniu,'width: 100%; height: 50px; line-height: 50px; float: left; margin-top: 100px; text-align: center; font-size: 18px; color: #666;');
}

function openshoplist(){
	api.openWin({
	    name: 'select_shop_win',
	    url: 'widget://html/BA/skushoplist/select_shop_win.html'
	});
	/**api.addEventListener({
	    name: 'selectshopidthis'
	}, function(ret, err) {
	    selectshopid = ret.value.shopid;
	    var elselectshoplist = document.getElementById("selectshoplist");
	    $api.css(elselectshoplist,'display: none;');
	    showcangku(selectshopid);
	});*/
}