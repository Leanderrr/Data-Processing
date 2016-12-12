/*
Leander de Kraker
10423354

An interactive line drawn with D3.
Uses the KNMI data of windspeeds (low hourly average, high hourly average, windpeaks).
Now uses all data provided in the JSON file.

Because there is so much data the labels were unreadable when they were at the line location,
so I positioned them at the top of the graph instead.
*/

// SVG sizes
var margin = {top: 30, left: 50, bottom: 30, right: 200},
    width = 1050 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// Functions to deal with time
var parseDate = d3.time.format("%Y%m%d").parse,
    formatTime = d3.time.format("%d %B"),
	bisectDate = d3.bisector(function(d) { return d.date; }).left;

var colors = ["#bdd7e7", "#6baed6", "#1050b5"];
	
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
	
// Map that returns lines coordinates
var linelGem = d3.svg.line()
    .x(function(d) { return xScale(d.date); })
    .y(function(d) { return yScale(d.lGem); });
var	linehGem = d3.svg.line()
    .x(function(d) { return xScale(d.date); })
    .y(function(d) { return yScale(d.hGem); });
var	linehStoot = d3.svg.line()
    .x(function(d) { return xScale(d.date); })
    .y(function(d) { return yScale(d.hStoot); });

// Function that formats the data to nice numbers in km/h and usable time 
function formatData(data) {
	data.forEach(function(d) {
		d.date = +parseDate(d.date);
		// convert to from m/s to km/h and get rid of rounding artifacts (e.g. 93.600000006 km/h -> 93.6 km/h)
		d.lGem = Math.round((+d.lGem)*3.6)/10; 
		d.hGem = Math.round((+d.hGem)*3.6)/10;
		d.hStoot = Math.round((+d.hStoot))*3.6/10;
		return d;
	});
}

d3.json("wind.json", function(error, data){
	if (error) throw error;
	
	// Extract and format the datasets
	var Westdorpe = data.Westdorpe;
	formatData(Westdorpe);
	var	Leeuwarden = data.Leeuwarden;
	formatData(Leeuwarden);
	
	// Plot initial visualisation
	plot(Westdorpe, "Westdorpe");
	
	// Add buttons function!
	var button1 = document.getElementById("button1");
	button1.addEventListener("click", function() {plot(Westdorpe, "Westdorpe")});
	var button2 = document.getElementById("button2");
	button2.addEventListener("click", function() {plot(Leeuwarden, "Leeuwarden")});
	
	
	
	// All the plotting
	function plot(dataSet, name){
		// remove old plot
		d3.selectAll("svg").remove();
		
		// Append SVG element (again)
		var svg = d3.select("body").append("svg")
			.attr("width", width + margin.right + margin.left)
			.attr("height", height + margin.top + margin.bottom)
		  .append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
		
		var yMax = Math.max(d3.max(data.Westdorpe, function(d) { return Math.max(d.hStoot)+2}),
						d3.max(data.Leeuwarden, function(d) { return Math.max(d.hStoot)+2}));
		// Create domains
		xScale.domain([dataSet[0].date, dataSet[dataSet.length - 1].date]);
		yScale.domain([0, yMax]);
		
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
			.text("wind speed (km/h)");
			
		// Add data lines
		svg.append("path") // low wind average
			.attr("class", "line")
			.attr("d", linelGem(dataSet))
			.attr("stroke", colors[0]);
		svg.append("path") // high wind average
			.attr("class", "line")
			.attr("d", linehGem(dataSet))
			.attr("stroke", colors[1]);
		svg.append("path") // Windstoten
			.attr("class", "line")
			.attr("d", linehStoot(dataSet))
			.attr("stroke", colors[2]);
			
		// Add title
		svg.append("g")
			.attr("class", "title")
			.attr("transform", "translate(40,-10)")
		.append("text")
			.text("wind speeds (km/h), in " + name)
			.style("font-size", "20px");
		
		// Focusses
		function focuss(){
			var focus = svg.append("g")
			.attr("class", "focus dynobj")
			.style("display","none");
			return focus;
		}
		var focus1 = focuss();
		var focus2 = focuss();
		var focus3 = focuss();
		
		// Add circle to each focus
		d3.selectAll(".focus").append("circle")
			.attr("id", "focusCircles")
			.attr("class", "circle")
			.attr("r", 5);

		// Add text area to each focus
		d3.selectAll(".focus").append("text")
			.attr("class", "info")
			.attr("x", 10)
			.style("font-size", "15px")
			.attr("dy", ".4em");
		
		d3.select("focus1").append("line")          // attach a line
			.style("stroke", "black")  // colour the line

		// Initialze mouse listener to SVG
		svg.append("rect")
        .attr("width", width)
        .attr("height", height)
        .style("fill", "none")
        .style("pointer-events", "all")
        .on("mouseover", function() { d3.selectAll(".dynobj").style("display", null); })
        .on("mouseout", function() { d3.selectAll(".dynobj").style("display", "none"); })
        .on("mousemove", mousemove);
		
		function mousemove() {
			var x0 = xScale.invert(d3.mouse(this)[0]),
				i = bisectDate(dataSet, x0, 1),
				d0 = dataSet[i - 1],
				d1 = dataSet[i],
				d = x0 - d0.date > d1.date - x0 ? d1 : d0;

			focus1.attr("transform","translate(" + (xScale(d.date)) + "," + 90 + ")");
			focus1.attr("fill", colors[0])
			focus1.select("text").text(formatTime(new Date(d.date)) + ", Lowest: " + d.lGem + " km/h");

			focus2.attr("transform","translate(" + (xScale(d.date)) + "," + 70 + ")");
			focus2.attr("fill", colors[1])
			focus2.select("text").text(formatTime(new Date(d.date)) + ", Highest: " + d.hGem + " km/h");

			focus3.attr("transform","translate(" + (xScale(d.date)) + "," + 50 + ")");
			focus3.attr("fill", colors[2])
			focus3.select("text").text(formatTime(new Date(d.date)) + ", blasts: " + d.hStoot + " km/h");
		}
	};

});
