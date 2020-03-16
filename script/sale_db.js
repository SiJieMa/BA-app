/**
 *插入当前用户的拜访计划
 */
function createvenlist(iStoreId, cStoreFullName, cStoreCode, cLon, cLat, dtPlantTime, iRorptId, iWorkType, iStatue) {
    var sql = 'INSERT INTO eventlist (iStoreId, cStoreFullName, cStoreCode, cLon, cLat, dtPlantTime, iRorptId, iWorkType, iStatue) VALUES ("' +
        iStoreId + '", "' + cStoreFullName + '", "' + cStoreCode + '", "' + cLon + '", "' + cLat + '", "' + dtPlantTime + '", "' + iRorptId + '", "' + iWorkType + '", "' + iStatue + '")';
    executeSql(sql, function(numone) {
        if (numone == 1) {

        }
    });
}

/**
 * 查询当前计划中的各种子计划是否有已经存到本地的资料
 */
function selectDb_ReportList_SHOP(iRorptId, callBack) {
    var one, two, three, four;
    var db = api.require('db');
    var chenlielist = db.selectSqlSync({
        name: 'kunchidb',
        sql: 'SELECT * FROM chenlielist WHERE iRorptId="' + iRorptId + '"'
    });
    if (chenlielist.status) {
        if (chenlielist.data.length == 0) {
            one = 0;
        } else {
            one = 1;
        }
    } else {
        one = 0;
    }
    var quehuolist = db.selectSqlSync({
        name: 'kunchidb',
        sql: 'SELECT * FROM quehuolist WHERE iRorptId="' + iRorptId + '"'
    });
    if (quehuolist.status) {
        if (quehuolist.data.length == 0) {
            two = 0;
        } else {
            two = 1;
        }
    } else {
        two = 0;
    }
    var daijiaofenlist = db.selectSqlSync({
        name: 'kunchidb',
        sql: 'SELECT * FROM daijiaofenlist WHERE iRorptId="' + iRorptId + '"'
    });
    if (daijiaofenlist.status) {
        if (daijiaofenlist.data.length == 0) {
            three = 0;
        } else {
            three = 1;
        }
    } else {
        three = 0;
    }
    var daijiaopiclist = db.selectSqlSync({
        name: 'kunchidb',
        sql: 'SELECT * FROM daijiaopiclist WHERE iRorptId="' + iRorptId + '"'
    });
    if (daijiaopiclist.status) {
        if (daijiaopiclist.data.length == 0) {
            four = 0;
        } else {
            four = 1;
        }
    } else {
        four = 0;
    }
    callBack(one, two, three, four);
}


