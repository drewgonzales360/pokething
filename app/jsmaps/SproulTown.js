
var Map = require('../map');
var SproulTown = Map.generateMap(7,7);

Map.insertObstruction(SproulTown, 1,1,1,1);

Map.insertGate(SproulTown, "Route2", "east",  3);




Map.initMap(SproulTown, 3,3);
