/**
 *接口获取的版本号
 *
 * 第一个代表是否是强制更新 1强制 0不强制
 *
 *
 */
function getversion() {
	/**
	 *{"ID":113,"ConfigKey":"mVersion","ConfigValue":"1.0.0.22","Description":" ","ZipId":"5ae293c4384883477af4ec6d"}
	 * 需要版本号
	 * 更新信息
	 * 更新zip包下载对应云数据库id NewZipId
	 * 最全的zip下载对应的数据库id AllZipId
	 */


	api.ajax({
		url : $api.posturllujie+'api/SystemConfigs/114',
		method : 'get',
		headers : {
			'Content-Type' : 'application/json'
		},
		timeout: 10
	}, function(ret, err) {
		//console.log(JSON.stringify(ret) + "====" + JSON.stringify(err));
		if (ret) {
			$api.setStorage('banbenxiufu', ret);
			setTimeout('app_update()', 300);
		}
	});
}

/**
 *接口获取的版本号 测试版云修复
 */
function getversion_diyyun() {
	/**
	 *{"ID":113,
	 * "ConfigKey":"mVersion",
	 * "ConfigValue":"1.0.0.22",
	 * "Description":" ",
	 * "NewZipId":"5ae293c4384883477af4ec6d",
	 * "AllZipId":"5ae293c4384883477af4ec6d"}
	 * 需要版本号
	 * 更新信息
	 * 更新zip包下载对应云数据库id NewZipId
	 * 最全的zip下载对应的数据库id AllZipId
	 */
	api.showProgress({
		title : '请稍等',
		text : '准备测试环境',
		modal : false
	});
	api.ajax({
		url : $api.posturllujie+'api/SystemConfigs/114',
		method : 'get',
		headers : {
			'Content-Type' : 'application/json'
		}
	}, function(ret, err) {
		//console.log(JSON.stringify(ret) + "====" + JSON.stringify(err));
		if (ret) {
			$api.setStorage('banbenxiufu', ret);
			setTimeout('test_update()', 300);
		} else {
			api.hideProgress();
			api.alert({
				title : '提示',
				msg : '获取版本信息失败,请检查网络后重新尝试.',
			}, function(ccc, ddd) {
				api.closeWin();
			});
		}
	});
}

/********检索测试环境是否有更新*********************************************************************************************************************************/

var isrestart = 0;

var zhengshi_testversion = 0;

var ishas_update = 0;

function test_update() {

	var appversion = $api.getStorage('banbenxiufu').ConfigValue;
	zhengshi_testversion = appversion;
	var newair_test = appversion.split(".")[2];

	get_nowversion(function(localversion) {
		if (localversion != 'no') {
			var newairlocal_test = localversion.split(".")[2];
			if (parseInt(newair_test) > parseInt(newairlocal_test)) {
				//云更新
				if (parseInt(newair_test) % 2 == 0) {
					//不强制重新启动 0
					isrestart = 0;
					ishas_update = 1;
					yanzheng_filelist();
				}

				if (parseInt(newair_test) % 2 != 0) {
					//强制重新启动 1
					isrestart = 1;
					ishas_update = 1;
					yanzheng_filelist();
				}
			} else {
				ishas_update = 0;
				yanzheng_filelist();
			}
		} else {
			ishas_update = 0;
			yanzheng_filelist();
		}
	});
}

//如果版本号一致的话 先下载旧版本的filelist进行本地比对 如果没问题的话就可以使用了 如果不对的话则下载最新的zip包重新解压并使用

function yanzheng_filelist() {
	var fs = api.require('fs');
	fs.exist({
		path : 'fs://kunchiba/kunchiba/.filelist.txt'
	}, function(ret, err) {
		if (ret.exist) {
			jiance_alllist();
		} else {
			delkunchifolder(function(num) {
				checkupdate($api.getStorage('banbenxiufu').AllZipId, "fs://kunchiba.zip", function(msg) {
					if (msg == 'yes') {
						jieyazipxiazai();
					} else {
						api.hideProgress();
						alert('当前网络错误,无法获取更新数据.');
					}
				});
			});
		}
	});
}

/**
 *首先要检测 本地文件列表是否完整
 */
function jiance_alllist() {
	var fs = api.require('fs');
	var retopen = fs.openSync({
		path : 'fs://kunchiba/kunchiba/.filelist.txt',
		flags : 'read'
	});
	var fd = '';
	if (retopen.status) {
		fd = retopen.fd;
		var ret = fs.readSync({
			fd : fd,
			offset : 0
		});
		if (ret.status) {
			//alert(JSON.stringify(ret));
			is_readyhas(ret);
		} else {
			api.hideProgress();
			alert('读取测试环境失败,请截图上报01.');
		}
	} else {
		api.hideProgress();
		alert('读取测试环境失败,请截图上报02.');
	}

}

