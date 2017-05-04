// var dimensions = ['meanfreq', 'sd', 'median', 'Q25', 'Q75', 'IQR', 'skew', 'kurt', 'sp.ent', 'sfm', 'mode', 'centroid', 'minfun', 'maxfun', 'meandom', 'mindom', 'maxdom', 'dfrange', 'modindx', 'label'];
var dimensions = ['meanfreq', 'sd', 'median', 'Q25', 'Q75', 'IQR', 'skew', 'kurt', 'sp.ent', 'sfm', 'mode', 'centroid', 'meanfun', 'minfun', 'maxfun', 'meandom', 'mindom', 'maxdom', 'dfrange', 'modindx'];
//var dimensions = ['minfun', 'maxfun', 'meandom', 'mindom', 'maxdom'];


var radviz = radvizComponent()
    .config({
        el: document.querySelector('.container'),
        colorAccessor: function(d){ return d['label']; },
        dimensions: dimensions,
        size: 1000,
        margin: 100,
        useRepulsion: true,
        drawLinks: true,
        tooltipFormatter: function(d){
            return '<h1>' + d.label 
              + '</h1>' +dimensions.map(function(dB){
              return dB + ': ' + d[dB]; }).join('<br />');
        }
    });

d3.csv('static/js/voice-gender-sub.csv', function(error, data){
    console.log(data);
    radviz.render(data);
});

  // d3.json('https://rawgit.com/biovisualize/radviz/master/data/iris.json', function(error, data){
  //     console.log(data);
  //     radviz.render(data);
  // });
