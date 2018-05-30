'use strict';
//`d3` has already been "imported"

var svg = d3.select('svg'); //reference to the HTML element

//get the list of data
var dataList = [
    { id: 1, name: 'A', sleep: 8 },
    { id: 2, name: 'B', sleep: 3 },
    { id: 3, name: 'C', sleep: 6 },
    { id: 4, name: 'D', sleep: 9 },
]
//get the list of DOM elements
var rectList = d3.select('svg').selectAll('rect');

rectList.attr('fill', 'red');

//join the data to the selection
var dataJoin = rectList.data(dataList, function (d) {
    return d.name;
});

//a function that determines width of a rectangle based on a datum
var calcWidth = function (datum, index) {
    return datum.sleep * 50;  //width is based on the amount of sleep
}

//for each (bound) element in the selection

// dataJoin.attr('width', calcWidth);

// the callback function
dataJoin.attr('width', function (d, i) { return d.sleep * 50; })
    .attr('y', function (d, i) { return d.id * 50 - 50; })

var justData = dataJoin.enter();
justData.append('rect')
    .attr('width', function (d, i) { return d.sleep * 50; })
    .attr('y', function (d, i) { return d.id * 50 - 50; })
    .attr('x', 0)
    .attr('height', 40)
    .attr('fill', 'red')

dataJoin.exit().remove();