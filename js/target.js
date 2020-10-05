var baseUrl = "/cloud/internal"
var updateUrl = "/cloud/internal/pages/update"
var loginUrl = "/user/login"
var title = ''
var values = []
var dataMap = []
var lastId = ['']
var pageSize = 10
var readonlySet = ['sn', 'hash', 'deleted', 'create_time', 'update_time']
//下一页
function loadmore() {
	console.log('load more')
	var startId = lastId.pop()
	if (startId === undefined) {
		startId = ''
	}
	lastId.push(startId)
	jQuery.ajax({
		url: baseUrl + "/"+target+"/page?pageSize="+pageSize+"&lastId="+startId+"&r=" + Math.random(),
		success: function( result ) {
			$("#load-more").show()
			$("#load-less").show()
			var nextId = ''
			console.log("[joinnearby] "+target+" data success " + result)

			dataMap = result.data
			var table = '<table class="max-table">\n'
			for(var i=0;i<dataMap.length;i++) {
				var obj = dataMap[i]
				table = table + '<tr data-itemid="'+i+'">\n'
				for(var j=0;j<values.length;j++) {
					var name = values[j].name
					var id = name + '_' + i + 'th'

					if(name === 'sn') {
						table = table + '<td style="display:none" id="'+id+'"></td>\n'
					} else if(values[j].visible) {
						table = table + '<td class="data-item" id="'+id+'">' + obj[name] + '</td>\n'
					}

					nextId = obj['sn']
				}
				table = table + '</tr>\n'
			}
			if(dataMap.length < 1) {
				table = table + '<tr>Nothing to be shown</tr>'
			}
			if(dataMap.length < pageSize) {
				$("#load-more").hide()
			}
			if(lastId.length < 2) {
				console.log('we are in the first page right now!')
				$("#load-less").hide()
			}
			table = table + '</table>\n'
			$("#pages-data").html(table)

			lastId.push(nextId)
			console.log("lastId = " + lastId)
			// 点击一条弹出一筐
			$("td.data-item").click(function() {
				var tr = $(this).parent()
				var itemid = tr.data('itemid')
				console.log(itemid)
				$("#modal-title").html('<button type="button" class="btn btn-warning" onclick="removeitem('+itemid +')"> 彻底删除</button>')

				var index = parseInt(itemid)
				var item = dataMap[index]

				var itemhtml = '<table class="min-table">'
				for(var k=0;k<values.length;k++) {
					var iname = values[k].name
					var ivalue = values[k].value
					var ireadonly = values[k].readonly
					var itype = values[k].type
					var idata = item[iname]
					if(ireadonly) {
						if(itype === "img") {
							if(idata === undefined || idata === 'null' || idata === '') {
								idata = item['host'] + '/' + item['name']
							}
							itemhtml = itemhtml + '<tr><td></td><td>' + ivalue + '</td><td><img src="' + idata + '" /></td></tr>'
						} else {
							itemhtml = itemhtml + '<tr><td></td><td>' + ivalue + '</td><td>' + idata + '</td></tr>'
						}
					} else {
						if(itype === "case") {
							var ichoise = values[k].choise
							var options = ''
							for(var i=0;i<ichoise.length;i++) {
								var kv = ichoise[i]
								if(idata === kv.key) {
									options = options + '<option value="'+kv.key+'" selected>'+kv.value+'</option>'
								} else {
									options = options + '<option value="'+kv.key+'">'+kv.value+'</option>'
								}
							}
							var select = '<select class="select" id="' + iname + '_' + itemid + '" onchange="submititem(\''+iname+'\', \''+itemid+'\')">' + options + '</select>'
							itemhtml = itemhtml + '<tr><td></td><td>' + ivalue + '</td><td>' + select + '</td></tr>'
						} else if(itype === "img") {
							if(idata === undefined || idata === 'null' || idata === '') {
								idata = item['host'] + '/' + item['name']
							}
							itemhtml = itemhtml + '<tr><td></td><td>' + ivalue + '</td><td><img src="' + idata + '" /></td></tr>'
						} else {
							itemhtml = itemhtml + '<tr><td><button onclick="updateitem(this, \'' + iname + '\',' + itemid + ')"> <span class="glyphicon glyphicon-edit"> </span> </button> </td><td>' + ivalue + '</td><td>' + idata + '</td></tr>'
						}
					}
				}
				itemhtml = itemhtml+'</table>'
				$("#modal-body").html(itemhtml)
				$("#the-modal").modal('show')
			});
		},
		error: function( xhr, result, obj ) {
			console.log("[joinnearby] "+target+" head error " + result)
		}
	})
	console.log('more loaded')
}
//上一页
function loadless() {
	console.log('load less')
	console.log('remove no use lastId: ' + lastId.pop())
	console.log('remove no use lastId: ' + lastId.pop())
	loadmore()
	console.log('less loaded')
}
function highlight(obj) {
	$(obj).css()
}
//搜索关键词
function searchitem(text) {
	if(text.length < 1) {
		window.location.reload();
	}
	var status = $("#selectStatus").find("option:selected").val()
	jQuery.ajax({
		url: baseUrl + "/"+target+"/page?pageSize=10000&status="+status+"&search="+text+"&r=" + Math.random(),
		success: function( result ) {
			$("#load-more").hide()
			$("#load-less").hide()
			$("#search").val('')
			console.log("[joinnearby] "+target+" data success ")

			dataMap = result.data
			var table = '<table class="max-table">\n'
			for(var i=0;i<dataMap.length;i++) {
				var obj = dataMap[i]
				table = table + '<tr data-itemid="'+i+'">\n'
				for(var j=0;j<values.length;j++) {
					var name = values[j].name
					var id = name + '_' + i + 'th'
					if(values[j].visible) {
						table = table + '<td class="data-item" id="'+id+'">' + obj[name] + '</td>\n'
					}
				}
				table = table + '</tr>\n'
			}
			if(dataMap.length < 1) {
				table = table + '<tr>臣妾搜不到</tr>'
			}

			table = table + '</table>\n'
			$("#pages-data").html(table)
			$("#total").text('总共 ' + result.total + ' 条')
			console.log("lastId = " + lastId)
			$("td.data-item").click(function() {
				var tr = $(this).parent()
				var itemid = tr.data('itemid')
				console.log(itemid)
				$("#modal-title").html('<button type="button" class="btn btn-warning" onclick="removeitem('+itemid +')"> 彻底删除</button>')

				var index = parseInt(itemid)
				var item = dataMap[index]

				var itemhtml = '<table class="min-table">'
				for(var k=0;k<values.length;k++) {
					var iname = values[k].name
					var ivalue = values[k].value
					var ireadonly = values[k].readonly
					var itype = values[k].type
					var idata = item[iname]
					if(ireadonly) {
						if(itype === "img") {
							if(idata === undefined || idata === 'null' || idata === '') {
								idata = item['host'] + '/' + item['name']
							}
							itemhtml = itemhtml + '<tr><td></td><td>' + ivalue + '</td><td><img src="' + idata + '" /></td></tr>'
						} else {
							itemhtml = itemhtml + '<tr><td></td><td>' + ivalue + '</td><td>' + idata + '</td></tr>'
						}
					} else {
						if(itype === "case") {
							var ichoise = values[k].choise
							var options = ''
							for(var i=0;i<ichoise.length;i++) {
								var kv = ichoise[i]
								if(idata === kv.key) {
									options = options + '<option value="'+kv.key+'" selected>'+kv.value+'</option>'
								} else {
									options = options + '<option value="'+kv.key+'">'+kv.value+'</option>'
								}
							}
							var select = '<select class="select" id="' + iname + '_' + itemid + '" onchange="submititem(\''+iname+'\', \''+itemid+'\')">' + options + '</select>'
							itemhtml = itemhtml + '<tr><td></td><td>' + ivalue + '</td><td>' + select + '</td></tr>'
						} else if(itype === "img") {
							if(idata === undefined || idata === 'null' || idata === '') {
								idata = item['host'] + '/' + item['name']
							}
							itemhtml = itemhtml + '<tr><td></td><td>' + ivalue + '</td><td><img src="' + idata + '" /></td></tr>'
						} else {
							itemhtml = itemhtml + '<tr><td><button onclick="updateitem(this, \'' + iname + '\',' + itemid + ')"> <span class="glyphicon glyphicon-edit"> </span> </button> </td><td>' + ivalue + '</td><td>' + idata + '</td></tr>'
						}
					}
				}
				itemhtml = itemhtml+'</table>'
				$("#modal-body").html(itemhtml)
				$("#the-modal").modal('show')
			});
		},
		error: function( xhr, result, obj ) {
			console.log("[joinnearby] "+target+" head error " + result)
		}
	})
}
//提交新增
function submitcreate() {
	var createjson = {}
	var items = $(".create-item")
	var allValue = ''
	for(var i=0;i<items.length;i++)
	{
		var item = items[i]
		var name = $(item).attr('name')
		var value = $(item).val()
		if(value && value.length > 0) {
			createjson[name] = value
			allValue = allValue + value
		}
	}
	if(allValue.length > 1) {
		jQuery.post({
			url: baseUrl + "/" + target + "/insert",
			dataType: 'json',
			contentType:'application/json',
			data: JSON.stringify(createjson),
			success: function (result) {
				$("#the-modal").modal('hide')
				window.location.reload();
			},
			error: function (xhr, result, obj) {
				console.log("[joinnearby] " + target + " insert error " + result)
			}
		})
	}

}
//创建记录
function createitem() {
	if(values.length < 1) {
		console.log('头部信息为空，无法新增')
	}
	$("#the-modal").modal("show")
	$(".modal-title").html("<button onclick='submitcreate()'>新增 <span class='glyphicon glyphicon-send'></span></button>")

	txt = '<table class="min-table">'
	for(var i=0;i<values.length;i++) {
		var obj = values[i]
		var name = obj.name
		var value = obj.value
		if(readonlySet.indexOf(name) > -1) {
			continue
		}
		txt = txt + '<tr><td> ' + value + '</td><td> <input type="text" class="create-item" name="'+name+'" value=""/><td></tr>'
	}
	txt = txt + '</table>'
	$(".modal-body").html(txt)
}
//彻底删除记录
function removeitem(itemid) {
	console.log('removeitem: ' + itemid)
	var obj = dataMap[itemid]
	var hash = obj['hash']
	var sn = obj['sn']
	if(hash === undefined) {
		hash = sn
	}
	jQuery.post({
		url: baseUrl + "/" + target + "/remove/" + hash,
		dataType: 'json',
		contentType:'application/json',
		success: function (result) {
			console.log("[joinnearby] " + target + " delete ok " + result)
			$("#sn_" + itemid + "th").parent().remove()
			$("#the-modal").modal('hide')
		},
		error: function (xhr, result, obj) {
			console.log("[joinnearby] " + target + " delete error " + result)
		}
	})
}
function updatetable(iname, itemid, value) {
	var th = iname + '_' + itemid + 'th'
	$('#' + th).text(value)
}
function updatedata(iname, itemid, value) {
	var obj = dataMap[itemid]
	obj[iname] = value
	console.log('updated data: ' + obj[iname])
}

