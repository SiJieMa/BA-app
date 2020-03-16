/**
 *是否创建了SKU的保存数据库
 */
function is_creatbawork_db() {
	var db = api.require('db');
	var ret = db.selectSqlSync({
		name : 'kunchidb',
		sql : 'SELECT * FROM baworklist where baid = "已有";'
	});
	if (ret.status) {
	} else {
		createbaworkdb();
	}
}

function createbaworkdb() {
	var db = api.require('db');
	var baworklist = db.executeSqlSync({
		name : 'kunchidb',
		sql : 'CREATE TABLE baworklist(baid varchar(255), saleid varchar(255), uptime varchar(255), dowmtime varchar(255), ' 
		+ 'oneitem varchar(255), twoitem varchar(255), threeitem varchar(255), fouritem varchar(255))'
	});
	if (baworklist.status) {
	}
}

function getbatime(baid, saleid, callBack) {
	var db = api.require('db');
	db.selectSql({
		name : 'kunchidb',
		sql : 'SELECT * FROM baworklist WHERE baid="' + baid + '" AND saleid="' + saleid + '"'
	}, function(ret, err) {
		if (ret.status) {
			if (ret.data.length != 0) {
				callBack(ret.data[0].uptime, ret.data[0].dowmtime);
			} else {
				callBack('09:00', '18:00');
			}
		}else{
			callBack('09:00', '18:00');
		}
	});
}

function newchenlie_list(baid, saleid) {

	var db = api.require('db');
	db.selectSql({
		name : 'kunchidb',
		sql : 'SELECT * FROM baworklist WHERE baid="' + baid + '" AND saleid="' + saleid + '"'
	}, function(ret, err) {
		if (ret.status) {
			if (ret.data.length == 0) {
				var sql = 'INSERT INTO baworklist (baid, saleid, uptime, dowmtime, oneitem, twoitem, threeitem, fouritem ) VALUES ("' 
				+ object_bawork.baid + '", "' + object_bawork.saleid + '", "' + object_bawork.uptime + '", "' + object_bawork.dowmtime + '", "' 
				+ object_bawork.oneitem + '", "' + object_bawork.twoitem + '", "' + object_bawork.threeitem + '", "' + object_bawork.fouritem + '")';
				executeSql(sql, function(numone) {
					if (numone == 1) {
					}
				});
			} else {
				var sql = 'DELETE FROM baworklist WHERE baid="' + baid + '" AND saleid="' + saleid + '"';
				executeSql(sql, function(numone) {
					if (numone == 1) {
						var sql = 'INSERT INTO baworklist (baid, saleid, uptime, dowmtime, oneitem, twoitem, threeitem, fouritem ) VALUES ("' 
						+ object_bawork.baid + '", "' + object_bawork.saleid + '", "' + object_bawork.uptime + '", "' + object_bawork.dowmtime + '", "' 
						+ object_bawork.oneitem + '", "' + object_bawork.twoitem + '", "' + object_bawork.threeitem + '", "' + object_bawork.fouritem + '")';
						executeSql(sql, function(numone) {
							if (numone == 1) {
							}
						});
					}
				});
			}
		}
	});
}