function selectDb_ReportList_REPORT(iRorptId, callBack) {
    var db = api.require('db');
    db.selectSql({
        name: 'kunchidb',
        sql: 'SELECT * FROM reportlist WHERE iRorptId="' + iRorptId + '"'
    }, function(ret, err) {
        if (ret.status) {
            if (ret.data.length == 0) {
                callBack("0");
            } else {
                callBack("1");
            }
        } else {
            callBack("0");
        }
    });
}
/**
 * 陈列检查报告的操作
 * 表明为 chenlielist
 */
 function newchenlie_list(){
   var db = api.require('db');
   db.selectSql({
       name: 'kunchidb',
       sql: 'SELECT * FROM chenlielist WHERE iRorptId="' + api.pageParam.page.iReportId + '" AND userid="'+$api.getStorage("id")+'" AND pinpaiid="' + api.pageParam.page.BrandID + '"'
   }, function(ret, err) {
       if (ret.status) {
           if (ret.data.length == 0) {
               for(var a = 0; a < chenlie_List.length; a++){
                 var sql = 'INSERT INTO chenlielist (userid, leftgood, rightgood, hascuxiao, chenlie, cuxiao, jingpin, zidianname, zidianid, zidiantype, pinpainame, pinpaiid, fenleiname, fenleiid, '
                 		+'iRorptId, iRorptListTime, chenliecreattime, iStoreId, bei1, bei2, bei3, bei4, bei5, bei6, bei7, bei8, cStoreCode) VALUES ("' 
                 		+ chenlie_List[a].userid + '", "' 
                 		+ chenlie_List[a].leftgood + '", "' 
                 		+ chenlie_List[a].rightgood + '", "' 
                 		+ chenlie_List[a].hascuxiao + '", "' 
                 		+ chenlie_List[a].chenlie + '", "' 
                 		+ chenlie_List[a].cuxiao + '", "' 
                 		+ chenlie_List[a].jingpin + '", "' 
                 		+ chenlie_List[a].zidianname + '", "' 
                 		+ chenlie_List[a].zidianid + '", "' 
                 		+ chenlie_List[a].zidiantype + '", "' 
                 		+ chenlie_List[a].pinpainame + '", "' 
                 		+ chenlie_List[a].pinpaiid + '", "' 
                 		+ chenlie_List[a].fenleiname + '", "' 
                 		+ chenlie_List[a].fenleiid + '", "' 
                 		+ chenlie_List[a].iRorptId + '", "' 
                 		+ chenlie_List[a].iRorptListTime + '", "' 
                 		+ chenlie_List[a].chenliecreattime + '", "' 
                 		+ chenlie_List[a].iStoreId + '", "' 
                 		+ chenlie_List[a].bei1 + '", "' 
                 		+ chenlie_List[a].bei2 + '", "' 
                 		+ chenlie_List[a].bei3 + '", "' 
                 		+ chenlie_List[a].bei4 + '", "' 
                 		+ chenlie_List[a].bei5 + '", "' 
                 		+ chenlie_List[a].bei6 + '", "' 
                 		+ chenlie_List[a].bei7 + '", "' 
                 		+ chenlie_List[a].bei8 + '", "' 
                 		+ chenlie_List[a].cStoreCode + '")';
                 executeSql(sql, function(numone) {
                     if (numone == 1) {}
                 });
               }
               api.sendEvent({
	               name:'upload_databasepic'
               });
               api.sendEvent({
	               name:'upload_shijianlist'
               });
               api.alert({
                   title: '提示',
                   msg: '保存成功',
               }, function(ret, err) {
                   api.closeWin();
               });
           } else {
               var sql = 'DELETE FROM chenlielist WHERE iRorptId="' + api.pageParam.page.iReportId + '" AND userid="'+$api.getStorage("id")+'" AND pinpaiid="' + api.pageParam.page.BrandID + '"';
               executeSql(sql, function(numone) {
                   if (numone == 1) {
                     for(var a = 0; a < chenlie_List.length; a++){
                     	var sql = 'INSERT INTO chenlielist (userid, leftgood, rightgood, hascuxiao, chenlie, cuxiao, jingpin, zidianname, zidianid, zidiantype, pinpainame, pinpaiid, fenleiname, fenleiid, '
		                 		+'iRorptId, iRorptListTime, chenliecreattime, iStoreId, bei1, bei2, bei3, bei4, bei5, bei6, bei7, bei8, cStoreCode) VALUES ("' 
		                 		+ chenlie_List[a].userid + '", "' 
		                 		+ chenlie_List[a].leftgood + '", "' 
		                 		+ chenlie_List[a].rightgood + '", "' 
		                 		+ chenlie_List[a].hascuxiao + '", "' 
		                 		+ chenlie_List[a].chenlie + '", "' 
		                 		+ chenlie_List[a].cuxiao + '", "' 
		                 		+ chenlie_List[a].jingpin + '", "' 
		                 		+ chenlie_List[a].zidianname + '", "' 
		                 		+ chenlie_List[a].zidianid + '", "' 
		                 		+ chenlie_List[a].zidiantype + '", "' 
		                 		+ chenlie_List[a].pinpainame + '", "' 
		                 		+ chenlie_List[a].pinpaiid + '", "' 
		                 		+ chenlie_List[a].fenleiname + '", "' 
		                 		+ chenlie_List[a].fenleiid + '", "' 
		                 		+ chenlie_List[a].iRorptId + '", "' 
		                 		+ chenlie_List[a].iRorptListTime + '", "' 
		                 		+ chenlie_List[a].chenliecreattime + '", "' 
		                 		+ chenlie_List[a].iStoreId + '", "' 
		                 		+ chenlie_List[a].bei1 + '", "' 
		                 		+ chenlie_List[a].bei2 + '", "' 
		                 		+ chenlie_List[a].bei3 + '", "' 
		                 		+ chenlie_List[a].bei4 + '", "' 
		                 		+ chenlie_List[a].bei5 + '", "' 
		                 		+ chenlie_List[a].bei6 + '", "' 
		                 		+ chenlie_List[a].bei7 + '", "' 
		                 		+ chenlie_List[a].bei8 + '", "' 
		                 		+ chenlie_List[a].cStoreCode + '")';
		                 		
		                 executeSql(sql, function(numone) {
		                     if (numone == 1) {}
		                 });
                     }
                     api.sendEvent({
			               name:'upload_databasepic'
		               });
                     api.sendEvent({
			               name:'upload_shijianlist'
		               });
                     api.alert({
                         title: '提示',
                         msg: '保存成功',
                     }, function(ret, err) {
                         api.closeWin();
                     });
                   }
               });
           }
       }
   });
 }


