var djdbinit = function(){}

djdbinit.prototype = {
	
	
	init: function(){
		var fs = api.require('fs');
		var retfs1 = fs.existSync({
			path : 'fs://.kunchibanewdj/newdjdb.db'
		});
		//console.log(JSON.stringify(retfs1));
		if (retfs1.exist) {
			this.openLocalPath();
		} else {
			var retfs2 = fs.copyToSync({
				oldPath : 'widget://res/newdjdb.db',
				newPath : 'fs://.kunchibanewdj'
			});
			if (retfs2.status) {
				this.openLocalPath();
			} else {
				api.toast({
					msg : '初始化本地带教系统失败'
				});
			}
		}
	},
	
	openLocalPath: function(){
		var db = api.require('db');
		var ret = db.openDatabaseSync({
			name : 'djnewdb',
			path : 'fs://.kunchibanewdj/newdjdb.db'
		});
		console.log(JSON.stringify(ret));
		if (ret.status) {
			this.PicCKishastab(function(states){
				console.log(states);
				if(!states){
					//创建培训带教内容 主菜单
					
					var djlist = db.executeSqlSync({
					    name: 'djnewdb',
					    sql: 'CREATE TABLE "djlist" ( "lguidid" TEXT,"lcBrandName" varchar(255),"lcCategory" varchar(255),"lcLeftProduct" varchar(255),"lcReportDetailName" varchar(255),"lcReportType" varchar(255),"lcRightProduct" varchar(255),"lcSalesProduct" varchar(255),"lcTrainContent" varchar(255),"lcTrainFollow" varchar(255),"liReportId" varchar(255),"liUserId" varchar(255),"ldtDateTime" varchar(255),"ldtReportTime" varchar(255),"liBAUserID" varchar(255),"lguidtime" DATETIME)'
					});
					//带教评分
					var djfen = db.executeSqlSync({
					    name: 'djnewdb',
					    sql: 'CREATE TABLE "djfen" ( "fguidid" TEXT,"fdjguid" TEXT,"fcDictName" varchar(255),"fiGradeNumber" varchar(255),"fiReportId" varchar(255),"fiTotalNumber" varchar(255),"fiTrainiId" varchar(255),"fguidtime" DATETIME)'
					});
					//带教图片
					var djpic = db.executeSqlSync({
					    name: 'djnewdb',
					    sql: 'CREATE TABLE "djpic" ( "nguidid" TEXT,"ndjguid" TEXT,"ncPicClass" varchar(255),"ncPicPath" varchar(255),"ncPicType" varchar(255),"ncRoleName" varchar(255),"ncUserName" varchar(255),"niBrandName" varchar(255),"niStoreId" varchar(255),"niReportId" varchar(255),"niTrainId" varchar(255),"niSize" varchar(255),"niUserId" varchar(255),"ndtUploadTime" varchar(255),"nguidtime" DATETIME)'
					});
					api.toast({
						msg : '初始化本地带教系统完成'
					});
				}else{
					api.toast({
						msg : '初始化本地带教系统完成'
					});
				}
			});
		} else {
			api.toast({
				msg : '初始化本地带教系统失败'
			});
		}
	},
	
	PicCKishastab: function(callBack){
		var db = api.require('db');
		var ret = db.selectSqlSync({
		    name: 'djnewdb',
		    sql: "SELECT * FROM djlist limit 1;"
		});
		//console.log(JSON.stringify(ret));
		if(ret.status){
			callBack(true);
		}else{
			callBack(false);
		}
	},
	
	insertdj: function(iReportId, iUserId, iBAUserID, cBrandName, djjson, callBack){
		var db = api.require('db');
		var djguid_id = this.jdguid();
		
		
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
		
		
		//首先查询一下 当前数据库是否存在当前记录 如果有的话 就更新数据 如果没有的话再保存数据
		
		var selectrepeat = 'SELECT * FROM djlist WHERE liReportId = "'+iReportId+'" AND liUserId = "'+iUserId+'" AND liBAUserID = "'+iBAUserID+'" AND lcBrandName = "'+cBrandName+'";';		
		var retselectrepeat = db.selectSqlSync({
		    name: 'djnewdb',
		    sql: selectrepeat
		});
		//console.log(JSON.stringify(retselectrepeat));
		if(retselectrepeat){
			if(retselectrepeat.data == 0){
				var sqlpicin = 'INSERT INTO djlist VALUES ("'+djguid_id+'","'
												+djjson[0].cBrandName+'","'
												+djjson[0].cCategory+'","'
												+djjson[0].cLeftProduct+'","'
												+djjson[0].cReportDetailName+'","'
												+djjson[0].cReportType+'","'
												+djjson[0].cRightProduct+'","'
												+djjson[0].cSalesProduct+'","'
												+djjson[0].cTrainContent+'","'
												+djjson[0].cTrainFollow+'","'
												+djjson[0].iReportId+'","'
												+djjson[0].iUserId+'","'
												+djjson[0].dtDateTime+'","'
												+djjson[0].dtReportTime+'","'
												+djjson[0].iBAUserID+'","'
												+clock+'");';
				var ret = db.executeSqlSync({
				    name: 'djnewdb',
				    sql: sqlpicin
				});
				//console.log("insert"+JSON.stringify(ret));
			}else{
				var update_guidid = retselectrepeat.data[0].lguidid;
				var updateguidsql = 'UPDATE djlist SET '
									+'lguidid="'+djguid_id+'",'
									+'lcBrandName="'+djjson[0].cBrandName+'",'
									+'lcCategory="'+djjson[0].cCategory+'",'
									+'lcLeftProduct="'+djjson[0].cLeftProduct+'",'
									+'lcReportDetailName="'+djjson[0].cReportDetailName+'",'
									+'lcReportType="'+djjson[0].cReportType+'",'
									+'lcRightProduct="'+djjson[0].cRightProduct+'",'
									+'lcSalesProduct="'+djjson[0].cSalesProduct+'",'
									+'lcTrainContent="'+djjson[0].cTrainContent+'",'
									+'lcTrainFollow="'+djjson[0].cTrainFollow+'",'
									+'liReportId="'+djjson[0].iReportId+'",'
									+'liUserId="'+djjson[0].iUserId+'",'
									+'ldtDateTime="'+djjson[0].dtDateTime+'",'
									+'ldtReportTime="'+djjson[0].dtReportTime+'",'
									+'liBAUserID="'+djjson[0].iBAUserID+'" WHERE lguidid = "'+update_guidid+'"';
				var ret = db.executeSqlSync({
				    name: 'djnewdb',
				    sql: updateguidsql
				});	
				//console.log("update"+JSON.stringify(ret));				
			}
		}
		
		var djfensql = 'INSERT INTO djfen VALUES ';
		for(var a = 0; a < djjson[0]._Grades[0]._grade.length; a++){
		
			if(a == (djjson[0]._Grades[0]._grade.length - 1)){
				djfensql = djfensql + '("'+this.jdguid()+'","'
							+djguid_id+'","'
							+djjson[0]._Grades[0]._grade[a].cDictName+'","'
							+djjson[0]._Grades[0]._grade[a].iGradeNumber+'","'
							+djjson[0]._Grades[0]._grade[a].iReportId+'","'
							+djjson[0]._Grades[0]._grade[a].iTotalNumber+'","'
							+djjson[0]._Grades[0]._grade[a].iTrainiId+'","'
							+clock+'")';
			}else{
				djfensql = djfensql + '("'+this.jdguid()+'","'
							+djguid_id+'","'
							+djjson[0]._Grades[0]._grade[a].cDictName+'","'
							+djjson[0]._Grades[0]._grade[a].iGradeNumber+'","'
							+djjson[0]._Grades[0]._grade[a].iReportId+'","'
							+djjson[0]._Grades[0]._grade[a].iTotalNumber+'","'
							+djjson[0]._Grades[0]._grade[a].iTrainiId+'","'
							+clock+'"),';
			}
		
		}
		djfensql = djfensql + ';';
		if(djjson[0]._Grades[0]._grade.length > 0){
			var retinfen = db.executeSqlSync({
			    name: 'djnewdb',
			    sql: djfensql
			});
			//console.log(djfensql);
			//console.log(JSON.stringify(retinfen));
		}
		
		
		
		
		var djneirongsql = 'INSERT INTO djpic VALUES ';
		
		for(var b = 0; b < djjson[0]._Grades[0]._pic.length; b++){
		
			if(b == (djjson[0]._Grades[0]._pic.length - 1)){
				djneirongsql = djneirongsql + '("'+this.jdguid()+'","'
							+djguid_id+'","'
							+djjson[0]._Grades[0]._pic[b].cPicClass+'","'
							+djjson[0]._Grades[0]._pic[b].cPicPath+'","'
							+djjson[0]._Grades[0]._pic[b].cPicType+'","'
							+djjson[0]._Grades[0]._pic[b].cRoleName+'","'
							+djjson[0]._Grades[0]._pic[b].cUserName+'","'
							+djjson[0]._Grades[0]._pic[b].iBrandName+'","'
							+djjson[0]._Grades[0]._pic[b].iStoreId+'","'
							+djjson[0]._Grades[0]._pic[b].iReportId+'","'
							+djjson[0]._Grades[0]._pic[b].iTrainId+'","'
							+djjson[0]._Grades[0]._pic[b].iSize+'","'
							+djjson[0]._Grades[0]._pic[b].iUserId+'","'
							+djjson[0]._Grades[0]._pic[b].dtUploadTime+'","'
							+clock+'")';
			}else{
				djneirongsql = djneirongsql + '("'+this.jdguid()+'","'
							+djguid_id+'","'
							+djjson[0]._Grades[0]._pic[b].cPicClass+'","'
							+djjson[0]._Grades[0]._pic[b].cPicPath+'","'
							+djjson[0]._Grades[0]._pic[b].cPicType+'","'
							+djjson[0]._Grades[0]._pic[b].cRoleName+'","'
							+djjson[0]._Grades[0]._pic[b].cUserName+'","'
							+djjson[0]._Grades[0]._pic[b].iBrandName+'","'
							+djjson[0]._Grades[0]._pic[b].iStoreId+'","'
							+djjson[0]._Grades[0]._pic[b].iReportId+'","'
							+djjson[0]._Grades[0]._pic[b].iTrainId+'","'
							+djjson[0]._Grades[0]._pic[b].iSize+'","'
							+djjson[0]._Grades[0]._pic[b].iUserId+'","'
							+djjson[0]._Grades[0]._pic[b].dtUploadTime+'","'
							+clock+'"),';
			}
		
		}
		djneirongsql = djneirongsql + ';';
		
		if(djjson[0]._Grades[0]._pic.length > 0){
			var retinneirong = db.executeSqlSync({
			    name: 'djnewdb',
			    sql: djneirongsql
			});
			
			//console.log(djneirongsql);
			//console.log(JSON.stringify(retinneirong));
		}
		
		callBack(true);
		console.log('插入完成');
	},
	
	selectjd: function(iReportId, iUserId, callBack){
		var db = api.require('db');
		//主列表
		var retlist = db.selectSqlSync({
		    name: 'djnewdb',
		    sql: 'SELECT * FROM djlist WHERE liReportId = "'+iReportId+'" AND liUserId = "'+iUserId+'"'
		});
		//console.log(JSON.stringify(retlist));
		var retlistguid = retlist.data;
		if(retlistguid.length > 0){
			var guidnew = "";
			for(var a = 0; a < retlistguid.length; a++){
				if(a == (retlistguid.length - 1)){
					guidnew = guidnew + '"' + retlistguid[a].lguidid + '"';
				}else{
					guidnew = guidnew + '"' + retlistguid[a].lguidid + '",';
				}
			}
			
			var retf = db.selectSqlSync({
			    name: 'djnewdb',
			    sql: 'SELECT * FROM djfen WHERE fdjguid IN ('+guidnew+')'
			});
			
			var retn = db.selectSqlSync({
			    name: 'djnewdb',
			    sql: 'SELECT * FROM djpic WHERE ndjguid IN ('+guidnew+')'
			});
			//console.log("retf=="+JSON.stringify(retf));
			//console.log("retn=="+JSON.stringify(retn));
			var objectdb = new Object();
			objectdb.zlist = retlistguid;
			objectdb.npic = retn.data;
			objectdb.ffen = retf.data;
			callBack(objectdb);
		}else{
			callBack(false);
		}
	},
	
	jdguid: function() {
	    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
	        return v.toString(16);
	    });
	}
	
}