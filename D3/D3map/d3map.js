window.onload = function() {
	var countries = Datamap.prototype.worldTopo.objects.world.geometries;

	var dataJSON = {AFG : 2.067824648,
ALB : 28.15693431,
DZA : 0.821248331,
ASM : 87.7,
ADO : 34.04255319,
AGO : 46.40731531,
ATG : 22.27272727,
ARG : 9.906858285,
ARM : 11.66139796,
ABW : 2.333333333,
AUS : 16.23875662,
AUT : 46.87935442,
AZE : 13.7843429,
BHS : 51.44855145,
BHR : 0.779220779,
BGD : 10.97795191,
BRB : 14.65116279,
BLR : 42.54842048,
BEL : 22.56935271,
BLZ : 59.89916703,
BEN : 38.23164243,
BMU : 20.0,
BTN : 72.27562505,
BOL : 50.55294009,
BIH : 42.67578125,
BWA : 19.12727401,
BRA : 59.04878358,
VGB : 24.13333333,
BRN : 72.10626186,
BGR : 35.21554901,
BFA : 19.55409357,
BDI : 10.74766355,
CPV : 22.30769231,
KHM : 53.57466576,
CMR : 39.80453132,
CAN : 38.16667052,
CYM : 52.91666667,
CAF : 35.58701724,
TCD : 3.871505718,
CHI : 4.210526316,
CHL : 23.8523695,
CHN : 22.18966958,
COL : 52.72802163,
COM : 19.88178399,
ZAR : 67.3024415,
COG : 65.39970717,
CRI : 53.97571485,
CIV : 32.70754717,
HRV : 34.3459614,
CUB : 30.06134393,
CYP : 18.69047619,
CZE : 34.53321248,
DNK : 14.42847042,
DJI : 0.241587575,
DMA : 57.77333333,
DOM : 41.03890728,
ECU : 50.52295056,
EGY : 0.073333668,
SLV : 12.78957529,
GNQ : 55.90017825,
ERI : 14.95049505,
EST : 52.65392781,
ETH : 12.499,
FRO : 0.05730659,
FJI : 55.67597154,
FIN : 73.11198131,
FRA : 31.02690679,
PYF : 42.34972678,
GAB : 89.26145845,
GMB : 48.22134387,
GEO : 40.61591596,
DEU : 32.76238021,
GHA : 41.03454338,
GIB : 0.0,
GRC : 31.45073701,
GRL : 0.000535997,
GRD : 49.97058824,
GUM : 46.2962963,
GTM : 33.03471445,
GIN : 25.89939769,
GNB : 70.12802276,
GUY : 83.9522479,
HTI : 3.519593614,
HND : 41.04030744,
HUN : 22.85430244,
ISL : 0.490773067,
IND : 23.77311911,
IDN : 50.23819118,
IRN : 6.565337263,
IRQ : 1.89952109,
IRL : 10.94527508,
IMY : 6.070175439,
ISR : 7.624768946,
ITA : 31.60739784,
JAM : 30.95106187,
JPN : 68.46061005,
JOR : 1.09822032,
KAZ : 1.225691744,
KEN : 7.753803985,
KIR : 15.0,
PRK : 41.782244,
KOR : 63.4477664,
KWT : 0.350729517,
KGZ : 3.321167883,
LAO : 81.28860485,
LVA : 53.96365975,
LBN : 13.42130987,
LSO : 1.613965744,
LBR : 43.38662791,
LBY : 0.123327688,
LIE : 43.125,
LTU : 34.7826087,
LUX : 33.47490347,
MKD : 39.57176844,
MDG : 21.43863871,
MWI : 33.37929571,
MYS : 67.55440572,
MDV : 3.333333333,
MLI : 3.864152304,
MLT : 1.09375,
MHL : 70.22222222,
MRT : 0.217813137,
MUS : 19.01477833,
MEX : 33.97206718,
FSM : 91.81428571,
MDA : 12.43917275,
MNG : 8.080022658,
MNE : 61.48698885,
MAR : 12.61931436,
MOZ : 48.24639487,
MMR : 44.4677528,
NAM : 8.404086045,
NRU : 0.0,
NPL : 25.3644925,
NLD : 11.16721117,
NCL : 45.89715536,
NZL : 38.55531503,
NIC : 25.87668273,
NER : 0.901555222,
NGA : 7.678118515,
MNP : 64.13043478,
NOR : 33.16130269,
OMN : 0.006462036,
PAK : 1.909506019,
PLW : 87.60869565,
PAN : 62.10653753,
PNG : 74.10457978,
PRY : 38.56783287,
PER : 57.79140625,
PHL : 26.96448335,
POL : 30.81218771,
PRT : 34.73799127,
PRI : 55.91319053,
QAT : 0.0,
ROM : 29.82654436,
RUS : 49.76106545,
RWA : 19.45683016,
WSM : 60.42402827,
SMR : 0.0,
STP : 55.83333333,
SAU : 0.454484135,
SEN : 42.96992676,
SRB : 31.0999314,
SYC : 89.38461538,
SLE : 42.17234691,
SGP : 23.12588402,
SVK : 40.34270504,
SVN : 61.96623635,
SLB : 78.06359414,
SOM : 10.14282526,
ZAF : 7.617736524,
ESP : 36.82027548,
LKA : 33.00908946,
KNA : 42.30769231,
LCA : 33.27868852,
MAF : 18.38235294,
VCT : 69.23076923,
SDN : 8.084991582,
SUR : 98.28205128,
SWZ : 34.06976744,
SWE : 68.91785732,
CHE : 31.73398117,
SYR : 2.673855035,
TJK : 2.943698199,
TZA : 51.99819372,
THA : 32.09888626,
TMP : 46.133154,
TGO : 3.456517742,
TON : 12.5,
TTO : 45.70760234,
TUN : 6.700566426,
TUR : 15.22159999,
TKM : 8.782159045,
TCA : 36.21052632,
TUV : 33.33333333,
UGA : 10.35806902,
UKR : 16.6695436,
ARE : 3.858851675,
GBR : 12.99549456,
USA : 33.89972254,
URY : 10.54165238,
UZB : 7.569111425,
VUT : 36.09515997,
VEN : 52.92557111,
VNM : 47.64408037,
VIR : 50.28571429,
WBG : 1.523255814,
YEM : 1.039831809,
ZMB : 65.4232637,
ZWE : 36.35000646,
}
	
	var dataSet = {}; // The datastructure that will be filled with the correctly layout data for D3
	
	// Determining the color scale function
	var forestValues = Object.keys(dataJSON).map(function(key){return dataJSON[key]});
	var miniValue = Math.min.apply(null, forestValues);
 	var maxiValue = Math.max.apply(null, forestValues);
	var paletteScale = d3.scale.linear()
            .domain([miniValue,maxiValue])
            .range(['#ffffe5','#004529']); // green colors

	// fill dataset in appropriate format
	// example = {countryCode {datavalue: value, fillcolor: color(value)},...}
    Object.keys(dataJSON).forEach(function(key){
        dataSet[key] = { forest:  parseInt(dataJSON[key]), fillColor: paletteScale(dataJSON[key])};
    });
	
	// Fill the entire map with the correct colors and interactive labels!
    var map = new Datamap({
        element: document.getElementById('container'),
		fills: {
            defaultFill: '#CCC'
        },
		//add the dataset to the map
		data: dataSet, 
		
		// hover over info
		geographyConfig: {
            popupTemplate: function(geo, data){
                return ['<div class="hoverinfo"><strong>',
                        geo.properties.name,
                        '<br />Forest area: ' + data.forest + "%",
                        '</strong></div>'].join('');
			}
		}
    });
	var width = 260,
    height = 10;

	// And now the legend..
	var svg = d3.select("body").append("svg")
		.attr("width", width)
		.attr("height", height);

	var gradient = svg.append("defs")
	  .append("linearGradient")
		.attr("id", "gradient")
		.attr("x1", "0%")
		.attr("y1", "0%")
		.attr("x2", "100%")
		.attr("y2", "0%")
		.attr("spreadMethod", "pad");

	gradient.append("stop")
		.attr("offset", "0%")
		.attr("stop-color", "#ffffe5")
		
	gradient.append("stop")
		.attr("offset", "100%")
		.attr("stop-color", '#004529')

	svg.append("rect")
		.attr("width", width)
		.attr("height", height)
		.style("fill", "url(#gradient)");
	
	svg.append("text")
		.attr("class", "legendTitle")
		.attr("x", 0)
		.attr("y", -2)
		.text("forestation");

	//Define x-axis
	var xScale = d3.scale.linear()
	 .range([0, width])
	 .domain([0, maxiValue] );

	var xAxis = d3.svg.axis()
		  .orient("bottom")
		  .ticks(5)
		  .scale(xScale);

	//Set up X axis
	svg.append("g")
		.attr("class", "axis")
		.attr("transform", "translate(" + (-Width/2) + "," + (10 + legendHeight) + ")")
		.call(xAxis);
}