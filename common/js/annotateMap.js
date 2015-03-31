var d3 = require('d3');

module.exports = {

	draw(opts) {

		this.opts = opts;

		// clear guides
		opts.$annotationGuides.empty();

		// resize guides
		this.svg = d3.select(opts.annotationGuidesSelector)
			.attr({
				width: opts.width,
				height: opts.height
			});

		this.drawCircles();

		this.drawLines();

		this.drawText();
	},

	drawCircles() {

		var x = d3.scale.linear()
			.range([0, this.opts.width])
			.domain([this.opts.bounds.W, this.opts.bounds.E]);

		var y = d3.scale.linear()
			.range([this.opts.height, 0])
			.domain([this.opts.bounds.S, this.opts.bounds.N]);

		this.svg.append('g')
			.attr('class', 'circles')
			.selectAll('circle')
			.data(this.opts.data)
			.enter().append('circle')
			.attr({
				cx: d => x(d.Longitude),
				cy: d => y(d.Latitude),
				r: 3
			});
	},

	drawLines() {

		var x = d3.scale.linear()
			.range([0, this.opts.width])
			.domain([this.opts.bounds.W, this.opts.bounds.E]);

		var y = d3.scale.linear()
			.range([this.opts.height, 0])
			.domain([this.opts.bounds.S, this.opts.bounds.N]);

		this.svg.append('g')
			.attr('class', 'lines')
			.selectAll('line')
			.data(this.opts.data)
			.enter().append('line')
			.attr({
				x1: d => x(d.Longitude),
				x2: d => x(d.Longitude) + x.range()[1]*d.annotation.dx/100,
				y1: d => y(d.Latitude),
				y2: d => y(d.Latitude)
			});

	},

	drawText() {

		var x = d3.scale.linear()
			.range([0, 100])
			.domain([this.opts.bounds.W, this.opts.bounds.E]);

		var y = d3.scale.linear()
			.range([100, 0])
			.domain([this.opts.bounds.S, this.opts.bounds.N]);

		d3.select(this.opts.annotationTextsSelector)
			.selectAll('div')
			.data(this.opts.data)
			.enter().append('div')
			.attr('class', 'annotation')
			.style({
				'text-align': d => d.annotation.dx > 0 ? 'left' : 'right',
				width: d => `${d.annotation.width}%`,
				top: d => `${y(d.Latitude) + d.annotation.dy}%`,
				left: d => `${x(d.Longitude) + d.annotation.dx - (d.annotation.dx > 0 ? 0 : d.annotation.width)}%`,
			})
			.append('span')
			.text(d => d.comment);
	}

};







