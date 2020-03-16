/**
 *删除上个月的成功的图片信息
 * 将没有成功的文件全都上传上来
 * 上传之后将文件删除重新创建 
 * 2018/10/17/15:24线简单优化一下，将图片库中的已经上传成功的数据库中的数据全部删掉
 */

function DelALLPic(){
	
	var db = api.require('db');
	//首先要清除已经上传成功的图片  WHERE isupload = 1 ORDER BY isupload limit 200;
	db.executeSql({
	    name: 'kunchidb',
	    sql: 'DELETE FROM piclist WHERE isupload = 1;'
	}, function(ret, err) {
		dismissdialog();
	});
	
}


function dismissdialog(){
	api.hideProgress();
	api.toast({
	    msg: '清理完成',
	    duration: 2000,
	    location: 'bottom'
	});
}


/**
 *固定日期之前使用一次清理功能 
 */
function getISclear(){
	var fs = api.require('fs');
	fs.exist({
	    path: 'fs://.firstclearpic.txt'
	}, function(ret, err) {
	    if (ret.exist) {
	    } else {
	        api.showProgress({
			    title: '请稍等',
			    text: '正在清理软件空间',
			    modal: true
			});
			DelALLPic();
			creatfirstfile();
	    }
	});
}


function creatfirstfile(){
	var fs = api.require('fs');
	fs.createFile({
	    path: 'fs://.firstclearpic.txt'
	}, function(ret, err) {
	    if (ret.status) {
	    } else {
	    }
	});
}