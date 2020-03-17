'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }



function initbrandlocal(tag) {
	var zidian = $api.getStorage("FanKuTypeList");
	var newzidian = zidian.map(function (value, index) {
		var item = {
			name: value.cDictName,
			id: value.cDictValue,
			classname: 'item' + index
		};
		return item;
	});
	tag.FanKuTypeList = newzidian;
}