function is_readyhas(ret) {
	var isreloadzip = 0;
	var fs = api.require('fs');
	var retmsg = ret.data.split("/A6067912196305/");
	var retmsglength = ret.data.split("/A6067912196305/").length;
	for (var a = 0; a < retmsglength; a++) {
		//console.log(retmsg[a] + '----177');
		var listsonhtml = retmsg[a].replace(/[\r\n]/g, "");
		//console.log(listsonhtml + '----179');
		listsonhtml = $api.trim(listsonhtml);
		//console.log(listsonhtml + '----181');
		if (listsonhtml == "") {
			continue;
		}
		listsonhtml = 'fs://kunchiba/kunchiba/' + listsonhtml;

		//console.log(listsonhtml + '----187');

		var retfile = fs.existSync({
			path : listsonhtml
		});
		if (!retfile.exist) {
			//console.log(listsonhtml + '----193');
			isreloadzip = 1;
			break;
		}
	}
	/**
	 *如果查询到有一个不存在则删除源文件并重新创建
	 */
	if (isreloadzip == 1) {
		delkunchifolder(function(num) {
			checkupdate($api.getStorage('banbenxiufu').AllZipId, "fs://kunchiba.zip", function(msg) {
				if (msg == 'yes') {
					jieyazipxiazai();
				} else {
					api.hideProgress();
					alert('当前网络错误,无法获取更新数据.');
				}
			});
		});
	} else {
		if (ishas_update == 1) {
			checkupdate($api.getStorage('banbenxiufu').NewZipId, "fs://kunchiba.zip", function(msg) {
				if (msg == 'yes') {
					jieyazipxiazai();
				} else {
					api.hideProgress();
					alert('当前网络错误,无法获取更新数据.');
				}
			});
		} else {
			api.hideProgress();
		}
	}
}

/**
 *删除根目录文件夹
 */
function delkunchifolder(callBack) {
	var fs = api.require('fs');
	fs.rmdir({
		path : 'fs://kunchiba'
	}, function(ret, err) {
		callBack("1");
	});
}

function jieyazipxiazai() {
	var zip = api.require('zip');
	zip.unarchive({
		file : 'fs://kunchiba.zip',
		toPath : 'fs://kunchiba'
	}, function(ret, err) {
		if (ret.status) {
			delfolder();
		} else {
			alert('部署测试环境失败,请截图上报10');
		}
	});
}

function delfolder() {
	var fs = api.require('fs');
	fs.remove({
		path : 'fs://kunchiba.zip'
	}, function(aaa, bbb) {
		if (aaa.status) {
			var ret = fs.existSync({
				path : 'fs://kunchiba.zip'
			});
			if (ret.exist) {
				api.hideProgress();
				alert('读取测试环境失败,请截图上报04.');
			} else {
				api.hideProgress();
				saveversion(zhengshi_testversion);
				api.alert({
					title : '提示',
					msg : '测试环境更新完整，即将重启.',
				}, function(ccc, ddd) {
					$api.clearStorage();
					setTimeout("closeframe()", 300);
				});
			}
		}
	});
}

function closeframe() {
	api.rebootApp();
}

//如果版本号不一致的话 先对旧版本进行对比 如果没问题则下载更新文件 如果有问题则直接下载最新的文件进行解压并使用

/**
 *	下载所需要的文件
 */
function checkupdate(mcmid, savePath, callBack) {
	var model = api.require('model');
	model.config({
		appId : 'A6067912196305',
		appKey : '4A7848BB-E883-5D9A-60DC-FACE78793515',
		host : 'https://d.apicloud.com'
	});
	model.downloadFile({
		report : false,
		id : mcmid,
		savePath : savePath
	}, function(ret, err) {
		if (ret) {
			if (ret.state == "1") {
				callBack("yes");
			}
		} else {
			callBack("no");
		}
	});
}

/*****************************************************************************************************************************************/

/*******检测正式版是否发生云更新**********************************************************************************************************************************/

function get_zhengshi_yun_update() {
	/**
	 * 首先要判断云修复是否完成
	 */
	var updatemessage = $api.getStorage('updatemessage');
	//判断是否有手机号需要强制更新
	var updagephone = updatemessage.split("&")[0];
	//将需要更新的手机号保存到本地 待用户登录之后判断是否需要重启
	$api.setStorage('qiangzhichongqiuser', updagephone);
	//判断是否需要强制重启  0不需要强制重启  1 需要强制重启 2帮助测试环境进行重启
	var ischongqi = updatemessage.split("&")[1];
	//显示更新的内容说明
	var updat_infortimation = updatemessage.split("&")[2];

	if (ischongqi == '0') {
		api.alert({
			title : '更新提示',
			msg : updat_infortimation,
		}, function(ret, err) {
		});
	}
	if (ischongqi == '1') {
		api.alert({
			title : '更新提示',
			msg : updat_infortimation,
		}, function(qiangret, qiangerr) {
			api.rebootApp();
		});
	}
	if (ischongqi == '2') {
		api.alert({
			title : '更新提示',
			msg : updat_infortimation,
		}, function(qiangret, qiangerr) {
		});
	}
	if (ischongqi == '3') {
		api.rebootApp();
	}
}

