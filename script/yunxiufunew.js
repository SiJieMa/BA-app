var updateapp = (function(){
  var isupdate = 0;//0代表没有更新， 1代表有更新
  var GetUpdate = function(){
    var mam = api.require('mam');
    mam.checkSmartUpdate(function(ret, err){
        if (ret) {
            if(ret.packages.length > 0){
                isupdate = 1;
            }
        } else {
            api.toast({
                msg: '当前网络不稳定，建议重启软件获取最新版本',
                duration: 2000,
                location: 'middle'
            });
        }
    });
  };
  var StartUpdate = function(){
    api.showProgress({
        modal: true
    });
    var mam = api.require('mam');
    mam.startSmartUpdate(function(ret, err){
        if (ret) {
            if(ret.state == 3){
                api.hideProgress();
                api.toast({
                    msg: '更新完成即将重启软件',
                    duration: 2000,
                    location: 'middle'
                });
                setTimeout(function(){ api.rebootApp()}, 2000);
            }else if(ret.state == 4){
                api.hideProgress();
                api.toast({
                    msg: '当前网络不稳定，建议重启软件获取最新版本',
                    duration: 2000,
                    location: 'middle'
                });
            }
        }
    });
  };

  var GetAppUpdate = function(){
    //{"ID":113,"ConfigKey":"mVersion","ConfigValue":"1.0.0.22","Description":" ","ZipId":"5ae293c4384883477af4ec6d"}
    api.ajax({
      url : $api.posturllujie+'api/SystemConfigs/120',
      method : 'get',
      headers : {
        'Content-Type' : 'application/json'
      },
      timeout: 10
    }, function(ret, err) {
      //console.log(JSON.stringify(ret) + "====" + JSON.stringify(err));
      if (ret) {
        var appversion = ret.ConfigValue;
      	/**
      	 *为1的话是强制更新 不更新不能用
      	 * 为0的话是提示更新不更新也能用
      	 */
      	var isuse = appversion.split(".")[0];
      	/**
      	 *与本地版本号进行对比 如果比本地的大的话就需要更新
      	 */
      	var isversion = appversion.split(".")[3];
      	/**
      	 * 获取本地版本号
      	 */
      	var localversion = $api.app_usevison;
      	/**
      	 *本地APP版本
      	 */
      	var localapp_version = localversion.split(".")[2];
      	/**
      	 *更新日志
      	 */
      	var Description = $api.getStorage('banbenxiufu').Description;
      	if (isuse == "0") {
      		if (parseInt(isversion) > parseInt(localapp_version)) {
      			//提示更新
      			upload_localAPK(Description);
      		}
      	}
      	if (isuse == "1") {
      		if (parseInt(isversion) > parseInt(localapp_version)) {
      			//强制更新
      			upload_localAPK_nouse(Description);
      		}
      	}


      	api.addEventListener({
      	    name:'resume'
      	}, function(ret, err){
      		if (isuse == "1") {
      			if (parseInt(isversion) > parseInt(localapp_version)) {
      				//强制更新
      				upload_localAPK_nouse(Description);
      			}
      		}
      	});

      }
    });
  }



})();
