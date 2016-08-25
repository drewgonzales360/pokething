var Map = require('../map');
var Route2 = Map.generateMap(7,3);

Map.insertObstruction(Route2, 1,1,1,1);

Map.insertGate(Route2, "SproulTown", "west",  2);

Map.initMap(Route2, 0,2);
