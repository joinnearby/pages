var baseUrl = "/cloud/internal"
var title = ''
var values = []
var dataMap = {}
var lastId = ''
function first() {
	console.log('ajax data for stream')
	jQuery.ajax({
		url: baseUrl + "/stream/page?pageSize=10&r=" + Math.random(),
		success: function( result ) {
			console.log("[joinnearby] stream data success " + result)
			var data = result.data
			var table = '<table class="max-table">\n'
			for(var i=0;i<data.length;i++) {
				var obj = data[i]
				table = table + '<tr>\n'
				for(var j=0;j<values.length;j++) {
					var name = values[j].name
					console.log("append obj." + name)
					if(values[i].visible === 'true') {
						table = table + '<td>' + obj[name] + '</td>\n'
					}
					var id = obj['hash']
					dataMap[id] = obj
					lastId = id
				}
				table = table + '</tr>\n'
			}
			if(data.length < 1) {
				table = table + '<tr>Nothing to be shown</tr>'
			}
			table = table + '</table>\n'
			$("#pages-data").html(table)
			console.log("lastId = " + lastId)
		},
		error: function( xhr, result, obj ) {
			console.log("[joinnearby] stream head error " + result)
		}
	})
}

function head() {
	console.log('ajax head for stream')
	jQuery.ajax({
	    url: baseUrl + "/pages/head/videoInfo?r=" + Math.random(),
	    success: function( result ) {
	      console.log("[joinnearby] stream head success " + result)
			var data = result.data
			title = data.name
			values = data.values
			var table = '<table class="max-table"><tr>\n'
			for(var i=0;i<values.length;i++) {
				console.log("append " + values[i])
				if(values[i].visible === 'true') {
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
	      console.log("[joinnearby] stream head error " + result)
	    }
	})
}

$("#pages-head").html('')
$("#pages-data").html('')

head()