//确认
function submititem(iname, itemid) {
	var id = iname + '_' + itemid
	console.log('submititem: ' + id)
	var obj = dataMap[itemid]
	var hash = obj['hash']
	var sn = obj['sn']
	if(hash === undefined) {
		hash = sn
	}
	var oldV = obj[iname]
	var input = $('#' + id)
	var value = input.val()
	console.log('ajax sending value to api: ' + value)
	jQuery.post({
		url: updateUrl + "/" + target,
		dataType: 'json',
		contentType:'application/json',
		data: JSON.stringify({
			title: iname,
			hash: hash,
			sn: sn,
			newVal: value,
			oldVal: oldV
		}),
		success: function (result) {
			console.log("[joinnearby] " + target + " update ok " + result)
			if(iname === 'deleted') {
				$("#sn_" + itemid + "th").parent().remove()
				$("#the-modal").modal('hide')
			}
		},
		error: function (xhr, result, obj) {
			console.log("[joinnearby] " + target + " update error " + result)
		}
	})
	//update input value
	var td = input.parent()
	$(td).text(value)
	//update btn color
	var obj = $(td).siblings()[0]
	$(obj).css('background', '')
	var span = $(obj).find('span')[0];
	if($(span).hasClass('glyphicon-log-out')) {
		$(span).removeClass('glyphicon-log-out')
		$(span).addClass('glyphicon-edit')
	}
	//update page
	updatetable(iname, itemid, value)
	updatedata(iname, itemid, value)
}
//点击修改
function updateitem(obj, iname, itemid) {
	var id = iname + '_' + itemid
	console.log('updateitem: ' + id)

	var td = $(obj).parent()
	var input = $(td).siblings()[1]
	var span = $(obj).find('span')[0];
	if($(span).hasClass('glyphicon-edit')) {
		var text = $(input).text()
		var width = $(input).css('width')
		$(td).css('background', '#22be73')
		$(input).html('<input type="text" style="width: '+width+'" id="'+id+'" name="update" value="'+text+'"/><button type="button" onclick="submititem(\'' + iname + '\',' + itemid + ')"><span class="glyphicon glyphicon-ok-circle"></span>保存修改</button>')
		$(span).removeClass('glyphicon-edit')
		$(span).addClass('glyphicon-log-out')
	} else if($(span).hasClass('glyphicon-log-out')) {
		var index = parseInt(itemid)
		var item = dataMap[index]
		var text = item[iname]
		$(td).css('background', '')
		$(input).html('<td>' + text + '</td>')
		$(span).removeClass('glyphicon-log-out')
		$(span).addClass('glyphicon-edit')
	}
	$('#password' + id).bind('keyup', function(event) {
		if (event.keyCode == "13") {
			submititem(iname, itemid)
		}
	});
}
//加载第一页数据
function first() {
	console.log('ajax data for ' + target)
	jQuery.ajax({
		url: baseUrl + "/"+target+"/page?pageSize="+pageSize+"&r=" + Math.random(),
		success: function( result ) {
			$("#load-more").show()
			$("#load-less").hide()
			var nextId = ''
			console.log("[joinnearby] "+target+" data success ")

			dataMap = result.data
			var table = '<table class="max-table">\n'
			for(var i=0;i<dataMap.length;i++) {
				var obj = dataMap[i]
				table = table + '<tr data-itemid="'+i+'">\n'
				for(var j=0;j<values.length;j++) {
					var name = values[j].name
					var id = name + '_' + i + 'th'

					if(name === 'sn') {
						table = table + '<td style="display:none" id="'+id+'"></td>\n'
					} else if(values[j].visible) {
						table = table + '<td class="data-item" id="'+id+'">' + obj[name] + '</td>\n'
					}
					nextId = obj['sn']
				}
				table = table + '</tr>\n'
			}
			if(dataMap.length < 1) {
				table = table + '<tr>Nothing to be shown</tr>'
			}
			if(dataMap.length < pageSize) {
				$("#load-more").hide()
				$("#load-less").hide()
			}
			table = table + '</table>\n'
			$("#pages-data").html(table)
			$("#total").text('总共 ' + result.total + ' 条')
			lastId.push(nextId)
			console.log("lastId = " + lastId)

			$("td.data-item").click(function() {
				var tr = $(this).parent()
				var itemid = tr.data('itemid')
				popItem(itemid)
			});
		},
		error: function( xhr, result, obj ) {
			console.log("[joinnearby] "+target+" head error " + result)
		}
	})
}

