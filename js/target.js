var baseUrl = "/cloud/internal"
var updateUrl = "/cloud/internal/pages/update"
var title = ''
var values = []
var dataMap = []
var lastId = ['']
var pointer = 0
//下一页
function loadmore() {
	console.log('load more')
	var startId = lastId.pop()
	lastId.push(startId)
	jQuery.ajax({
		url: baseUrl + "/"+target+"/page?pageSize=10&lastId="+startId+"&r=" + Math.random(),
		success: function( result ) {
			$("#load-more").show()
			$("#load-less").show()
			var nextId = ''
			console.log("[joinnearby] "+target+" data success " + result)
			pointer = 0
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
					nextId = obj['hash']
				}
				table = table + '</tr>\n'
			}
			if(dataMap.length < 1) {
				table = table + '<tr>Nothing to be shown</tr>'
			}
			if(dataMap.length < 10) {
				$("#load-more").hide()
			}
			table = table + '</table>\n'
			$("#pages-data").html(table)
			lastId.push(nextId)
			console.log("lastId = " + lastId)

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
	var nouse = lastId.pop()
	console.log('remove no use lastId: ' + nouse)
	loadmore()
	console.log('less loaded')
}
function searchitem(text) {
	if(text.length < 2) {
		console.log("请输入搜索词")
		return
	}
	alert("正在搜索..." + text)
	jQuery.ajax({
		url: baseUrl + "/"+target+"/page?pageSize=10000&search="+text+"&r=" + Math.random(),
		success: function( result ) {
			$("#load-more").hide()
			$("#load-less").hide()

			console.log("[joinnearby] "+target+" data success " + result)
			pointer = 0
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

			console.log("lastId = " + lastId)

		},
		error: function( xhr, result, obj ) {
			console.log("[joinnearby] "+target+" head error " + result)
		}
	})
}
function submitcreate() {
	var createjson = {}
	var items = $(".create-item")
	for(var i=0;i<items.length;i++)
	{
		var item = items[i]
		createjson[$(item).attr('name')] = $(item).val()
	}
	console.log(JSON.stringify(createjson))
	alert("正在上传...")
	$("#the-modal").modal("hide")
}

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
		console.log(name + ' = ' + value)
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
	jQuery.post({
		url: baseUrl + "/" + target + "/remove/" + hash,
		dataType: 'json',
		contentType:'application/json',
		success: function (result) {
			console.log("[joinnearby] " + target + " delete ok " + result)
			$("#hash_" + itemid + "th").parent().remove()
			$("#the-modal").modal('hide')
		},
		error: function (xhr, result, obj) {
			console.log("[joinnearby] " + target + " delete error " + result)
		}
	})
}
//软删除
function deleteitem(itemid) {
	console.log('deleteitem: ' + itemid)
	var obj = dataMap[itemid]
	var hash = obj['hash']
	jQuery.post({
		url: baseUrl + "/" + target + "/delete/" + hash,
		dataType: 'json',
		contentType:'application/json',
		success: function (result) {
			console.log("[joinnearby] " + target + " delete ok " + result)
			$("#hash_" + itemid + "th").parent().remove()
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
//确认删除
function submititem(iname, itemid) {
	var id = iname + '_' + itemid
	console.log('submititem: ' + id)
	var obj = dataMap[itemid]
	var hash = obj['hash']
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
			newVal: value,
			oldVal: oldV
		}),
		success: function (result) {
			console.log("[joinnearby] " + target + " update ok " + result)
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
	var text = $(input).text()
	var width = $(input).css('width')
	$(td).css('background', '#22be73')
	$(input).html('<input type="text" style="width: '+width+'" id="'+id+'" name="update" value="'+text+'"/><button type="button" onclick="submititem(\'' + iname + '\',' + itemid + ')"><span class="glyphicon glyphicon-ok-circle"></span></button>')
}
//加载第一页数据
function first() {
	console.log('ajax data for ' + target)
	jQuery.ajax({
		url: baseUrl + "/"+target+"/page?pageSize=10&r=" + Math.random(),
		success: function( result ) {
			$("#load-more").show()
			$("#load-less").show()
			var nextId = ''
			console.log("[joinnearby] "+target+" data success " + result)
			pointer = 0
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
					nextId = obj['hash']
				}
				table = table + '</tr>\n'
			}
			if(dataMap.length < 1) {
				table = table + '<tr>Nothing to be shown</tr>'
			}
			if(dataMap.length < 10) {
				$("#load-more").hide()
				$("#load-less").hide()
			}
			table = table + '</table>\n'
			$("#pages-data").html(table)
			lastId.push(nextId)
			console.log("lastId = " + lastId)

			$("td.data-item").click(function() {
				var tr = $(this).parent()
				var itemid = tr.data('itemid')
				console.log(itemid)
				$("#modal-title").html('<button type="button" class="btn btn-warning" onclick="removeitem('+itemid +')"> 彻底删除</button><button type="button" class="btn btn-default" onclick="deleteitem('+itemid +')"> 删除</button>')

				var index = parseInt(itemid)
				var item = dataMap[index]

				var itemhtml = '<table>'
				for(var k=0;k<values.length;k++) {
					var iname = values[k].name
					var ivalue = values[k].value
					var idata = item[iname]
					itemhtml = itemhtml + '<tr><td><button onclick="updateitem(this, \'' + iname + '\',' + itemid + ')"> <span class="glyphicon glyphicon-edit"> </span> </button> </td><td>' + ivalue + '</td><td>' + idata + '</td></tr>'
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
				console.log("append " + JSON.stringify(values[i]))
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

$("#pages-head").html('')
$("#pages-data").html('')

$(document).ready(function(){
	head()

});