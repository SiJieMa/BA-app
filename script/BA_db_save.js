/**
 *
 * @param {日报时间} time
 * @param {店铺名称} shopname
 * @param {用户id} userid
 * @param {品牌id} brandid
 * @param {保存数量} num
 */
function save_ba_num(taskid, brandid, num){
	var db = api.require('db');
	db.selectSql({
	    name: 'kunchidb',
	    sql: 'SELECT * FROM ribaonum WHERE taskid="'+taskid+'" AND pinpaiid="'+brandid+'"'
	}, function(ret, err) {
		var myDate = new Date();
		var updatetime = myDate.getTime();
	    if (ret.status) {
	        if(ret.data.length == 0){
	        	var sql = 'INSERT INTO ribaonum (sumbittime, taskid, pinpaiid, onedaysale) VALUES ("' + updatetime + '", "' + taskid + '", "'+brandid+'", "'+num+'")';
				executeSql(sql, function(numone) {
					if (numone == 1) {

					}
				});
	        }else{
	        	//如果没有数或者数字为0的话则删除此条记录
	        	if((num==0)||(num=="")){
	        		var sql = 'DELETE FROM ribaonum WHERE taskid="'+taskid+'" AND pinpaiid="'+brandid+'"';
					executeSql(sql, function(numone) {
						if (numone == 1) {

						}
					});
	        	}else{
		        	var sql = 'UPDATE ribaonum SET onedaysale="'+num+'",sumbittime="'+updatetime+'" WHERE taskid="'+taskid+'" AND pinpaiid="'+brandid+'"';
					executeSql(sql, function(numone) {
						if (numone == 1) {

						}
					});
	        	}
	        }
	    }
	});
}
/**
 *查询对应条件下所有的数据
 */
function select_salegoodnum(taskid, callBack){
	var db = api.require('db');
	db.selectSql({
	    name: 'kunchidb',
	    sql: 'SELECT * FROM ribaonum WHERE taskid="'+taskid+'"'
	}, function(ret, err) {
	    if (ret.status) {
	        if(ret.data.length != 0){
	        	callBack(ret.data);
	        }else{
	        	callBack("no");
	        }
	    }
	});
}

/**
 *将每次的提交时间保存到数据库
 */
function baocun_updatetime(taskid, timedate){

	select_baocuntime(taskid, function(ret){
		if(ret != "no"){
			var sql = 'UPDATE ribaonumupdate SET sumbittime="'+timedate+'" WHERE taskid="'+taskid+'"';
			executeSql(sql, function(numone) {
				if (numone == 1) {

				}
			});
		}else{
			var sql = 'INSERT INTO ribaonumupdate (sumbittime, taskid) VALUES ("' + timedate + '", "' + taskid + '")';
			executeSql(sql, function(numone) {
				if (numone == 1) {

				}
			});
		}
	});


}
/**
 *拿出最后保存的时间的数据
 */
function select_baocuntime(taskid, callBack){
	var db = api.require('db');
	db.selectSql({
	    name: 'kunchidb',
	    sql: 'SELECT * FROM ribaonumupdate WHERE taskid="'+taskid+'"'
	}, function(ret, err) {
	    if (ret.status) {
	        if(ret.data.length != 0){
	        	callBack(ret.data);
	        }else{
	        	callBack("no");
	        }
	    }
	});
}


/**
 *提交的时候将所有的提交时间都设置为提交成功的时间
 */
function update_tijiao_time(taskid, updatetime){
	var sql = 'UPDATE ribaonumupdate SET sumbittime="'+updatetime+'" WHERE taskid="'+taskid+'"';
	executeSql(sql, function(numone) {
		if (numone == 1) {

		}
	});
}

/**
 *将获取到的数据更新到数据库当中去
 * onlineribaonum 将从后台获取的排班计划做进去 需要一条一条插入 待完成
 */

function update_onlinedatebase(taskid, onlineribaonum){
	//首先要删除表中的所有数据 然后重新插入数据
	var db = api.require('db');
	db.selectSql({
	    name: 'kunchidb',
	    sql: 'SELECT * FROM ribaonum WHERE taskid="'+taskid+'"'
	}, function(ret, err) {
	    if (ret.status) {
	        if(ret.data.length != 0){
				var sql = 'DELETE FROM ribaonum WHERE taskid="'+taskid+'"';
				executeSql(sql, function(numone) {
					if (numone == 1) {

					}
				});
	        }
	    }
	});
}



