/**
 * Created by 我那颗冰冷的新 on 2016/2/25.
 */
/**
 *
 *  apiclear技术文档主页
 *  http://www.apiclear.com
 *
 **/

function SHA1(msg) {

	function rotate_left(n, s) {
		var t4 = (n << s ) | (n >>> (32 - s));
		return t4;
	};

	function lsb_hex(val) {
		var str = "";
		var i;
		var vh;
		var vl;

		for ( i = 0; i <= 6; i += 2) {
			vh = (val >>> (i * 4 + 4)) & 0x0f;
			vl = (val >>> (i * 4)) & 0x0f;
			str += vh.toString(16) + vl.toString(16);
		}
		return str;
	};

	function cvt_hex(val) {
		var str = "";
		var i;
		var v;

		for ( i = 7; i >= 0; i--) {
			v = (val >>> (i * 4)) & 0x0f;
			str += v.toString(16);
		}
		return str;
	};

	function Utf8Encode(string) {
		string = string.replace(/\r\n/g, "\n");
		var utftext = "";

		for (var n = 0; n < string.length; n++) {

			var c = string.charCodeAt(n);

			if (c < 128) {
				utftext += String.fromCharCode(c);
			} else if ((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			} else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}

		}

		return utftext;
	};

	var blockstart;
	var i, j;
	var W = new Array(80);
	var H0 = 0x67452301;
	var H1 = 0xEFCDAB89;
	var H2 = 0x98BADCFE;
	var H3 = 0x10325476;
	var H4 = 0xC3D2E1F0;
	var A, B, C, D, E;
	var temp;

	msg = Utf8Encode(msg);

	var msg_len = msg.length;

	var word_array = new Array();
	for ( i = 0; i < msg_len - 3; i += 4) {
		j = msg.charCodeAt(i) << 24 | msg.charCodeAt(i + 1) << 16 | msg.charCodeAt(i + 2) << 8 | msg.charCodeAt(i + 3);
		word_array.push(j);
	}

	switch (msg_len % 4) {
		case 0:
			i = 0x080000000;
			break;
		case 1:
			i = msg.charCodeAt(msg_len - 1) << 24 | 0x0800000;
			break;

		case 2:
			i = msg.charCodeAt(msg_len - 2) << 24 | msg.charCodeAt(msg_len - 1) << 16 | 0x08000;
			break;

		case 3:
			i = msg.charCodeAt(msg_len - 3) << 24 | msg.charCodeAt(msg_len - 2) << 16 | msg.charCodeAt(msg_len - 1) << 8 | 0x80;
			break;
	}

	word_array.push(i);

	while ((word_array.length % 16) != 14)
	word_array.push(0);

	word_array.push(msg_len >>> 29);
	word_array.push((msg_len << 3) & 0x0ffffffff);

	for ( blockstart = 0; blockstart < word_array.length; blockstart += 16) {

		for ( i = 0; i < 16; i++)
			W[i] = word_array[blockstart + i];
		for ( i = 16; i <= 79; i++)
			W[i] = rotate_left(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1);

		A = H0;
		B = H1;
		C = H2;
		D = H3;
		E = H4;

		for ( i = 0; i <= 19; i++) {
			temp = (rotate_left(A, 5) + ((B & C) | (~B & D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
			E = D;
			D = C;
			C = rotate_left(B, 30);
			B = A;
			A = temp;
		}

		for ( i = 20; i <= 39; i++) {
			temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
			E = D;
			D = C;
			C = rotate_left(B, 30);
			B = A;
			A = temp;
		}

		for ( i = 40; i <= 59; i++) {
			temp = (rotate_left(A, 5) + ((B & C) | (B & D) | (C & D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
			E = D;
			D = C;
			C = rotate_left(B, 30);
			B = A;
			A = temp;
		}

		for ( i = 60; i <= 79; i++) {
			temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
			E = D;
			D = C;
			C = rotate_left(B, 30);
			B = A;
			A = temp;
		}

		H0 = (H0 + A) & 0x0ffffffff;
		H1 = (H1 + B) & 0x0ffffffff;
		H2 = (H2 + C) & 0x0ffffffff;
		H3 = (H3 + D) & 0x0ffffffff;
		H4 = (H4 + E) & 0x0ffffffff;

	}

	var temp = cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4);

	return temp.toLowerCase();

}

/*
 rest.js
 */'use strict';
function copy(obj) {
	if (obj == null || typeof (obj) != 'object')
		return obj;

	var temp = obj.constructor();
	// changed

	for (var key in obj) {
		if (obj.hasOwnProperty(key)) {
			temp[key] = copy(obj[key]);
		}
	}
	return temp;
}

function isType(type) {
	return function(obj) {
		return {}.toString.call(obj) == "[object " + type + "]";
	}
}

var isFunction = isType("Function");

function Resource(appId, appKey, baseurl) {
	var now = Date.now();
	this.appId = appId;
	this.baseurl = baseurl || "https://d.apicloud.com/mcm/api";
	this.appCode = SHA1(appId + "UZ" + appKey + "UZ" + now) + "." + now;
	this.defaultactions = {
		'get' : {
			method : 'GET',
			params : ["_id", "_relation"]
		}, //_relationid 后续支持
		'save' : {
			method : 'POST',
			params : ["_id", "_relation"]
		}, //_relationid 后续支持
		'query' : {
			method : 'GET',
			params : ["filter"]
		},
		'delete' : {
			method : 'DELETE',
			params : ["_id", "_relation"]
		}, //_relationid 后续支持
		'login' : {
			method : "POST",
			params : ["username", "passwordd"]
		},
		'logout' : {
			method : "POST",
			params : ["token"]
		},
		'count' : {
			method : "GET",
			params : ["_id", "_relation", "filter"]
		},
		'exists' : {
			method : "GET",
			params : ["_id"]
		},
		'findOne' : {
			method : 'GET',
			params : ["filter"]
		},
		'verify' : {
			method : "POST",
			params : ["email", "language", "username"],
			alias : "verifyEmail"
		},
		'reset' : {
			method : "POST",
			params : ["id", "email", "language", "username"],
			alias : "resetRequest"
		}
	};
	this.headers = {};
	this.setHeaders("X-APICloud-AppId", this.appId);
	this.setHeaders("X-APICloud-AppKey", this.appCode);
	this.setHeaders("Content-Type", "application/json;");
}

Resource.prototype.setHeaders = function(key, value) {
	this.headers[key] = value;
}
Resource.prototype.upload = function(modelName, isFilter, filepath, params, callback) {
	if ( typeof params == "function") {
		callback = params;
		params = {};
	}
	var url = params["_id"] && params["_relation"] ? ("/" + modelName + "/" + params["_id"] + "/" + params["_relation"]) : "/file";
	var isPut = (!params["_relation"]) && params["_id"];
	var fileUrl = this.baseurl + url + ( isPut ? ("/" + params["_id"]) : "");
	var filename = filepath.substr(filepath.lastIndexOf("/") + 1, filepath.length);
	var ajaxConfig = {
		url : fileUrl,
		method : isPut ? "PUT" : "POST",
		data : {
			values : {
				filename : filename
			},
			files : {
				file : filepath
			}
		}
	}
	ajaxConfig["headers"] = {};
	for (var header in this.headers) {
		ajaxConfig["headers"][header] = this.headers[header];
	}
	api.ajax(ajaxConfig, function(ret, err) {
		if (ret && ret.id && !err) {
			var newobj = {};
			if (isFilter) {
				newobj["id"] = ret["id"];
				newobj["name"] = ret["name"];
				newobj["url"] = ret["url"];
				callback(null, newobj)
			} else {
				callback(null, ret);
			}
		} else {
			callback(ret || err, null)
		}
	});
}

Resource.prototype.Factory = function(modelName) {
	var self = this;
	var route = new Route(modelName, self.baseurl);
	var actions = copy(this.defaultactions);
	var resourceFactory = new Object();
	Object.keys(actions).forEach(function(name) {
		if (modelName != "user" && ["login", "logout", "verify", "reset"].indexOf(name) != -1) {
			return;
		}
		resourceFactory[name] = function(a1, a2, a3) {
			var action = copy(actions[name]);
			var params = {}, data, callback;
			var hasBody = /^(POST|PUT|PATCH)$/i.test(action.method);
			switch (arguments.length) {
				case 3:
					params = a1;
					data = a2;
					callback = a3;
					break;
				case 2:
					if (hasBody)
						data = a1;
					else
						params = a1;
					callback = a2;
					break;
				case 1:
					if (isFunction(a1))
						callback = a1;
					else if (hasBody)
						data = a1;
					else
						params = a1;
					break;
				case 0:
					break;
				default:
					throw new Error("参数最多为3个");
			}
			if (hasBody) {
				var fileCount = 0;
				Object.keys(data).forEach(function(key) {
					var item = data[key];
					if (item && item.isFile) {
						var isFilter = true;
						if (modelName == "file" || item.isFileClass) {
							isFilter = false;
						}
						fileCount++;
						self.upload(modelName, isFilter, item.path, params, function(err, returnData) {
							if (err) {
								return callback(null, err);
							} else {
								if (!isFilter)
									return callback(returnData, null);
								data[key] = returnData;
								fileCount--;
								if (fileCount == 0) {
									next();
								}
							}
						})
					}
				});
				if (fileCount == 0) {
					next();
				}
			} else {
				next();
			}
			function next() {
				var httpConfig = {};
				httpConfig["headers"] = {};
				for (var header in self.headers) {
					httpConfig["headers"][header] = self.headers[header];
				}
				if (name === "logout" && !httpConfig["headers"]["authorization"]) {
					return callback({
						status : 0,
						msg : "未设置authorization参数,无法注销!"
					}, null);
				}
				if (hasBody) {
					httpConfig.data = {
						body : JSON.stringify(data)
					};
				}

				if (params && (name == "save") && params["_id"] && (!params["_relation"]) && (!params["_relationid"])) {
					action.method = "PUT";
				}
				if (params && (name == "save") && params["_id"] && params["_relation"] && params["_relationid"]) {
					action.method = "PUT";
				}
				for (var key in action) {
					if (key != 'params' && key != "alias") {
						httpConfig[key] = copy(action[key]);
					}
				}

				var curparams = {};
				action.params = action.params || [];
				for (var k = 0, len = action.params.length; k < len; k++) {
					var tempkey = action.params[k];
					if (params[tempkey]) {
						curparams[tempkey] = copy(params[tempkey]);
					}
				}
				if (["login", "logout", "count", "exists", "verify", "reset", "findOne"].indexOf(name) != -1) {
					curparams["_custom"] = action.alias || name;
				}
				route.setUrlParams(httpConfig, curparams);
//				console.log(httpConfig.method + "\t" + httpConfig.url);
				api.ajax(httpConfig, function(ret, err) {
					return callback(ret, err);
				})
			}

		};
	});
	return resourceFactory;
};

function Route(template, baseurl) {
	this.template = template;
	this.baseurl = baseurl;
}

Route.prototype = {
	setUrlParams : function(config, params) {
		var url = "/:_class/:_id/:_relation/:_custom/:_relationid";
		url = url.replace(":_class", this.template);
		var parArr = [];
		Object.keys(params).forEach(function(ckey) {
			if (ckey.charAt(0) == '_') {
				url = url.replace(":" + ckey, params[ckey]);
				delete params[ckey];
			} else {
				if (ckey == "filter") {
					parArr.push(ckey + "=" + JSON.stringify(params[ckey]));
				}
			}
		});
		url = url.replace(/:[^/]+/ig, '/');
		if (parArr.length > 0) {
			url += ("?" + parArr.join("&"));
		}
		url = url.replace(/\/+/g, '/');
		config.url = this.baseurl + url;
	}
};


function t(msg, posttion) {

	if (posttion == '上') {
		posttion = 'top';
	} else if (posttion == '中') {
		posttion = 'middle';
	} else if (posttion == '下') {
		posttion = 'bottom';
	} else {
		posttion = 'middle';
	}

	api.toast({
		msg : msg,
		duration : 3000,
		location : posttion
	});
}

/**
 * 将从数据库上面获取到的时间转换为正常时间
 * 传入参数objDate "2015-12-02T08:23:10.572Z"
 * 传入参数objFormat "yyyy-MM-dd HH:mm:ss"
 * 传出参数 2015--12-.......
 */
function getTime(objDate, objFormat) {

	var b = new Date(objDate);
	Date.prototype.format = function(format)//author: meizz
	{
		var o = {
			"M+" : this.getMonth() + 1, //month
			"d+" : this.getDate(), //day
			"h+" : this.getHours(), //hour
			"m+" : this.getMinutes(), //minute
			"s+" : this.getSeconds(), //second
			"q+" : Math.floor((this.getMonth() + 3) / 3), //quarter
			"S" : this.getMilliseconds() //millisecond
		}
		if (/(y+)/.test(format))
			format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		for (var k in o)
		if (new RegExp("(" + k + ")").test(format))
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
		return format;
	}
	return b.format(objFormat);
}

/**********************************************
 *异步请求参数使用
 * 使用的时候需要把项目对应的appid和appkey换成自己项目对应的参数
 * @param {Object} method 需要用GET方法还是POST方法
 * @param {Object} posturl 所需要请求的网址
 * @param {Object} jsontext 请求网址的时候需要传入的参数数据
 * @param {Object} callBack 回调参数
 */
function post(method, posturl, jsontext, callBack) {
	var appid = "A6930959562177";
	var appk = "79F9E9BD-D9E0-7A59-B5FD-6E5F4A212840";
	var bodyt = "";
	if (jsontext != "") {
		bodyt = $api.strToJson(jsontext);
	}
	var now = Date.now();
	var appKey = SHA1(appid + "UZ" + appk + "UZ" + now) + "." + now;
	api.ajax({
		"url" : posturl,
		"method" : method,
		"datatype" : "json",
		"timeout" : 20,
		"cache" : false,
		"returnAll" : false,
		"headers" : {
			"ContentType" : "application/json",
			"Access-Control-Allow-Origin" : "https://d.apicloud.com",
			"X-APICloud-AppId" : appid,
			"X-APICloud-AppKey" : appKey
		},
		"data" : bodyt
	}, function(ret, err) {
		callBack(ret, err);
	});
}


function make_sign(word_arr, timestamp) {//word_arr是所有传递值组成的数组
	var nonceSTR = "JYZ2017BYTRKSA5FDFS4ZWER9";
	var token = nonceSTR + timestamp;
	token = SHA1(token);
	word_arr.sort();
	var x;
	var str = "";
	for (x in word_arr) {
		str = str + word_arr[x] + "&";
	}
	str = str + "token=" + token;
	
	return SHA1(str).toUpperCase();
}

function utf16to8(str) {
	var out, i, len, c;
	out = "";
	len = str.length;
	for ( i = 0; i < len; i++) {
		c = str.charCodeAt(i);
		if ((c >= 0x0001) && (c <= 0x007F)) {
			out += str.charAt(i);
		} else if (c > 0x07FF) {
			out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
			out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
			out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
		} else {
			out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
			out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
		}
	}
	return out;
}

//记录销售报告上传失败问题
function post_other_errorinfo(values, userid, jiekou, errormsg) {
	var client = new Resource("A6067912196305", "4A7848BB-E883-5D9A-60DC-FACE78793515");
	var Logininfo = client.Factory("otherinfo");
	Logininfo.save({
		"values" : values,
		"userid" : userid,
		"jiekou" : jiekou,
		"errormsg" : errormsg,
		"version" : $api.app_usevison
	}, function(ret, err) {
	});
}

//记录销售报告上传失败问题
function post_sign_paibaninfo(phone, userid, value, deviceModel, paiban) {
	var client = new Resource("A6067912196305", "4A7848BB-E883-5D9A-60DC-FACE78793515");
	var Logininfo = client.Factory("signinfo");
	Logininfo.save({
		"phone" : phone,
		"userid" : userid,
		"value" : value,
		"deviceModel" : deviceModel,
		"paiban" : paiban,
		"version" : $api.app_usevison
	}, function(ret, err) {
	});
}
//记录销售删除报告 不能删除的问题 记录两个userid
function post_no_delsuccess(userid, cuserid) {
	var client = new Resource("A6067912196305", "4A7848BB-E883-5D9A-60DC-FACE78793515");
	var Logininfo = client.Factory("PaiBanDel");
	Logininfo.save({
		"cuserid" : cuserid,
		"userid" : userid
	}, function(ret, err) {
	});
}

//记录销售删除报告 不能删除的问题 记录两个userid
function post_no_insertsuccess(sql, error, name) {
	var client = new Resource("A6067912196305", "4A7848BB-E883-5D9A-60DC-FACE78793515");
	var Logininfo = client.Factory("writedberror");
	Logininfo.save({
		"sql" : sql,
		"error" : error,
		"name" : name
	}, function(ret, err) {
	});
}

