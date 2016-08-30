/****************************************************************
FileName: Ikea.js
Kenneth Drew Gonzales

Description:
Ikea is the first town with a gym. Ikea is
connected to Route 7 and Route 42.

Last Edited: 8/25/16
****************************************************************/
var Map = require('../map');

Map.generateMap( 13,18);

// Big block in the bottom left.
Map.generateCrowd(9);

Map.insertGate("Route7", "north", 8);
Map.insertGate("Route42", "west", 16);
Map.initMap("Ikea",0,7);