/**
 * BA评价积分保存到数据库
 * userid, zidianname, zidianid, zidiantype, pinpainame, pinpaiid, pingjianame, pingjiaid, normalfen, pingfen,
 * iRorptId, iRorptListTime, iStoreId, cStoreCode, bei1, bei2, bei3, bei4, bei5, bei6, bei7, bei8 
 */
function new_BA_jifen() {
  var db = api.require('db');
  db.selectSql({
      name: 'kunchidb',
      sql: 'SELECT * FROM daijiaofenlist WHERE iRorptId="' + api.pageParam.iReportId + '" AND userid="'+$api.getStorage("id")
      +'" AND pinpaiid="' + api.pageParam.BrandID + '" AND bauserid="' + api.pageParam.bauserid + '"'
  }, function(ret, err) {
      if (ret.status) {
          if (ret.data.length == 0) {
              for(var a = 0; a < pingfenlist_ba.length; a++){
                var sql = 'INSERT INTO daijiaofenlist (bauserid, userid, zidianname, zidianid, zidiantype, pinpainame, pinpaiid, pingjianame, pingjiaid, normalfen, pingfen, iRorptId, '
                +'iRorptListTime, iStoreId, cStoreCode, bei1, bei2, bei3, bei4, bei5, bei6, bei7, bei8) VALUES ("' +
                    pingfenlist_ba[a].bauserid + '", "' 
                    + pingfenlist_ba[a].userid + '", "' 
                    + pingfenlist_ba[a].zidianname + '", "' 
                    + pingfenlist_ba[a].zidianid + '", "' 
                    + pingfenlist_ba[a].zidiantype + '", "' 
                    + pingfenlist_ba[a].pinpainame + '", "' 
                    + pingfenlist_ba[a].pinpaiid + '", "' 
                    + pingfenlist_ba[a].pingjianame + '", "' 
                    + pingfenlist_ba[a].pingjiaid + '", "' 
                    + pingfenlist_ba[a].normalfen + '", "' 
                    + pingfenlist_ba[a].pingfen + '", "' 
                    + pingfenlist_ba[a].iRorptId + '", "' 
                    + pingfenlist_ba[a].iRorptListTime + '", "' 
                    + pingfenlist_ba[a].iStoreId + '", "' 
                    + pingfenlist_ba[a].cStoreCode + '", "' 
                    + pingfenlist_ba[a].bei1 + '", "' 
                    + pingfenlist_ba[a].bei2 + '", "' 
                    + pingfenlist_ba[a].bei3 + '", "' 
                    + pingfenlist_ba[a].bei4 + '", "' 
                    + pingfenlist_ba[a].bei5 + '", "' 
                    + pingfenlist_ba[a].bei6 + '", "' 
                    + pingfenlist_ba[a].bei7 + '", "' 
                    + pingfenlist_ba[a].bei8 + '")';
                executeSql(sql, function(numone) {
                    if (numone == 1) {}
                });
              }
          } else {
              var sql = 'DELETE FROM daijiaofenlist WHERE iRorptId="' + api.pageParam.iReportId + '" AND userid="'+$api.getStorage("id")
              +'" AND pinpaiid="' + api.pageParam.BrandID + '" AND bauserid="' + api.pageParam.bauserid + '"';
              executeSql(sql, function(numone) {
                  if (numone == 1) {
                    for(var a = 0; a < pingfenlist_ba.length; a++){
                      var sql = 'INSERT INTO daijiaofenlist (bauserid, userid, zidianname, zidianid, zidiantype, pinpainame, pinpaiid, pingjianame, pingjiaid, normalfen, pingfen, iRorptId, '
			                +'iRorptListTime, iStoreId, cStoreCode, bei1, bei2, bei3, bei4, bei5, bei6, bei7, bei8) VALUES ("' +
			                    pingfenlist_ba[a].bauserid + '", "' 
			                    + pingfenlist_ba[a].userid + '", "' 
			                    + pingfenlist_ba[a].zidianname + '", "' 
			                    + pingfenlist_ba[a].zidianid + '", "' 
			                    + pingfenlist_ba[a].zidiantype + '", "' 
			                    + pingfenlist_ba[a].pinpainame + '", "' 
			                    + pingfenlist_ba[a].pinpaiid + '", "' 
			                    + pingfenlist_ba[a].pingjianame + '", "' 
			                    + pingfenlist_ba[a].pingjiaid + '", "' 
			                    + pingfenlist_ba[a].normalfen + '", "' 
			                    + pingfenlist_ba[a].pingfen + '", "' 
			                    + pingfenlist_ba[a].iRorptId + '", "' 
			                    + pingfenlist_ba[a].iRorptListTime + '", "' 
			                    + pingfenlist_ba[a].iStoreId + '", "' 
			                    + pingfenlist_ba[a].cStoreCode + '", "' 
			                    + pingfenlist_ba[a].bei1 + '", "' 
			                    + pingfenlist_ba[a].bei2 + '", "' 
			                    + pingfenlist_ba[a].bei3 + '", "' 
			                    + pingfenlist_ba[a].bei4 + '", "' 
			                    + pingfenlist_ba[a].bei5 + '", "' 
			                    + pingfenlist_ba[a].bei6 + '", "' 
			                    + pingfenlist_ba[a].bei7 + '", "' 
			                    + pingfenlist_ba[a].bei8 + '")';
                      executeSql(sql, function(numone) {
                          if (numone == 1) {}
                      });
                    }
                  }
              });
          }


//通知拍照可以保存到数据库了
          api.sendEvent({
              name: 'batijiao2'
          });
          api.addEventListener({
              name: 'overloadba'
          }, function(ret, err) {
          
          	api.sendEvent({
	              name:'upload_databasepic'
              });
          	api.sendEvent({
	              name:'upload_shijianlist'
              });
          
            api.alert({
                title: '提示',
                msg: '保存成功',
            }, function(ret, err) {
                api.closeWin();
            });
          });

      }
  });
}






