var host = "http://suppresswarnings.com/"
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
function gethtml(uri, container) {

	$.ajax({
		url : uri,
		data : {
			random : randnum
		},
		success : function(result) {
			$(container).html(result);
		},
		error : function(xhr, result, obj) {
			$(container).html("<span>天哪，不见了</span><br/>" + result);
		}
	});
}
function showDiv() {
	$("#popWindow").attr("width", "100%");
	$("#popWindow").attr("height", "100%");
    $("#popWindow").show();
}
function closeDiv() {
	$("#popWindow").hide();
}
(function($) {
	$.extend({
		tipsBox : function(options) {
			options = $.extend({
				obj : null,
				str : "+1",
				startSize : "12px",
				endSize : "30px",
				interval : 600,
				color : "red",
				callback : function() {
				}
			}, options);
			$("body").append("<span class='num'>" + options.str + "</span>");
			var box = $(".num");
			var left = options.obj.offset().left + options.obj.width() / 2;
			var top = options.obj.offset().top - options.obj.height();
			box.css({
				"position" : "absolute",
				"left" : left + "px",
				"top" : top + "px",
				"z-index" : 9999,
				"font-size" : options.startSize,
				"line-height" : options.endSize,
				"color" : options.color
			});
			box.animate({
				"font-size" : options.endSize,
				"opacity" : "0",
				"top" : top - parseInt(options.endSize) + "px"
			}, options.interval, function() {
				box.remove();
				options.callback();
			});
		}
	});
})(jQuery);

function niceIn(prop) {
	prop.find('i').addClass('niceIn');
	setTimeout(function() {
		prop.find('i').removeClass('niceIn');
	}, 1000);
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

	$("#customphone").click(function() {
		$("#customqrcode").toggle()
	});
});
