d3.queue()
	.defer(d3.json, "facebook_data_clean.json")
    .await(makeGraphs)

function makeGraphs(error, projectsJson) {
    
	var documents = projectsJson
	var ndx = crossfilter(documents)


	// Define data dimensions for each chart 

	var scatterDim = ndx.dimension(function (d) { return [+d.index, +d.postEngagedUsers]; })
	var typeDim = ndx.dimension(function (d) { return d.type; })
	var categoryDim = ndx.dimension(function (d) { return d.category; })
	var paidDim = ndx.dimension(function (d) { return d.paid; })
	var monthDim = ndx.dimension(function (d) { return +d.month; }) 
	var	heatDim = ndx.dimension(function(d) { return [+d.hour, +d.weekday]; })//, +d.likes, +d.shares, +d.comments]; }) 


	/* Define data groups */
	
	// Scatter group 
	
	var scatterGroup = scatterDim.group()

	// Category groups 

	var typeGroup = typeDim.group()
	var categoryGroup = categoryDim.group()
	var paidGroup = paidDim.group()

	// User groups 
 
	var postEngagedUsersGroup = monthDim.group()
	var postReachedUsersGroup = monthDim.group()
	var postConsumingUsersGroup = monthDim.group()
	var postEngagedUsersLikedPageGroup = monthDim.group()	
	var postReachedUsersLikedPageGroup = monthDim.group()

	// Instance groups 

	var postImpressionsGroup = monthDim.group(); 
	var postConsumptionsGroup = monthDim.group(); 
	var postImpressionsLikedPageGroup = monthDim.group(); 

	
	var heatDimGroup = heatDim.group();


	/* Define and Apply Necessary Reduction Functions to Data Groups */
	
	// User group reducers

	var postReachedUsersGroupReducer = reductio()
	    .count(true)
	 	.sum(function(d) { return d.postReachedUsers; })
	 	.avg(true);	

	var postEngagedUsersGroupReducer = reductio()
	    .count(true)
	 	.sum(function(d) { return d.postEngagedUsers; })
	 	.avg(true);

	var postConsumingUsersGroupReducer = reductio()
	    .count(true)
	 	.sum(function(d) { return d.postConsumingUsers; })
	 	.avg(true);
	
	var postReachedUsersLikedPageGroupReducer = reductio()
	    .count(true)
	 	.sum(function(d) { return d.postReachedUsersLikedPage; })
	 	.avg(true);

	var postEngagedUsersLikedPageGroupReducer = reductio()
	    .count(true)
	 	.sum(function(d) { return d.postEngagedUsersLikedPage; })
	 	.avg(true);

	// Instance group reducers

	var postImpressionsGroupReducer = reductio()
	    .count(true)
	 	.sum(function(d) { return d.postImpressions; })
	 	.avg(true);
	
	var postConsumptionsGroupReducer = reductio()
	    .count(true)
	 	.sum(function(d) { return d.postConsumptions; })
	 	.avg(true);
	
	var postImpressionsLikedPageGroupReducer = reductio()
	    .count(true)
	 	.sum(function(d) { return d.postImpressionsLikedPage; })
	 	.avg(true);

	var heatDimGroupReducer = reductio()
	    .count(true)
	 	.sum(function(d) { return d.totalInteractions; })
	 	.avg(true);

    
	// Type group reducers  
    postEngagedUsersGroupReducer(typeGroup)
    postEngagedUsersGroupReducer(categoryGroup)
    postEngagedUsersGroupReducer(paidGroup)
	
    // User group reducers 
	postReachedUsersGroupReducer(postReachedUsersGroup)
	postEngagedUsersGroupReducer(postEngagedUsersGroup)
	postConsumingUsersGroupReducer(postConsumingUsersGroup)
	postReachedUsersLikedPageGroupReducer(postReachedUsersLikedPageGroup)
	postEngagedUsersLikedPageGroupReducer(postEngagedUsersLikedPageGroup)

	// Instance group reducers 
	postImpressionsGroupReducer(postImpressionsGroup)
	postConsumptionsGroupReducer(postConsumptionsGroup)
	postImpressionsLikedPageGroupReducer(postImpressionsLikedPageGroup)

    heatDimGroupReducer(heatDimGroup)

    console.log (paidGroup.top(Infinity))
    console.log (postEngagedUsersLikedPageGroup.top(Infinity))
    console.log (postImpressionsLikedPageGroup.top(Infinity))
    console.log (heatDimGroup.top(Infinity))

	// Initialize Charts 
	var scatterPlot = dc.scatterPlot("#scatter-plot")	
	var typeBarGraph = dc.barChart("#type-bar-graph");
	var categoryBarGraph = dc.barChart("#category-bar-graph");
	var paidBarGraph = dc.barChart("#paid-bar-graph");
	var compositeUser = dc.compositeChart("#composite-line-user")
	var compositeOccurrences = dc.compositeChart("#composite-line-interactions")
	var heatMap = dc.heatMap("#heat-map")


	// Define Relevant Constants 
	var postReachedUsersMax = Math.max.apply(Math, documents.map(function(o){return o.postReachedUsers;}))
	var engagedMax = Math.max.apply(Math, documents.map(function(o){return o.postEngagedUsers;}))
	var consumingMax = Math.max.apply(Math, documents.map(function(o){return o.postConsumingUsers;}))
	var postReachedUsersLikedMax = Math.max.apply(Math, documents.map(function(o){return o.postReachedUsersLikedPage;}))
	var engagedLikedMax = Math.max.apply(Math, documents.map(function(o){return o.postEngagedUsersLikedPage;}))
	var totalInteractionsMax = Math.max.apply(Math, documents.map(function(o){return o.totalInteractions;}))
	var total = Math.max.apply(Math, documents.map(function(o){return o.index;}))
	


	var postReachedUsersMin = Math.min.apply(Math, documents.map(function(o){return o.postReachedUsers;}))
	var engagedMin = Math.min.apply(Math, documents.map(function(o){return o.postEngagedUsers;}))
	var consumingMin = Math.min.apply(Math, documents.map(function(o){return o.postConsumingUsers;}))
	var postReachedUsersLikedMin = Math.min.apply(Math, documents.map(function(o){return o.postReachedUsersLikedPage;}))
	var engagedLikedMin = Math.min.apply(Math, documents.map(function(o){return o.postEngagedUsersLikedPage;}))
	var totalInteractionsMin = Math.min.apply(Math, documents.map(function(o){return o.totalInteractions;}))

	overallMax = Math.max(postReachedUsersMax, engagedMax, consumingMax, postReachedUsersLikedMax,engagedLikedMax)
	overallMin = Math.min(postReachedUsersMin, engagedMin, consumingMin, postReachedUsersLikedMin,engagedLikedMin)

	// Modify Paramters For Each Graph
	scatterPlot 	
		.width(1500)
		.height(300)
	    .margins({top: 10, right: 50, bottom: 40, left: 50})
	    .x(d3.scale.linear().domain([0, total]))
        .y(d3.scale.pow().exponent(0.5).domain([0, engagedMax]))
	    .xAxisLabel("Post # in 2014 (Chronological)")
	    .yAxisLabel("# of Lifetime Post Engaged Users")
	    .clipPadding(10)
	    .dimension(scatterDim)
	    .excludedOpacity(0.5)
	    .group(scatterGroup);

    typeBarGraph
	    .width(550)
	    .height(300)
	    .margins({top: 10, right: 50, bottom: 40, left: 50})
	    .x(d3.scale.ordinal())
	    .xUnits(dc.units.ordinal)
	    .brushOn(false)
	    .xAxisLabel('Post Type')
	    .yAxisLabel('Average # of Lifetime Post Engaged Users')
	    .dimension(typeDim)
	    .barPadding(0.5)
	    .outerPadding(0.1)
	    .group(typeGroup)
	    .valueAccessor(function(d) { return +d.value.avg; })
	    .title(function(d) {
		    return " Type:   " + d.key + "\n" +
		           "Average # of Lifetime Post Engaged Users:   " + Math.round(d.value.avg); 
		}); 

    categoryBarGraph
	    .width(550)
	    .height(300)
	    .margins({top: 10, right: 50, bottom: 40, left: 50})
	    .x(d3.scale.ordinal())
	    .xUnits(dc.units.ordinal)
	    .brushOn(false)
	    .xAxisLabel('Post Category')
	    .yAxisLabel('Average # of Lifetime Post Engaged Users')
	    .dimension(categoryDim)
	    .barPadding(0.5)
	    .outerPadding(0.3)
	    .group(categoryGroup)
	    .valueAccessor(function(d) { return +d.value.avg; })
	    .title(function(d) {
		    return " Category:   " + d.key + "\n" +
		           "Average # of Lifetime Post Engaged Users:   " + Math.round(d.value.avg); 
		}); 

    paidBarGraph
	    .width(550)
	    .height(300)
	    .margins({top: 10, right: 50, bottom: 40, left: 50})
	    .x(d3.scale.ordinal())
	    .xUnits(dc.units.ordinal)
	    .brushOn(false)
	    .xAxisLabel('Post Payment Type')
	    .yAxisLabel('Average # of Lifetime Post Engaged Users')
	    .dimension(paidDim)
	    .barPadding(0.6)
	    .outerPadding(0.4)
	    .group(paidGroup)
	    .valueAccessor(function(d) { return +d.value.avg; })
	    .title(function(d) {
		    return " Category:   " + d.key + "\n" +
		           "Average # of Lifetime Post Engaged Users:   " + Math.round(d.value.avg); 
		}); 

	 compositeUser
        .width(700)
        .height(400)
        .margins({top: 130, right: 50, bottom: 40, left: 50})
        .x(d3.scale.linear().domain([1,12]))
        .y(d3.scale.pow().exponent(0.4).domain([overallMin,overallMax/2]))
        .xAxisLabel("Post Month")
        .yAxisLabel("Average # of Users")
        .legend(dc.legend().x(420).y(20).itemHeight(13).gap(5))
        .compose([
            dc.lineChart(compositeUser)
                .dimension(monthDim)
		        .colors('blue')
		        .group(postReachedUsersGroup, "Lifetime Post Reached Users")
			    .valueAccessor(function(d) { return +d.value.avg; })
			    .title(function(d) {
				    return " Month:   " + d.key[0] + "\n" +
				           " Average # of Lifetime Post Reached Users:   " + Math.round(d.value.avg); 
				}),
            dc.lineChart(compositeUser)
                .dimension(monthDim)
		        .colors('red')
		        .group(postReachedUsersLikedPageGroup, "Lifetime Post Reached Users (Liked Page)")
			    .valueAccessor(function(d) { return +d.value.avg; })
			    .title(function(d) {
				    return " Month:   " + d.key[0] + "\n" +
				           " Average # of Lifetime Post Reached Users (Liked Page):   " + Math.round(d.value.avg); 
				}),

            dc.lineChart(compositeUser)
                .dimension(monthDim)
		        .colors('green')
		        .group(postEngagedUsersGroup, "Lifetime Post Engaged Users")
			    .valueAccessor(function(d) { return +d.value.avg; })
			    .title(function(d) {
				    return " Month:   " + d.key[0] + "\n" +
				           " Average # of Lifetime Post Engaged Users:   " + Math.round(d.value.avg); 
				}),
            dc.lineChart(compositeUser)
                .dimension(monthDim)
		        .colors('orange')
		        .group(postConsumingUsersGroup, "Lifetime Post Consuming Users")
			    .valueAccessor(function(d) { return +d.value.avg; })
			    .title(function(d) {
				    return " Month:   " + d.key[0] + "\n" +
				           " Average # of Lifetime Post Consuming Users:   " + Math.round(d.value.avg); 
				}),

            dc.lineChart(compositeUser)
                .dimension(monthDim)
		        .colors('purple')
		        .group(postEngagedUsersLikedPageGroup, "Lifetime Post Engaged Users (Liked Page)")
			    .valueAccessor(function(d) { return +d.value.avg; })
			    .title(function(d) {
				    return " Month:   " + d.key[0] + "\n" +
				           " Average # of Lifetime Post Engaged Users (Liked Page):   " + Math.round(d.value.avg); 
				})
            ])
        .brushOn(false)
        .render();

		compositeOccurrences
	        .width(700)
	        .height(400)
	        .margins({top: 130, right: 50, bottom: 40, left: 50})
	        .x(d3.scale.linear().domain([1,12]))
	        .y(d3.scale.pow().exponent(0.4).domain([0,90000]))
	        .xAxisLabel("Post Month")
	        .yAxisLabel("Average # of Occurrences")
	        .legend(dc.legend().x(450).y(40).itemHeight(13).gap(5))
	        .compose([
	            dc.lineChart(compositeOccurrences)
	                .dimension(monthDim)
			        .colors('blue')
			        .group(postImpressionsGroup, "Lifetime Post Impressions")
				    .valueAccessor(function(d) { return +d.value.avg; })
				    .title(function(d) {
					    return " Month:   " + d.key[0] + "\n" +
					           " Average # of Lifetime Post Reached Users:   " + Math.round(d.value.avg); 
					}),
	            dc.lineChart(compositeOccurrences)
	                .dimension(monthDim)
			        .colors('red')
			        .group(postEngagedUsersGroup, "Lifetime Post Consumptions")
				    .valueAccessor(function(d) { return +d.value.avg; })
				    .title(function(d) {
					    return " Month:   " + d.key[0] + "\n" +
					           " Average # of Lifetime Post Engaged Users:   " + Math.round(d.value.avg); 
					}),
	            dc.lineChart(compositeOccurrences)
	                .dimension(monthDim)
			        .colors('green')
			        .group(postConsumingUsersGroup, "Lifetime Post Impressions (Liked Page)")
				    .valueAccessor(function(d) { return +d.value.avg; })
				    .title(function(d) {
					    return " Month:   " + d.key[0] + "\n" +
					           " Average # of Lifetime Post Consuming Users:   " + Math.round(d.value.avg); 
					})
	            ])
	        .brushOn(false)
	        .render();

	// Initialize Legends

    var heatColorMapping = d3.scale.pow().exponent(0.20)
        .domain([totalInteractionsMin, totalInteractionsMax])
        .range(["blue", "red"]);

        var heatLegendSvg = d3.select("#heat-legend").append("svg")
		 .attr("width", 500)
		 .attr("height", 70);

		heatLegendSvg.append("g")
		  .attr("class", "heatLegend")
		  .attr("transform", "translate(20,20)");

		var heatLegend = d3.legend.color()
		.shapeWidth(25)
		.cells(11)
		.orient('horizontal')
		.scale(heatColorMapping)
		.labelFormat(d3.format("1f"))

		heatLegendSvg.select(".heatLegend")
		  .call(heatLegend);

		heatLegendSvg.append("text")
		 .text("Color Legend (Average Number of Interactions)")
		 .attr("x", 125)
		 .attr("y", 14)
		 .attr("font-family", "sans-serif")
         .attr("font-size", "10px")
		 .style("text-anchor", "middle");
		 
    heatMap
        .width(1500)
        .height(200)
        .dimension(heatDim)
        .group(heatDimGroup)     
        .keyAccessor(function(d) { return d.key[0]; })
        .valueAccessor(function(d) { return d.key[1]; })
        .colorAccessor(function(d) { return +d.value.avg; })
        .title(function(d) {
            return " Hour:   " + d.key[0] + "\n" +
                   " Weekday:   " + d.key[1] + "\n" +
                   " Total Interactions:   " + d.value.avg //+ "\n" +
                   // "       Likes:   " + d.key[2] + "\n" +
                   // "       Shares:   " + d.key[3] + "\n" +
                   // "       Comments:   " + d.key[4] + "\n" 


                   ;})
        .colors(heatColorMapping);
    	heatMap.xBorderRadius(0);
    	heatMap.yBorderRadius(0);
        
    // Render Graphs 
   	
	scatterPlot.render();
    typeBarGraph.render(); 
    categoryBarGraph.render(); 
    paidBarGraph.render();
    heatMap.render();
 

};