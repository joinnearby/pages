var baseUrl = "/cloud/internal"
function head() {
	console.log('ajax head for stream')
	jQuery.ajax({
	    url: baseUrl + "/pages/head/videoInfo?r=" + Math.random(),
	    success: function( result ) {
	      console.log("[joinnearby] stream head success " + result)
			var data = result.data
			var name = data.name
			var values = data.values
			var table = '<table class="max-table">\n' +
				'            <tr>\n'
			for(var i=0;i<values.length;i++) {
				console.log("append " + values[i])
				table = table + '                <td>' + values[i] + '</td>\n'
			}
			table = table + '            </tr>\n' +
				'        </table>'
			$("#pages-head").html(table)
			$("#pages-head").attr("head", values.length)
			$("#pages-head").attr("name", name)
	    },
	    error: function( xhr, result, obj ) {
	      console.log("[joinnearby] stream head error " + result)
	    }
	})
}



head()
