console.log('你看到了console，那么你可以通过邮件联系我们【13263267623@163.com】我们很高兴和你交流。')
function by(p) {
    return function (m,n) {
        return m[p] - n[p]
    }
}
index = 0
var data = [[0,536],[1,530],[2,528],[3,537],[4,543],[5,543],[6,551],[7,552],[8,563],[9,585],[10,577],[11,581],[12,560],[13,580],[14,580],[15,582],[16,573],[17,568],[18,564],[19,569],[20,573],[21,519],[22,502],[23,528],[24,518],[25,506],[26,513],[27,520],[28,524],[29,521],[30,499],[31,507],[32,516],[33,532],[34,525],[35,507],[36,532],[37,551],[38,541],[39,542],[40,549],[41,563],[42,579],[43,573],[44,611],[45,609],[46,596],[47,589],[48,605],[49,606],[50,615],[51,638],[52,623],[53,620],[54,633],[55,620],[56,609],[57,611],[58,605],[59,599],[60,619],[61,620],[62,615],[63,612],[64,603],[65,617],[66,620],[67,626],[68,643],[69,629],[70,634],[71,627],[72,634],[73,637],[74,617],[75,630],[76,659],[77,678],[78,701],[79,686],[80,692],[81,690],[82,700],[83,698],[84,684],[85,665],[86,670],[87,676],[88,682],[89,672],[90,688],[91,698],[92,681],[93,679],[94,695],[95,693],[96,681],[97,676],[98,684],[99,665],[100,643],[101,649],[102,668],[103,662],[104,670],[105,686],[106,687],[107,541],[108,449],[109,357],[110,294],[111,320],[112,308],[113,313],[114,289],[115,297],[116,304],[117,340],[118,369],[119,385],[120,432],[121,400],[122,380],[123,405],[124,376],[125,375],[126,375],[127,409],[128,412],[129,410],[130,414],[131,406],[132,422],[133,413],[134,425],[135,408],[136,396],[137,398],[138,407],[139,420],[140,397],[141,406],[142,396],[143,396],[144,412],[145,411],[146,399],[147,392],[148,402],[149,410],[150,408],[151,401],[152,407],[153,419],[154,416],[155,438],[156,445],[157,454],[158,445],[159,409],[160,292],[161,224],[162,238],[163,234],[164,264],[165,280],[166,312],[167,297],[168,297],[169,308],[170,292],[171,284],[172,256],[173,287],[174,277],[175,251],[176,263],[177,236],[178,233],[179,247],[180,253],[181,224],[182,248],[183,261],[184,258],[185,256],[186,263],[187,249],[188,268],[189,282],[190,269],[191,291],[192,271],[193,251],[194,292],[195,329],[196,345],[197,323],[198,320],[199,329],[200,332],[201,344],[202,340],[203,321],[204,343],[205,348],[206,357],[207,353],[208,347],[209,359],[210,331],[211,341],[212,349],[213,345],[214,350],[215,350],[216,330],[217,337],[218,334],[219,325],[220,323],[221,340],[222,349],[223,343],[224,349],[225,331],[226,321],[227,276],[228,290],[229,321],[230,362],[231,362],[232,362],[233,371],[234,366],[235,376],[236,352],[237,351],[238,348],[239,354],[240,354],[241,348],[242,342],[243,339],[244,334],[245,333],[246,340],[247,345],[248,345],[249,357],[250,360],[251,353],[252,357],[253,359],[254,357],[255,362],[256,352],[257,343],[258,342],[259,343],[260,318],[261,325],[262,333],[263,333],[264,321],[265,324],[266,331],[267,330],[268,316],[269,340],[270,331],[271,317],[272,320],[273,335],[274,332],[275,329],[276,343],[277,333],[278,337],[279,350],[280,349],[281,343],[282,341],[283,344],[284,338],[285,341],[286,344],[287,343],[288,346],[289,344],[290,336],[291,337],[292,342],[293,345],[294,342],[295,343],[296,348],[297,351],[298,341],[299,354],[300,352],[301,354],[302,356],[303,378],[304,379],[305,371],[306,377],[307,384],[308,385],[309,387],[310,376],[311,378],[312,380],[313,394],[314,389],[315,389],[316,384],[317,378],[318,372],[319,373],[320,368],[321,369],[322,376],[323,378],[324,348],[325,353],[326,352],[327,364],[328,365],[329,358],[330,360],[331,349],[332,354],[333,357],[334,346],[335,354],[336,347],[337,334],[338,341],[339,351],[340,341],[341,344],[342,351],[343,356],[344,361],[345,358],[346,352],[347,353],[348,361],[349,377],[350,376],[351,373],[352,380],[353,379],[354,378],[355,373],[356,377],[357,390],[358,422],[359,420],[360,407],[361,419],[362,417],[363,416],[364,417],[365,420],[366,400],[367,401],[368,406],[369,396],[370,395],[371,402],[372,381],[373,389],[374,382],[375,385],[376,387],[377,385],[378,394],[379,405],[380,397],[381,391],[382,392],[383,404],[384,412],[385,412],[386,405],[387,411],[388,410],[389,404],[390,409],[391,403],[392,410],[393,409],[394,409],[395,404],[396,406],[397,408],[398,404],[399,404],[400,405],[401,406],[402,406],[403,408],[404,433],[405,436],[406,432],[407,437],[408,459],[409,480],[410,475],[411,480],[412,476],[413,482],[414,475],[415,452],[416,460],[417,463],[418,463],[419,454],[420,476],[421,463],[422,456],[423,464],[424,465],[425,465],[426,464],[427,476],[428,521],[429,518],[430,514],[431,508],[432,502],[433,507],[434,499],[435,497],[436,504],[437,503],[438,502],[439,516],[440,507],[441,493],[442,495],[443,477],[444,460],[445,469],[446,467],[447,461],[448,467],[449,470],[450,469],[451,483],[452,444],[453,435],[454,445],[455,445],[456,474],[457,455],[458,481],[459,496],[460,492],[461,490],[462,489],[463,478],[464,488],[465,486],[466,488],[467,484],[468,467],[469,466],[470,479],[471,483],[472,493],[473,470],[474,475],[475,470],[476,477],[477,483],[478,484],[479,495],[480,508],[481,506],[482,518],[483,521],[484,529],[485,533],[486,543],[487,529],[488,525],[489,525],[490,521],[491,526],[492,527],[493,522],[494,515],[495,543],[496,532],[497,526],[498,523],[499,502],[500,494],[501,487],[502,499],[503,512],[504,530],[505,537],[506,538],[507,536],[508,535],[509,551],[510,537],[511,542],[512,546],[513,559],[514,553],[515,541],[516,556],[517,568],[518,560],[519,553],[520,548],[521,552],[522,578],[523,588],[524,585],[525,574],[526,560],[527,562],[528,570],[529,560],[530,555],[531,569],[532,573],[533,570],[534,579],[535,566],[536,564],[537,574],[538,582],[539,572],[540,573],[541,579],[542,585],[543,569],[544,554],[545,559],[546,556],[547,556],[548,546],[549,545],[550,539],[551,547],[552,566],[553,562],[554,543],[555,522],[556,520],[557,525],[558,529],[559,540],[560,541],[561,537],[562,538],[563,548],[564,539],[565,527],[566,518],[567,510],[568,477],[569,475],[570,504],[571,494],[572,507],[573,507],[574,515],[575,505],[576,512],[577,509],[578,513],[579,482],[580,496],[581,497],[582,469],[583,475],[584,441],[585,483],[586,502],[587,532],[588,541],[589,530],[590,522],[591,527],[592,516],[593,515],[594,508],[595,511],[596,515],[597,523],[598,538],[599,424],[600,381],[601,366],[602,377],[603,381],[604,370],[605,370],[606,366],[607,343],[608,345],[609,362],[610,371],[611,373],[612,395],[613,398],[614,391],[615,385],[616,379],[617,392],[618,396],[619,403],[620,388],[621,394],[622,389],[623,393],[624,379],[625,384],[626,372],[627,385],[628,395],[629,387],[630,398],[631,400],[632,396],[633,384],[634,383],[635,392],[636,380],[637,392],[638,393],[639,397],[640,401],[641,415],[642,416],[643,415],[644,411],[645,418],[646,420],[647,425],[648,419],[649,415],[650,408],[651,413],[652,407],[653,408],[654,414],[655,414],[656,403],[657,399],[658,415],[659,397],[660,395],[661,392],[662,384],[663,399],[664,397],[665,389],[666,398],[667,409],[668,424],[669,419],[670,429],[671,429]]
function showCanvas() {
    var width = document.getElementById("header").offsetWidth
    var height = document.getElementById("header").offsetHeight
    var ratio = (window.devicePixelRatio || 1)
    var canvasHtml = '<canvas width="'+width*ratio+'" height="'+height*ratio+'" id="canvas" style="position: absolute; left: 0px; top: 0px; width: '+width+'px; height: '+height+'px; border: 0px;"></canvas>'
    $("#header").before(canvasHtml)

    var width = document.getElementById("header").offsetWidth
    var height = document.getElementById("header").offsetHeight
    var ratio = (window.devicePixelRatio || 1)

    var lastweek = parseInt(new Date().getTime()/1000 - 7*24*60*60)
    var url = "https://api.blockchain.info/price/index-series?base=BTC&quote=USD&start="+lastweek+"&scale=900&cors=true"
    jQuery.ajax({
        url: url,
        success: function( result ) {
            console.log('BTC分时数据：'+result.length)
            var length = result.length
            var line = parseInt((ratio*width)/length)
            var c = document.getElementById("canvas");
            var context = c.getContext("2d");
            context.scale(ratio, ratio);
            context.lineWidth = line
            context.strokeStyle = "#ffffff"
            context.fillStyle = "#32e0c4"
            context.beginPath();
            var btc = []
            for(var i=0;i<length;i++) {
                btc.push([i,parseInt(result[i]["price"] - 10100)])
            }
            data = btc
            index = 0
            for(var i =0;i<data.length;i++) {
                setTimeout("nextLine()", 1);
            }
        },
        error: function( xhr, result, obj ) {
            console.log("[index] ajax err: " + result)
            var length = data.length
            var line = parseInt((ratio*width)/length)
            var c = document.getElementById("canvas");
            var context = c.getContext("2d");
            context.scale(ratio, ratio);
            context.lineWidth = line
            context.strokeStyle = "#ffffff"
            context.fillStyle = "#32e0c4"
            context.beginPath();

            index = 0
            for(var i =0;i<data.length;i++) {
                setTimeout("nextLine()", 1);
            }
        }
    })
}

