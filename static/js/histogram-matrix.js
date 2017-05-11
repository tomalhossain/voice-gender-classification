// d3.queue()
//     .defer(d3.json, "/projects_categorized")
//     .await(makeGraphs); 

// function makeGraphs(error, projectsJson) {
 d3.csv('static/js/voice-gender-categorized.json', function(projectsJson) {   
    var documents = projectsJson;
    var ndx = crossfilter(documents);


    var meanfreqDim = ndx.dimension(function (d) { return d.meanfreqcategories; })
    var sdDim = ndx.dimension(function (d) { return d.sdcategories; })
    var medianDim = ndx.dimension(function (d) { return d.mediancategories; })
    
    var meanfunDim = ndx.dimension(function (d) { return d.meanfuncategories; })
    var minfunDim = ndx.dimension(function (d) { return d.minfuncategories; })
    var maxfunDim = ndx.dimension(function (d) { return d.maxfuncategories; })

    var meandomDim = ndx.dimension(function (d) { return d.meandomcategories; })
    var mindomDim = ndx.dimension(function (d) { return d.mindomcategories; })
    var maxdomDim = ndx.dimension(function (d) { return d.maxdomcategories; })



    var meanfreqGroup = meanfreqDim.group(); 
    var sdGroup = sdDim.group(); 
    var medianGroup = medianDim.group();
    
    var meanfunGroup = meanfunDim.group(); 
    var minfunGroup = minfunDim.group(); 
    var maxfunGroup = maxfunDim.group();

    var meandomGroup = meandomDim.group(); 
    var mindomGroup = mindomDim.group(); 
    var maxdomGroup = maxdomDim.group();



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

    var meanfunGroupReducer = reductio()
        .count(true)
        .sum(function(d) { return d.meanfun; })
        .avg(true);        
    var minfunGroupReducer = reductio()
        .count(true)
        .sum(function(d) { return d.minfun; })
        .avg(true);  
    var maxfunGroupReducer = reductio()
        .count(true)
        .sum(function(d) { return d.maxfun; })
        .avg(true);  

    var meandomGroupReducer = reductio()
        .count(true)
        .sum(function(d) { return d.meandom; })
        .avg(true);        
    var mindomGroupReducer = reductio()
        .count(true)
        .sum(function(d) { return d.mindom; })
        .avg(true);  
    var maxdomGroupReducer = reductio()
        .count(true)
        .sum(function(d) { return d.maxdom; })
        .avg(true);  


    // Type group reducers  
    meanfreqGroupReducer(meanfreqGroup)
    sdGroupReducer (sdGroup)
    medianGroupReducer(medianGroup)
    
    meanfunGroupReducer(meanfunGroup) 
    minfunGroupReducer(minfunGroup) 
    maxfunGroupReducer(maxfunGroup) 

    meandomGroupReducer(meandomGroup) 
    mindomGroupReducer(mindomGroup) 
    maxdomGroupReducer(maxdomGroup)             


    // Initialize Charts 
    var meanfreqBarGraph = dc.barChart("#meanfreq-bar-graph");
    var sdBarGraph = dc.barChart("#sd-bar-graph");
    var medianBarGraph = dc.barChart("#median-bar-graph");

    var meanfunBarGraph = dc.barChart("#meanfun-bar-graph");
    var minfunBarGraph = dc.barChart("#minfun-bar-graph");
    var maxfunBarGraph = dc.barChart("#maxfun-bar-graph");

    var meandomBarGraph = dc.barChart("#meandom-bar-graph");
    var mindomBarGraph = dc.barChart("#mindom-bar-graph");
    var maxdomBarGraph = dc.barChart("#maxdom-bar-graph");   

    var graph_width = 350
    var graph_height = 250

    meanfreqBarGraph
        .width(graph_width)
        .height(graph_height)
        .margins({top: 10, right: 50, bottom: 40, left: 50})
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .brushOn(false)
        .xAxisLabel('Mean frequency (kHz)')
        .yAxisLabel('# of observations')
        .dimension(meanfreqDim)
        .barPadding(0.5)
        .outerPadding(0.1)
        .group(meanfreqGroup)
        .valueAccessor(function(d) { return +d.value.count; })
        .title(function(d) {
            return " Type:   " + d.key + "\n" +
                   "# of observations:   " + Math.round(d.value.count); 
        }); 

    sdBarGraph
        .width(graph_width)
        .height(graph_height)
        .margins({top: 10, right: 50, bottom: 40, left: 50})
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .brushOn(false)
        .xAxisLabel('Standard deviation (kHz)')
        .yAxisLabel('# of observations')
        .dimension(sdDim)
        .barPadding(0.5)
        .outerPadding(0.3)
        .group(sdGroup)
        .valueAccessor(function(d) { return +d.value.count; })
        .title(function(d) {
            return " Category:   " + d.key + "\n" +
                   "# of observations:   " + Math.round(d.value.count); 
        }); 

    medianBarGraph
        .width(graph_width)
        .height(graph_height)
        .margins({top: 10, right: 50, bottom: 40, left: 50})
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .brushOn(false)
        .xAxisLabel('Median frequency (kHz)')
        .yAxisLabel('# of observations')
        .dimension(medianDim)
        .barPadding(0.6)
        .outerPadding(0.4)
        .group(medianGroup)
        .valueAccessor(function(d) { return +d.value.count; })
        .title(function(d) {
            return " Category:   " + d.key + "\n" +
                   "# of observations:   " + Math.round(d.value.count); 
        }); 


    meanfunBarGraph
        .width(graph_width)
        .height(graph_height)
        .margins({top: 10, right: 50, bottom: 40, left: 50})
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .brushOn(false)
        .xAxisLabel('Mean fundamental frequency (kHz)')
        .yAxisLabel('# of observations')
        .dimension(meanfunDim)
        .barPadding(0.6)
        .outerPadding(0.4)
        .group(meanfunGroup)
        .valueAccessor(function(d) { return +d.value.count; })
        .title(function(d) {
            return " Category:   " + d.key + "\n" +
                   "# of observations:   " + Math.round(d.value.count); 
        }); 

    minfunBarGraph
        .width(graph_width)
        .height(graph_height)
        .margins({top: 10, right: 50, bottom: 40, left: 50})
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .brushOn(false)
        .xAxisLabel('Minimum fundamental frequency (kHz)')
        .yAxisLabel('# of observations')
        .dimension(minfunDim)
        .barPadding(0.6)
        .outerPadding(0.4)
        .group(minfunGroup)
        .valueAccessor(function(d) { return +d.value.count; })
        .title(function(d) {
            return " Category:   " + d.key + "\n" +
                   "# of observations:   " + Math.round(d.value.count); 
        }); 
    
    maxfunBarGraph
        .width(graph_width)
        .height(graph_height)
        .margins({top: 10, right: 50, bottom: 40, left: 50})
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .brushOn(false)
        .xAxisLabel('Maximum fundamental frequency (kHz)')
        .yAxisLabel('# of observations')
        .dimension(maxfunDim)
        .barPadding(0.6)
        .outerPadding(0.4)
        .group(maxfunGroup)
        .valueAccessor(function(d) { return +d.value.count; })
        .title(function(d) {
            return " Category:   " + d.key + "\n" +
                   "# of observations:   " + Math.round(d.value.count); 
        }); 

    meandomBarGraph
        .width(graph_width)
        .height(graph_height)
        .margins({top: 10, right: 50, bottom: 40, left: 50})
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .brushOn(false)
        .xAxisLabel('Mean dominant frequency (kHz)')
        .yAxisLabel('# of observations')
        .dimension(meandomDim)
        .barPadding(0.6)
        .outerPadding(0.4)
        .group(meandomGroup)
        .valueAccessor(function(d) { return +d.value.count; })
        .title(function(d) {
            return " Category:   " + d.key + "\n" +
                   "# of observations:   " + Math.round(d.value.count); 
        }); 

    mindomBarGraph
        .width(graph_width)
        .height(graph_height)
        .margins({top: 10, right: 50, bottom: 40, left: 50})
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .brushOn(false)
        .xAxisLabel('Minimum dominant frequency (kHz)')
        .yAxisLabel('# of observations')
        .dimension(mindomDim)
        .barPadding(0.6)
        .outerPadding(0.4)
        .group(mindomGroup)
        .valueAccessor(function(d) { return +d.value.count; })
        .title(function(d) {
            return " Category:   " + d.key + "\n" +
                   "# of observations:   " + Math.round(d.value.count); 
        }); 

    maxdomBarGraph
        .width(graph_width)
        .height(graph_height)
        .margins({top: 10, right: 50, bottom: 40, left: 50})
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .brushOn(false)
        .xAxisLabel('Maximum dominant frequency (kHz)')
        .yAxisLabel('# of observations')
        .dimension(maxdomDim)
        .barPadding(0.6)
        .outerPadding(0.4)
        .group(maxdomGroup)
        .valueAccessor(function(d) { return +d.value.count; })
        .title(function(d) {
            return " Category:   " + d.key + "\n" +
                   "# of observations:   " + Math.round(d.value.count); 
        });                 


    // Render Graphs 

    meanfreqBarGraph.render(); 
    sdBarGraph.render(); 
    medianBarGraph.render();

    meanfunBarGraph.render();
    minfunBarGraph.render();
    maxfunBarGraph.render();

    meandomBarGraph.render();
    mindomBarGraph.render();
    maxdomBarGraph.render();

};