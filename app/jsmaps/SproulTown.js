/****************************************************************
FileName: SproulTown.js
Kenneth Drew Gonzales

Description:
SproulTown is the hometown of our main character.
He'll start there on his huge ass adventure.
Last Edited: 8/25/16
****************************************************************/
var Map = require('../map');
var SproulTown = Map.generateMap(19,20);

Map.insertObstruction(SproulTown, 1,1,4,4); // Players house
Map.insertObstruction(SproulTown, 7,1,4,4); // Rivals house
Map.insertObstruction(SproulTown, 4,9,6,4); // Lab

Map.insertGate(SproulTown, "Route2", "east",8);

Map.initMap(SproulTown, "SproulTown", 18,9);