function nextLine() {
    if(index+3 >= data.length) {
        $("#header").css("background","#22be73")
    }
    var d = data[index]
    var c = document.getElementById("canvas");
    var context = c.getContext("2d");
    var ratio = (window.devicePixelRatio || 1)
    var width = document.getElementById("header").offsetWidth
    var height = document.getElementById("header").offsetHeight
    var line = context.lineWidth
    var x = d[0]*line
    var y = d[1]/2
    context.moveTo(x,height)
    context.lineTo(x,y)
    context.stroke()
    context.fillRect(x-1,y,line,height)
    index += 1
}

jQuery.ajax({
    url: "/cloud/internal/product/page?pageSize=100&r=" + Math.random(),
    success: function( result ) {
        var products = result.data
        products.sort(by("sort"))
        var div = $('.products')
        for (var k = 0; k < products.length; k++) {
            var product = products[k]
            var body = '<div class="product company">' +
                '<div class="image" style="box-shadow: rgba(22, 78, 99, 0.25) 0px 0px 30px 0px inset;">' +
                '<img src="'+product.image+'" width="100%" alt="" role="presentation">' +
                '</div>' +
                '<div class="info">' +
                '<svg class="eclipse" viewBox="0 0 10 10" preserveAspectRatio="none" shape-rendering="geometricPrecision">' +
                '<ellipse cx="5" rx="7" cy="30" ry="30"></ellipse>' +
                '</svg>' +
                '<h3 data-testid="fund-name">'+product.name+'</h3>' +
                '    <div>' +
                '    <span class="visit positive">'+product.price+'</span>' +
                '</div>' +
                '</div>' +
                '<div class="count">' +
                '<svg viewBox="0 0 24 24" version="1.1"><path d="M17.3066008,11.4605461 L7,11.4605461 C7,6.23577174 9.30754945,2 12.1533004,2 C14.9999015,2 17.3066008,6.23577174 17.3066008,11.4605461 Z M11.3066008,22.4605461 L1,22.4605461 C1,17.2357717 3.30754945,13 6.15330038,13 C8.99990154,13 11.3066008,17.2357717 11.3066008,22.4605461 Z M23.3066008,22.4605461 L13,22.4605461 C13,17.2357717 15.3075495,13 18.1533004,13 C20.9999015,13 23.3066008,17.2357717 23.3066008,22.4605461 Z"></path>' +
                '</svg>' +
                '<span class="percent-value negative">访问 '+product.count+' 次</span>' +
                '</div>' +
                '</div>'
            div.append(body)
        }

    },error: function( xhr, result, obj ) {
      console.log("[product] ajax err: " + result)
    }
  })
showCanvas()