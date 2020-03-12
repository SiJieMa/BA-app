/**
 *是否创建了SKU的保存数据库 
 */
function is_creatsku_db() {
	var db = api.require('db');
	var ret = db.selectSqlSync({
	    name: 'kunchidb',
	    sql: 'SELECT * FROM skulist where iProuductId = "已有";'
	});
	if(ret.status){
	}else{
		createskudb();
	}
}

function createskudb(){
	var db = api.require('db');
	var signin = db.executeSqlSync({
	    name: 'kunchidb',
	    sql: 'CREATE TABLE skulist(iProuductId varchar(255), taskid varchar(255), istoreid varchar(255), iInventoryId varchar(255), iProductBrand varchar(255),'
	    +' jinhuo varchar(255), xiaoshounum varchar(255), xiaoshoumoney varchar(255), today varchar(255), oneitem varchar(255), twoitem varchar(255), '
	    +'threeitem varchar(255), fouritem varchar(255))'
	});
	if(signin.status){
	}
}

function newchenlie_list(object){

   var db = api.require('db');
   db.selectSql({
       name: 'kunchidb',
       sql: 'SELECT * FROM skulist WHERE today="' + today() + '" AND iProuductId="'+object.iProuductId+'"'
   }, function(ret, err) {
       if (ret.status) {
           if (ret.data.length == 0) {
             var sql = 'INSERT INTO skulist (iProuductId, taskid, istoreid, iInventoryId, iProductBrand, jinhuo, xiaoshounum, xiaoshoumoney, today, oneitem, twoitem, threeitem, fouritem ) VALUES ("' 
             		+ object.iProuductId + '", "' 
             		+ object.taskid + '", "' 
             		+ object.istoreid + '", "' 
             		+ object.iInventoryId + '", "' 
             		+ object.iProductBrand + '", "' 
             		+ object.jinhuo + '", "' 
             		+ object.xiaoshounum + '", "' 
             		+ object.xiaoshoumoney + '", "' 
             		+ object.today + '", "' 
             		+ object.oneitem + '", "' 
             		+ object.twoitem + '", "' 
             		+ object.threeitem + '", "' 
             		+ object.fouritem + '")';
             executeSql(sql, function(numone) {
                 if (numone == 1) {}
             });
           } else {
               var sql = 'DELETE FROM skulist WHERE today="' + today() + '" AND iProuductId="'+object.iProuductId+'"';
               executeSql(sql, function(numone) {
                   if (numone == 1) {
                 	var sql = 'INSERT INTO skulist (iProuductId, taskid, istoreid, iInventoryId, iProductBrand, jinhuo, xiaoshounum, xiaoshoumoney, today, oneitem, twoitem, threeitem, fouritem ) VALUES ("' 
		             		+ object.iProuductId + '", "' 
		             		+ object.taskid + '", "' 
		             		+ object.istoreid + '", "' 
		             		+ object.iInventoryId + '", "' 
		             		+ object.iProductBrand + '", "' 
		             		+ object.jinhuo + '", "' 
		             		+ object.xiaoshounum + '", "' 
		             		+ object.xiaoshoumoney + '", "' 
		             		+ object.today + '", "' 
		             		+ object.oneitem + '", "' 
		             		+ object.twoitem + '", "' 
		             		+ object.threeitem + '", "' 
		             		+ object.fouritem + '")';
		             executeSql(sql, function(numone) {
		                 if (numone == 1) {}
		             });
                   }
               });
           }
       }
   });
 }
 
 
 function deal_all_skulist(){
 	var sql = 'DELETE FROM skulist WHERE today="' + today() + '"';
       executeSql(sql, function(numone) {
           if (numone == 1) {
           }
       });
 }