function popItem(itemid) {
	console.log(itemid)
	$("#modal-title").html('<button type="button" class="btn btn-warning" onclick="removeitem('+itemid +')"> 彻底删除</button>')

	var index = parseInt(itemid)
	var item = dataMap[index]

	var itemhtml = '<table>'
	for(var k=0;k<values.length;k++) {
		var iname = values[k].name
		var ivalue = values[k].value
		var ireadonly = values[k].readonly
		var itype = values[k].type
		var idata = item[iname]
		if(ireadonly) {
			if(itype === "img") {
				if(idata === undefined || idata === 'null' || idata === '') {
					idata = item['host'] + '/' + item['name']
				}
				itemhtml = itemhtml + '<tr><td></td><td>' + ivalue + '</td><td><img src="' + idata + '" /></td></tr>'
			} else {
				itemhtml = itemhtml + '<tr><td></td><td>' + ivalue + '</td><td>' + idata + '</td></tr>'
			}
		} else {
			if(itype === "case") {
				var ichoise = values[k].choise
				var options = ''
				for(var i=0;i<ichoise.length;i++) {
					var kv = ichoise[i]
					if(idata === kv.key) {
						options = options + '<option value="'+kv.key+'" selected>'+kv.value+'</option>'
					} else {
						options = options + '<option value="'+kv.key+'">'+kv.value+'</option>'
					}
				}
				var select = '<select class="select" id="' + iname + '_' + itemid + '" onchange="submititem(\''+iname+'\', \''+itemid+'\')">' + options + '</select>'
				itemhtml = itemhtml + '<tr><td></td><td>' + ivalue + '</td><td>' + select + '</td></tr>'
			} else if(itype === "img") {
				if(idata === undefined || idata === 'null' || idata === '') {
					idata = item['host'] + '/' + item['name']
				}
				itemhtml = itemhtml + '<tr><td></td><td>' + ivalue + '</td><td><img src="' + idata + '" /></td></tr>'
			} else {
				itemhtml = itemhtml + '<tr><td><button onclick="updateitem(this, \'' + iname + '\',' + itemid + ')"> <span class="glyphicon glyphicon-edit"> </span> </button> </td><td>' + ivalue + '</td><td>' + idata + '</td></tr>'
			}
		}
	}
	var lastone = itemid-1
	var nextone = itemid+1
	itemhtml = itemhtml + '<tr><td><button onclick="popItem(lastone)">上一页</button></td><td></td><td><button onclick="popItem(nextone)">下一页</button></td></tr>'
	itemhtml = itemhtml+'</table>'
	$("#modal-body").html(itemhtml)
	$("#the-modal").modal('show')
}

