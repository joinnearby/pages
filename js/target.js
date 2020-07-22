var baseUrl = "/cloud/internal"
var title = ''
var values = []
var dataMap = []
var lastId = ''
var pointer = 0
function deleteitem(itemid) {
	console.log('deleteitem: ' + itemid)
}

function updateitem(iname, itemid) {
	console.log('updateitem: ' + itemid + ' @ ' + iname)
}
function first() {
	console.log('ajax data for ' + target)
	jQuery.ajax({
		url: baseUrl + "/"+target+"/page?pageSize=10&r=" + Math.random(),
		success: function( result ) {
			console.log("[joinnearby] "+target+" data success " + result)
			pointer = 0
			dataMap = result.data
			var table = '<table class="max-table">\n'
			for(var i=0;i<dataMap.length;i++) {
				var obj = dataMap[i]
				table = table + '<tr data-itemid="'+i+'">\n'
				for(var j=0;j<values.length;j++) {
					var name = values[j].name
					console.log("append obj." + name)
					if(values[j].visible) {
						table = table + '<td class="data-item">' + obj[name] + '</td>\n'
					}
					lastId = obj['hash']
				}
				table = table + '</tr>\n'
			}
			if(dataMap.length < 1) {
				table = table + '<tr>Nothing to be shown</tr>'
			}
			table = table + '</table>\n'
			$("#pages-data").html(table)
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
					itemhtml = itemhtml + '<tr><td><button onclick="updateitem(\'' + iname + '\',' + itemid + ')"> <span class="glyphicon glyphicon-edit"> </span> </button> </td><td>' + ivalue + '</td><td>' + idata + '</td></tr>'
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
				console.log("append " + values[i])
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
		console.log()
	});
});