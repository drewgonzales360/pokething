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

var Tagatai = Map.generateMap(15,15);

// Big block in the bottom left.

Map.insertGate(Tagatai, "Route42", "north", 5);
// Map.insertGate(Tagatai, "Route31", "east", 6);
// Map.insertGate(Tagatai, "Route9", "south", 12)
Map.initMap(Tagatai, "Tagatai",0,4);