function submitlogin() {
	var loginjson = {}
	loginjson["username"] = $("#username").val()
	loginjson["password"] = $("#password").val()
	if(loginjson["username"].length < 1 || loginjson["password"].length < 1) {
		console.log("you kidding me?")
		return;
	}
	$("#username").val('')
	$("#password").val('')
	jQuery.post({
		url: loginUrl,
		dataType: 'json',
		contentType:'application/json',
		data: JSON.stringify(loginjson),
		success: function (result) {
			$("#the-modal").modal('hide')
			if(result.state == 200) {
			    var token = result.data
				setCookie("token", token)
				$.ajaxSetup({
					headers:{'token':token}
				});
			}
			window.location.reload();
		},
		error: function (xhr, result, obj) {
			console.log("[joinnearby] " + target + " insert error " + result)
		}
	})
}
function login() {
	console.log("login ... ... ...")
  //show modal
	//ajax login
	//if ok setup ajax header
	//else show modal
	//$.ajaxSetup({
	//      headers:{'token':token}
	// });
	$("#modal-title").html('<button type="button" class="btn btn-warning" onclick="submitlogin()"> Login </button>')
	var itemhtml = '<table>'
	itemhtml = itemhtml + '<tr><td>Username</td><td><input type="text" id="username" value="" placeholder="用户名："></td></tr>'
	itemhtml = itemhtml + '<tr><td>Password</td><td><input type="password" id="password" value="" placeholder="密   码："></td></tr>'
	itemhtml = itemhtml+'</table>'
	$("#modal-body").html(itemhtml)
	$("#the-modal").modal('show')
	$('#username').bind('keyup', function(event) {
		if (event.keyCode == "13") {
			//回车下一步
			$('#password').focus();
		}
	});

	$('#password').bind('keyup', function(event) {
		if (event.keyCode == "13") {
			//回车login
			submitlogin();
		}
	});
}
//加载头部信息
function head() {
	console.log('ajax head for ' + target)
	jQuery.ajax({
	    url: baseUrl + "/pages/head/"+target+"?r=" + Math.random(),
	    success: function( result ) {
	        console.log("[joinnearby] "+target+" head success")
			var data = result.data
			title = data.name
			values = data.values
			var table = '<table class="max-table"><tr>\n'
			for(var i=0;i<values.length;i++) {
				if(values[i].visible) {
					table = table + '<td>' + values[i].value + '</td>\n'
				}
			}
			table = table + '</tr></table>\n'
			$("#pages-head").html(table)
			$("#pages-head").attr("head", values.length)
			$("#pages-head").attr("name", title)
			first()
	    },
	    error: function( xhr, result, obj ) {
	      console.log("[joinnearby] "+target+" head error " + result)
	    }
	})
}

$("#pages-head").empty()
$("#pages-data").empty()
$("#total").empty()
$(document).ready(function(){
	jQuery.ajax({
		url: baseUrl + "/pages/heads?r=" + Math.random(),
		success: function( result ) {
			console.log("[joinnearby] heads success")
			var data = result.data
			if(data.length > 0) {
				$(".navbar-nav").empty()
			}
			for(var i=0;i<data.length;i++) {
				var kv = data[i]
				var li = '<li class="'+kv.key+'"><a href="#'+kv.key+'" onclick="page(\''+kv.key+'\')">'+kv.value+'</a></li>'
				$(".navbar-nav").append(li)
			}
		},
		error: function( xhr, result, obj ) {
			console.log("[joinnearby] heads error " + result)
		}
	})

	var token = getCookie("token")
	console.log('token:'+token)
	if(token == null || token === '') {
		login()
	} else {
		$.ajaxSetup({
			headers:{'token':token}
		});
		$("#log-out").show()
		$("#log-out").click(function () {
			delCookie('token')
			$("#log-out").hide()
			window.location.reload();
		})
		head()
	}
});