/**
 * 判断并检索当前账户是否需要重启
 */
function ischongqi(phone) {
	var qiangzhichongqiuser = $api.getStorage('qiangzhichongqiuser');
	if (!isempty(qiangzhichongqiuser)) {
		if (phone.indexOf(qiangzhichongqiuser) > -1) {
			api.alert({
				title : '更新提示',
				msg : '部分功能更新,为了您能正常使用,软件将重启一次！',
			}, function(qiangret, qiangerr) {
				api.rebootApp();
			});
		}
	}
}

/*****************************************************************************************************************************************/

/*****APP版本大更新************************************************************************************************************************************/

function app_update() {
	var appversion = $api.getStorage('banbenxiufu').ConfigValue;
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


//	api.addEventListener({
//	    name:'resume'
//	}, function(ret, err){
//		
//	});
	
	
	api.addEventListener({
	    name: 'huidaoqiantai'
	}, function(ret, err) {
		console.log("yunxiufu");
	    if (isuse == "1") {
			if (parseInt(isversion) > parseInt(localapp_version)) {
				//强制更新
				upload_localAPK_nouse(Description);
			}
		}
	});

}

/**
 *更新本地app  提示更新
 */
function upload_localAPK(msg) {
	api.confirm({
		title : '版本更新',
		msg : msg,
		buttons : ['立即更新', '下次更新']
	}, function(ccc, ddd) {
		var index = ccc.buttonIndex;
		if (index == 1) {
			begin_uploadapk();
		}
	});
}

/**
 *更新本地app  强制更新
 */
function upload_localAPK_nouse(msg) {
	api.alert({
		title : '版本更新',
		msg : msg,
	}, function(ret, err) {
		begin_uploadapk();
	});
}

function begin_uploadapk() {
	var systemType = api.systemType;
	if (systemType != "ios") {
		api.alert({
			title : '提示',
			msg : '即将打开浏览器,打开之后点击直接安装即可.',
		}, function(xyzret, xyzerr) {
			api.openApp({
//				androidPkg : 'android.intent.action.VIEW',
//				mimeType : 'text/html',
				uri : 'https://www.pgyer.com/ldD8'
			}, function(abcret, abcerr) {
			});
		});
	} else {
		api.alert({
			title : '提示',
			msg : '点击下方HOME键回到系统桌面,打开App Store -> 进入更新列表 -> 下拉刷新之后更新"BA管理"',
		}, function(ret, err) {
			api.closeWidget({
				id : 'A6067912196305',
	            silent: true
			});
		});
	}
}

/*****************************************************************************************************************************************/
/******保存当前版本号***********************************************************************************************************************************/

function saveversion(versionnum) {
	var fs = api.require('fs');
	var retversion = fs.existSync({
		path : 'fs://.version.txt'
	});
	if (retversion.exist) {
		//删除文件之后重新创建
		var retremove = fs.removeSync({
			path : 'fs://.version.txt'
		});
		if (retremove.status) {
			create_version(versionnum);
		} else {
			create_version(versionnum);
		}
	} else {
		create_version(versionnum);
	}
}

function create_version(versionnum) {
	var fs = api.require('fs');
	//如果没有版本记录文件  则创建一个文件
	var retcreat = fs.createFileSync({
		path : 'fs://.version.txt'
	});
	if (retcreat.status) {
		//将版本号保存到里面
		var retopen = fs.openSync({
			path : 'fs://.version.txt',
			flags : 'read_write'
		});
		if (retopen.status) {
			//将版本号保存到里面
			var retwrite = fs.writeSync({
				fd : retopen.fd,
				data : versionnum,
				offset : 0
			});
			if (retwrite.status) {
			}
		}
	}
}

/**
 * 获取版本号
 */

function get_nowversion(callBack) {
	var fs = api.require('fs');
	var retversion = fs.existSync({
		path : 'fs://.version.txt'
	});
	if (retversion.exist) {
		//将版本号读取出来
		var retopen = fs.openSync({
			path : 'fs://.version.txt',
			flags : 'read_write'
		});
		if (retopen.status) {
			var retread = fs.readSync({
				fd : retopen.fd,
				offset : 0
			});
			if (retread.status) {
				var numversion = retread.data;
				numversion = numversion.replace(/[\r\n]/g, "");
				numversion = $api.trim(numversion);
				callBack(numversion);
			} else {
				callBack('no');
			}
		}
	} else {
		callBack('no');
	}
}

/*****************************************************************************************************************************************/
