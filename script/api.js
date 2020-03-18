/*
 * APICloud JavaScript Library
 * Copyright (c) 2014 apicloud.com
 */
(function(window) {
	var u = {};

    //	u.posturllujie = "http://api.ba.ikunchi.cn/";
	//	u.posturllujie = "http://120.27.114.88:8999/";
<<<<<<< HEAD
		// u.posturllujie = "https://dev-api-ba.ikunchi.com/";
		u.posturllujie = "https://qa-api-ba.ikunchi.com/";
=======
		u.posturllujie = "https://dev-api-ba.ikunchi.com/";
		// u.posturllujie = "https://qa-api-ba.ikunchi.com/";
>>>>>>> cd23a2bf0b129a5b6058def739f215ca0a153715
	//  u.posturllujie = "https://test-api-ba.ikunchi.com/";
	//	u.posturllujie = "http://192.168.0.75/api/";
	//	u.posturllujie = "http://120.27.114.88:9091/";
	//	u.posturllujie = "http://47.100.184.83:8989/";

	//	第三位表示大版本更新 第一位表示当前版本是第几版  55.4.54
	u.app_usevison = '70.7.70';

	//u.devid = '0a0df203-eff0-40f4-a77d-cdff657c741d';
	//u.qaid = 'bf7e492c-99ca-454e-994c-d5f2e7fb2830';
	//u.httpid = 'bf7e492c-99ca-454e-994c-d5f2e7fb2830';
	u.iBrandId = 'bf7e492c-99ca-454e-994c-d5f2e7fb2830';

	var isAndroid = (/android/gi).test(navigator.appVersion);
	var uzStorage = function() {
		var ls = window.localStorage;
		if (isAndroid) {
			ls = os.localStorage();
		}
		return ls;
	};
	function parseArguments(url, data, fnSuc, dataType) {
		if ( typeof (data) == 'function') {
			dataType = fnSuc;
			fnSuc = data;
			data = undefined;
		}
		if ( typeof (fnSuc) != 'function') {
			dataType = fnSuc;
			fnSuc = undefined;
		}
		return {
			url : url,
			data : data,
			fnSuc : fnSuc,
			dataType : dataType
		};
	}


	u.trim = function(str) {
		if (String.prototype.trim) {
			return str == null ? "" : String.prototype.trim.call(str);
		} else {
			return str.replace(/(^\s*)|(\s*$)/g, "");
		}
	};
	u.trimAll = function(str) {
		return str.replace(/\s*/g, '');
	};
	u.isElement = function(obj) {
		return !!(obj && obj.nodeType == 1);
	};
	u.isArray = function(obj) {
		if (Array.isArray) {
			return Array.isArray(obj);
		} else {
			return obj instanceof Array;
		}
	};
	u.isEmptyObject = function(obj) {
		if (JSON.stringify(obj) === '{}') {
			return true;
		}
		return false;
	};
	u.addEvt = function(el, name, fn, useCapture) {
		if (!u.isElement(el)) {
			console.warn('$api.addEvt Function need el param, el param must be DOM Element');
			return;
		}
		useCapture = useCapture || false;
		if (el.addEventListener) {
			el.addEventListener(name, fn, useCapture);
		}
	};
	u.rmEvt = function(el, name, fn, useCapture) {
		if (!u.isElement(el)) {
			console.warn('$api.rmEvt Function need el param, el param must be DOM Element');
			return;
		}
		useCapture = useCapture || false;
		if (el.removeEventListener) {
			el.removeEventListener(name, fn, useCapture);
		}
	};
	u.one = function(el, name, fn, useCapture) {
		if (!u.isElement(el)) {
			console.warn('$api.one Function need el param, el param must be DOM Element');
			return;
		}
		useCapture = useCapture || false;
		var that = this;
		var cb = function() {
			fn && fn();
			that.rmEvt(el, name, cb, useCapture);
		};
		that.addEvt(el, name, cb, useCapture);
	};
	u.dom = function(el, selector) {
		if (arguments.length === 1 && typeof arguments[0] == 'string') {
			if (document.querySelector) {
				return document.querySelector(arguments[0]);
			}
		} else if (arguments.length === 2) {
			if (el.querySelector) {
				return el.querySelector(selector);
			}
		}
	};
	u.domAll = function(el, selector) {
		if (arguments.length === 1 && typeof arguments[0] == 'string') {
			if (document.querySelectorAll) {
				return document.querySelectorAll(arguments[0]);
			}
		} else if (arguments.length === 2) {
			if (el.querySelectorAll) {
				return el.querySelectorAll(selector);
			}
		}
	};
	u.byId = function(id) {
		return document.getElementById(id);
	};
	u.first = function(el, selector) {
		if (arguments.length === 1) {
			if (!u.isElement(el)) {
				console.warn('$api.first Function need el param, el param must be DOM Element');
				return;
			}
			return el.children[0];
		}
		if (arguments.length === 2) {
			return this.dom(el, selector + ':first-child');
		}
	};
	u.last = function(el, selector) {
		if (arguments.length === 1) {
			if (!u.isElement(el)) {
				console.warn('$api.last Function need el param, el param must be DOM Element');
				return;
			}
			var children = el.children;
			return children[children.length - 1];
		}
		if (arguments.length === 2) {
			return this.dom(el, selector + ':last-child');
		}
	};
	u.eq = function(el, index) {
		return this.dom(el, ':nth-child(' + index + ')');
	};
	u.not = function(el, selector) {
		return this.domAll(el, ':not(' + selector + ')');
	};
	u.prev = function(el) {
		if (!u.isElement(el)) {
			console.warn('$api.prev Function need el param, el param must be DOM Element');
			return;
		}
		var node = el.previousSibling;
		if (node.nodeType && node.nodeType === 3) {
			node = node.previousSibling;
			return node;
		}
	};
	u.next = function(el) {
		if (!u.isElement(el)) {
			console.warn('$api.next Function need el param, el param must be DOM Element');
			return;
		}
		var node = el.nextSibling;
		if (node.nodeType && node.nodeType === 3) {
			node = node.nextSibling;
			return node;
		}
	};
	u.closest = function(el, selector) {
		if (!u.isElement(el)) {
			console.warn('$api.closest Function need el param, el param must be DOM Element');
			return;
		}
		var doms, targetDom;
		var isSame = function(doms, el) {
			var i = 0, len = doms.length;
			for (i; i < len; i++) {
				if (doms[i].isSameNode(el)) {
					return doms[i];
				}
			}
			return false;
		};
		var traversal = function(el, selector) {
			doms = u.domAll(el.parentNode, selector);
			targetDom = isSame(doms, el);
			while (!targetDom) {
				el = el.parentNode;
				if (el != null && el.nodeType == el.DOCUMENT_NODE) {
					return false;
				}
				traversal(el, selector);
			}

			return targetDom;
		};

		return traversal(el, selector);
	};
	u.contains = function(parent, el) {
		var mark = false;
		if (el === parent) {
			mark = true;
			return mark;
		} else {
			do {
				el = el.parentNode;
				if (el === parent) {
					mark = true;
					return mark;
				}
			} while(el === document.body || el === document.documentElement);

			return mark;
		}

	};
	u.remove = function(el) {
		if (el && el.parentNode) {
			el.parentNode.removeChild(el);
		}
	};
	u.attr = function(el, name, value) {
		if (!u.isElement(el)) {
			console.warn('$api.attr Function need el param, el param must be DOM Element');
			return;
		}
		if (arguments.length == 2) {
			return el.getAttribute(name);
		} else if (arguments.length == 3) {
			el.setAttribute(name, value);
			return el;
		}
	};
	u.removeAttr = function(el, name) {
		if (!u.isElement(el)) {
			console.warn('$api.removeAttr Function need el param, el param must be DOM Element');
			return;
		}
		if (arguments.length === 2) {
			el.removeAttribute(name);
		}
	};
	u.hasCls = function(el, cls) {
		if (!u.isElement(el)) {
			console.warn('$api.hasCls Function need el param, el param must be DOM Element');
			return;
		}
		if (el.className.indexOf(cls) > -1) {
			return true;
		} else {
			return false;
		}
	};
	u.addCls = function(el, cls) {
		if (!u.isElement(el)) {
			console.warn('$api.addCls Function need el param, el param must be DOM Element');
			return;
		}
		if ('classList' in el) {
			el.classList.add(cls);
		} else {
			var preCls = el.className;
			var newCls = preCls + ' ' + cls;
			el.className = newCls;
		}
		return el;
	};
	u.removeCls = function(el, cls) {
		if (!u.isElement(el)) {
			console.warn('$api.removeCls Function need el param, el param must be DOM Element');
			return;
		}
		if ('classList' in el) {
			el.classList.remove(cls);
		} else {
			var preCls = el.className;
			var newCls = preCls.replace(cls, '');
			el.className = newCls;
		}
		return el;
	};
	u.toggleCls = function(el, cls) {
		if (!u.isElement(el)) {
			console.warn('$api.toggleCls Function need el param, el param must be DOM Element');
			return;
		}
		if ('classList' in el) {
			el.classList.toggle(cls);
		} else {
			if (u.hasCls(el, cls)) {
				u.removeCls(el, cls);
			} else {
				u.addCls(el, cls);
			}
		}
		return el;
	};
	u.val = function(el, val) {
		if (!u.isElement(el)) {
			console.warn('$api.val Function need el param, el param must be DOM Element');
			return;
		}
		if (arguments.length === 1) {
			switch(el.tagName) {
				case 'SELECT':
					var value = el.options[el.selectedIndex].value;
					return value;
					break;
				case 'INPUT':
					return el.value;
					break;
				case 'TEXTAREA':
					return el.value;
					break;
			}
		}
		if (arguments.length === 2) {
			switch(el.tagName) {
				case 'SELECT':
					el.options[el.selectedIndex].value = val;
					return el;
					break;
				case 'INPUT':
					el.value = val;
					return el;
					break;
				case 'TEXTAREA':
					el.value = val;
					return el;
					break;
			}
		}

	};
	u.prepend = function(el, html) {
		if (!u.isElement(el)) {
			console.warn('$api.prepend Function need el param, el param must be DOM Element');
			return;
		}
		el.insertAdjacentHTML('afterbegin', html);
		return el;
	};
	u.append = function(el, html) {
		if (!u.isElement(el)) {
			console.warn('$api.append Function need el param, el param must be DOM Element');
			return;
		}
		el.insertAdjacentHTML('beforeend', html);
		return el;
	};
	u.before = function(el, html) {
		if (!u.isElement(el)) {
			console.warn('$api.before Function need el param, el param must be DOM Element');
			return;
		}
		el.insertAdjacentHTML('beforebegin', html);
		return el;
	};
	u.after = function(el, html) {
		if (!u.isElement(el)) {
			console.warn('$api.after Function need el param, el param must be DOM Element');
			return;
		}
		el.insertAdjacentHTML('afterend', html);
		return el;
	};
	u.html = function(el, html) {
		if (!u.isElement(el)) {
			console.warn('$api.html Function need el param, el param must be DOM Element');
			return;
		}
		if (arguments.length === 1) {
			return el.innerHTML;
		} else if (arguments.length === 2) {
			el.innerHTML = html;
			return el;
		}
	};
	u.text = function(el, txt) {
		if (!u.isElement(el)) {
			console.warn('$api.text Function need el param, el param must be DOM Element');
			return;
		}
		if (arguments.length === 1) {
			return el.textContent;
		} else if (arguments.length === 2) {
			el.textContent = txt;
			return el;
		}
	};
	u.offset = function(el) {
		if (!u.isElement(el)) {
			console.warn('$api.offset Function need el param, el param must be DOM Element');
			return;
		}
		var sl = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
		var st = Math.max(document.documentElement.scrollTop, document.body.scrollTop);

		var rect = el.getBoundingClientRect();
		return {
			l : rect.left + sl,
			t : rect.top + st,
			w : el.offsetWidth,
			h : el.offsetHeight
		};
	};
	u.css = function(el, css) {
		if (!u.isElement(el)) {
			console.warn('$api.css Function need el param, el param must be DOM Element');
			return;
		}
		if ( typeof css == 'string' && css.indexOf(':') > 0) {
			el.style && (el.style.cssText += ';' + css);
		}
	};
	u.cssVal = function(el, prop) {
		if (!u.isElement(el)) {
			console.warn('$api.cssVal Function need el param, el param must be DOM Element');
			return;
		}
		if (arguments.length === 2) {
			var computedStyle = window.getComputedStyle(el, null);
			return computedStyle.getPropertyValue(prop);
		}
	};
	u.jsonToStr = function(json) {
		if ( typeof json === 'object') {
			return JSON && JSON.stringify(json);
		}
	};
	u.strToJson = function(str) {
		if ( typeof str === 'string') {
			return JSON && JSON.parse(str);
		}
	};
	u.setStorage = function(key, value) {
		if (arguments.length === 2) {
			var v = value;
			if ( typeof v == 'object') {
				v = JSON.stringify(v);
				v = 'obj-' + v;
			} else {
				v = 'str-' + v;
			}
			var ls = uzStorage();
			if (ls) {
				ls.setItem(key, v);
			}
		}
	};
	u.getStorage = function(key) {
		var ls = uzStorage();
		if (ls) {
			var v = ls.getItem(key);
			if (!v) {
				return;
			}
			if (v.indexOf('obj-') === 0) {
				v = v.slice(4);
				return JSON.parse(v);
			} else if (v.indexOf('str-') === 0) {
				return v.slice(4);
			}
		}
	};
	u.rmStorage = function(key) {
		var ls = uzStorage();
		if (ls && key) {
			ls.removeItem(key);
		}
	};
	u.clearStorage = function() {
		var ls = uzStorage();
		if (ls) {
			ls.clear();
		}
	};
	u.fixIos7Bar = function(el) {
		return u.fixStatusBar(el);
	};
	u.fixStatusBar = function(el) {
		if (!u.isElement(el)) {
			console.warn('$api.fixStatusBar Function need el param, el param must be DOM Element');
			return 0;
		}
		el.style.paddingTop = api.safeArea.top + 'px';
		return el.offsetHeight;
	};
	u.fixTabBar = function(el) {
		if (!u.isElement(el)) {
			console.warn('$api.fixTabBar Function need el param, el param must be DOM Element');
			return 0;
		}
		el.style.paddingBottom = api.safeArea.bottom + 'px';
		return el.offsetHeight;
	};
	u.toast = function(title, text, time) {
		var opts = {};
		var show = function(opts, time) {
			api.showProgress(opts);
			setTimeout(function() {
				api.hideProgress();
			}, time);
		};
		if (arguments.length === 1) {
			var time = time || 500;
			if ( typeof title === 'number') {
				time = title;
			} else {
				opts.title = title + '';
			}
			show(opts, time);
		} else if (arguments.length === 2) {
			var time = time || 500;
			var text = text;
			if ( typeof text === "number") {
				var tmp = text;
				time = tmp;
				text = null;
			}
			if (title) {
				opts.title = title;
			}
			if (text) {
				opts.text = text;
			}
			show(opts, time);
		}
		if (title) {
			opts.title = title;
		}
		if (text) {
			opts.text = text;
		}
		time = time || 500;
		show(opts, time);
	};
	u.post = function(/*url,data,fnSuc,dataType*/) {
		var argsToJson = parseArguments.apply(null, arguments);
		var json = {};
		var fnSuc = argsToJson.fnSuc;
		argsToJson.url && (json.url = argsToJson.url);
		argsToJson.data && (json.data = argsToJson.data);
		if (argsToJson.dataType) {
			var type = argsToJson.dataType.toLowerCase();
			if (type == 'text' || type == 'json') {
				json.dataType = type;
			}
		} else {
			json.dataType = 'json';
		}
		json.method = 'post';
		api.ajax(json, function(ret, err) {
			if (ret) {
				fnSuc && fnSuc(ret);
			}
		});
	};
	u.get = function(/*url,fnSuc,dataType*/) {
		var argsToJson = parseArguments.apply(null, arguments);
		var json = {};
		var fnSuc = argsToJson.fnSuc;
		argsToJson.url && (json.url = argsToJson.url);
		//argsToJson.data && (json.data = argsToJson.data);
		if (argsToJson.dataType) {
			var type = argsToJson.dataType.toLowerCase();
			if (type == 'text' || type == 'json') {
				json.dataType = type;
			}
		} else {
			json.dataType = 'text';
		}
		json.method = 'get';
		api.ajax(json, function(ret, err) {
			if (ret) {
				fnSuc && fnSuc(ret);
			}
		});
	};

	u.tokenold = function(jsonstr, errmsg) {
		if (jsonstr.statusCode == "401") {
			api.alert({
				title : '身份认证失败',
				msg : '身份信息到期或该账号在其他设备登陆,请重新登陆.',
			}, function(ret, err) {
				api.sendEvent({
					name : 'tokenIsOld',
					extra : {
						key1 : 'value1'
					}
				});
			});
		} else {

		}
	};

	u.gettodaytime = function() {
		var now = new Date();

		var year = now.getFullYear();
		//年
		var month = now.getMonth() + 1;
		//月
		var day = now.getDate();
		//日

		var hh = now.getHours();
		//时
		var mm = now.getMinutes();
		//分
		var ss = now.getSeconds();
		//秒

		var clock = year + "-";

		if (month < 10)
			clock += "0";

		clock += month + "-";

		if (day < 10)
			clock += "0";

		clock += day + " ";

		if (hh < 10)
			clock += "0";

		clock += hh + ":";
		if (mm < 10)
			clock += '0';
		clock += mm + ":";
		if (ss < 10)
			clock += '0';
		clock += ss;
		return (clock);
	}
	/**
	 * 判断是否有权限 如果没有 立即去设置
	 *
	 * calendar camera contacts location microphone麦克风 phone sensor传感器 storage sms
	 */
	u.confirmPer = function(perm) {
		var perms = new Array();
		perms.push(perm);
		var has = u.hasPermission(perms);
		console.log(JSON.stringify(has));
		if (!has || !has[0] || !has[0].granted) {
			api.confirm({
				title : '提醒',
				msg : '没有获得 ' + perm + " 权限\n是否前往设置？",
				buttons : ['去设置', '取消']
			}, function(ret, err) {
				if (1 == ret.buttonIndex) {
					u.reqPermission(perm);
				}
			});
			return false;
		}
		return true;
	}

	u.reqPermission = function(one_per, callback) {
		console.log(one_per);
		var perms = new Array();
		perms.push(one_per);
		api.requestPermission({
			list : perms,
			code : 100001
		}, function(ret, err) {
			if (callback) {
				callback(ret);
				return;
			}
			var str = '请求结果：\n';
			str += '请求码: ' + ret.code + '\n';
			str += "是否勾选\"不再询问\"按钮: " + (ret.never ? '是' : '否') + '\n';
			str += '请求结果: \n';
			var list = ret.list;
			for (var i in list) {
				str += list[i].name + '=' + list[i].granted + '\n';
			}
			u.apialert(str);
			console.log(JSON.stringify(ret));
		});
	}

	u.hasPermission = function(one_per) {
		var perms = new Array();
		perms.push(one_per);
		var rets = api.hasPermission({
			list : perms
		});
		if (!one_per) {
			u.apialert('判断结果：' + JSON.stringify(rets));
			return;
		}
		return rets;
	}

	u.apialert = function(_msg, callback) {
		api.alert({
			title : '提示',
			msg : _msg,
		}, function(ret, err) {
			if (callback) {
				callback();
			}
		});
	}
	/*end*/

	/**
	 * 接下来开始制作日志
	 */
	u.initlogc = function(){
		/**var demo = api.require('LologC');
		var key = '0123456789012345';
		var iv = '0123456789012345';
		demo.initLolog({
			key: key,
			iv: iv
		},function(ret) {
			console.log("LologC:" + JSON.stringify(ret));
		});**/

		var createdbsql = 'CREATE TABLE "kunchibalog" ("date"	TEXT,"log"	TEXT,"phone" TEXT,"jiekou"	TEXT,"postvalue" TEXT,"pagename" TEXT,"step" TEXT)'
		var now = new Date();
		var year = now.getFullYear();
		var month = now.getMonth() + 1;
		var day = now.getDate();
		var clock = year + "";
		if (month < 10)
			clock += "0";
		clock += month + "";
		if (day < 10)
			clock += "0";
		clock += day;

		///////////////////////////////////////////////////
		var fslog = api.require('fs');
		var dblog = api.require('db');
		var retlog = fslog.createDirSync({
		    path: 'fs://.kunchilog'
		});
		if ((retlog.status)||(retlog.code == 7)) {
		    var retfirlist = fslog.readDirSync({
			    path: 'fs://.kunchilog'
			});
			//{"code":0,"status":true,"data":[]} {"code":0,"status":true,"data":["20191209.db"]}
			if (retfirlist.status) {
				if(retfirlist.data.length == 0){
					var retcreatefilepath = 'fs://.kunchilog/'+clock+'.db';
					var retcreatefile = fslog.createFileSync({
					    path: retcreatefilepath
					});
					var retopendb = dblog.openDatabaseSync({
						name : "kunchibalog",
						path : retcreatefilepath
					});
					if(retopendb.status){
						var retsqllog = dblog.selectSqlSync({
						    name: "kunchibalog",
						    sql: "SELECT * FROM kunchibalog limit 1;"
						});
						if(retsqllog.status){
							//已经有了数据库了
							console.log('初始化新日志完成');
						}else{
							//没有数据库 需要创建一下
							var eventBindPic = dblog.executeSqlSync({
							    name: "kunchibalog",
							    sql: createdbsql
							});
							//console.log(JSON.stringify(eventBindPic));
							if(eventBindPic.status){
								//完成了
								console.log('初始化新日志完成');
							}
						}
					}
				}else{
					var ishaslocaldb = 0;
					for(var a = 0; a < retfirlist.data.length; a++){
						var retfirlistitem = retfirlist.data[a].split(".")[0];
						if(retfirlistitem == clock){
							ishaslocaldb = 1;
						}
					}
					//没有
					if(ishaslocaldb == 0){
						var retcreatefilepath = 'fs://.kunchilog/'+clock+'.db';
						console.log(retcreatefilepath);
						var retcreatefile = fslog.createFileSync({
						    path: retcreatefilepath
						});
						console.log(JSON.stringify(retcreatefile));
						var retopendb = dblog.openDatabaseSync({
							name : "kunchibalog",
							path : retcreatefilepath
						});
						if(retopendb.status){

							var retsqllog = dblog.selectSqlSync({
							    name: "kunchibalog",
							    sql: "SELECT * FROM kunchibalog limit 1;"
							});
							if(retsqllog.status){
								//已经有了数据库了
								console.log('初始化新日志完成');
							}else{
								//没有数据库 需要创建一下

								var eventBindPic = dblog.executeSqlSync({
								    name: "kunchibalog",
								    sql: createdbsql
								});
								//console.log(JSON.stringify(eventBindPic));
								if(eventBindPic.status){
									//完成了
									console.log('初始化新日志完成');
								}
							}
						}
					}else{
						var retcreatefilepath = 'fs://.kunchilog/'+clock+'.db';
						var retopendb = dblog.openDatabaseSync({
							name : "kunchibalog",
							path : retcreatefilepath
						});
						if(retopendb.status){
							var retsqllog = dblog.selectSqlSync({
							    name: "kunchibalog",
							    sql: "SELECT * FROM kunchibalog limit 1;"
							});
							if(retsqllog.status){
								//已经有了数据库了
								console.log('初始化新日志完成');
							}else{
								//没有数据库 需要创建一下
								var eventBindPic = dblog.executeSqlSync({
								    name: "kunchibalog",
								    sql: createdbsql
								});
								console.log(JSON.stringify(eventBindPic));
								if(eventBindPic.status){
									//完成了
									console.log('初始化新日志完成');
								}
							}
						}
					}
				}
			}
		} else {
		    console.log('初始化新日志失败');
		}
	}

	u.Losteplog = function(pagename, step){
		/**var demo = api.require('LologC');
		demo.Losteplog({
			logtitle : logtitle,
			logmsg : (logmsg + "--TIME:" + new Date().getTime())
		}, function(ret) {
			console.log("caozuo"+JSON.stringify(ret));
		});**/
		var now = new Date();
		var year = now.getFullYear();
		var month = now.getMonth() + 1;
		var day = now.getDate();
		var hh = now.getHours();
		var mm = now.getMinutes();
		var ss = now.getSeconds();
		var clock = year + "-";
		if (month < 10)
			clock += "0";
		clock += month + "-";
		if (day < 10)
			clock += "0";
		clock += day + " ";
		if (hh < 10)
			clock += "0";
		clock += hh + ":";
		if (mm < 10)
			clock += '0';
		clock += mm + ":";
		if (ss < 10)
			clock += '0';
		clock += ss;

		var sqlpicin = 'INSERT INTO kunchibalog VALUES ("'+clock+'","","","","","'+pagename+'","'+step+'");';
		var db = api.require('db');
		//console.log("sqlpicin:"+sqlpicin);
		var ret = db.executeSqlSync({
		    name: "kunchibalog",
		    sql: sqlpicin
		});
		//{"status":false,"msg":"no such table: kunchibalog (code 1): , while compiling: INSERT INTO kunchibalog VALUES (\"2019-12-11 10:15:34\",\"\",\"\",\"\",\"\",\"1\",\"2\");"}
		console.log(JSON.stringify(ret));
	}

	u.Loonlinelog = function(log, phone, jiekou, postvalue){
		/**var demo = api.require('LologC');
		demo.Loonlinelog({
			logtitle : logtitle,
			logmsg : (logmsg + "--TIME:" + new Date().getTime())
		}, function(ret) {
			console.log("wangluo"+JSON.stringify(ret));
		});**/

		var now = new Date();
		var year = now.getFullYear();
		var month = now.getMonth() + 1;
		var day = now.getDate();
		var hh = now.getHours();
		var mm = now.getMinutes();
		var ss = now.getSeconds();
		var clock = year + "-";
		if (month < 10)
			clock += "0";
		clock += month + "-";
		if (day < 10)
			clock += "0";
		clock += day + " ";
		if (hh < 10)
			clock += "0";
		clock += hh + ":";
		if (mm < 10)
			clock += '0';
		clock += mm + ":";
		if (ss < 10)
			clock += '0';
		clock += ss;

		log = log.replace(/"([^"]*)"/g, "“$1”");
		log = log.replace(/'([^']*)'/g, "‘$1’");
		postvalue = JSON.stringify(postvalue);
		postvalue = postvalue.replace(/"([^"]*)"/g, "“$1”");
		postvalue = postvalue.replace(/'([^']*)'/g, "‘$1’");
		var sqlpicin = 'INSERT INTO kunchibalog VALUES ("'+clock+'","'+log+'","'+phone+'","'+jiekou+'","'+postvalue+'","","");';
		var db = api.require('db');
		//console.log("sqlpicin:"+sqlpicin);
		var ret = db.executeSqlSync({
		    name: "kunchibalog",
		    sql: sqlpicin
		});
		console.log(JSON.stringify(ret));
	}

	u.Lologpathlist = function(callBack){
		/**var demo = api.require('LologC');
		demo.Lologpathlist(function(ret) {
			callBack(ret);
		});**/
		var fslog = api.require('fs');
		var retfirlist = fslog.readDirSync({
		    path: 'fs://.kunchilog'
		});
		//{"code":0,"status":true,"data":[]} {"code":0,"status":true,"data":["20191209.db"]}
		//console.log(JSON.stringify(retfirlist));
		if (retfirlist.status) {
			if(retfirlist.data.length == 0){
				callBack([]);
			}else{
				callBack(retfirlist.data);
			}
		}else{
			callBack([]);
		}
	}

	u.Lofilepath = function(data, callBack){
		/**var demo = api.require('LologC');
		demo.Lofilepath({
			logdate : datetime
		}, function(ret) {
			callBack(ret);
		});**/
		var fs = api.require('fs');
		var retcreatefilepath = 'fs://.kunchilog/'+data+'.db';
		var ret = fs.existSync({
		    path: retcreatefilepath
		});
		if (ret.exist) {
		    callBack(retcreatefilepath);
		} else {
		    callBack("");
		}
	}

	u.Lodate = function(){
		var now = new Date();
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

	u.clearlogfile = function(){

		var now = new Date();
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

		var noclock = clock.replace(/\-/g, '/');
	    noclock = new Date(noclock).getTime();
	    noclock = noclock / 1000;

		//循环计算日志时间 超过一周就删除
		var fslog = api.require('fs');
	    var retfirlist = fslog.readDirSync({
		    path: 'fs://.kunchilog'
		});
		//{"code":0,"status":true,"data":[]} {"code":0,"status":true,"data":["20191209.db"]}
		if (retfirlist.status) {
			if(retfirlist.data.length > 0){
				for(var a = 0; a < retfirlist.data.length; a++){
					var retfirlistitem = retfirlist.data[a].split(".")[0];
					var logtimedate = '';
					for(var b = 0; b < retfirlistitem.length; b++){
						logtimedate = logtimedate + retfirlistitem[b];
						if((b == 3)||(b == 5)){
							logtimedate = logtimedate + "-";
						}
					}

					logtimedate = logtimedate.replace(/\-/g, '/');
				    logtimedate = new Date(logtimedate).getTime();
				    logtimedate = logtimedate / 1000;
				    //604800
				    if((noclock - logtimedate) >= 604800){
				    	var delfilepath = 'fs://.kunchilog/'+retfirlist.data[a];
				    	var retdelfile = fslog.removeSync({
						    path: delfilepath
						});
						console.log('已清理');
				    }
				}
			}
		}
	}

	u.initlogdbtime = function(){
		var now = new Date();
		var year = now.getFullYear();
		var month = now.getMonth() + 1;
		var day = now.getDate();
		var clock = year + "";
		if (month < 10)
			clock += "0";
		clock += month + "";
		if (day < 10)
			clock += "0";
		clock += day;
		$api.setStorage("logdbtime",clock);
	}

	u.showalertmsg = function(name, msg){
		var framename = name;
		api.openFrame({
				name: name,
				url: 'widget://html/newSign/dialog/AlertMsg.html',
				rect: {
						x: 0,
						y: 0,
						w: 'auto',
						h: 'auto'
				},
			    pageParam: {
			        msg: msg
			    },
				bounces: false,
				bgColor: 'rgba(0,0,0,0.3)'
		});
		setTimeout(function(){
			api.closeFrame({
				name: framename
            });
		}, 1500);
	}

	u.showguize = function(){
		api.openWin({
		    name: 'roulurl_win',
		    url: "widget://html/newSign/roul/newplan_roul_win.html"
		});
	}
	u.showguizename = function(brandname){
		var gaosi = 'widget://html/guize/gaosi.html';
		var hangao = 'widget://html/guize/hangao.html';
		var huchida = 'widget://html/guize/huchida.html';
		var huolike = 'widget://html/guize/huolike.html';
		var kaiyixiu = 'widget://html/guize/kaiyixiu.html';
		var kissme = 'widget://html/guize/kissme.html';
		var kissyou = 'widget://html/guize/kissyou.html';
		var meiyuan = 'widget://html/guize/meiyuan.html';
		var niweiya = 'widget://html/guize/niweiya.html';
		var sentian = 'widget://html/guize/sentian.html';
		var shiwang = 'widget://html/guize/shiwang.html';
		var sipuleite = 'widget://html/guize/sipuleite.html';
		var sitafu = 'widget://html/guize/sitafu.html';
		var xiangpuli = 'widget://html/guize/xiangpuli.html';
		var zishengtang = 'widget://html/guize/zishengtang.html';
		var other = 'widget://html/guize/other.html';

		var urlname = '';
		switch(brandname){
			case '汉高':
				urlname = hangao;
				break;
			case '凯伊秀':
				urlname = kaiyixiu;
				break;
			case '资生堂':
				urlname = zishengtang;
				break;
			case '高丝':
				urlname = gaosi;
				break;
			case '妮维雅':
				urlname = niweiya;
				break;
			case '森田':
				urlname = sentian;
				break;
			case '狮王':
				urlname = shiwang;
				break;
			case '惑丽客':
				urlname = huolike;
				break;
			case '香蒲丽':
				urlname = xiangpuli;
				break;
			case '丝塔芙':
				urlname = sitafu;
				break;
			case 'KISS ME':
				urlname = kissme;
				break;
			case '护齿达':
				urlname = huchida;
				break;
			case 'KISS YOU':
				urlname = kissyou;
				break;
			case '斯普雷特':
				urlname = sipuleite;
				break;
			case '美源':
				urlname = meiyuan;
				break;
			default:
				urlname = other;
		}
		api.openWin({
	        name: 'newplan_roulname_win',
	        url: 'widget://html/newSign/roul/newplan_roulname_win.html',
	        pageParam: {
		        url: urlname
		    }
        });
	}

	window.$api = u;

})(window);
