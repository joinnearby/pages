var baseUrl = "/cloud/internal"
var title = ''
var values = []
var dataMap = []
var lastId = ''
function first() {
	console.log('ajax data for ' + target)
	jQuery.ajax({
		url: baseUrl + "/"+target+"/page?pageSize=10&r=" + Math.random(),
		success: function( result ) {
			console.log("[joinnearby] "+target+" data success " + result)
			dataMap = result.data
			var table = '<table class="max-table">\n'
			for(var i=0;i<dataMap.length;i++) {
				var obj = dataMap[i]
				table = table + '<tr data-itemid="'+i+'">\n'
				for(var j=0;j<values.length;j++) {
					var name = values[j].name
					console.log("append obj." + name)
					if(values[j].visible) {
						table = table + '<td>' + obj[name] + '</td>\n'
					}
					lastId = obj['hash']
				}
				table = table + '</tr>\n'
			}
			if(data.length < 1) {
				table = table + '<tr>Nothing to be shown</tr>'
			}
			table = table + '</table>\n'
			$("#pages-data").html(table)
			console.log("lastId = " + lastId)

			$("td").click(function() {
				var tr = $(this).parent()
				var html = tr.html()
				var itemid = tr.data('itemid')
				console.log(itemid)
				var index = parseInt(itemid)
				$("#modal-title").text('修改数据：'+itemid)
				var item = dataMap[index]
				$("#modal-body").text(JSON.stringify(item))
				console.log(html)
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
			$("#pages-title").text(title)
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