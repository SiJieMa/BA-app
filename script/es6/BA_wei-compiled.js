"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var bawei = function () {
	function bawei(list) {
		_classCallCheck(this, bawei);

		this.list = list;
	}

	_createClass(bawei, [{
		key: "showlist",
		value: function showlist() {
			this.list.map(function (value) {

				var itemobject = new Object();
				itemobject.RealName = value.RealName;
				itemobject.cStoreFullName = value.cStoreFullName;
				itemobject.UserName = value.UserName;
				itemobject.BrandName = value.BrandName;
				appvue.balist.push(itemobject);
			});
		}
	}]);

	return bawei;
}();

function initlist(ret) {
	var bawei_var = new bawei(ret);
	bawei_var.showlist();
}
