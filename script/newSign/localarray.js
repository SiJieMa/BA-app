/**
 *
 * 创建一个保存到本地的数组 用来保存JSON数组  
 * 用来保存本地拍照的图片，等上传的时候直接使用
 * 
 */

var Arraylist = function(){
	this.initlist = new Array();
}

Arraylist.prototype.push = function(object){
	var mainthis = this;
	var length = mainthis.initlist;
	if(length == 0){
		mainthis.initlist.push(object);
	}else{
		var ishas = 0;//0不包含 1包含
		for(var a = 0; a < length; a++){
			if(mainthis.initlist[a] === object){
				ishas = 1;
				break;
			}
		}
		if(ishas == 0){
			mainthis.initlist.push(object);
		}
	}
}

Arraylist.prototype.del = function(id){
	var mainthis = this;
	var length = mainthis.initlist.length;
	if(length != 0){
		var ishas = 0;//当前参数在第几个
		for(var a = 0; a < length; a++){
			if(mainthis.initlist[a].iTrainId === id){
				ishas = a;
				break;
			}
		}
		mainthis.initlist.splice(ishas, 1);
		console.log('删除成功');
	}
}

Arraylist.prototype.get = function(id){
	var mainthis = this;
	var length = mainthis.initlist.length;
	if(length != 0){
		var object;//当前参数在第几个
		for(var a = 0; a < length; a++){
			if(mainthis.initlist[a].iTrainId === id){
				object = mainthis.initlist[a];
				break;
			}
		}
		return object;
	}else{
		return "";
	}
}
