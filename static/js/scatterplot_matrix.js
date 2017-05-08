//var fields = ['label', 'meanfreq', 'sd', 'median', 'Q25', 'Q75', 'IQR', 'skew', 'kurt', 'sp.ent', 'sfm', 'mode', 'centroid', 'minfun', 'maxfun', 'meandom', 'mindom', 'maxdom', 'dfrange', 'modindx'];
//var fields = ['mean', 'median', 'mode'] 
var fields = ['sd', 'Q25', 'Q75', 'IQR'] 
var rows = ['heading'].concat(fields.slice(0).reverse()),
    cols = ['heading'].concat(fields);

if(location.search.indexOf('nowait')!==-1) {
    dc.constants.EVENT_DELAY = 0;
    d3.select('#wait-verb').text('remove')
    d3.select('#wait-prep').text('with');
    d3.select('#wait-url').attr('href', location.origin + location.pathname);
} else {
    d3.select('#wait-url').attr('href', location.origin + location.pathname + '?nowait');
}

d3.csv('static/js/voice-gender-subset-50.csv', function(error, csv) {
    if (error) throw new Error(error);
    csv.forEach(function(d) {
        Object.keys(fields).forEach(function(ab) {
            d[fields[ab]] = +d[fields[ab]];
        });
    });

    var data = crossfilter(csv);
    
    function make_dimension(var1, var2) {
        return data.dimension(function(d) {
            return [d[var1], d[var2], d.label];
        });
    }
    
    function key_part(i) {
        return function(kv) {
            return kv.key[i];
        };
    }
    
    var charts = [];
    
    d3.select('#scatterplot-matrix')
        .selectAll('tr').data(rows)
        .enter().append('tr').attr('class', function(d) {
            return d === 'heading' ? 'heading row' : 'row';
        })
        .each(function(row, y) {
            d3.select(this).selectAll('td').data(cols)
                .enter().append('td').attr('class', function(d) {
                    return d === 'heading' ? 'heading entry' : 'entry';
                })
                .each(function(col, x) {
                    var cdiv = d3.select(this).append('div')
                    if(row === 'heading') {
                        if(col !== 'heading')
                            cdiv.text(col.replace('_', ' '))
                        return;
                    }
                    else if(col === 'heading') {
                        cdiv.text(row.replace('_', ' '))
                        return;
                    }
                    cdiv.attr('class', 'chart-holder');
                    var chart = dc.scatterPlot(cdiv);
                    var dim = make_dimension(col,row),
                        group = dim.group();
                    var showYAxis = x === 1, showXAxis = y === 4;
                    chart
                        .transitionDuration(0)
                        .width(185 + (showYAxis?25:0))
                        .height(185 + (showXAxis?20:0))
                        .margins({
                            left: showYAxis ? 40 : 8,
                            top: 20,
                            right: 0,
                            bottom: showXAxis ? 40 : 5
                        })
                        .dimension(dim).group(group)
                        .keyAccessor(key_part(0))
                        .valueAccessor(key_part(1))
                        .colorAccessor(key_part(2))
                        .colorDomain(['male', 'female'])
                        .x(d3.scale.linear()).xAxisPadding("0.001%")
                        .y(d3.scale.linear()).yAxisPadding("0.001%")
                        .brushOn(true)
                        .elasticX(true)
                        .elasticY(true)
                        .symbolSize(7)
                        .nonemptyOpacity(0.7)
                        .emptySize(7)
                        .emptyColor('#ccc')
                        .emptyOpacity(0.7)
                        .excludedSize(7)
                        .excludedColor('#ccc')
                        .excludedOpacity(0.7)
                        .renderHorizontalGridLines(true)
                        .renderVerticalGridLines(true);
                    chart.xAxis().ticks(4);
                    chart.yAxis().ticks(4);
                    chart.on('postRender', function(chart) {
                        // remove axes unless at left or bottom
                        if(!showXAxis)
                            chart.select('.x.axis').attr('display', 'none');
                        if(!showYAxis)
                            chart.select('.y.axis').attr('display', 'none');
                        // remove clip path, allow dots to display outside
                        chart.select('.chart-body').attr('clip-path', null);
                    });
                    // only filter on one chart at a time
                    chart.on('filtered', function(_, filter) {
                        if(!filter)
                            return;
                        charts.forEach(function(c) {
                            if(c !== chart)
                                c.filter(null);
                        });
                    });
                    charts.push(chart);
                });
        });
    dc.renderAll();
});