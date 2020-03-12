function initshenhe() {
	document.getElementById("zhiwei").innerHTML = '职位:BA人员';
	document.getElementById("dianhua").innerHTML = '电话:' + $api.getStorage("jia_zhanghao");
	document.getElementById("realName").innerHTML = '姓名:BA人员';

	var winwith = api.winWidth;

	var progress = document.getElementById("progress");
	$api.css(progress, 'margin-left: ' + ((winwith - 175) / 2) + 'px;');

	var itemwith = (winwith - 4) / 4;
	var cssitemwith = 'width: ' + itemwith + 'px;';
	var cssitemheight = 'height: ' + itemwith + 'px;';

	var BAlist = [];
	document.getElementById("gongge").innerHTML = "";
	BAlist = [{
		imgpath : "../image/plane.png",
		text : "排班计划"
	}, {
		imgpath : "../image/basign.png",
		text : "上下班签到"
	}, {
		imgpath : "../image/signout.png",
		text : "注销登录"
	}];

	var eldiv = document.getElementById("gongge");

	for (var a = 0; a < BAlist.length; a++) {
		var htmlli = '<li onclick="openwin(this)" value="' + BAlist[a].text + '" tapmode="liActive" style="' + cssitemwith + '">' + '<img src="' + BAlist[a].imgpath + '" />' + '<span>' + BAlist[a].text + '</span>' + '</li>';
		$api.append(eldiv, htmlli);
	}

	var ulli = document.getElementById("gongge");
	$api.css(ulli, "display: block;");

	api.addEventListener({
		name : 'keyback'
	}, function(aaa, bbb) {
		api.confirm({
			title : '提示',
			msg : '是否退出此应用?',
			buttons : ['确定', '取消']
		}, function(ret, err) {
			var index = ret.buttonIndex;
			if (index == 1) {
				api.closeWidget({
					id : 'A6067912196305',
					silent : true
				});
			}
		});
	});
}


function showpaiban(){
	document.getElementById("paiban").innerHTML = "";
	var el = document.getElementById("paiban");
	var html = '<li>'
			+		'<div class="item">'
			+			'<span class="itemone">工作日期：</span>'
			+			'<span class="itemtwo">'+$kunchi.todaydate()+'</span>'
			+		'</div>'
			+		'<div class="item">'
			+			'<span class="itemone">工作类型：</span>'
			+			'<span class="itemtwo">上班</span>'
			+		'</div>'
			+		'<div class="item">'
			+			'<span class="itemone">上班门店：</span>'
			+			'<span class="itemtwo">天津市小白楼XS门店</span>'
			+		'</div>'
			+		'<div class="item">'
			+			'<span class="itemone">上班时间：</span>'
			+			'<span class="itemtwo">09:00</span>'
			+		'</div>'
			+		'<div class="item">'
			+			'<span class="itemone">下班时间：</span>'
			+			'<span class="itemtwo">16:00</span>'
			+		'</div>'
			+	'</li>';
	$api.append(el, html);
}


function showpaibanxiazhou(){
	document.getElementById("paiban").innerHTML = "";
	var el = document.getElementById("paiban");
	
	var onedaymillons = 86400000;
	var myDate = new Date();
	var thistime = myDate.getTime();
	var thisday = myDate.getDay();
	var starttime1 = thistime + (7 - parseInt(thisday) + 1) * onedaymillons;
	var endTime1 = starttime1 + onedaymillons * 4;
	var endDate = new Date();
	endDate.setTime(endTime1);
	endTime = endDate.format('yyyy-MM-dd');
	
	var html = '<li>'
			+		'<div class="item">'
			+			'<span class="itemone">工作日期：</span>'
			+			'<span class="itemtwo">'+endTime+'</span>'
			+		'</div>'
			+		'<div class="item">'
			+			'<span class="itemone">工作类型：</span>'
			+			'<span class="itemtwo">上班</span>'
			+		'</div>'
			+		'<div class="item">'
			+			'<span class="itemone">上班门店：</span>'
			+			'<span class="itemtwo">天津市小白楼XS门店</span>'
			+		'</div>'
			+		'<div class="item">'
			+			'<span class="itemone">上班时间：</span>'
			+			'<span class="itemtwo">09:00</span>'
			+		'</div>'
			+		'<div class="item">'
			+			'<span class="itemone">下班时间：</span>'
			+			'<span class="itemtwo">16:00</span>'
			+		'</div>'
			+	'</li>';
	$api.append(el, html);
}