/**
 * 入参 数组 例如[1,2,3]
 * 出参 字符串  "1,2,3"
 */
function changeType(lableupdate) {
	var len = lableupdate.length;
	if (len == 0) {
		return 0;
	} else {
		var len = lableupdate.length;
		var picurl = '';
		for (var a = 0; a < len; a++) {
			if (a == (len - 1)) {
				picurl = picurl + lableupdate[a];
			} else {
				picurl = picurl + lableupdate[a] + ',';
			}
		}
		return picurl;
	}
}

/**
 *
 * 与楼上方法相反
 *
 */
function changeArray(temppic) {
	var tempArr = "";

	if (temppic != null) {
		if (temppic.length > 0) {
			tempArr = temppic.split(",");
		} else {
			tempArr = "";
		}
	}
	return tempArr;
}

/**
 *
 * @param {日报时间} time
 * @param {店铺名称} shopname
 * @param {用户id} userid
 * @param {品牌id} brandid
 * @param {图片类型  陈列照片还是促销照片} pictype
 * @param {图片名称} picname
 */
function save_bareport_piclist(sumbittime, taskid, brandid, pictype, picname){
	var sql = 'INSERT INTO ribaopic (sumbittime, taskid, pinpaiid, pictype, picname) VALUES ("' + sumbittime + '", "' + taskid + '", "'+brandid+'", "'+pictype+'", "'+picname+'")';
	executeSql(sql, function(numone) {
		if (numone == 1) {
		}
	});
}

/**
 *用户删除照片的时候 删除数据库中的信息
 */
function delete_salepic(taskid, brandid, pictype, picname){
	var db = api.require('db');
	db.selectSql({
	    name: 'kunchidb',
	    sql: 'SELECT * FROM ribaopic WHERE taskid="'+taskid+'" AND pinpaiid="'+brandid+'" AND pictype="'+pictype+'" AND picname="'+picname+'"'
	}, function(ret, err) {
	    if (ret.status) {
	        if(ret.data.length != 0){
				var sql = 'DELETE FROM ribaopic WHERE taskid="'+taskid+'" AND pinpaiid="'+brandid+'" AND pictype="'+pictype+'" AND picname="'+picname+'"';
				executeSql(sql, function(numone) {
					if (numone == 1) {

					}
				});
	        }
	    }
	});
}
/**
 *
 * @param {Object} time
 * @param {Object} shopname
 * @param {Object} userid
 * @param {Object} brandid
 * @param {返回的参数为用户保存的当天的所有的数据} callBack
 */
function selectAll_salepiclist(taskid, callBack){
	var db = api.require('db');
	db.selectSql({
	    name: 'kunchidb',
	    sql: 'SELECT * FROM ribaopic WHERE taskid="'+taskid+'"'
	}, function(ret, err) {
	    if (ret.status) {
	        if(ret.data.length != 0){
		    	callBack(ret.data);
	        }else{
	        	callBack("no");
	        }
	    }
	});
}

/**
 *将报告提交时间保存到本地服务器
 */
function save_sublimeTime_picList(taskid, timedate){
	select_baocuntime_pic(taskid, function(ret){
		if(ret != "no"){
			var sql = 'UPDATE ribaopicupdate SET sumbittime="'+timedate+'" WHERE taskid="'+taskid+'"';
			executeSql(sql, function(numone) {
				if (numone == 1) {

				}
			});
		}else{
			var sql = 'INSERT INTO ribaopicupdate (sumbittime, taskid) VALUES ("' + timedate + '", "' + taskid + '")';
			executeSql(sql, function(numone) {
				if (numone == 1) {

				}
			});
		}
	});
}

/**
 *拿出最后保存的时间的数据
 */
function select_baocuntime_pic(taskid, callBack){
	var db = api.require('db');
	db.selectSql({
	    name: 'kunchidb',
	    sql: 'SELECT * FROM ribaopicupdate WHERE taskid="'+taskid+'"'
	}, function(ret, err) {
	    if (ret.status) {
	        if(ret.data.length != 0){
	        	callBack(ret.data);
	        }else{
	        	callBack("no");
	        }
	    }
	});
}
