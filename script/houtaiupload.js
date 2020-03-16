/**
 *获取所有品牌信息
 */
function getT_DirTable() {
	var myDate = new Date();

	$kunchi.kunchiget('api/t_ProductsBrand', "", function(ret,err){
		//[{"$id":"1","BrandID":2,"BrandName":"汉高","Description":"","State":"正常"},{"$id":"2","BrandID":4,"BrandName":"凯伊秀","Description":"","State":"正常"},{"$id":"3","BrandID":5,"BrandName":"KISS ME","Description":"","State":"正常"},{"$id":"4","BrandID":6,"BrandName":"珂莱欧","Description":"","State":"正常"},{"$id":"5","BrandID":7,"BrandName":"双莲","Description":"","State":"正常"},{"$id":"6","BrandID":8,"BrandName":"MEMEBOX","Description":"","State":"正常"},{"$id":"7","BrandID":10,"BrandName":"得鲜","Description":"","State":"正常"},{"$id":"8","BrandID":11,"BrandName":"资生堂","Description":"","State":"正常"},{"$id":"9","BrandID":12,"BrandName":"安悦","Description":"","State":"正常"}]
		hideloadinfo();
		if (ret) {
			$api.setStorage("allgoodtype", ret);
			var errorel = document.getElementById("errorid");
			$api.css(errorel, "display: none;");
			api.toast({
			    msg: '完成',
			    duration: 3000,
			    location: 'bottom'
			});
		} else {
			var errorel = document.getElementById("errorid");
			$api.css(errorel, "display: block;");
		}
	});
}

function houtai_isempty(str){
	if((typeof(str) == 'undefined')||(str == null)||(str == "null")||(str == "")||(str == "undefined")){
		return true;
	}else{
		return false;
	}
}
