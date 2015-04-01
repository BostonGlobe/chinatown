// Put all your code here.
// NOTE: no need to do $(document).ready, or $(function() { etc here.
// Just start writing js.
var data = _.chain(require('../../../data/projects.json'))
	.sortBy(d => +d.Longitude)
	.sortBy(d => -(+d.Latitude))
	.value();

var annotateMap = require('../../../common/js/annotateMap.js');

var d3 = require('d3');
var topojson = require('topojson');
var latLngDistance = require('../../../common/js/latLngDistance.js');

function log(s) {
	console.log(JSON.stringify(s, null, 4));
}

var bounds = {W: -71.0736, E: -71.0524, N: 42.3584, S: 42.3387};

var masterSelector = '.article-graphic.map .content';
var $master = $(masterSelector);

function resize() {

	var outerWidth = $master.width();
	var outerHeight = 2581/2053*outerWidth;

	var mapSelector = `${masterSelector} svg.map`;

	$(mapSelector).empty();

	var g = d3.select(mapSelector)
		.attr({
			width: outerWidth,
			height: outerHeight
		})
		.append('g');

	var boundaries = require('../../../data/input/boundaries.json');

	var x = d3.scale.linear()
		.range([0, outerWidth])
		.domain([bounds.W, bounds.E]);

	var y = d3.scale.linear()
		.range([outerHeight, 0])
		.domain([bounds.S, bounds.N]);

	var line = d3.svg.line()
		.x(d => x(d[0]))
		.y(d => y(d[1]));

	g.append('path')
		.datum(topojson.feature(boundaries, boundaries.objects.BRA).features[0].geometry.coordinates[0])
		.attr({
			d: line,
			'class': 'BRA'
		});

	g.append('path')
		.datum(topojson.feature(boundaries, boundaries.objects.CSCNC).features[0].geometry.coordinates[0])
		.attr({
			d: line,
			'class': 'CSCNC'
		});

	// get the distance in feet
	var distanceInFeet = Math.floor(latLngDistance.getDistanceFromLatLonInKm(bounds.S, bounds.W, bounds.S, bounds.E) * 3280.84);

	$(`${masterSelector} .map-distance-legend`).width(`${1000*100/distanceInFeet}%`);

	annotateMap.draw({
		bounds,
		data: data.filter(d => d.annotation),
		width: outerWidth,
		height: outerHeight,
		annotationGuidesSelector: `${masterSelector} .annotation-guides`,
		annotationTextsSelector: `${masterSelector} .annotation-texts`,
		text: d => `<span class="name">${d.name}</span><span class="text">${d.text}</span>`,
		mapLabels: [
			{
				lat: 42.356,
				lng: -71.066,
				html: '<span>Boston</span><span>Common</span>'
			},
			{
				lat: 42.358,
				lng: -71.056,
				html: '<span>Financial</span><span>District</span>'
			},
			{
				lat: 42.34,
				lng: -71.070,
				html: '<span>South End</span>'
			}
		],
		mapLabelsSelector: `${masterSelector} .map-labels`
	});
}

$(window).on('resize', resize);
resize();