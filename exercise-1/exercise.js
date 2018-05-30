'use strict';
//`d3` has already been "imported"

/** data sets **/
var people1 = [
  { name: 'Edgar', favColor: 'green' },
  { name: 'Rashmi', favColor: '#000000' },
  { name: 'Amelia', favColor: 'blue' },
  { name: 'Monica', favColor: 'purple' }
];

var people2 = [
  { name: 'Edgar', favColor: 'green' },
  { name: 'Amelia', favColor: 'blue' },
];

//Create a variable `list` by selecting the element with an id of `list`
var list = d3.select('#list');

//Select all of the <p> elements in the #list (there currently are none!)
var p = list.selectAll('p');

//Use `.data()` to join the `people1` data set to the paragraph selection
var dataJoin = p.data(people1, function (d, i) {
  return d.name;
});

//Log out the `.size()` of the data join (think: how many items are selected?)

console.log(dataJoin.size());

//For each "entering" value in the data join, append a new <p> element.
//Give that item `.text()` that contains BOTH the index number of the person 
//and their name. For example:
//    <p>0. Edgar</p>
//Additionally, use the `style()` method to give that list item a 'color'
//property that is the person's favorite color.

dataJoin.enter()
  .append('p')
  .text(function (d, i) {
    return i + '. ' + d.name
  })
  .style('color', function (d, i) {
    return d.favColor;
  });

//Add an event listener to the button so that on a click, the following occurs:
//  - Select all the <p> elements in the list
//  - Join the `people2` data set to that selection
//      (You will need to set a "key function" so people are tracked by `name`)
//  - Log out the number of "entering" elements
//  - Log out the number of "exiting" elements
//  - Remove all exiting elements
var button = d3.select('button')
button.on('click', function () {
  var p = d3.selectAll('p');
  var dataJoin = p.data(people2, function (d, i) {
    return d.name;
  });
  var entering = dataJoin.enter();
  console.log("entering: " + entering.size());

  var exiting = dataJoin.exit();
  console.log("exiting " + exiting.size());

  exiting.transition().duration(1000).style('opacity', 0.0)
    .remove();
});

//Add a transition() to the above so that the existing elements first have
//their `opacity` (set via `style()`) change to 0.0 over 1 second, before
//they are removed
