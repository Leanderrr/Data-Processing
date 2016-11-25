window.onload = function() {
// create canvas
var margin = {top: 20, side: 50, bottom: 70};
var width = 700;
var	height= 500;

// Create axis ranges
var x = d3.scale.ordinal().rangeRoundBands([0,width-margin.side], .05);
var y = d3.scale.linear().range([height-margin.bottom-margin.top, 0]);
	
// Create axis properties
var xAx = d3.svg.axis()
		.scale(x)
		.orient("bottom");

var yAx = d3.svg.axis()
		.scale(y)
		.orient("left");

// create SVG element
var svg = d3.select("body").append("svg")
	.attr("width", width)
	.attr("height", height)

	
// load data
d3.json("maxvis.json", function(error, data) {
    data.forEach(function(d) {
        
		d.date = d.date;
		// transform visibility score because weird scale:
		//Maximum opgetreden zicht; 0: <100 m, 1:100-200 m, 2:200-300 m,..., 
		//49:4900-5000 m, 50:5-6 km, 56:6-7 km, 57:7-8 km,..., 79:29-30 km, 80:30-35 km, 81:35-40 km,..., 89: >70 km
        if (d.vis < 50){ // for first 50 the visibility increases with 100m
			d.vis = d.vis*0.1;}
		else if (d.vis >= 50 && d.vis < 80){ // from 50(=5km) till 79 the visibility increases with 1km
			d.vis = (d.vis-49)*1 + 5;}
		else{d.vis = (d.vis-79)*5 + 30;} // from 80(=30km) on , one increase means 5km more visibility
		d.vis = d.vis
    });
	
	// scale data range, necissary for axis
	x.domain(data.map(function(d){return d.date;}));
	y.domain([0, d3.max(data, function(d) {return d.vis ;})]);
	
	console.log(data)
	// append x-axis
	svg.append("g") 
		.attr("class", "x axis")
		.attr("transform", "translate("+ margin.side +"," + (height-margin.bottom) + ")")
		.call(xAx)
	.selectAll("text") // x-axis labels
		.style("text-anchor", "end")
		.attr("dy", "-6px")
		.attr("dx", "-10px")
		.attr("transform", "rotate(-90)")
		
	// append y-axis
	svg.append("g") 
		.attr("class", "y axis")
		.attr("transform", "translate("+margin.side+ "," + margin.top + ")")
		.call(yAx)
	.append("text") // add y axis title
		.attr("y", 5)
		.attr("dy", ".71em")
		.style("text-anchor", "end")
		.attr("transform", "rotate(-90)")
		.text("visibility (km)");


	
	// Add bars
	svg.selectAll("bar")
		.data(data) // add data to the bars in html
	.enter().append("rect")
		.attr("class", "bar")
		.attr("x", function(d) { return x(d.date) + margin.side; })
		.attr("width", x.rangeBand())
		.attr("y", function(d) { return y(d.vis); })
		.attr("height", function(d) { return height - margin.bottom - y(d.vis); });
});
}