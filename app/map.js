/****************************************************************
FileName: Map.js
Kenneth Drew Gonzales
Pokemon Hope

Description:
This class is used to draw and initilize the map where the
main character will adventure.

A townMap is a small section of the WORLD that the player
will navigate through. My hope is that each townMap will
be loaded individualy.

The viewport is the immediate screen that the user sees
at all times. This view port is made of tiles, 17 wide,
and 13 vertically.

The topleft corner that is walkable is indexed 0,0. so
insertGate
initMap
insertObstruction
insertGate

all follow this convention.
Last Edited: 8/24/16
****************************************************************/

const canvas      = document.getElementById("map");
const ctx         = canvas.getContext("2d");
const key         = require('key-emit')(document);
const ipc         = require('electron').ipcRenderer;

ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;

const TILE_SIZE   = 50;
const VIEW_WIDTH  = 16;
const VIEW_HEIGHT = 12;
var currentMap  = "";

var startingGate = "";
var gates = {}; // hashmap for quickly finding gates.
module.exports  = {
  /****************************************************************
  generateMap
  summary
    Generates the map that is walkable by the user. This function
    also generates a little extra and makes it black to be the
    borders of the map. The black region that you see when you
    go to the edge of the map.
  ****************************************************************/
  generateMap: function(width, height) {
    width += VIEW_WIDTH;
    height += VIEW_HEIGHT;
    var map = []
    for (var x = 0; x < width; x++) {
      var col = [];
      for(var y = 0; y < height; y++){
        if( x < VIEW_WIDTH/2 || x >= width - VIEW_WIDTH/2 ||
            y < VIEW_HEIGHT/2 || y >= height - VIEW_HEIGHT/2){
          col.push(-1); // initilize boreders to black.
        } else {
          col.push(1)// initialze the map to walkable grass.
        }
      }
      map.push(col);
    }
    return map
  },

  /****************************************************************
  insertGate
  summary
    creates a gate on an edge of the map that will eventually lead
    to another map.
  ****************************************************************/
  insertGate: function(townMap, nextMap, gateLocation, dist){
    switch (gateLocation) {
      case "north":
        townMap[dist+VIEW_WIDTH/2][VIEW_HEIGHT/2-1] = nextMap
        gates[nextMap] = [dist+VIEW_WIDTH/2,VIEW_HEIGHT/2-1];
        break;
      case "south":
        townMap[dist+VIEW_WIDTH/2][townMap[0].length-VIEW_HEIGHT/2] = nextMap;
        gates[nextMap] = [dist+VIEW_WIDTH/2,townMap[0].length-VIEW_HEIGHT/2];
        break;
      case "west":
        townMap[VIEW_WIDTH/2-1][dist+VIEW_HEIGHT/2] = nextMap;
        gates[nextMap] = [VIEW_WIDTH/2-1,dist+VIEW_HEIGHT/2];
        break;
      case "east":
        townMap[townMap.length-VIEW_WIDTH/2][dist+VIEW_HEIGHT/2] = nextMap;
        gates[nextMap] = [townMap.length-VIEW_WIDTH/2,dist+VIEW_HEIGHT/2];
        break;
      default:
        console.log("Invalid border.");
    }
  },

  /****************************************************************
  insertObstruction
  summary
    given a map, creates a region of the map that doesn't allow
    the user to walk.
  return
    returns the map in case you wanna make copies of it.
  ****************************************************************/
  insertObstruction: function(map, loc_x, loc_y, width, height) {
    loc_x += VIEW_WIDTH/2;
    loc_y += VIEW_HEIGHT/2;
    for(var x = loc_x; x < width + loc_x; x++){
      for( var y = loc_y; y < height + loc_y; y++){
        map[x][y] = -1 // code for not walkable.
      }
    }
    return map
  },

  /****************************************************************
  initMap
  summary
    Creates and initilizes the walking feature of the game.

  TODO: add functionality for switching maps.
  ****************************************************************/
  initMap: function(townMap, mapName, mapX, mapY){
    console.assert( typeof mapName === "string");
    currentMap = mapName;
    getGate();

    console.log(gates[startingGate]);
    // mapX = gates[startingGate];
    // mapY = gates[startingGate];
    var direction = "south";
    var matX = mapX + VIEW_WIDTH/2  // don't touch
    var matY = mapY + VIEW_HEIGHT/2 // don't touch

    drawViewport(townMap, mapX, mapY);
    drawTile( VIEW_WIDTH/2, VIEW_HEIGHT/2,"player");

    key.pressed.on("w", function(key_event) {
      direction = "north";
      if ( typeof townMap[matX][matY-1] === "string") {
        loadMap(townMap[matX][matY-1])
      }
      switch (townMap[matX][matY-1]) {
        case -1:
          console.log("Border hit.");
          break;
        default:
          mapY -= 1;
          matY -= 1
          drawViewport(townMap, mapX, mapY);
          drawTile( VIEW_WIDTH/2, VIEW_HEIGHT/2,"player");
          break;
      }
    });

    key.pressed.on("s", function(key_event) {
      direction = "south";
      if ( typeof townMap[matX][matY+1] === "string") {
        loadMap(townMap[matX][matY+1])
      }
      switch (townMap[matX][matY+1]) {
        case -1:
          console.log("Border hit.");
          break;
        default:
          mapY += 1
          matY += 1
          drawViewport(townMap, mapX, mapY);
          drawTile( VIEW_WIDTH/2, VIEW_HEIGHT/2, "player");
      }
    });

    key.pressed.on("a", function(key_event) {
      direction = "west";
      if ( typeof townMap[matX-1][matY] === "string") {
        loadMap(townMap[matX-1][matY]);
      }
      switch (townMap[matX-1][matY]) {
        case -1:
          console.log("Border hit.");
          break;
        default:
          mapX -= 1;
          matX -= 1
          drawViewport(townMap, mapX, mapY);
          drawTile( VIEW_WIDTH/2, VIEW_HEIGHT/2, "player");
      }
    });

    key.pressed.on("d", function(key_event) {
      direction = "east";
      if (typeof townMap[matX+1][matY] === "string") {
        loadMap(townMap[matX+1][matY]);
      }
      switch (townMap[matX+1][matY]) {
        case -1:
          console.log("Border hit.");
          break;
        default:
          mapX += 1;
          matX += 1;
          drawViewport(townMap, mapX, mapY);
          drawTile( VIEW_WIDTH/2, VIEW_HEIGHT/2, "player");
      }
    });
  }
}




