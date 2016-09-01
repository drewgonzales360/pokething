/****************************************************************
FileName: SproulTown.js
Kenneth Drew Gonzales

Description:
SproulTown is the hometown of our main character.
He'll start there on his huge ass adventure.
Last Edited: 8/25/16
****************************************************************/
var Map = require('../map');
Map.generateMap(19,20);

Map.insertObstruction(1,1,4,4); // Players house
Map.insertObstruction(7,1,4,4); // Rivals house
Map.insertObstruction(4,9,6,4); // Lab

// Map.insertPerson("La",    16, 5);
// Map.insertPerson("Drew",  18,9);
// Map.insertPerson("Ram",   1 ,1);
// Map.insertPerson("Dean",  18, 1);
Map.generateCrowd(9);
Map.insertGate("Route2", "east",8);

Map.initMap("SproulTown");
