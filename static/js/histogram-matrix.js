d3.queue()
	.defer(d3.json, "/projects")
    .await(makeGraphs)

function makeGraphs(error, projectsJson) {
    
	var documents = projectsJson
	var ndx = crossfilter(documents)

    meanfreqDim = ndx.dimension(function (d) {
        return d.meanfreq;
    }),
    meanfreqGroupCount = meanfreqDim.group().reduceCount();

     var barChart = dc.barChart("#meanfreqHist");

     barChart
     .width(768)
     .height(480)
     .margins({top: 10, right: 10, bottom: 20, left: 40})
     .brushOn(false)
     .dimension(meanfreqDim)
     .group(meanfreqGroupCount)
	 .transitionDuration(500)
	 //.centerBar(true)
	 .gap(3000)
	 .filter([0.1,0.2])
     .x(d3.scale.linear().domain([0,0.25]))
	 .elasticY(true)
     .xAxis().ticks(10)
     //.tickFormat();	
    dc.renderAll(); 
}