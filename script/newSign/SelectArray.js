var Haslist = new Array();
function InitHasSelect(){
	var getinitlist = api.pageParam.getinitlist;
	for(var b = 0; b < getinitlist.length; b++){
		var iProductIdonline = getinitlist[b].iProductId;
		Haslist.push(iProductIdonline);
	}
}


function clicklist(ID, selected){
	if(selected){
		pushHasList(ID);
	}else{
		delHasList(ID);
	}
}


function pushHasList(ID){
	var isallow = 0;
	for(var a = 0; a < Haslist.length; a++){
		var HasID = Haslist[a];
		if(HasID == ID){
			isallow = 1;
			break;
		}
	}
	if(isallow == 0){
		Haslist.push(ID);
	}
}

function delHasList(ID){
	var iddel = 0;
	for(var a = 0; a < Haslist.length; a++){
		var HasID = Haslist[a];
		if(HasID == ID){
			iddel = a;
			break;
		}
	}
	Haslist.splice(iddel, 1);
}