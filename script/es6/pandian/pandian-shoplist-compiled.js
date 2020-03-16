'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function initvueshop(ret, tag) {
	if (ret.length == 0) {
		vant.Dialog.alert({
			title: '提示',
			message: '您暂无负责门店，请联系上级或管理员分配门店之后再试。'
		}).then(function () {
			api.closeWin();
		});
	} else {
		var newlist = ret.map(function (value, index) {
			var itemobject = {
				id: value.id,
				name: value.cStoreFullName,
				code: value.cStoreCode,
				city: value.cProvinceName,
				hasselect: false,
				isshow: true,
				cLon: value.cLon,
				cLat: value.cLat,
				brandid: value.iCustomerId
			};
			return itemobject;
		});
		var listdatavalue = [];
		newlist.forEach(function (value) {
			var ishas = false;
			listdatavalue.forEach(function (value1) {
				if (value.code == value1.code) {
					ishas = true;
				}
			});
			if (!ishas) {
				listdatavalue.push(value);
			}
		});
		tag.listdatavue = listdatavalue;
	}
}

function showbrandlist(tag, ret) {
	tag.oldbrandlist = ret;
	var newbrandlist = ret.map(function (value) {
		return value.cCustomerFullName;
	});
	tag.brandlist = ['渠道'].concat(_toConsumableArray(newbrandlist));
}

function shaixuancity(name, num, tag) {
	//1 通过品牌筛选  2 通过门店名称或者code筛选
	if (num == 1) {
		var brandid = "-1";
		tag.qudaoname = name;
		if (name == "渠道") {
			tag.listdatavue.map(function (value) {
				value.isshow = true;
			});
		} else {
			tag.oldbrandlist.forEach(function (value) {
				if (name == value.cCustomerFullName) {
					brandid = value.id;
					tag.qudaoid = brandid;
				}
			});
			tag.listdatavue.map(function (value) {
				if (value.brandid == brandid) {
					value.isshow = true;
				} else {
					value.isshow = false;
				}
			});
		}
	} else if (num == 2) {
		tag.listdatavue.map(function (value) {
			if (value.name.includes(name) || value.code.includes(name)) {
				value.isshow = true;
			} else {
				value.isshow = false;
			}
		});
	}
}

function reloadshoplist(tag) {
	tag.listdatavue.map(function (value) {
		value.isshow = true;
	});
}

function selectcity(tag, indexnum) {
	tag.hasselectindex = indexnum;
	tag.hasselectid = tag.listdatavue[indexnum].id;
	tag.disabled = true;
}

function initbrandlocal(tag) {
	var zidian = $api.getStorage("CangKuList");
	var newzidian = zidian.map(function (value, index) {
		var item = {
			name: value.cDictName,
			id: value.cDictValue,
			classname: 'item' + index
		};
		return item;
	});
	tag.cangkulist = newzidian;
}
