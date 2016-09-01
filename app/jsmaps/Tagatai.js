/****************************************************************
FileName: Lagunta.js
Kenneth Drew Gonzales

Description:
Lagunta is the first city that our adventruere
will go. Lagunta is connected to Route 2 and Route
7.

Last Edited: 8/25/16
****************************************************************/
var Map = require('../map');

Map.generateMap(15,15);

// Big block in the bottom left.
Map.generateCrowd(9);

Map.insertGate("Route42", "north", 5);
// Map.insertGate("Route31", "east", 6);
// Map.insertGate("Route9", "south", 12)
Map.initMap("Tagatai");
