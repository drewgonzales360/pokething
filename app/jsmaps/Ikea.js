/****************************************************************
FileName: Ikea.js
Kenneth Drew Gonzales

Description:
Ikea is the first town with a gym. Ikea is
connected to Route 7 and Route 42.

Last Edited: 8/25/16
****************************************************************/
var Map = require('../map');

var Ikea = Map.generateMap( 13,18);

// Big block in the bottom left.

Map.insertGate(Ikea, "Route7", "north", 8);
Map.insertGate(Ikea, "Route42", "west", 16);
Map.initMap(Ikea, 0,7);
