d3.queue()
    .defer(d3.json, "/projects_categorized")
    .await(makeGraphs); 

function makeGraphs(error, projectsJson) {
    
    var documents = projectsJson;
    var ndx = crossfilter(documents);

    var meanfreqDim = ndx.dimension(function (d) { return d.meanfreqcategories; })
    var sdDim = ndx.dimension(function (d) { return d.sdcategories; })
    var medianDim = ndx.dimension(function (d) { return d.mediancategories; })
    var Q25Dim = ndx.dimension(function (d) { return d.Q25categories; })

    var meanfreqGroup = meanfreqDim.group(); 
    var sdGroup = sdDim.group(); 
    var medianGroup = medianDim.group();
    var Q25Group = Q25Dim.group()

    var meanfreqGroupReducer = reductio()
        .count(true)
        .sum(function(d) { return d.meanfreq; })
        .avg(true);

    var sdGroupReducer = reductio()
        .count(true)
        .sum(function(d) { return d.sd; })
        .avg(true);

    var medianGroupReducer = reductio()
        .count(true)
        .sum(function(d) { return d.median; })
        .avg(true);

    var Q25GroupReducer = reductio()
        .count(true)
        .sum(function(d) { return d.Q25; })
        .avg(true);        

    // Type group reducers  
    meanfreqGroupReducer(meanfreqGroup)
    sdGroupReducer (sdGroup)
    medianGroupReducer(medianGroup)
    Q25GroupReducer(Q25Group) 

    // Initialize Charts 
    var meanfreqBarGraph = dc.barChart("#meanfreq-bar-graph");
    var sdBarGraph = dc.barChart("#sd-bar-graph");
    var medianBarGraph = dc.barChart("#median-bar-graph");
    var Q25BarGraph = dc.barChart("#Q25-bar-graph");    

     
    meanfreqBarGraph
        .width(300)
        .height(250)
        .margins({top: 10, right: 50, bottom: 40, left: 50})
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .brushOn(false)
        .xAxisLabel('Groups by mean frequency of sound file (kHz)')
        .yAxisLabel('Number of observations')
        .dimension(meanfreqDim)
        .barPadding(0.5)
        .outerPadding(0.1)
        .group(meanfreqGroup)
        .valueAccessor(function(d) { return +d.value.count; })
        .title(function(d) {
            return " Type:   " + d.key + "\n" +
                   "Number of observations:   " + Math.round(d.value.count); 
        }); 

    sdBarGraph
        .width(300)
        .height(250)
        .margins({top: 10, right: 50, bottom: 40, left: 50})
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .brushOn(false)
        .xAxisLabel('Groups by standard deviation of sound file (kHz)')
        .yAxisLabel('Number of observations')
        .dimension(sdDim)
        .barPadding(0.5)
        .outerPadding(0.3)
        .group(sdGroup)
        .valueAccessor(function(d) { return +d.value.count; })
        .title(function(d) {
            return " Category:   " + d.key + "\n" +
                   "Number of observations:   " + Math.round(d.value.count); 
        }); 

    medianBarGraph
        .width(300)
        .height(250)
        .margins({top: 10, right: 50, bottom: 40, left: 50})
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .brushOn(false)
        .xAxisLabel('Groups by median frequency of sound file (kHz)')
        .yAxisLabel('Number of observations')
        .dimension(medianDim)
        .barPadding(0.6)
        .outerPadding(0.4)
        .group(medianGroup)
        .valueAccessor(function(d) { return +d.value.count; })
        .title(function(d) {
            return " Category:   " + d.key + "\n" +
                   "Number of observations:   " + Math.round(d.value.count); 
        }); 

    Q25BarGraph
        .width(300)
        .height(250)
        .margins({top: 10, right: 50, bottom: 40, left: 50})
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .brushOn(false)
        .xAxisLabel('Groups by Q25 frequency of sound file (kHz)')
        .yAxisLabel('Number of observations')
        .dimension(Q25Dim)
        .barPadding(0.6)
        .outerPadding(0.4)
        .group(Q25Group)
        .valueAccessor(function(d) { return +d.value.count; })
        .title(function(d) {
            return " Category:   " + d.key + "\n" +
                   "Number of observations:   " + Math.round(d.value.count); 
        }); 

    // Render Graphs 

    meanfreqBarGraph.render(); 
    sdBarGraph.render(); 
    medianBarGraph.render();
    Q25BarGraph.render();
};