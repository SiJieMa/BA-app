'use strict';

function initlist(tag) {
	api.showProgress();
	var postob = {};
	postob.startTime = tag.getfirsttime();
	postob.endTime = tag.getlasttime();
	postob.userid = $api.getStorage('id');
	console.log(JSON.stringify(postob));
	var posturl = 'ActionApi/T_Inventory/GetHistoryInventoryPanDian';
	$kunchi.kunchipost(posturl, postob, function (ret, err) {
		console.log(JSON.stringify(ret) + "----" + JSON.stringify(err));
		api.hideProgress();
		if (ret) {

			if (ret.length > 0) {
				var newlist = [];

				for (var i = ret.length - 1; i >= 0; i--) {
					var newobj = {};
					var value = ret[i];
					newobj.isright = value.statue == "盘点异常" ? false : true;
					newobj.shenpi = value.authPath == "undefined" ? "" : value.authPath;
					newobj.shopname = value.cStoreFullName;
					newobj.code = value.cstorecode;
					newobj.city = '    ' + value.cProvinceName;
					newobj.time = value.dtReportTime.split("T")[0];
					newobj.cReportSkuCode = value.cReportSkuCode;
					newobj.isshow = true;
					newlist.push(newobj);
				}
				tag.list = newlist;
				tag.listshow = true;
			} else {
				vant.Toast.fail('暂无数据');
				tag.listshow = false;
			}
		} else {
			vant.Toast.fail('获取失败');
			tag.listshow = false;
		}
	});
}

function reloaditemlist(tag) {
	api.addEventListener({
		name: 'uploadhistorylist'
	}, function (abc, bcd) {
		if (tag.selectitempd != 0) {
			//如果不为0 则更新列表中的某个数据
			vant.Notify({ type: 'success', message: '正在刷新' });
			var postob = {};
			postob.startTime = tag.getfirsttime();
			postob.endTime = tag.getlasttime();
			postob.userid = $api.getStorage('id');
			var posturl = 'ActionApi/T_Inventory/GetHistoryInventoryPanDian';
			$kunchi.kunchipost(posturl, postob, function (ret, err) {
				if (ret) {
					vant.Notify({ type: 'success', message: '刷新成功' });
					if (ret.length > 0) {
						var selectitempd = tag.selectitempd;
						ret.forEach(function (value) {
							tag.list.forEach(function (valueold) {
								if (value.cReportSkuCode == valueold.cReportSkuCode) {
									valueold.isright = value.statue == "盘点异常" ? false : true;
									valueold.shenpi = value.authPath == "undefined" ? "" : value.authPath;
									valueold.shopname = value.cStoreFullName;
									valueold.code = value.cstorecode;
									valueold.city = value.cProvinceName;
									valueold.time = value.dtReportTime.split("T")[0];
									valueold.cReportSkuCode = value.cReportSkuCode;
								}
							});
						});
					}
				} else {
					Dialog.alert({
						title: '错误',
						message: '刷新失败,即将退出。'
					}).then(function () {
						api.closeWin();
					});
				}
			});
		}
	});
}

function filterReloadList(tag) {
	var pdsucerr = tag.pdstate;
	var pdtimeorder = tag.pdtime;

	var isrightitem = pdsucerr == -1 ? true : false;
	var timeStop = $kunchi.todaydate();
	var othertimeStop = changedatetomillon(timeStop) * 1000;
	if (pdtimeorder == 0) {
		var othertimeStopMiddle = othertimeStop - 86400000 * 7;
		timeStop = $kunchi.getMillonDate(othertimeStopMiddle);
	} else if (pdtimeorder == 1) {
		var _othertimeStopMiddle = othertimeStop - 86400000 * 31;
		timeStop = $kunchi.getMillonDate(_othertimeStopMiddle);
	} else if (pdtimeorder == 2) {
		var _othertimeStopMiddle2 = othertimeStop - 86400000 * 91;
		timeStop = $kunchi.getMillonDate(_othertimeStopMiddle2);
	}
	tag.list.forEach(function (value) {
		if (isrightitem) {
			//没有正常异常得筛选
			if (pdtimeorder == -1) {
				//也不筛选时间
				value.isshow = true;
			} else {
				//筛选时间
				if (bigayTime(timeStop, value.time) == 2) {
					value.isshow = true;
				} else {
					value.isshow = false;
				}
			}
		} else {
			//筛选正常异常
			if (pdtimeorder == -1) {
				//不筛选时间
				if (pdsucerr == 0) {
					//筛选状态
					value.isshow = value.isright == false ? true : false;
				} else if (pdsucerr == 1) {
					value.isshow = value.isright == true ? true : false;
				}
			} else {
				if (bigayTime(timeStop, value.time) == 2) {
					if (pdsucerr == 0) {
						value.isshow = value.isright == false ? true : false;
					} else if (pdsucerr == 1) {
						value.isshow = value.isright == true ? true : false;
					}
				} else {
					value.isshow = false;
				}
			}
		}
	});
	tag.show = false;
}
