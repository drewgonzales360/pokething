/****************************************************************
FileName: Route2.js
Kenneth Drew Gonzales

Description:
Route2 is a straight east path, then the path
goes south to Lagunta town.

The path goes from Route 2 from SproulTown to
Lagunta.
Last Edited: 8/25/16
****************************************************************/
var Map = require('../map');

Map.generateMap( 100,80);

// Big block in the bottom left.
Map.insertObstruction(0, 10, 90, 70);
Map.insertObstruction(0,  12, 13,  1);
Map.insertObstruction(0,  30, 12,  1);
Map.generateCrowd(9);

Map.insertObstruction(40, 4,  5, 1);
Map.insertObstruction(95, 15, 1, 15);
Map.insertObstruction(91, 50, 1, 20);
Map.insertObstruction(99, 60, 2, 9);
Map.insertObstruction(99,99,1,1);

Map.insertGate("SproulTown", "west", 0);
Map.insertGate("Lagunta", "south", 95);

Map.initMap("Route2");
