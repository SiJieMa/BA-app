var c, ctx, startx;
function initpic() {
	var canvaswh = 'float:left; border: 1px solid #000000; display: none;';
	var canvas = '<canvas width="395" height="657" id="canvasstnthesis" style="' + canvaswh + '"></canvas>';
	var imgcanvas = '<img width="395" height="657" id="canvasimg" alt="The Scream" style="' + canvaswh + '">';
	var bodyel = document.getElementById("body");
	$api.append(bodyel, imgcanvas);
	$api.append(bodyel, canvas);
}
function putpic(text1, text2, text3, text4, text5, picurl, callBack) {

	document.getElementById("canvasimg").src = picurl;
	c = document.getElementById("canvasstnthesis");

	if (!c.getContext) {
		callBack("no", picurl);
	} else {
		ctx = c.getContext("2d");
		
		ctx.fillStyle = "#ffffff";
		ctx.fillRect(0, 0, 395, 657);
		
		ctx.font = "16px 宋体";
		ctx.fillStyle = "#000";
		ctx.fillText("门店名称:"+text1, 10, 25);
	
		ctx.font = "16px 宋体";
		ctx.fillStyle = "#000";
		ctx.fillText("人员名称:"+text2, 10, 45);
	
		ctx.font = "16px 宋体";
		ctx.fillStyle = "#000";
		ctx.fillText("照片区域:"+text3, 170, 45);
		
		ctx.font = "16px 宋体";
		ctx.fillStyle = "#000";
		ctx.fillText("照片类型:"+text4, 10, 65);
	
		ctx.font = "16px 宋体";
		ctx.fillStyle = "#000";
		ctx.fillText("时间:"+text5, 170, 65);
		
		
		var img = document.getElementById("canvasimg");

		img.onload = function() {
			ctx.drawImage(img, 10, 80, 375, 550);
			var image = c.toDataURL("image/jpeg", 0.99);
			callBack("yes", image);
		}
	}

}
function putpic_yasuo(picurl, callBack) {

	document.getElementById("canvasimg").src = picurl;
	c = document.getElementById("canvasstnthesis");

	if (!c.getContext) {
		callBack("no", picurl);
	} else {
		ctx = c.getContext("2d");
		
		ctx.fillStyle = "#ffffff";
		ctx.fillRect(0, 0, 395, 657);
		
		var img = document.getElementById("canvasimg");

		img.onload = function() {
			ctx.drawImage(img, 5, 5, 385, 647);
			var image = c.toDataURL("image/jpeg", 0.99);
			callBack("yes", image);
		}
	}

}

function savepic(){
	var image = c.toDataURL("image/jpg");
	document.getElementById("testidimg").src = image;
	console.log(image);
	
}

function canclecanvas(){
	var canvasstnthesis = document.getElementById("canvasstnthesis");
	var canvasimg = document.getElementById("canvasimg");
	$api.remove(canvasstnthesis);
	$api.remove(canvasimg);
}

var t = Date.now();  
  
function sleep(d){  
    while(Date.now - t <= d);  
}   
