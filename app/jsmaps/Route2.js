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

var Route2 = Map.generateMap(27,30);

// Big block in the bottom left.
Map.insertObstruction(Route2, 0, 4, 20,25);
Map.insertObstruction(Route2, 1 ,1,1,1);
Map.insertObstruction(Route2, 4 ,3,4,1);
Map.insertObstruction(Route2, 11,0,3,1);
Map.insertObstruction(Route2, 19,4,9,1);

Map.insertGate(Route2, "SproulTown", "west", 3);
Map.insertGate(Route2, "Lagunta", "south", 25);
Map.initMap(Route2, 0,2);
