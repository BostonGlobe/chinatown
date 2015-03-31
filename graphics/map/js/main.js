// Put all your code here.
// NOTE: no need to do $(document).ready, or $(function() { etc here.
// Just start writing js.
var data = _.chain(require('../../../data/projects.json'))
	.take(1)
	.sortBy(d => +d.Longitude)
	.sortBy(d => -(+d.Latitude))
	.value();

var annotateMap = require('../../../common/js/annotateMap.js');

var d3 = require('d3');

function log(s) {
	console.log(JSON.stringify(s, null, 4));
}

log(data);

var bounds = {W: -71.0736, E: -71.0524, N: 42.3584, S: 42.3387};

var masterSelector = '.article-graphic.map .content';
var $master = $(masterSelector);

function makeSvgOverlay() {

	// function makeText() {

	// 	var x = d3.scale.linear()
	// 		.range([0, 100])
	// 		.domain([bounds.W, bounds.E]);

	// 	var y = d3.scale.linear()
	// 		.range([100, 0])
	// 		.domain([bounds.S, bounds.N]);

	// 	d3.select(`${masterSelector} .annotation-texts`)
	// 		.selectAll('div')
	// 		.data(projects)
	// 		.enter().append('div')
	// 		.attr('class', 'annotation')
	// 		.style({
	// 			top: d => `${y(d.Latitude)}%`,
	// 			left: d => `${x(d.Longitude)}%`,
	// 		})
	// 		.append('span')
	// 		.text('')
	// 		.text(d => d.comment);
	// }
	// makeText();

}

function resize() {

	var outerWidth = $master.width();
	var outerHeight = 2581/2053*outerWidth;
	var annotationGuidesSelector = `${masterSelector} .annotation-guides`;

	annotateMap.draw({
		bounds,
		data: data.filter(d => d.annotation),
		width: outerWidth,
		height: outerHeight,
		annotationGuidesSelector,
		$annotationGuides: $(annotationGuidesSelector),
		annotationTextsSelector: `${masterSelector} .annotation-texts`
	});
	// makeSvgOverlay();
}

$(window).on('resize', resize);
resize();




// d3.select(masterSelector).append('div')
// 	.attr('class', 'annotations')
// 	.selectAll('div')
// 	.data(projects)
// 	.enter().append('div')
// 	.attr('class', 'annotation')
// 	.style({
// 		top: d => `${y(d.Latitude)}%`,
// 		left: d => `${x(d.Longitude)}%`,
// 	})
// 	.append('span')
// 	.text('')
//	.text(d => d.comment);


