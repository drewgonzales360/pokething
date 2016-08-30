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
Last Edited: 8/29/16
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

var mapWidth      = 0;
var mapHeight     = 0;
var currentMap    = [];    // global variable for map the player sees.
var people        = {};        // hashmap for quickly finding people.
var gates         = {};         // hashmap for quickly finding gates.


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
    mapWidth = width;
    mapHeight = height;
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
    currentMap = map;
  },

  /****************************************************************
  insertGate
  summary
    creates a gate on an edge of the map that will eventually lead
    to another map.
  ****************************************************************/
  insertGate: function(nextMap, gateLocation, dist){
    switch (gateLocation) {
      case "north":
        currentMap[dist+VIEW_WIDTH/2][VIEW_HEIGHT/2-1] = nextMap
        gates[nextMap] = ["north", dist+VIEW_WIDTH/2,VIEW_HEIGHT/2-1];
        break;
      case "south":
        currentMap[dist+VIEW_WIDTH/2][currentMap[0].length-VIEW_HEIGHT/2] = nextMap;
        gates[nextMap] = ["south", dist+VIEW_WIDTH/2,currentMap[0].length-VIEW_HEIGHT/2];
        break;
      case "west":
        currentMap[VIEW_WIDTH/2-1][dist+VIEW_HEIGHT/2] = nextMap;
        gates[nextMap] = ["west", VIEW_WIDTH/2-1,dist+VIEW_HEIGHT/2];
        break;
      case "east":
        currentMap[currentMap.length-VIEW_WIDTH/2][dist+VIEW_HEIGHT/2] = nextMap;
        gates[nextMap] = ["east",currentMap.length-VIEW_WIDTH/2,dist+VIEW_HEIGHT/2];
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
  insertObstruction: function(loc_x, loc_y, width, height) {
    loc_x += VIEW_WIDTH/2;
    loc_y += VIEW_HEIGHT/2;
    for(var x = loc_x; x < width + loc_x; x++){
      for( var y = loc_y; y < height + loc_y; y++){
        currentMap[x][y] = -1 // code for not walkable.
      }
    }
  },

  /****************************************************************
  insertPerson
  summary
    Creates a new person in a given map who will roam the allowed
    area randomly. The direction chosen at random is from Math.random.

  ****************************************************************/
  // insertPerson: function(name, loc_x, loc_y ){
  //   loc_x += VIEW_WIDTH/2;
  //   loc_y += VIEW_HEIGHT/2;
  //   people[name] = [loc_x, loc_y];
  //   if( currentMap[loc_x][loc_y] === -1){
  //     console.log("Out of bounds error.");
  //     return;
  //   }
  //   currentMap[loc_x][loc_y] = -3; // code for npc
  // },

  generateCrowd: function(crowdCount) {
    for(var i = 0; i < crowdCount; i++){
      let x = Math.floor(Math.random()*mapWidth) + VIEW_WIDTH/2;
      let y = Math.floor(Math.random()*mapHeight) + VIEW_HEIGHT/2;
      while (currentMap[x][y] === -1) {
        x = Math.floor(Math.random()*mapWidth) + VIEW_WIDTH/2;
        y = Math.floor(Math.random()*mapHeight) + VIEW_HEIGHT/2;
      }
      insertPerson("Crowd " + i, x - VIEW_WIDTH/2, y - VIEW_HEIGHT/2);
    }
  },

  /****************************************************************
  initMap
  summary
    Creates and initilizes the walking feature of the game.

  TODO: add functionality for switching maps.
  ****************************************************************/
  initMap: function( thisMap, mapX, mapY){
    console.assert( typeof thisMap === "string");
    var startingGate = ipc.sendSync('last-map-request');
    console.log(startingGate);
    let start = setStartingLocation(gates[startingGate])
    mapX = start[0]-VIEW_WIDTH/2;
    mapY = start[1]-VIEW_HEIGHT/2;
    var direction = "south";
    var matX = mapX + VIEW_WIDTH/2  // don't touch
    var matY = mapY + VIEW_HEIGHT/2 // don't touch

    drawViewport(mapX, mapY); // not sure if i need this.

    moveAllPeople();

    setInterval(function () {
      drawViewport(mapX, mapY);
    }, 500);
    key.pressed.on("w", function(key_event) {
      direction = "north";
      if ( typeof currentMap[matX][matY-1] === "string") {
        loadMap(currentMap[matX][matY-1], thisMap)
      }
      switch (currentMap[matX][matY-1]) {
        case -1:
          console.log("Border hit.");
          break;
        case -3: // NPC hit
          console.log("NPC hit.");
          break;
        default:
          mapY -= 1;
          matY -= 1
          drawViewport(mapX, mapY);
          break;
      }
    });

    key.pressed.on("s", function(key_event) {
      direction = "south";
      if ( typeof currentMap[matX][matY+1] === "string") {
        loadMap(currentMap[matX][matY+1], thisMap)
      }
      switch (currentMap[matX][matY+1]) {
        case -1:
          console.log("Border hit.");
          break;
        case -3: // NPC hit
          console.log("NPC hit.");
          break;
        default:
          mapY += 1
          matY += 1
          drawViewport(mapX, mapY);
      }
    });

    key.pressed.on("a", function(key_event) {
      direction = "west";
      if ( typeof currentMap[matX-1][matY] === "string") {
        loadMap(currentMap[matX-1][matY], thisMap);
      }
      switch (currentMap[matX-1][matY]) {
        case -1:
          console.log("Border hit.");
          break;
        case -3: // NPC hit
          console.log("NPC hit.");
          break;
        default:
          mapX -= 1;
          matX -= 1
          drawViewport(mapX, mapY);
      }
    });

    key.pressed.on("d", function(key_event) {
      direction = "east";
      if (typeof currentMap[matX+1][matY] === "string") {
        loadMap(currentMap[matX+1][matY], thisMap);
      }
      switch (currentMap[matX+1][matY]) {
        case -1:
          console.log("Border hit.");
          break;
        case -3: // NPC hit
          console.log("NPC hit.");
          break;
        default:
          mapX += 1;
          matX += 1;
          drawViewport(mapX, mapY);
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
      case -3: // NPC hit
        ctx.fillStyle = "burlywood"
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
function drawViewport(map_x, map_y) {
  var mat_x = map_x + VIEW_WIDTH/2;
  var mat_y = map_y + VIEW_HEIGHT/2;
  for(var x = 0; x <= VIEW_WIDTH; x++){
    for(var y = 0; y <= VIEW_HEIGHT; y++){
      drawTile(x,y, currentMap[map_x+x][map_y+y])
    }
  }
  drawTile( VIEW_WIDTH/2, VIEW_HEIGHT/2,"player");
}


/****************************************************************
loadMap
summary
  Tells the bgProcess, which is listening for 'last-map' that
  the map that was just drawn was
****************************************************************/
function loadMap( nextMap , thisMap) {
  ipc.sendSync('memorize-last-map', thisMap);
  window.location.href = `file://${__dirname}/htmlmaps/` + nextMap + '.html'
}

function setStartingLocation( gate ) {
  let gateX = gate[1];
  let gateY = gate[2];
  switch (gate[0]) {
    case "north":
      return [gateX, gateY+1];
      break;
    case "south":
      return [gateX, gateY-1];
      break;
    case "east":
      return [gateX-1, gateY];
      break;
    case "west":
      return [gateX+1, gateY];
      break;
    default:
      console.log("Gate type not found.");
  }
}


/****************************************************************
npcMove
summary
  This will determine where the npc moves. Must pass it matrix
  values, actual values in the matrix, not locations in the map.
  Call this function ever two seconds or so.
****************************************************************/

function include(array, value) {
  for (var i = 0; i < array.length; i++) {
    if (array[i] === value) {
      return true;
    }
  }
  return false;
}

function moveAllPeople() {
  setInterval(function(){
    ipc.send('npc-update', currentMap, people);
  }, 3000);
}

// after the main process calculates where every npc moved,
// update the currentMap
ipc.on('updated-npc', function(event,  peeps) {
  for (var indi in peeps) {
    currentMap[people[indi][0]][people[indi][1]] = 1
    currentMap[peeps[indi][0]][peeps[indi][1]] = -3; // code for grass.
  }
  people = peeps;
});

function insertPerson(name, loc_x, loc_y ){
  loc_x += VIEW_WIDTH/2;
  loc_y += VIEW_HEIGHT/2;
  people[name] = [loc_x, loc_y];
  if( currentMap[loc_x][loc_y] === -1){
    console.log("Out of bounds error.");
    return;
  }
  currentMap[loc_x][loc_y] = -3; // code for npc
}
