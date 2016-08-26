/****************************************************************
FileName: Route42.js
Kenneth Drew Gonzales

Description:
Route 42 goes from Ikea to Tagati. Path goes west
then south. 

Last Edited: 8/25/16
****************************************************************/
var Map = require('../map');

var Route42 = Map.generateMap(27,30);

// Big block in the bottom right.
Map.insertObstruction(Route42, 7,7,20,23);
Map.insertObstruction(Route42, 0,0,2,1);
Map.insertObstruction(Route42, 0, 12,1,12);

Map.insertGate(Route42, "Ikea", "east", 3);
Map.insertGate(Route42, "Tagatai", "south", 3);
Map.initMap(Route42, 26,2);