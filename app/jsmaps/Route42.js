/****************************************************************
FileName: Route42.js
Kenneth Drew Gonzales

Description:
Route 42 goes from Ikea to Tagatai. Path goes west
then south.

Last Edited: 8/25/16
****************************************************************/
var Map = require('../map');

Map.generateMap(27,30);

// Big block in the bottom right.
Map.insertObstruction(7,7,20,23);
Map.insertObstruction(0,0,2,1);
Map.insertObstruction(0, 12,1,12);
Map.generateCrowd(9);

Map.insertGate("Ikea", "east", 3);
Map.insertGate("Tagatai", "south", 3);
Map.initMap("Route42");
