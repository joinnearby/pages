var baseUrl = "/cloud/internal"
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

	//TODO load

	lastId.push('new lastId')
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
//彻底删除记录
function removeitem(itemid) {
	console.log('deleteitem: ' + itemid)
}
//软删除
function deleteitem(itemid) {
	console.log('deleteitem: ' + itemid)
}
//确认删除
function submititem(iname, itemid) {
	var id = iname + '_' + itemid
	console.log('submititem: ' + id)
	var input = $('#' + id)
	var text = input.text()
	var td = input.parent()
	$(td).text(text)
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
					if(values[j].visible) {
						table = table + '<td class="data-item">' + obj[name] + '</td>\n'
					}
					nextId = obj['hash']
				}
				table = table + '</tr>\n'
			}
			if(dataMap.length < 1) {
				table = table + '<tr>Nothing to be shown</tr>'
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
	      console.log("[joinnearby] "+target+" head success " + result)
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
	$("#search-btn").click(function() {
		console.log('搜索全文')
	});
});