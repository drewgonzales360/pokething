
var Map = require('./map');
var SproulTown = Map.generateMap(7,7);
Map.insertObstruction(SproulTown, 1,1,1,1);

Map.initMap(SproulTown, 0,0);
