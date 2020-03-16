(function(window){
	var u = {};

	u.isupdate = function(){
		$kunchi.kunchiget("api/SystemConfigs/107", "", function(ret,err){
			//{"ID":107,"ConfigKey":"DictVersion","ConfigValue":"25","Description":"字典版本号"}
			//console.log(JSON.stringify(ret) + "--网络获取-" + JSON.stringify(err));
			if(ret){
				var zidiankey = $api.getStorage("zidiankeyN1");
				console.log(parseInt(zidiankey) +"--------"+ parseInt(ret.ConfigValue));
				if(parseInt(zidiankey) < parseInt(ret.ConfigValue)){
					u.getzidianonline(ret.ConfigValue);
				}else{
					api.hideProgress();
					u.isnewzidian();
				}
			}else{
				api.hideProgress();
				u.isnewzidian();
			}
		});
	}

	u.getzidianonline = function(zidiankey){
		$kunchi.kunchiget("api/T_DirTable", "", function(ret,err){
			console.log("获取成功");
			//console.log(JSON.stringify(ret) + "--网络获取-" + JSON.stringify(err));
			if(ret){
				$api.setStorage("zidianvalue",ret);
				$api.setStorage("zidiankeyN1",zidiankey);
				u.jiexizidian(ret);
				api.hideProgress();
			}else{
				api.hideProgress();
			}
		});
	}

	u.getzidian = function(){
		u.openfile(function(fd){
			u.readfile(fd);
		});
	}

	u.openfile = function(callBack){
		var fs = api.require('fs');
		fs.open({
		    path: 'widget://res/zidian.json',
		    flags: 'read'
		}, function(ret, err) {
//			console.log(JSON.stringify(ret) + "--打开文件-" + JSON.stringify(err));
		    if (ret.status) {
		        var fd = ret.fd;
		        callBack(fd);
		    }
		});
	}

	u.readfile = function(fd){
		var fs = api.require('fs');
		fs.read({
		    fd: fd
		}, function(ret, err) {
//			console.log(JSON.stringify(ret) + "--打开文件-" + JSON.stringify(err));
		    if (ret.status) {
		        $api.setStorage('zidianvalue',$api.strToJson(ret.data));
		        u.jiexizidian($api.strToJson(ret.data));
		    }
			api.hideProgress();
		});
	}
	/**
	 *初始化字典并判断本地是否有字典
	 */
	u.zidianinit = function(){
		//u.getzidianonline(0);
		
		var zidiankey = $api.getStorage("zidiankeyN1");
		if(!isempty(zidiankey)){
			u.isupdate();
		}else{
			$api.setStorage("zidiankeyN1","0");
			u.getzidian();
		}
	}

	/**
	 *字典解析错误的时候自动修复字典
	 */
	u.xiufuzidian = function(){
		api.showProgress({
		    title: '未知错误,修复中...',
		    text: '请稍等',
		    modal: true
		});
		$kunchi.kunchiget("api/T_DirTable", "", function(ret,err){
			if(ret){
				$api.setStorage("zidianvalue",ret);
				$api.setStorage("zidiankey",zidiankey);
				api.hideProgress();
		        api.sendEvent({
				    name: 'zidianxiufu'
				});
			}else{
				api.hideProgress();
				api.alert({
				    title: '提示',
				    msg: '内部错误,请稍后重试.',
				}, function(aaa, bbb) {
					api.closeWin();
				});
			}
		});
	}

	/**
	 *检测当前的字典是否是最新的字典 如果不是则重新获取一下
	 */
	u.isnewzidian = function(){
		var baiAuthoState = $api.getStorage('baiAuthoState');
		if(isempty(baiAuthoState)){
			$api.setStorage("zidiankey","24");
			u.getzidian();
		}
	}


	/**
	 *讲字典解析成若干个分类 方便每个页面取用
	 */
	u.jiexizidian = function(message_zidian){
		/**
		 * 入店操作菜单列表
		 */
		var renwulist = new Array();
		/**
		 * 陈列检查报告列表菜单
		 */
		var chenlielist = new Array();
		/**
		 *提交报告的时候所需要的内容
		 */
		var fenlei_listzidian = new Array();
		/**
		 * 设置BA排版所需要的
		 */
		var worktypename = new Array();
		var worktypelist = new Array();
		/**
		 * 选择多个工作类型
		 */
		var showallworklist_zidian = new Array();
		/**
		 *单选的时候的工作类型列表
		 */
		var danxuanworklistzidian = new Array();
		/**
		 *获取BA带教报告列表
		 */
		var daijiaobaogaozidian = new Array();
		/**
		 *货单列表的列表
		 */
		var OrderTypezidianlist = new Array();


		/**
		 *仓库列表
		 */
		var CangKuList = new Array();
		/**
		 *销售单对应的客户列表
		 */
		var XSkehuList = new Array();
		
		/**
		 *新巡店计划 进店之后操作列表 
		 */
		var StoreDisplayList = new Array(); 
		//人机沟通选项
		var WeiChatList = new Array();
		//货单菜单的列表
		var SKUTypeList = new Array();
		//陈列类型
		var DisplayPositionTypeList = new Array();
		//检查类型
		var CheckItmesList = new Array();
		//盘盈原因
		var panying = new Array();
		//盘亏原因
		var pankui = new Array();
		/**
		 *提交订单的时候的订单状态  BA提交订单 待审核的状态
		 */

		for (var a = 0; a < message_zidian.length; a++) {
			
			//获取盘盈原因以及盘亏原因
			if(message_zidian[a].cDictClass == 'StockType'){
				var pankuiid = message_zidian[a].id;
				if(message_zidian[a].iParentDict != 0){
					var objpankui = {
						cDictName: message_zidian[a].cDictName,
						id: pankuiid
					}
					pankui.push(objpankui);
				}
			}
			
			if(message_zidian[a].cDictClass == 'StockInType'){
				var panyingid = message_zidian[a].id;
				if(message_zidian[a].iParentDict != 0){
					var objpanying = {
						cDictName: message_zidian[a].cDictName,
						id: panyingid
					}
					panying.push(objpanying);
				}
			}
			
			
			/**
			 *提交订单的时候的订单状态  BA提交订单 待审核的状态
			 */
			if(message_zidian[a].cDictClass == 'AuthorState'){
				//BA提交订单待审核
				var baiAuthoState = message_zidian[a].id;
				if(message_zidian[a].cDictValue == '0'){
					$api.setStorage('baiAuthoState',baiAuthoState);
				}
				//审核订单状态 已通过
				if(message_zidian[a].cDictValue == '99'){
					$api.setStorage('saleiAuthoStateyes',baiAuthoState);
				}
				//审核订单状态 已驳回
				if(message_zidian[a].cDictValue == '1'){
					$api.setStorage('saleiAuthoStateno',baiAuthoState);
				}
			}
			
			//检测项目
			if(message_zidian[a].cDictClass == 'CheckItmes'){
				if(message_zidian[a].cDictValue == '626'){
					$api.setStorage('shifouquehuo',message_zidian[a].cDictName);
				}
				if(message_zidian[a].cDictValue == '627'){
					$api.setStorage('shifouyichang',message_zidian[a].cDictName);
				}
				if(message_zidian[a].cDictValue == '650'){
					$api.setStorage('shifouyouheidian',message_zidian[a].cDictName);
				}
				if(message_zidian[a].cDictValue == '651'){
					$api.setStorage('shifoujinxiaoqi',message_zidian[a].cDictName);
				}
				if(message_zidian[a].cDictValue == '635'){
					if(message_zidian[a].id == 652){
						$api.setStorage('shiyongshifouqiquan',message_zidian[a].cDictName);
					}
					if(message_zidian[a].id == 653){
						$api.setStorage('shiyongshifouzang',message_zidian[a].cDictName);
					}
					if(message_zidian[a].id == 654){
						$api.setStorage('shiyongshifouyongwan',message_zidian[a].cDictName);
					}
				}
				if(message_zidian[a].cDictValue == '637'){
					if(message_zidian[a].id == 660){
						$api.setStorage('shujushouji',message_zidian[a].cDictName);
					}
					if(message_zidian[a].id == 661){
						$api.setStorage('jingpinxiaoshouqingkuang',message_zidian[a].cDictName);
					}
				}
				
			}
			
			/**
			 *获取新巡店中的对应的进店任务 的计划列表
			 */
			if(message_zidian[a].cDictClass == 'StoreDisplay'){
				if(message_zidian[a].iParentDict != 0){
					var StoreDisplayobject = new Object();
					StoreDisplayobject.id = message_zidian[a].id;
					StoreDisplayobject.cDictName = message_zidian[a].cDictName;
					StoreDisplayobject.cDictValue = message_zidian[a].cDictValue;
					StoreDisplayList.push(StoreDisplayobject);
				}
			}
			
			//陈列类型
			if(message_zidian[a].cDictClass == 'DisplayPositionType'){
				if(message_zidian[a].iParentDict != 0){
					var DisplayPositionTypeObject = new Object();
					DisplayPositionTypeObject.id = message_zidian[a].id;
					DisplayPositionTypeObject.cDictName = message_zidian[a].cDictName;
					DisplayPositionTypeList.push(DisplayPositionTypeObject);
				}
			}
			//检查类型
			if(message_zidian[a].cDictClass == 'CheckItmes'){
				if(message_zidian[a].iParentDict != 0){
					var CheckItmesObject = new Object();
					CheckItmesObject.id = message_zidian[a].id;
					CheckItmesObject.cDictValue = message_zidian[a].cDictValue;
					CheckItmesObject.cDictName = message_zidian[a].cDictName;
					CheckItmesList.push(CheckItmesObject);
				}
			}
			
			
			/**
			 *获取新巡店中的人际沟通列表选项
			 */
			if(message_zidian[a].cDictClass == 'WeiChat'){
				if(message_zidian[a].iParentDict != 0){
					var WeiChatobject = new Object();
					WeiChatobject.id = message_zidian[a].id;
					WeiChatobject.cDictName = message_zidian[a].cDictName;
					WeiChatList.push(WeiChatobject);
				}
			}
			
			if(message_zidian[a].cDictClass == 'SKUType'){
				if(message_zidian[a].iParentDict != 0){
					var SKUTypeobject = new Object();
					SKUTypeobject.id = message_zidian[a].id;
					SKUTypeobject.cDictName = message_zidian[a].cDictName;
					SKUTypeList.push(SKUTypeobject);
					if(message_zidian[a].cDictValue == '2'){
						$api.setStorage("jinhuopinlv",message_zidian[a].cDictName);
					}
				}
			}
			
			if(message_zidian[a].cDictClass == 'AuthorState'){
				//审核订单状态 已通过
				var baiAuthoState = message_zidian[a].id;
				if(message_zidian[a].cDictValue == '99'){
					$api.setStorage('saleiAuthoStateyes',baiAuthoState);
				}
				if(message_zidian[a].cDictValue == '1'){
					$api.setStorage('saleiAuthoStateno',baiAuthoState);
				}
				if(message_zidian[a].cDictValue == '2'){
					$api.setStorage('saleiAuthoStatezhuguan',baiAuthoState);
				}
			}

			if(message_zidian[a].cDictClass == 'OrderState'){
				//BA提交订单待发货
				var baiAuthoState = message_zidian[a].id;
				if(message_zidian[a].cDictValue == '0'){
					$api.setStorage('baiOrderState',baiAuthoState);
				}else if(message_zidian[a].cDictValue == '98'){
					$api.setStorage('baiOrderStateyi',baiAuthoState);
				}else if(message_zidian[a].cDictValue == '100'){
					$api.setStorage('baiOrderStatejushou',baiAuthoState);
				}else if(message_zidian[a].cDictValue == '1'){
					$api.setStorage('baiOrderStateyifahuo',baiAuthoState);
				}
			}

			//销售客户列表  XSkehuList
			if(message_zidian[a].cDictClass == 'NCCustomerType'){
				if(message_zidian[a].iParentDict != 0){
					var XSkehuListJSON = new Object();
	    			XSkehuListJSON.id = message_zidian[a].id;
	    			XSkehuListJSON.cDictName = message_zidian[a].cDictName;
	    			XSkehuListJSON.cDictValue = message_zidian[a].cDictValue;
	    			XSkehuList.push(XSkehuListJSON);
				}
			}

			if(message_zidian[a].cDictClass == 'OrderType'){
				//门店调拨单对应的id
				var baiAuthoState = message_zidian[a].id;
				if(message_zidian[a].cDictValue == 'DB'){
					$api.setStorage('mendiandiaobodan',baiAuthoState);
				}else if(message_zidian[a].cDictValue == 'FK'){
					$api.setStorage('fankudan',baiAuthoState);
				}else if(message_zidian[a].cDictValue == 'XS'){
					$api.setStorage('xiaoshoudan',baiAuthoState);
				}else if(message_zidian[a].cDictValue == 'TH'){
					$api.setStorage('xiaoshoutuihuodan',baiAuthoState);
				}else if(message_zidian[a].cDictValue == 'WL'){
					$api.setStorage('wuliaoshiyongdan',baiAuthoState);
				}else if(message_zidian[a].cDictValue == 'ZK'){
					$api.setStorage('shangpinzhuanwuliao',baiAuthoState);
				}else if(message_zidian[a].cDictValue == 'WD'){
					$api.setStorage('wuliaodan',baiAuthoState);
				}else if(message_zidian[a].cDictValue == 'DH'){
					$api.setStorage('diaohuodan',baiAuthoState);
				}else if(message_zidian[a].cDictValue == 'HGLS'){
					$api.setStorage('hangaomendiandiaobo',baiAuthoState);
				}
				if(message_zidian[a].iParentDict != 0){
					var OrderTypezidianlistson = new Object();
	    			OrderTypezidianlistson.id = message_zidian[a].id;
	    			OrderTypezidianlistson.cDictName = message_zidian[a].cDictName;
	    			OrderTypezidianlistson.cDictValue = message_zidian[a].cDictValue;
	    			OrderTypezidianlist.push(OrderTypezidianlistson);
				}
			}

			if (message_zidian[a].cDictClass == "ReportType") {
				var cInType = message_zidian[a].id;
				//入店的时候所需要的入店ID
				if(message_zidian[a].cDictName == "入店"){
					$api.setStorage('zidianjiexicInType',cInType);
				}else if(message_zidian[a].cDictName == "出店"){
					$api.setStorage('zidianjiexicoutType',cInType);
				}
			}

    		if((message_zidian[a].cDictClass == "EventType")&&(message_zidian[a].iParentDict != 0)){
    			var renwuobject = new Object();
    			renwuobject.id = message_zidian[a].id;
    			renwuobject.cDictName = message_zidian[a].cDictName;
    			renwuobject.cDictClass = message_zidian[a].cDictClass;
    			renwulist.push(renwuobject);
			}

    		if((message_zidian[a].cDictClass == "Category")&&(message_zidian[a].iParentDict != 0)){
				var typeobject = new Object();
				typeobject.title = message_zidian[a].cDictName;
				typeobject.bg = "#f2f2f2";
				typeobject.bgSelected = "#b2e8fd";
				typeobject.id = message_zidian[a].id;
				chenlielist.push(typeobject);
				var title = message_zidian[a].cDictName;
				fenlei_listzidian.push(title);
			}

			if((message_zidian[a].cDictClass == "WorkType")&&(message_zidian[a].iParentDict != 0)){
				worktypename.push(message_zidian[a].cDictName);
				worktypelist.push(message_zidian[a]);
			}
			if(message_zidian[a].cDictClass == "Event"){
				var showallworklistson = new Object();
				showallworklistson.id = message_zidian[a].id;
				showallworklistson.cDictName = message_zidian[a].cDictName;
				showallworklist_zidian.push(showallworklistson);
				if(message_zidian[a].iParentDict != 0){
					danxuanworklistzidian.push(showallworklistson);
				}
			}

    		if(message_zidian[a].cDictClass == "ReportReview"){
	    		daijiaobaogaozidian.push(message_zidian[a]);
    		}

    		if((message_zidian[a].cDictClass == "StoreHouse")&&(message_zidian[a].iParentDict != 0)){
				var cangkuobject = new Object();
				cangkuobject.cDictName = message_zidian[a].cDictName;
				cangkuobject.cDictValue = message_zidian[a].cDictValue;
				cangkuobject.id = message_zidian[a].id;
				CangKuList.push(cangkuobject);
			}
			//把已签收的文字保存起来
			if((message_zidian[a].cDictClass == 'OrderState')&&(message_zidian[a].cDictValue == '98')){
				$api.setStorage('yiqianshou',message_zidian[a].cDictName);
			}
			//把已通过的文字保存起来
			if((message_zidian[a].cDictClass == 'AuthorState')&&(message_zidian[a].cDictValue == '99')){
				$api.setStorage('yitongguo',message_zidian[a].cDictName);
			}
		}

		$api.setStorage('CangKuList',CangKuList);
		$api.setStorage('XSkehuList',XSkehuList);
		$api.setStorage('renwulist',renwulist);
		$api.setStorage('chenlielist',chenlielist);
		$api.setStorage('fenlei_listzidian',fenlei_listzidian);
		$api.setStorage('worktypename',worktypename);
		$api.setStorage('worktypelist',worktypelist);
		$api.setStorage('showallworklist_zidian',showallworklist_zidian);
		$api.setStorage('danxuanworklistzidian',danxuanworklistzidian);
		$api.setStorage('daijiaobaogaozidian',daijiaobaogaozidian);
		$api.setStorage('OrderTypezidianlist',OrderTypezidianlist);
		$api.setStorage('StoreDisplayList',StoreDisplayList);
		$api.setStorage('WeiChatList',WeiChatList);
		$api.setStorage('SKUTypeList',SKUTypeList);
		$api.setStorage('DisplayPositionTypeList',DisplayPositionTypeList);
		$api.setStorage('CheckItmesList',CheckItmesList);
		$api.setStorage('panying',panying);
		$api.setStorage('pankui',pankui);
		console.log('准备完成');
	}


	window.$file = u;
})(window);
