
var Map = require('./map');
var SproulTown = Map.generateMap(7,7);
var Root2 = Map.generateMap(20,4);

Map.insertObstruction(SproulTown, 1,1,1,1);

Map.insertGate(SproulTown, "Root2", "east",  3);
Map.insertGate(SproulTown, "Root2", "north",  3);
Map.insertGate(SproulTown, "Root2", "south",  3);
Map.insertGate(SproulTown, "Root2", "west",  3);

Map.insertGate(Root2, "SproulTown", "west", 2);



Map.initMap(SproulTown, 3,3);

// Map.initMap(Root2, 0,2);
