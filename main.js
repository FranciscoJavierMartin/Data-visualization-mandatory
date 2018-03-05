
// Let's start using ES6
// And let's organize the code following clean code concepts
// Later one we will complete a version using imports + webpack

// Isolated data array to a different file

let width = null,
    height = null;

let svg = null;
let x, y = null; // scales
let legend=null;

//Margins of main canvas
const margin = {top: 10, left: 80, bottom: 20, right: 30};
//Position of the legend box
const legend_position={left:60,down:50};
//Dimensions of the lengend box
const legend_dimension={height:100,width:100};

setupCanvasSize();
appendSvg('body');
setupXScale();
setupYScale();
appendXAxis();
appendYAxis();
appendChartBars();
appendLegend();

// 1. let's start by selecting the SVG Node
function setupCanvasSize() {
  width = 520 - margin.left - margin.right;
  height = 560 - margin.top - margin.bottom;
}

function appendSvg(domElement) {
  svg = d3.select(domElement).append('svg')
    .attr('width', width + margin.left + margin.right+legend_dimension.width)
    .attr('height', height + margin.top + margin.bottom+legend_dimension.height)
    .append('g')
    .attr('transform',`translate(${margin.left}, ${margin.top})`);
}

// Now on the X axis we want to map totalSales values to
// pixels
// in this case we map the canvas range 0..350, to 0...maxSales
// domain == data (data from 0 to maxSales) boundaries
function setupXScale(){
  x = d3.scaleBand().rangeRound([0, width]).padding(0.1).domain(totalSales.map((d)=>d.product));
}

// Now we don't have a linear range of values, we have a discrete
// range of values (one per product)
// Here we are generating an array of product names
function setupYScale(){
  const maxSales = d3.max(totalSales, (d)=>d.sales);
  y= d3.scaleLinear().range([height, 0]).domain([0,maxSales]);
}

// Add the X Axis
function appendXAxis() {
  svg.append('g')
    .attr('transform',`translate(0,${height})`)
    .call(d3.axisBottom(x));
}

// Add the Y Axis
function appendYAxis() {
  svg.append('g')
  .call(d3.axisLeft(y));
}

function appendChartBars(){
  // 2. Now let's select all the rectangles inside that svg
  // (right now is empty)
  var rects = svg.selectAll('rect')
    .data(totalSales);

  // Now it's time to append to the list of Rectangles we already have
  var newRects = rects.enter();

  // Let's append a new Rectangles
  // UpperCorner:
  //    Starting x position, the start from the axis
  //    Starting y position, where the product starts on the y scale
  // React width and height:
  //    height: the space assign for each entry (product) on the Y axis
  //    width: Now that we have the mapping previously done (linear)
  //           we just pass the sales and use the X axis conversion to
  //           get the right value
  newRects.append('rect')
    .attr('x', (d) =>x(d.product))
    .attr('y', (d)=>height)
    .attr('width', x.bandwidth)
    .attr('height', 0)
    .transition()
	  .duration(500)
	  .delay((d, i)=> i * 50)
    .attr('y', (d)=>y(d.sales))
    .attr('height',(d)=> height-y(d.sales))
    .style('fill',(d)=>d.color)//Color added to each bar
}

function appendLegend(){

  legend = svg.append('g')
	  .attr('class', 'legend')
	  .attr('height', legend_dimension.height)
	  .attr('width', legend_dimension.width)
    .attr('transform',
       `translate(${legend_position.left},${legend_position.down})`)

  legend.selectAll('rect')
    .data(totalSales)
    .enter()
    .append('rect')
	  .attr('x', width - 65)
    .attr('y', (d, i)=> i *  20)
	  .attr('width', 10)
	  .attr('height', 10)
	  .style('fill', (d)=> d.color);
      
  legend.selectAll('text')
    .data(totalSales)
    .enter()
    .append('text')
	  .attr('x', width - 52)
    .attr('y',(d, i)=> i *  20 + 9)
	  .text((d)=> d.product);
}