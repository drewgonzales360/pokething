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

var Lagunta = Map.generateMap(15,22);

// Big block in the bottom left.

Map.insertGate(Lagunta, "Route2", "north", 5);
Map.insertGate(Lagunta, "Route7", "east", 18);
Map.initMap(Lagunta, 0,5);
