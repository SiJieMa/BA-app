function clickisfou(tag){
	var value = $(tag).attr('htmlid');
	var yesid = value+'yes';
	var noid = value+'no';
	$('#'+yesid).removeClass('native');
	$('#'+noid).addClass('native');
	$("#"+value).css("display", "none");
}
function clickisyes(tag){
	var value = $(tag).attr('htmlid');
	var yesid = value+'yes';
	var noid = value+'no';
	$('#'+yesid).addClass('native');
	$('#'+noid).removeClass('native');
	$("#"+value).css("display", "block");
}
function clickisfoustatic(tag){
	var value = $(tag).attr('value');
	var yesid = value+'yes';
	var noid = value+'no';
	$('#'+yesid).removeClass('native');
	$('#'+noid).addClass('native');
}
function clickisyesstatic(tag){
	var value = $(tag).attr('value');
	var yesid = value+'yes';
	var noid = value+'no';
	$('#'+yesid).addClass('native');
	$('#'+noid).removeClass('native');
}


function clickywclwlyes(tag){
	var value = $(tag).attr('value');
	var yesid = value+'yes';
	var noid = value+'no';
	$('#'+yesid).addClass('native');
	$('#'+noid).removeClass('native');
	$("#piclist646").css("display", "block");
	$(".son646html").css("display", "block");
}
function clickywclwlno(tag){
	var value = $(tag).attr('value');
	var yesid = value+'yes';
	var noid = value+'no';
	$('#'+yesid).removeClass('native');
	$('#'+noid).addClass('native');
	$("#piclist646").css("display", "none");
	$(".son646html").css("display", "none");
}
function clickclwlsfplyes(tag){
	var value = $(tag).attr('value');
	var yesid = value+'yes';
	var noid = value+'no';
	$('#'+yesid).addClass('native');
	$('#'+noid).removeClass('native');
	$("#piclist645").css("display", "block");
}
function clickclwlsfplno(tag){
	var value = $(tag).attr('value');
	var yesid = value+'yes';
	var noid = value+'no';
	$('#'+yesid).removeClass('native');
	$('#'+noid).addClass('native');
	$("#piclist645").css("display", "none");
}








function clickisfoustaticxinpin(tag){
	var value = $(tag).attr('value');
	var yesid = value+'yes';
	var noid = value+'no';
	$('#'+yesid).removeClass('native');
	$('#'+noid).addClass('native');
	$("#piclist647").css("display", "none");
}
function clickisyesstaticxinpin(tag){
	var value = $(tag).attr('value');
	var yesid = value+'yes';
	var noid = value+'no';
	$('#'+yesid).addClass('native');
	$('#'+noid).removeClass('native');
	$("#piclist647").css("display", "block");
}

//是否有特殊陈列
function clickisfoustatictechen(tag){
	var value = $(tag).attr('value');
	var yesid = value+'yes';
	var noid = value+'no';
	$('#'+yesid).removeClass('native');
	$('#'+noid).addClass('native');
	$("#piclist622").css("display", "none");
	$("#piclist622").html('<button class="addjingpin">继续添加</button><i class="line"></i>');
	techennum = 1;
}
function clickisyesstatictechen(tag){
	var value = $(tag).attr('value');
	var yesid = value+'yes';
	var noid = value+'no';
	$('#'+yesid).addClass('native');
	$('#'+noid).removeClass('native');
	$("#piclist622").css("display", "block");
	if(techennum == 1){
		$(".addjingpin").before(techen(newguid()));
		techennum++;
	}
}

function finalclickyes(tag){
	var value = $(tag).attr('value');
	var yesid = value+'yes';
	var noid = value+'no';
	$('#'+yesid).addClass('native');
	$('#'+noid).removeClass('native');
}
function finalclickno(tag){
	var value = $(tag).attr('value');
	var yesid = value+'yes';
	var noid = value+'no';
	$('#'+yesid).removeClass('native');
	$('#'+noid).addClass('native');
}
