// var dimensions = ['meanfreq', 'median', 'sd', 'Q25', 'IQR', 'Q75', 'skew', 'kurt', 'sp.ent', 'sfm', 'mode', 'centroid', 'meanfun', 'minfun', 'maxfun', 'meandom', 'mindom', 'maxdom', 'dfrange', 'modindx'];
var dimensions = ['mode', 'meandom', 'maxdom', 'dfrange', 'meanfreq', 'Q25', 'centroid', 'median', 'Q75', 'sd', 'IQR', 'sfm', 'sp.ent', 'skew', 'kurt', 'meanfun', 'minfun', 'maxfun', 'mindom']
// var dimensions = ['mode', 'meandom', 'maxdom', 'dfrange', 'meanfreq', 'Q25', 'centroid', 'median', 'Q75', 'sd', 'IQR', 'sfm', 'sp.ent', 'skew', 'kurt']
// var dimensions = ['meanfreq', 'Q25', 'centroid', 'median', 'Q75', 'sd', 'IQR', 'sfm', 'sp.ent', 'skew', 'kurt']


var radviz = radvizComponent()
    .config({
        el: document.querySelector('.radviz'),
        colorAccessor: function(d){ return d['label']; },
        dimensions: dimensions,
        size: 700,
        //margin: 100,
        useRepulsion: true,
        drawLinks: true,
        tooltipFormatter: function(d){
            return '<h1>' + d.label 
              + '</h1>' +dimensions.map(function(dB){
              return dB + ': ' + d[dB]; }).join('<br />');
        }
    });

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
