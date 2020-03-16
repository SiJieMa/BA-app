function copyallcrash() {
	var fs = api.require('fs');
	fs.readDir({
		path : '/storage/emulated/0/UZMap/log'
	}, function(ret, err) {
		if (ret.status) {
			console.log(JSON.stringify(ret));
		} else {
			console.log(JSON.stringify(err));
		}
	});
}

function readcrash() {
	var fs = api.require('fs');
	fs.readDir({
		path : '/storage/emulated/0/UZMap/log/crash'
	}, function(ret, err) {
		if (ret.status) {
			console.log(JSON.stringify(ret));
		} else {
			console.log(JSON.stringify(err));
		}
	});
}

function openfile(url) {
	var fs = api.require('fs');
	var ret = fs.openSync({
		path : url,
		flags : 'read_write'
	});
	if (ret.status) {
		var fd = ret.fd;
		readfile(fd);
	} else {
		
	}
}

function readfile(fd){
	var retread = fs.readSync({
		fd : fd
	});
	if (retread.status) {
		alert('操作成功！');
	} else {
		alert('操作失败！');
	}
}
