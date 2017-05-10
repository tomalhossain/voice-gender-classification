var dimensions = ['mode', 'meandom', 'maxdom', 'dfrange', 'meanfreq', 'Q25', 'centroid', 'median', 'Q75', 'sd', 'IQR', 'sfm', 'sp.ent', 'skew', 'kurt', 'meanfun', 'minfun', 'maxfun', 'mindom']

var radviz = radvizComponent()
    .config({
        el: document.querySelector('.radviz'),
        colorAccessor: function(d){ return d['label']; },
        dimensions: dimensions,
        size: 750,
        margin: 100,
        useRepulsion: true,
        drawLinks: true,
        tooltipFormatter: function(d){
            return '<h1>' + d.label 
              + '</h1>' +dimensions.map(function(dB){
              return dB + ': ' + d[dB]; }).join('<br />');
        }
    });

// Legend

var jsonCircles = [
  { "x_axis": 60, "y_axis": 14, "radius": 8, "color" : "#2176b3" },
  { "x_axis": 177, "y_axis": 14, "radius": 8, "color" : "#d57227"}];


svgContainer = d3.select("#gender-legend-2")



var circles = svgContainer.selectAll("circle")
                        .data(jsonCircles)
                        .enter()
                        .append("circle");


var circleAttributes = circles
                     .attr("cx", function (d) { return d.x_axis; })
                     .attr("cy", function (d) { return d.y_axis; })
                     .attr("r", function (d) { return d.radius; })
                     .style("fill", function(d) { return d.color; });

var maleText = svgContainer.select("#male-label")
var maleLabel = maleText
                .attr("x", 10)
                .attr("y", 20)                
                .text( "Male")
                .attr("font-family", "Ubuntu")
                .attr("font-size", "1.6em")
                .attr("fill", "white");


var femaleText = svgContainer.select("#female-label")
var femaleLabel = femaleText
                .attr("x", 110)
                .attr("y", 20)                
                .text( "Female")
                .attr("font-family", "Ubuntu")
                .attr("font-size", "1.6em")
                .attr("fill", "white");


d3.csv('static/js/voice-gender-subset-50.csv', function(error, data){
  console.log(data);
  radviz.render(data);    
});



/*

Highest Correlations

Meanfreq: median; Q25
sd: IQR, sfm
median: centroid
Q75: median, centroid
skew: kurt
sfm: sp.ent
mode: centroid, meanfreq >>>>>>
meanfun: ???
minfun: ???
maxfun: ???
meandom: maxdom, dfrange
mindom: ???
modindx: 
 */
