/*
Leander de Kraker
10423354
*/

window.onload = function() {

// Add buttons function!
var button1 = document.getElementById("button1");
button1.addEventListener("click", function() {mapPlot("greenhouse_Data_1990.csv", '1990')});
var button2 = document.getElementById("button2");
button2.addEventListener("click", function() {mapPlot("greenhouse_Data_2012.csv", '2012')});

var countries = Datamap.prototype.worldTopo.objects.world.geometries;

// The datastructure that will be filled with the correctly layout data for D3 map
var dataSet = {}; 

// Defining sizes for the map legend
var legendWidth = 600
	legendHeight = 60
	colorWidth = 400,
	colorHeight = 15;

// Function that creates the dataformat which can create a pie chart
function pieData(d) {return [{'name':'CO2','value': d.CO2E},
			{'name':'methane','value':d.METH},
			{'name':'NO','value':d.NOXE},
			{'name':'other','value':d.GHGO}];};
// Function that just returns the country name			
function pieName(d) {return d.countryName};

// Computes the angle of a pie chart arc/ convert radians to degrees.
function angle(d) {
  var a = (d.startAngle + d.endAngle) * 90 / Math.PI - 90;
  return a > 90 ? a - 180 : a;
}
// pie chart properties
pieSizes = {width : 350, height : 250, radius : 75, buffer : 65 }
pieColor = ["#AA0000", "#0000AA", "#00AA00", "#333333"]; 



// first show
mapPlot("greenhouse_Data_1990.csv", '1990');
// Loading the CSV and using it extensively
function mapPlot(dataYear, year){
	// remove previous map
	d3.select("#title").remove();

	d3.select("body").append("p")
	.attr("id","title")
	.style("font-size", "30px")
	.text("Total greenhouse gas emission in " + year)

	d3.select("#MAP").remove();

	d3.select("body").append("div")
	 .attr("id", "MAP")

	d3.csv(dataYear, function(dataCSV) {
		dataCSV.forEach(function(d) {
			//  Converted to kilo ton mega ton for readability, with 1 decimal for most measurements
			d.GHGO = Math.round(+d.GHGO/100)/10; // GreenHouse Gas Other emissions (kt)
			d.GHGT = Math.round(+d.GHGT/1000); // GreenHouse Gas TOTAL emissions (kt of CO2 eq)
			d.METH = Math.round(+d.METH/100)/10; // Methane emissions (kt of CO2 eq) (Methane potency = )
			d.NOXE = Math.round(+d.NOXE/100)/10; // Nitrous Oxide emissions (kt of CO2 eq) (NO potency = )
			d.CO2E = Math.round(+d.CO2E/100)/10; // CO2 emissions (kt) (potency = 1, the reference)
		});
		
		// Determining the color scale function
		var miniValue = d3.min(dataCSV, function(d) { return d.GHGT });
		var maxiValue = d3.max(dataCSV, function(d) { return d.GHGT });
		var paletteScale = d3.scale.linear()
				.domain([miniValue,maxiValue])
				.range(['#CAEE77','#DD0000']); // green to red colors

		// fill dataset in appropriate format
		// {Country {datavalue: value, fillcolor: color(value)},...}
		dataCSV.forEach(function(d){
			dataSet[d.countryCode] = { emissions: d.GHGT, fillColor: paletteScale(d.GHGT)};
		});
		
		// MAPMAP
		var map = new Datamap({
			element: document.getElementById('MAP'),
			fills: {
				defaultFill: '#CCC'
			},
			
			//add the dataset to the map
			data: dataSet,
			
			//hover over info
			geographyConfig: {
				popupTemplate: function(geo, data){
					return ['<div class="hoverinfo"><strong>',
							geo.properties.name,
							'<br />emission total: ' + data.emissions + " mt",
							'</strong></div>'].join('');
				}
			}
		});
		plot("NLD");
		d3.select("#MAP").on("mousedown.log", function() {plot(d3.event.srcElement.__data__.id)});
		

		// SVG for the LEGEND
		var svg = d3.select("svg").append("svg")
			.attr("width", legendWidth)
			.attr("height", legendHeight)	
		// Defining the color properties of the legend
		var gradient = svg.append("defs")
		  .append("linearGradient")
			.attr("id", "gradient")
			.attr("x1", "0%")
			.attr("y1", "0%")
			.attr("x2", "100%")
			.attr("y2", "0%");
		gradient.append("stop")
			.attr("offset", "0%")
			.attr("stop-color", paletteScale(miniValue))
			.attr("stop-opacity", 1);
		gradient.append("stop")
			.attr("offset", "100%")
			.attr("stop-color", paletteScale(maxiValue))
			.attr("stop-opacity", 1);
		// Adding the color of the legend
		svg.append("rect")
			.attr("transform", "translate(30,15)")
			.attr("width", colorWidth)
			.attr("height", colorHeight)
			.style("fill", "url(#gradient)");
		// Adding ext of the legend
		svg.append("text")
			.attr("transform", "translate(30,-7)")
			.attr("y", 6)
			.attr("dy", ".71em")
			.text("Total greenhouse gas emissions(mega ton)");
		svg.append("text")
			.attr("transform", "translate(30,25)")
			.attr("y", 6)
			.attr("dy", ".71em")
			.text(Math.round(miniValue));
		svg.append("text")
			.attr("transform", "translate(400,25)")
			.attr("y", 6)
			.attr("dy", ".71em")
			.text(Math.round(maxiValue));
		
		// Function that finds clicked country in the real dataset, not just the map
		function findCountry(id){
			for(var i = 0; i<dataCSV.length; i++){
				// True when requested country is found
				if (dataCSV[i].countryCode == id){return dataCSV[i];}
		}};
		
		// Pie chart plot function
		function plot(id) {
			d3.select("#pieChart").remove();
			
			// Pie chart properties
			var vis = d3.select("div")
			  .append("svg:svg") //create the SVG element at the "div"
				.attr("id","pieChart")
				.data([pieData(findCountry(id))]) // link chosen data with the document
				.attr("transform", "translate(0,80)")
				.attr("width", pieSizes.width)
				.attr("height", pieSizes.height)
				
				.append("svg:g") //make a group to hold pie chart
				  .attr("transform", "translate(" + (pieSizes.radius + pieSizes.buffer) + "," + (pieSizes.radius + pieSizes.buffer) + ")")

			// Create arcs
			var arc = d3.svg.arc()
			  .outerRadius(pieSizes.radius);
			var pie = d3.layout.pie()
			  .value(function(d) { return d.value; }) // Binding each value to the chart
			  .sort( function(d) { return null; } );

			// Select all elements with class slice
			var arcs = vis.selectAll("g.slice")
			  .data(pie).remove()
			  .data(pie).enter().append("svg:g")
			  .attr("class", "slice");
			
			// Choose colors and create the path
			arcs.append("svg:path")
				.attr("fill", function(d, i) { return pieColor[i]; } )
				.attr("d", arc);
			
			function arcTween(a) {
				var i = d3.interpolate(this._current, a);
				this._current = i(0);
				return function(t) {
					return arc(i(t));
				};
			}
			
			// Add label
			arcs.filter(function(d) { return d.endAngle - d.startAngle > .1; }).append("svg:text")
			  .attr("transform", function(d) { //set the label's origin to the center of the arc
				//we have to make sure to set these before calling arc.centroid
				d.outerRadius = pieSizes.radius + 50;
				d.innerRadius = pieSizes.radius + 50;
				return "translate(" + arc.centroid(d) + ")";
			  })
			  .attr("text-anchor", "middle") //center the text on it's origin
			  .style("fill", "Purple")
			  .style("font", "bold 12px Arial")
			  .text(function(d, i) { return d.data.name;}); //get the label from our original data array
			// Add a data value
			arcs.filter(function(d) { return d.endAngle - d.startAngle > .1; }).append("svg:text")
			  .attr("dy", ".35em")
			  .attr("text-anchor", "middle")
			  .attr("transform", function(d) {
				d.outerRadius = pieSizes.radius;
				d.innerRadius = pieSizes.radius/2; 
				return "translate(" + arc.centroid(d) + ")rotate(" + angle(d) + ")";
			  })
			  .style("fill", "White")
			  .style("font", "bold 13px Arial")
			  .text(function(d) { return d.data.value; });
			// Add pie chart title
			arcs.append("svg:text")
			.style("font", "bold 16px Arial") 
			.attr("transform", "translate(-"+pieSizes.width/2.5 + ",-"+ pieSizes.height/2.2  + ")")
			.text(pieName(findCountry(id)) + " emission gases (mega ton)");
		}	
	});	
};
}