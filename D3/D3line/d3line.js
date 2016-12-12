/*
Leander de Kraker
10423354

An interactive line drawn with D3
Uses the KNMI data of windspeeds (low hourly average, high hourly average, windpeaks)
*/

// SVG sizes
var margin = {top: 50, left: 50, bottom: 30, right: 120},
    width = 1000 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// Functions to deal with time
var parseDate = d3.time.format("%Y%m%d").parse,
    formatTime = d3.time.format("%d %B"),
	bisectDate = d3.bisector(function(d) { return d.date; }).left;

// Scales which determine where data maps to the screen
var xScale = d3.time.scale()
    .range([0, width]);

var yScale = d3.scale.linear()
    .range([height, 0]);

// Axis properties
var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left");

// Function that returns line coordinates
var line = d3.svg.line()
    .x(function(d) { return xScale(d.date); })
    .y(function(d) { return yScale(d.hGem); });

// Append SVG element
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Load data
d3.json("wind.json", function(error, data){
	if (error) throw error;
	var Leeuwarden = data.Leeuwarden;
	
	// Format data
	Leeuwarden.forEach(function(d){
		d.date = +parseDate(d.date);
		d.hGem = +d.hGem/10;
		return d;
		});
	
	// Create domains
	xScale.domain([Leeuwarden[0].date, Leeuwarden[Leeuwarden.length - 1].date]);
	yScale.domain(d3.extent(Leeuwarden, function(d) { return d.hGem; }));
	
	// Add title
	svg.append("g")
		.attr("class", "title")
		.attr("transform", "translate(50,0)")
	.append("text")
		.text("highest average wind speed of the day (m/s), in Leeuwarden")
		.style("font-size", "19px");
		
	// Add x axis
	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis);

	// Add y axis
	svg.append("g")
		.attr("class", "y axis")
		.call(yAxis)
	.append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", 6)
		.attr("dy", ".71em")
		.style("text-anchor", "end")
		.style("font-size", "15px")
		.text("wind speed (m/s)");
		
		
	// Add data line
	svg.append("path")
	  	.attr("class", "line")
		.attr("d", line(Leeuwarden))
		.attr("stroke", "LightSkyBlue");

	// g, circle and text to append when focus.
	var focus = svg.append("g")
		.attr("class", "focus")
		.style("display", "none");

	focus.append("circle")
		.attr("r", 5)
		.attr("fill", "LightSkyBlue");
	
	focus.append("text")
		.attr("x", 9)
		.attr("dy", ".35em");

	// Mouse listener	
	svg.append("rect")
		.attr("class", "overlay")
		.attr("width", width)
		.attr("height", height)
		.attr("pointerevents", "all")
		.on("mouseover", function() { focus.style("display", null); })
		.on("mouseout", function() { focus.style("display", "none"); })
		.on("mousemove", mousemove);

	// Mouse move function
	function mousemove() {
		var x0 = xScale.invert(d3.mouse(this)[0]),
			i = bisectDate(Leeuwarden, x0, 1),
			d0 = Leeuwarden[i - 1],
			d1 = Leeuwarden[i],
			d = x0 - d0.date > d1.date - x0 ? d1 : d0;
			focus.attr("transform", "translate(" + xScale(d.date) + "," + yScale(d.hGem) + ")");
			focus.select("text").text(formatTime(new Date(d.date)) + ":  " + d.hGem + " m/s highest average windspeed");
	}
});