/**
 * BA拍照保存到数据库
 */
function new_BA_paizhaopic(object) {
  var db = api.require('db');
  db.selectSql({
      name: 'kunchidb',
      sql: 'SELECT * FROM daijiaopiclist WHERE iRorptId="' + api.pageParam.iReportId + '" AND userid="'+$api.getStorage("id")
      +'" AND pinpaiid="' + api.pageParam.BrandID + '" AND bauserid="' + api.pageParam.bauserid + '"'
  }, function(ret, err) {
      if (ret.status) {
          if (ret.data.length == 0) {
              var sql = 'INSERT INTO daijiaopiclist (bauserid, userid, thisfudao, nextfudao, bapiclist, pinggupiclist, iRorptId, iRorptListTime, iStoreId, cStoreCode, zidianname, '
              +'zidianid, zidiantype, pinpainame, pinpaiid, bei1, bei2, bei3, bei4, bei5, bei6, bei7, bei8) VALUES ("' 
              + object.bauserid + '", "' 
              + object.userid + '", "' 
              + object.thisfudao + '", "' 
              + object.nextfudao + '", "' 
              + object.bapiclist + '", "' 
              + object.pinggupiclist + '", "' 
              + object.iRorptId + '", "' 
              + object.iRorptListTime + '", "' 
              + object.iStoreId + '", "' 
              + object.cStoreCode + '", "' 
              + object.zidianname + '", "' 
              + object.zidianid + '", "' 
              + object.zidiantype + '", "' 
              + object.pinpainame + '", "' 
              + object.pinpaiid + '", "' 
              + object.bei1 + '", "' 
              + object.bei2 + '", "' 
              + object.bei3 + '", "' 
              + object.bei4 + '", "' 
              + object.bei5 + '", "' 
              + object.bei6 + '", "' 
              + object.bei7 + '", "' 
              + object.bei8 + '")';
              
              executeSql(sql, function(numone) {
                  if (numone == 1) {}
              });
          } else {
              var sql = 'DELETE FROM daijiaopiclist WHERE iRorptId="' + api.pageParam.iReportId + '" AND userid="'+$api.getStorage("id")
              +'" AND pinpaiid="' + api.pageParam.BrandID + '" AND bauserid="' + api.pageParam.bauserid + '"';
              executeSql(sql, function(numone) {
                  if (numone == 1) {
                  	var sql = 'INSERT INTO daijiaopiclist (bauserid, userid, thisfudao, nextfudao, bapiclist, pinggupiclist, iRorptId, iRorptListTime, iStoreId, cStoreCode, zidianname, '
		              +'zidianid, zidiantype, pinpainame, pinpaiid, bei1, bei2, bei3, bei4, bei5, bei6, bei7, bei8) VALUES ("' 
		              + object.bauserid + '", "' 
		              + object.userid + '", "' 
		              + object.thisfudao + '", "' 
		              + object.nextfudao + '", "' 
		              + object.bapiclist + '", "' 
		              + object.pinggupiclist + '", "' 
		              + object.iRorptId + '", "' 
		              + object.iRorptListTime + '", "' 
		              + object.iStoreId + '", "' 
		              + object.cStoreCode + '", "' 
		              + object.zidianname + '", "' 
		              + object.zidianid + '", "' 
		              + object.zidiantype + '", "' 
		              + object.pinpainame + '", "' 
		              + object.pinpaiid + '", "' 
		              + object.bei1 + '", "' 
		              + object.bei2 + '", "' 
		              + object.bei3 + '", "' 
		              + object.bei4 + '", "' 
		              + object.bei5 + '", "' 
		              + object.bei6 + '", "' 
		              + object.bei7 + '", "' 
		              + object.bei8 + '")';
                    executeSql(sql, function(numone) {
                        if (numone == 1) {}
                    });
                  }
              });
          }
          api.sendEvent({
              name: 'overloadba'
          });
      }
  });
}


