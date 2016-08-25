/****************************************************************
FileName: Route7.js
Kenneth Drew Gonzales

Description:
Route 7 takes you from Lagunta to Ikea.

Last Edited: 8/25/16
****************************************************************/
var Map = require('../map');

var Route7 = Map.generateMap(27,9);

// Big block in the bottom left.

Map.insertGate(Route7, "Lagunta", "west", 3);
Map.insertGate(Route7, "Ikea", "south", 25);
Map.initMap(Route7, 0,2);
