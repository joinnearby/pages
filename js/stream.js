var baseUrl = "/cloud/internal"
function head() {
	jQuery.ajax({
	    url: baseUrl + "/pages/head/stream?r=" + Math.random(),
	    success: function( result ) {
	      console.log("[joinnearby] stream head success " + result)
	    },
	    error: function( xhr, result, obj ) {
	      console.log("[joinnearby] stream head error " + result)
	    }
	})
}
