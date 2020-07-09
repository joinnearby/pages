var baseUrl = "/cloud/internal"
var title = ''
var values = []
var dataMap = {}
var lastId = ''
function data() {
	console.log('ajax data for stream')
	jQuery.ajax({
		url: baseUrl + "/stream/page?pageSize=10r=" + Math.random(),
		success: function( result ) {
			console.log("[joinnearby] stream data success " + result)
			var data = result.data
			var table = '<table class="max-table">\n'
			for(var i=0;i<data.length;i++) {
				var obj = data[i]
				table = table + '<tr>\n'
				for(var j=0;j<values.length;j++) {
					var name = values[j]
					console.log("append obj." + name)
					table = table + '<td>' + obj[name] + '</td>\n'
				}
				table = table + '</tr>\n'
			}
			table = table + '</table>\n'
			$("#pages-data").html(table)
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
				table = table + '<td>' + values[i] + '</td>\n'
			}
			table = table + '</tr></table>\n'
			$("#pages-head").html(table)
			$("#pages-head").attr("head", values.length)
			$("#pages-head").attr("name", title)
			$("#pages-title").text(title)
			data()
	    },
	    error: function( xhr, result, obj ) {
	      console.log("[joinnearby] stream head error " + result)
	    }
	})
}



head()