/**
 * 将缺货列表保存到数据库中
 *userid, zidianname, zidianid, zidiantype, pinpainame, pinpaiid, iRorptId, iRorptListTime, iStoreId, cStoreCode, goodname, goodid, bei1, bei2, bei3, bei4, bei5, bei6, bei7, bei8
 */
function save_quehuoDB() {
	var db = api.require('db');
	db.selectSql({
	    name: 'kunchidb',
	    sql: 'SELECT * FROM quehuolist WHERE iRorptId="' + api.pageParam.page.iReportId + '" AND userid="'+$api.getStorage("id")+'"'
	}, function(ret, err) {
	    if (ret.status) {
	        if (ret.data.length == 0) {
							for(var a = 0; a < quehuo_array.length; a++){
								var sql = 'INSERT INTO quehuolist (userid, zidianname, zidianid, zidiantype, pinpainame, pinpaiid, iRorptId, iRorptListTime, iStoreId, cStoreCode, goodname,'
								+' goodid, bei1, bei2, bei3, bei4, bei5, bei6, bei7, bei8) VALUES ("'
								+ quehuo_array[a].userid + '", "' 
								+ quehuo_array[a].zidianname + '", "' 
								+ quehuo_array[a].zidianid + '", "' 
								+ quehuo_array[a].zidiantype + '", "' 
								+ quehuo_array[a].pinpainame + '", "' 
								+ quehuo_array[a].pinpaiid + '", "' 
								+ quehuo_array[a].iRorptId + '", "' 
								+ quehuo_array[a].iRorptListTime + '", "' 
								+ quehuo_array[a].iStoreId + '", "' 
								+ quehuo_array[a].cStoreCode + '", "' 
								+ quehuo_array[a].goodname + '", "' 
								+ quehuo_array[a].goodid + '", "' 
								+ quehuo_array[a].bei1 + '", "' 
								+ quehuo_array[a].bei2 + '", "' 
								+ quehuo_array[a].bei3 + '", "' 
								+ quehuo_array[a].bei4 + '", "' 
								+ quehuo_array[a].bei5 + '", "' 
								+ quehuo_array[a].bei6 + '", "' 
								+ quehuo_array[a].bei7 + '", "' 
								+ quehuo_array[a].bei8 + '")';
								executeSql(sql, function(numone) {
										if (numone == 1) {
										}
								});
							}
							api.sendEvent({
	                            name:'upload_shijianlist'
                            });
							api.alert({
							    title: '提示',
							    msg: '保存成功',
							}, function(ret, err) {
									api.closeWin();
							});
	        } else {
              var sql = 'DELETE FROM quehuolist WHERE iRorptId="' + api.pageParam.page.iReportId + '" AND userid="'+$api.getStorage("id")+'"';
              executeSql(sql, function(numone) {
                  if (numone == 1) {
					for(var a = 0; a < quehuo_array.length; a++){
						var sql = 'INSERT INTO quehuolist (userid, zidianname, zidianid, zidiantype, pinpainame, pinpaiid, iRorptId, iRorptListTime, iStoreId, cStoreCode, goodname,'
							+' goodid, bei1, bei2, bei3, bei4, bei5, bei6, bei7, bei8) VALUES ("'
							+ quehuo_array[a].userid + '", "' 
							+ quehuo_array[a].zidianname + '", "' 
							+ quehuo_array[a].zidianid + '", "' 
							+ quehuo_array[a].zidiantype + '", "' 
							+ quehuo_array[a].pinpainame + '", "' 
							+ quehuo_array[a].pinpaiid + '", "' 
							+ quehuo_array[a].iRorptId + '", "' 
							+ quehuo_array[a].iRorptListTime + '", "' 
							+ quehuo_array[a].iStoreId + '", "' 
							+ quehuo_array[a].cStoreCode + '", "' 
							+ quehuo_array[a].goodname + '", "' 
							+ quehuo_array[a].goodid + '", "' 
							+ quehuo_array[a].bei1 + '", "' 
							+ quehuo_array[a].bei2 + '", "' 
							+ quehuo_array[a].bei3 + '", "' 
							+ quehuo_array[a].bei4 + '", "' 
							+ quehuo_array[a].bei5 + '", "' 
							+ quehuo_array[a].bei6 + '", "' 
							+ quehuo_array[a].bei7 + '", "' 
							+ quehuo_array[a].bei8 + '")';
						executeSql(sql, function(numone) {
								if (numone == 1) {
								}
						});
					}
					api.sendEvent({
                        name:'upload_shijianlist'
                    });
					api.alert({
					    title: '提示',
					    msg: '保存成功',
					}, function(ret, err) {
							api.closeWin();
					});
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
function change_Piclist_String(lableupdate) {
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
				picurl = picurl + lableupdate[a] + '@';
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
function change_String_Piclist(temppic) {
	var tempArr = "";

	if (temppic != null) {
		if (temppic.length > 0) {
			tempArr = temppic.split("@");
		} else {
			tempArr = "";
		}
	}
	return tempArr;
}
