var ba = function(d) {
	
	//是否已经打开日历了
	var isshow = 0;
	
    var e = new Date,
        q, u, v, r, t, w, f, x, y, g, z, A, B, C, D, p, binitdateday, beveryday;
    d.get = function(a) {
        console.log(JSON.stringify(a))
    };
    d.initcalendar = function(a) {
        n = a.liyear;
        k = a.lidays;
        l = n + "-" + k + "-01";
        m = 1E3 * d.hangedatetomillon(l);
        q = a.html;
        u = a.bleftbtn;
        v = a.brightbtn;
        r = a.cwidth;
        t = a.cheight;
        w = a.bdatacolor;
        x = a.btitlesize;
        y = a.btitlecolor;
        g = a.bitemmargin;
        z = a.blisize;
        A = a.blicolor;
        C = a.bdiansize;
        D = a.bdiancolor;
        B = a.bliback;
        p = a.blistyle;
        f = t / 7;
		binitdateday = a.binitdateday;
		beveryday = a.beveryday;
		
		if(isshow == 0){
			d.showbutton();
			d.showtitle();
			d.showcontext();
			isshow = 1;
		}
        d.allmonth()
    };
    d.showcalendar = function(a,
        b, c, h) {
        funmoddateyear = a;
        funmoddatemonth = b;
        funmodthismonthfirstday = h;
        b = d.getfirstweek(h);
        $(".index-rili-content_ul").html("");
        for (a = 0; a < b; a++) $(".index-rili-content_ul").append("<li></li>");
        b = d.gettoday();
        for (a = 0; a < c.length; a++) h = "", b == c[a].dateeverydayitem && (h = "·"), $(".index-rili-content_ul").append('<li class="meigeriqi" datetime="'+c[a].dateeverydayitem+'"><i class="index-rili-content-back ' + c[a].dateeverydayitem + 'backcolor"></i><span class="index-rili-content-date-num ' + c[a].dateeverydayitem + 'datenum">' + c[a].dateeverydayitem_day + '</span><span class="index-rili-content-date-today">' +
            h + "</span></li>");
        d.showcalendarcss()
		binitdateday(c[0], c[c.length - 1]);
		
		$(".meigeriqi").click(function(){
			var selecttimefinger = $(this).attr("datetime");
			console.log(selecttimefinger);
			beveryday(selecttimefinger);
		})
    };
    d.showcalendarcss = function() {
        var a = .96 * r / 7,
            b = f;
        if (a >= b) {
            var c = b;
            var h = g / 2;
            var e = (a - b) / 2 + g / 2
        } else c = a, e = g / 2, h = (b - a) / 2 + g / 2;
        $(".index-rili-content ul li").css({
            width: c + "px",
			"height" : (c - g + 20 + h) + "px",
            "float": "left",
            position: "relative",
            "list-style-type": "none"
        });
        $(".index-rili-content-back").css({
            width: c - g + "px",
            height: (c - g + 20) + "px",
            "float": "left",
            "margin-top": h + "px",
            "margin-left": e + "px",
            "background-color": B,
            "border-radius": "50%"
        });
        $(".index-rili-content-date-num").css({
            "text-align": "center",
            position: "absolute",
            width: c - g + "px",
            height: c - g + "px",
            "line-height": c - g + "px",
            "margin-top": h + "px",
            "margin-left": e + "px",
            top: "0",
            left: "0",
            "font-size": z,
            color: A,
            "z-index": "10"
        });
        $(".index-rili-content-date-today").css({
            "text-align": "center",
            position: "absolute",
            width: c - g + "px",
            "margin-left": e + "px",
            height: "20px",
            "line-height": "20px",
            "font-size": C,
            color: D,
            bottom: "0",
            left: "0",
            "z-index": "15"
        });
        d.specialdays()
    };
    d.specialdays = function() {
        for (var a = 0; a < p.length; a++) {
            var b = p[a].datetime;
            //$("." + b + "backcolor").css("background-color", p[a].backcolor);
			$("." + b + "datenum").css("border", "2px solid "+ p[a].backcolor);
			$("." + b + "datenum").css("border-radius", "50%");
            $("." + b + "datenum").css("color", p[a].color);
            $("." + b + "datenum").css("font-size", p[a].size)
        }
    };
    d.showbutton = function() {
        $(q).append('<div class="index-rili-button"></div>');
        $(".index-rili-button").append('<img class="index-rili-button-left" src="' + u + '" />');
        $(".index-rili-button").append('<span class="index-rili-button-datamsg"></span>');
        $(".index-rili-button").append('<img class="index-rili-button-right" src="' + v + '" />');
        $(q).css({
            width: r + "px",
            height: "auto",
            "float": "left",
            "background-image": "linear-gradient(to bottom, #EFFDFB, #F5F5F5)"
        });
        $(".index-rili-button-left").css({
            width: "20px",
            height: "20px",
            "padding-left": "15px",
            "padding-right": "15px",
            "padding-top": (f - 20) / 2 + "px",
            "padding-bottom": (f - 20) / 2 + "px",
            "margin-left": "calc(50% - 100px)",
            "float": "left"
        });
        $(".index-rili-button-left").css({
            "margin-left": "-moz-calc(50% - 100px)"
        });
        $(".index-rili-button-left").css({
            "margin-left": "-webkit-calc(50% - 100px)"
        });
        $(".index-rili-button-left").click(function() {
            m =
                1E3 * d.hangedatetomillon(l);
            var a = new Date(m),
                b = a.getFullYear();
            a = a.getMonth() + 1;
            1 == a ? (a = 12, b = parseInt(b) - 1) : --a;
            10 > a && (a = "0" + a);
            n = b;
            k = a;
            l = n + "-" + k + "-01";
            m = 1E3 * d.hangedatetomillon(l);
            d.allmonth()
        });
        $(".index-rili-button-right").click(function() {
            m = 1E3 * d.hangedatetomillon(l);
            var a = new Date(m),
                b = a.getFullYear();
            a = a.getMonth() + 1;
            12 == a ? (a = 1, b = parseInt(b) + 1) : a += 1;
            10 > a && (a = "0" + a);
            n = b;
            k = a;
            l = n + "-" + k + "-01";
            m = 1E3 * d.hangedatetomillon(l);
            d.allmonth()
        });
        $(".index-rili-button-datamsg").css({
            width: "100px",
            height: f +
                "px",
            "line-height": f + "px",
            "float": "left",
            color: w,
            "font-size": "15px",
            "text-align": "center"
        });
        $(".index-rili-button-right").css({
            width: "20px",
            height: "20px",
            "padding-left": "15px",
            "padding-right": "15px",
            "padding-top": (f - 20) / 2 + "px",
            "padding-bottom": (f - 20) / 2 + "px",
            "float": "left"
        })
    };
    d.showtitle = function() {
        $(q).append('<div class="index-rili-title"><h6>日</h6><h6>一</h6><h6>二</h6><h6>三</h6><h6>四</h6><h6>五</h6><h6>六</h6></div>');
        $(".index-rili-title").css({
            width: "96%",
            "margin-left": "2%",
            "margin-right": "2%",
            "float": "left"
        });
        $(".index-rili-title h6").css({
            width: "14.2857%",
            height: f + "px",
            "line-height": f + "px",
            "text-align": "center",
            "float": "left",
            "font-weight": "700",
            "font-size": x,
            color: y
        })
    };
    d.showcontext = function() {
        $(q).append('<div class="index-rili-content"><ul class="index-rili-content_ul"></ul></div>');
        $(".index-rili-content").css({
            width: "96%",
            "margin-left": "2%",
            "margin-right": "2%",
            "float": "left"
        });
        $(".index-rili-content ul").css({
            width: "100%",
            height: "100%",
            "float": "left"
        })
    };
    d.gettoday =
        function() {
            var a = e.getFullYear(),
                b = e.getMonth() + 1,
                c = e.getDate();
            a += "-";
            10 > b && (a += "0");
            a += b + "-";
            10 > c && (a += "0");
            return a + c
        };
    var n, k, l, m;
    d.allmonth = function() {
        var a = n + "-" + k;
        $(".index-rili-button-datamsg").html(a);
        for (var b = [], c = 1; 32 > c; c++) {
            if (10 > c) {
                var e = "0" + c;
                var f = a + "-0" + c
            } else f = a + "-" + c, e = "" + c; if (21 > c) f = {
                dateeverydayitem: f,
                dateeverydayitem_day: e
            }, b.push(f);
            else if (d.isthismonth(k, m)) f = {
                dateeverydayitem: f,
                dateeverydayitem_day: e
            }, b.push(f);
            else break;
            m += 864E5
        }
        d.showcalendar(n, k, b, l)
    };
    d.isthismonth =
        function(a, b) {
            var c = (new Date(b)).getMonth() + 1;
            return parseInt(c) == parseInt(a) ? !0 : !1
        };
    d.getfirstweek = function(a) {
        return (new Date(1E3 * d.hangedatetomillon(a))).getDay()
    };
    d.gettoday = function() {
        var a = e.getFullYear(),
            b = e.getMonth() + 1,
            c = e.getDate();
        a += "-";
        10 > b && (a += "0");
        a += b + "-";
        10 > c && (a += "0");
        return a + c
    };
    d.getwhichday = function() {
        var a = e.getFullYear(),
            b = e.getMonth() + 1;
        a += "-";
        10 > b && (a += "0");
        a += b + "-0";
        return (new Date(1E3 * d.hangedatetomillon(a + 1))).getDay()
    };
    d.hangedatetomillon = function(a) {
        a = a.replace(/\-/g,
            "/");
        a = (new Date(a)).getTime();
        return a / 1E3
    };
    d.getMillonDate = function(a, b) {
        var c = new Date(b);
        c.getFullYear();
        var d = c.getMonth() + 1;
        c = c.getDate();
        10 > c && (c = "0" + c);
        return parseInt(d) == parseInt(a) ? c : "false"
    };
    d.getcnmteleonemillon = function() {
        var a = e.getFullYear(),
            b = e.getMonth() + 1;
        a += "-";
        10 > b && (a += "0");
        return d.hangedatetomillon(a + (b + "-21"))
    };
    d.getMonthDay = function(a) {
        var b = e.getFullYear(),
            c = e.getMonth() + 1;
        b += "-";
        10 > c && (b += "0");
        b += c + "-";
        10 > a && (b += "0");
        return b + a
    };
    d.getMonthonly = function() {
        var a = e.getMonth() +
            1;
        10 > a && (a = "0" + a);
        return a
    };
    d.getYearonly = function() {
        return e.getFullYear()
    };
    d.getMillonDateCNM = function(a) {
        var b = new Date(a),
            c = b.getFullYear();
        a = b.getMonth() + 1;
        b = b.getDate();
        c += "-";
        10 > a && (c += "0");
        c += a + "-";
        10 > b && (c += "0");
        return c + b
    };
    return d
}(window.ba || {});