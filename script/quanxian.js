/**
 * 判断是否有权限 如果没有 立即去设置
 *
 * calendar camera contacts location microphone麦克风 phone sensor传感器 storage sms
 */
function confirmPer(perm) {
    var has = hasPermission(perm);
    if (!has || !has[0] || !has[0].granted) {
        api.confirm({
            title: '提醒',
            msg: '没有获得 ' + perm + " 权限\n是否前往设置？",
            buttons: ['去设置', '取消']
        }, function(ret, err) {
            if (1 == ret.buttonIndex) {
                reqPermission(perm);
            }
        });
        return false;
    }
    return true;
}

function reqPermission(one_per, callback) {
    var perms = new Array();
    perms.push(one_per);
    api.requestPermission({
        list: perms,
        code: 100001
    }, function(ret, err) {
        if (callback) {
            callback(ret);
            return;
        }
        var str = '请求结果：\n';
        str += '请求码: ' + ret.code + '\n';
        str += "是否勾选\"不再询问\"按钮: " + (ret.never ? '是' : '否') + '\n';
        str += '请求结果: \n';
        var list = ret.list;
        for (var i in list) {
            str += list[i].name + '=' + list[i].granted + '\n';
        }
        apialert(str);
        console.log(JSON.stringify(ret));
    });
}

function hasPermission(one_per) {
    var perms = new Array();
    perms.push(one_per);
    var rets = api.hasPermission({
        list: perms
    });
    if (!one_per) {
        apialert('判断结果：' + JSON.stringify(rets));
        return;
    }
    return rets;
}

function apialert(_msg, callback) {
    api.alert({
        title: '提示',
        msg: _msg,
    }, function(ret, err) {
        if (callback) {
            callback();
        }
    });
}
