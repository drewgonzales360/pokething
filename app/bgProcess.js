
const ipc     = require('electron').ipcRenderer;

var lastGate = "Route2";

// once main has asked for the last gate, send it back
ipc.on('requested-last-gate', function(event) {
  ipc.send('last-gate-enclosed', lastGate);
});

// main just told me the last map we were in.
ipc.on('remembering-current-map', function(event, currentMap){
  String(currentMap);
  lastGate = currentMap;
});

ipc.on('npc-update', function (event, map, people) {
    
    for (var indi in people) {
        findOneDirection(map, indi[0], indi[1]);
    }
    ipc.send('updated-npc', people);
});

function include(array, value) {
  for (var i = 0; i < array.length; i++) {
    if (array[i] === value) {
      return true;
    }
  }
  return false;
}

function findOneDirection(map, loc_x, loc_y) {
    // console.log(loc_x);
    let feasibleDirections = [];
    if (map[loc_x][loc_y-1] === 1 ) {  // north
        feasibleDirections.push("north");
    }
    if (map[loc_x-1][loc_y] === 1 ) {   // east
        feasibleDirections.push("east");
    }
    if (map[loc_x][loc_y+1] === 1) {   // south
        feasibleDirections.push("south");
    }
    if (map[loc_x+1][loc_y] === 1) {   // west
        feasibleDirections.push("west");
    }
    console.log(feasibleDirections);
    var directionNotFound = true;
    while ( directionNotFound ) {
        let direction = Math.floor(Math.random()*4);
        switch (direction) {
            case 1: // can i go north
            if (include(feasibleDirections, "north")) {
                loc_y -= 1
                directionNotFound = false;
            }
            break;
            case 2:
            if (include(feasibleDirections, "east")) {
                loc_x -= 1
                directionNotFound = false;
            }
            break;
            case 3:
            if (include(feasibleDirections, "south")) {
                loc_y += 1
                directionNotFound = false;
            }
            break;
            case 4:
            if (include(feasibleDirections, "west")) {
                loc_x += 1
                directionNotFound = false;
            }
            break;
            default:
        }
    }
    
}