/****************************************************************
drawTile
summary
  draws an individual tile to the map. This should never
  be called outside of this class.
****************************************************************/
function drawTile( view_x, view_y, fillStyle ) {
  if( view_x > VIEW_WIDTH || view_y > VIEW_HEIGHT){
    console.error("drawTile out of range.");
    return;
  }
  // if offmap
  if( fillStyle == -2){
    return;
  }
  if ( typeof fillStyle === "string") {
    switch (fillStyle) {
      case "player":
        ctx.fillStyle = "bisque";
        break;
      default:
        ctx.fillStyle = "gray"
    }
  } else {
    switch(fillStyle) {
      case 1:
        ctx.fillStyle = "green"
        break;
      case 0:
        ctx.fillStyle = "blue"
        break;
      case -1:
        ctx.fillStyle = "black"
        break;
      default:
        ctx.fillStyle = "red"
        break;
    }
  }

  ctx.fillRect( view_x*TILE_SIZE, view_y*TILE_SIZE, TILE_SIZE, TILE_SIZE);
}

/****************************************************************
drawViewport
summary
  updates the current viewport when a user moves, this is called.
****************************************************************/
function drawViewport(map, map_x, map_y) {
  var mat_x = map_x + VIEW_WIDTH/2;
  var mat_y = map_y + VIEW_HEIGHT/2;
  for(var x = 0; x <= VIEW_WIDTH; x++){
    for(var y = 0; y <= VIEW_HEIGHT; y++){
      drawTile(x,y, map[map_x+x][map_y+y])
    }
  }
}


/****************************************************************
loadMap
summary
  Tells the bgProcess, which is listening for 'last-map' that
  the map that was just drawn was `currentMap`
****************************************************************/
function loadMap( nextMap ) {
  String(currentMap);
  ipc.send('remembering-current-map', currentMap);
  window.location.href = `file://${__dirname}/htmlmaps/` + nextMap + '.html'
}

ipc.on('last-gate-enclosed', function(event, lastGate) {
  startingGate = String(lastGate);
})

// after a long conversation between main, and the
// background process, lastGate will be called.
function getGate() {
  ipc.send('requested-last-gate');
}
