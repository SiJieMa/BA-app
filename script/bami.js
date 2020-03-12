var ba = (function(mod) {
	//是否已经打开日历了
	var isshow = 0;

	var CNMnow = new Date();

	//所展示的内容
	var ba_showdiv;
	//上下月按钮的背景图片
	var bleftbtn, brightbtn;
	var cwidth, cheight;
	//顶部文字颜色
	var bdatacolor;
	//每一行的高度是多少
	var itemheight;
	//星期一排字体颜色大小 
	var btitlesize, btitlecolor;
	var bitemmargin;
	//日历字体颜色 大小 以及背景圆圈颜色
	var blisize, blicolor, bliback;
	//当日圆点大小, 颜色
	var bdiansize, bdiancolor;
	//需要特殊显示的日期
	var blistyle;
	//需要显示的日期年 需要显示的日期月
	var startyear, startmonth;
	//显示年月日的文字大小
	var bdatasize;
	var bdayliststyleitembackcolor;

	var clickdatetime;
	mod.get = function(params) {
		console.log(JSON.stringify(params));
	}

	mod.initcalendar = function(params) {
		
		dateyear = params.liyear;
		datemonth = params.lidays;
		thismonthfirstday = dateyear + "-" + datemonth + "-01";
		thismonthfirstdaymillon = mod.hangedatetomillon(thismonthfirstday) * 1000;
		
		ba_showdiv = params.html;
		bleftbtn = params.bleftbtn;
		brightbtn = params.brightbtn;
		cwidth = params.cwidth;
		cheight = params.cheight;
		bdayliststyleitembackcolor = params.bdayliststyleitembackcolor;
		bdatacolor = params.bdatacolor;
		btitlesize = params.btitlesize;
		btitlecolor = params.btitlecolor;
		bitemmargin = params.bitemmargin;
		blisize = params.blisize;
		blicolor = params.blicolor;
		bdiansize = params.bdiansize;
		bdiancolor = params.bdiancolor;
		bliback = params.bliback;
		blistyle = params.blistyle;
		startmonth = params.startmonth;
		startyear = params.startyear;
		bdatasize = params.bdatasize;
		bulback = params.bulback;
		leftbtn = params.leftbtn;
		rightbtn = params.rightbtn;
		bdayliststyle = params.bdayliststyle;
		clickdatetime = params.clickdatetime;
		itemheight = cheight / 7;
		if(isshow == 0){
			mod.showbutton();
			mod.showtitle();
			mod.showcontext();
			isshow = 1;
		}
		mod.allmonth();
	}
	
	mod.showcalendar = function(moddateyear, moddatemonth, allmonthlist, modthismonthfirstday){
		
		funmoddateyear = moddateyear;
		funmoddatemonth = moddatemonth;
		funmodthismonthfirstday = modthismonthfirstday;
		var bfirstweek = mod.getfirstweek(modthismonthfirstday);
		$(".index-rili-content_ul").html("");
		for(var a = 0; a < bfirstweek; a++){
			$(".index-rili-content_ul").append('<li></li>');
		}
		var modtoday = mod.gettoday();
		for(var a = 0; a < allmonthlist.length; a++){
			var modheidian = "";
			if(modtoday == allmonthlist[a].dateeverydayitem){
				modheidian = "·";
			}
			$(".index-rili-content_ul").append('<li class="index-rili-ulli" valuetime="'+allmonthlist[a].dateeverydayitem+'"><span class="index-rili-content-daynums index-rili-content-daynums-date-'+allmonthlist[a].dateeverydayitem+'">0</span><span class="index-rili-content-date-num '+allmonthlist[a].dateeverydayitem+'datenum">'+allmonthlist[a].dateeverydayitem_day+'</span><span class="index-rili-content-date-today">'+modheidian+'</span></li>');
		}
		$(".index-rili-ulli").click(function(){
			var clicktime_item = $(this).attr("valuetime");
			clickdatetime(clicktime_item);
		})
		mod.showcalendarcss();
	}
	//添加完日历之后 重新初始化一下样式
	mod.showcalendarcss = function(){
		//需要计算一下 当前item的宽度和高度 用来进行展示
		var itemliwidth = cwidth * 0.96 / 7;
		var itemliheight = itemheight;
		var zhengfangxing, zhengfangxingmargintop, zhengfangxingmarginleft;
//		if(itemliwidth >= itemliheight){
//			zhengfangxing = itemliheight;
//			zhengfangxingmargintop = 0+bitemmargin / 2;
//			zhengfangxingmarginleft = (itemliwidth - itemliheight) / 2 +bitemmargin / 2;
//		}else{
			zhengfangxing = itemliwidth;
			zhengfangxingmarginleft = 0+bitemmargin / 2;
			zhengfangxingmargintop = (itemliheight - itemliwidth) / 2 + bitemmargin / 2;
//		}
		
		$(".index-rili-content ul li").css({
			"width": zhengfangxing+"px",
			"min-height": "30px",
			"float": "left",
			"position": "relative",
			"list-style-type": "none"
		});
		$(".index-rili-content-daynums").css({
			"width": zhengfangxing-bitemmargin+"px",
			"height": zhengfangxing-bitemmargin+"px",
			"line-height": zhengfangxing-bitemmargin+"px",
			"border-radius": "50%",
			"background-color": bdayliststyleitembackcolor,
			"margin-top": "5px",
			"margin-left": zhengfangxingmarginleft+"px",
			"text-align": "center",
			"color": "#ffffff",
			"float": "left"
		});
		$(".index-rili-content-back").css({
			"width": zhengfangxing-bitemmargin+"px",
			"height": zhengfangxing-bitemmargin+"px",
			"float": "left",
			"margin-top": zhengfangxingmargintop + "px",
			"margin-left": zhengfangxingmarginleft+"px",
			"background-color": bliback,
			"border-radius": "50%"
		});
		$(".index-rili-content-date-num").css({
			"text-align": "center",
			"float": "left",
			"width": zhengfangxing-bitemmargin+"px",
			"height": "20px",
			"line-height": "20px",
			"margin-left": zhengfangxingmarginleft+"px",
			"font-size": blisize,
			"color": blicolor,
		});
		$(".index-rili-content-date-today").css({
			"text-align": "center",
			"float": "left",
			"width": zhengfangxing-bitemmargin+"px",
			"margin-left": zhengfangxingmarginleft+"px",
			"height": "10px",
			"line-height": "10px",
			"font-size": bdiansize,
			"color": bdiancolor
		});
		mod.specialdays();
	}

	mod.specialdays = function(){
		for(var a = 0; a < blistyle.length; a++){
			var specialdayitem = blistyle[a].datetime;
			$("."+specialdayitem+"backcolor").css("background-color", blistyle[a].backcolor);
			$("."+specialdayitem+"datenum").css("color", blistyle[a].color);
			$("."+specialdayitem+"datenum").css("font-size", blistyle[a].size);
		}
		
		for(var b = 0; b < bdayliststyle.length; b++){
			var specialdayitemcolor = bdayliststyle[b].datetime;
			$(".index-rili-content-daynums-date-"+specialdayitemcolor).css("background-color", bdayliststyle[b].backcolor);
			$(".index-rili-content-daynums-date-"+specialdayitemcolor).css("color", bdayliststyle[b].color);
			$(".index-rili-content-daynums-date-"+specialdayitemcolor).css("font-size", bdayliststyle[b].size);
			$(".index-rili-content-daynums-date-"+specialdayitemcolor).html(bdayliststyle[b].num);
		}
	}

	mod.showbutton = function() {
		$(ba_showdiv).append('<div class="index-rili-button"></div>');
		$(".index-rili-button").append('<img class="index-rili-button-left" src="' + bleftbtn + '" />');
		$(".index-rili-button").append('<span class="index-rili-button-datamsg"></span>');
		$(".index-rili-button").append('<img class="index-rili-button-right" src="' + brightbtn + '" />');
		$(ba_showdiv).css({
			"width": cwidth + "px",
			"height": "auto",
			"padding-bottom": "5px",
			"float": "left",
			"background-image": "linear-gradient(to bottom, #EFFDFB, #F5F5F5)"
		});
		$(".index-rili-button-left").css({
			"width": "20px",
			"height": "20px",
			"padding-left": "15px",
			"padding-right": "15px",
			"padding-top": ((itemheight - 20)/2)+"px",
			"padding-bottom": ((itemheight - 20)/2)+"px",
			"margin-left": "calc(50% - 100px)",
			"float": "left"
		})
		$(".index-rili-button-left").css({"margin-left": "-moz-calc(50% - 100px)"})
		$(".index-rili-button-left").css({"margin-left": "-webkit-calc(50% - 100px)"})

		$(".index-rili-button-left").click(function(){
			thismonthfirstdaymillon = mod.hangedatetomillon(thismonthfirstday) * 1000;
			var nownext = new Date(thismonthfirstdaymillon);
			var year = nownext.getFullYear();
			var month = nownext.getMonth() + 1;
			
			if(month == 1){
				month = 12;
				year = parseInt(year)-1;
			}else{
				month = month - 1;
			}
			
			if (month < 10){
				month = "0" + month;
			}
			dateyear = year;
			datemonth = month;
			thismonthfirstday = dateyear + "-" + datemonth + "-01";
			thismonthfirstdaymillon = mod.hangedatetomillon(thismonthfirstday) * 1000;
			mod.allmonth();
			leftbtn(thismonthfirstday);
		});
		$(".index-rili-button-right").click(function(){
			thismonthfirstdaymillon = mod.hangedatetomillon(thismonthfirstday) * 1000;
			var nownext = new Date(thismonthfirstdaymillon);
			var year = nownext.getFullYear();
			var month = nownext.getMonth() + 1;
			
			if(month == 12){
				month = 1;
				year = parseInt(year)+1;
			}else{
				month = month + 1;
			}
			
			if (month < 10){
				month = "0" + month;
			}
			dateyear = year;
			datemonth = month;
			thismonthfirstday = dateyear + "-" + datemonth + "-01";
			thismonthfirstdaymillon = mod.hangedatetomillon(thismonthfirstday) * 1000;
			mod.allmonth();
			rightbtn(thismonthfirstday);
		});

		$(".index-rili-button-datamsg").css({
			"width": "100px",
			"height": itemheight+"px",
			"line-height": itemheight+"px",
			"float": "left",
			"color": bdatacolor,
			"font-size": bdatasize,
			"text-align": "center"
		})
		$(".index-rili-button-right").css({
			"width": "20px",
			"height": "20px",
			"padding-left": "15px",
			"padding-right": "15px",
			"padding-top": ((itemheight - 20)/2)+"px",
			"padding-bottom": ((itemheight - 20)/2)+"px",
			"float": "left"
		})
	}

	mod.showtitle = function() {
		$(ba_showdiv).append('<div class="index-rili-title"><h6>日</h6><h6>一</h6><h6>二</h6><h6>三</h6><h6>四</h6><h6>五</h6><h6>六</h6></div>');
		$(".index-rili-title").css({
			"width": "96%",
			"margin-left": "2%",
			"margin-right": "2%",
			"float": "left"
		});
		$(".index-rili-title h6").css({
			"width": "14.2857%",
			"height": itemheight+"px",
			"line-height": itemheight+"px",
			"text-align": "center",
			"float": "left",
			"font-weight": "700",
			"font-size": btitlesize,
			"color": btitlecolor
		});
	}

	mod.showcontext = function() {
		$(ba_showdiv).append('<div class="index-rili-content"><ul class="index-rili-content_ul"></ul></div>');
		$(".index-rili-content").css({
			"width": "96%",
			"margin-left": "2%",
			"margin-right": "2%",
			"float": "left"
		});
		$(".index-rili-content ul").css({
			"width": "100%",
			"height": "100%",
			"float": "left",
			"background-color": bulback,
			"border-radius": "5px"
		});
	}
	
	mod.gettoday = function(){
		var year = CNMnow.getFullYear();
		var month = CNMnow.getMonth() + 1;
		var day = CNMnow.getDate();
		var clock = year + "-";
		if (month < 10)
			clock += "0";
		clock += month + "-";
		if (day < 10)
			clock += "0";
		clock += day;
		return (clock);
	}
	/////////////////////////////////////////////////////////////////////////////////////////////////////
	
	var dateyear, datemonth;
	var onedaymillon = 86400000;
	var thismonthfirstday, thismonthfirstdaymillon;//当前月份第一天
	
	mod.allmonth = function(){
		var dateeveryday = dateyear + "-" + datemonth;
		$(".index-rili-button-datamsg").html(dateeveryday);
		var allmonthlist = new Array();
		var dayup20 = 1;
		for(var a = 1; a < 32; a++){
			var dateeverydayitem;
			var dateeverydayitem_day;
			if(a < 10){
				dateeverydayitem_day = "0"+a;
				dateeverydayitem = 	dateeveryday + "-0"+a;		
			}else{
				dateeverydayitem = 	dateeveryday + "-"+a;	
				dateeverydayitem_day = ""+a;
			}
			if(a < 21){
				var lidayobject = {
					dateeverydayitem: dateeverydayitem,
					dateeverydayitem_day: dateeverydayitem_day
				}
				allmonthlist.push(lidayobject);
				//allmonthlist.push(dateeverydayitem);
			}else{
				if(mod.isthismonth(datemonth, thismonthfirstdaymillon)){
					//allmonthlist.push(dateeverydayitem);
					var lidayobject = {
						dateeverydayitem: dateeverydayitem,
						dateeverydayitem_day: dateeverydayitem_day
					}
					allmonthlist.push(lidayobject);
				}else{
					break;
				}
			}
			thismonthfirstdaymillon += onedaymillon;
		}
		//monthdays(allmonthlist, mod.getfirstweek(thismonthfirstday));
		
		mod.showcalendar(dateyear, datemonth, allmonthlist, thismonthfirstday);
		
	}
	/**
	 * 验证下一天是否还属于本月 如果属于返回true 如果不属于 返回false
	 */
	mod.isthismonth = function(datemonth, millons){
		var now = new Date(millons);
		var month = now.getMonth() + 1;
		if(parseInt(month) == parseInt(datemonth)){
			return true;
		}else{
			return false;
		}
	}
	
	
	/**
	 * 首先要获取当前月份的1号是星期几
	 */
	mod.getfirstweek = function(clock){
		//获取今天星期几
		var myDate = new Date(mod.hangedatetomillon(clock) * 1000);
		return (myDate.getDay());
	}
	
	
	
	mod.gettoday = function(){
		var year = CNMnow.getFullYear();
		var month = CNMnow.getMonth() + 1;
		var day = CNMnow.getDate();
		var clock = year + "-";
		if (month < 10)
			clock += "0";
		clock += month + "-";
		if (day < 10)
			clock += "0";
		clock += day;
		return (clock);
	}
	//获取今天星期几
	mod.getwhichday = function(){
		var year = CNMnow.getFullYear();
		var month = CNMnow.getMonth() + 1;
		var day = 1;
		var clock = year + "-";
		if (month < 10)
			clock += "0";
		clock += month + "-";
		if (day < 10)
			clock += "0";
		clock += day;
		var myDate = new Date(mod.hangedatetomillon(clock) * 1000);
		return (myDate.getDay());
	}
	
	mod.hangedatetomillon = function(endTime){
		endTime = endTime.replace(/\-/g, '/');
	    endTime = new Date(endTime).getTime();
	    endTime = endTime / 1000;
	    return endTime;
	}
	//获取时间戳转为时间的day 如果不是当月的了 就返回false
	mod.getMillonDate = function(CNMmonth, CNMmillons){
		var now = new Date(CNMmillons);
		var year = now.getFullYear();
		//年
		var month = now.getMonth() + 1;
		//月
		var day = now.getDate();
		if (day < 10){
			day = '0' + day;
		}
		if(parseInt(month) == parseInt(CNMmonth)){
			return day;
		}else{
			return 'false';
		}
	}
	//获取当月21号的时间戳
	mod.getcnmteleonemillon = function(){
		var year = CNMnow.getFullYear();
		var month = CNMnow.getMonth() + 1;
		var day = 21;
		var clock = year + "-";
		if (month < 10)
			clock += "0";
		clock += month + "-";
		if (day < 10)
			clock += "0";
		clock += day;
		return mod.hangedatetomillon(clock);
	}
	
	//获取当前年跟月 加上算出来的日期 绑定到标签上面
	mod.getMonthDay = function(day){
		var year = CNMnow.getFullYear();
		var month = CNMnow.getMonth() + 1;
		var clock = year + "-";
		if (month < 10)
			clock += "0";
		clock += month + "-";
		if (day < 10)
			clock += "0";
		clock += day;
		return clock;
	}
	
	//获取当前月份
	mod.getMonthonly = function(){
		var month = CNMnow.getMonth() + 1;
		if (month < 10){
			month = '0'+month;
		}
		return month;
	}
	
	//获取当前月份
	mod.getYearonly = function(){
		var year = CNMnow.getFullYear();
		return year;
	}
	//时间戳转正常时间
	mod.getMillonDateCNM = function(millons){
		var now = new Date(millons);
		var year = now.getFullYear();
		var month = now.getMonth() + 1;
		var day = now.getDate();
		var clock = year + "-";
		if (month < 10)
			clock += "0";
		clock += month + "-";
		if (day < 10)
			clock += "0";
		clock += day;
		return (clock);
	}
	
	return mod;

})(window.ba || {});