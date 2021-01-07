var ids = ["u", "ur", "mr", "dr", "d", "dl", "ml",  "ul"]
var index = 0
var forever = 10000
var limited = 10000
var randnum = Math.round(Math.random() * 100000) + 10000
var ticket
var state
function red() {
	$("#" + "svg_" + ids[index % 8]).css("stroke", "#ff5f40");
	if (index < limited) {
		setTimeout("green()", 100);
	} else {
		$("#" + "svg_" + ids[index % 8]).css("stroke", "#22be73");
		$("#" + "svg_ur").css("stroke", "#ff5f40");
	}
}
function green() {
	$("#" + "svg_" + ids[index % 8]).css("stroke", "#22be73");
	if (index < limited) {
		setTimeout("red()", 100);
	} else {
		$("#" + "svg_ur").css("stroke", "#ff5f40");
	}
	index++;
}

function showDiv() {
	$("#popWindow").attr("width", "100%");
	$("#popWindow").attr("height", "90%");
    $("#popWindow").show();
}
function closeDiv() {
	$("#popWindow").hide();
}

//JS操作cookies方法!
//写cookies
function setCookie(name,value)
{
	var Days = 30;
	var exp = new Date();
	exp.setTime(exp.getTime() + Days*24*60*60*1000);
	document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}

//读取cookies
function getCookie(name)
{
	var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	if(arr=document.cookie.match(reg))
		return unescape(arr[2]);
	else
		return null;
}

//删除cookies
function delCookie(name)
{
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval=getCookie(name);
	if(cval!=null) {
		document.cookie= name + "="+cval+";expires="+exp.toGMTString();
	}
}


$(document).ready(function() {
	green();
	var main = $("#main")

	$(".navbar-brand").click(function() {
		if (limited <= 0) {
			index = 0
			limited = forever
			green()
		} else {
			limited = 0;
		}
	});
});
