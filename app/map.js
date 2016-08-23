const canvas = document.getElementById("map");
const ctx = canvas.getContext("2d");
const key = require('key-emit')(document);
ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;

const TILE_SIZE   = 50;
const VIEW_WIDTH  = 16;
const VIEW_HEIGHT = 12;


module.exports = {
  // Generates a map. There will be black sections where you can't walk
  // and black sections on ever border. Each map will be whatever section
  // of the world that gets loaded.
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


  // This function will put a building or something on the
  // map where the player can't move to.
  // loc_x and loc_y are map coordinates, not mat
  // TODO: Add out of bounds logic.
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

  initMap: function(townMap, mapX, mapY){
    drawViewport(townMap, mapX, mapY);
    drawTile( VIEW_WIDTH/2, VIEW_HEIGHT/2,"player");

    var matX = mapX + VIEW_WIDTH/2  // don't touch
    var matY = mapY + VIEW_HEIGHT/2 // don't touch

    key.pressed.on("w", function(key_event) {
      if( townMap[matX][matY-1] == 1){
        mapY -= 1;
        matY -= 1
      }
      drawViewport(townMap, mapX, mapY);
      drawTile( VIEW_WIDTH/2, VIEW_HEIGHT/2,"player");
      console.log("Direction");
    });

    key.pressed.on("s", function(key_event) {
      if( townMap[matX][matY+1] == 1){
        mapY += 1
        matY += 1
      }
      drawViewport(townMap, mapX, mapY);
      drawTile( VIEW_WIDTH/2, VIEW_HEIGHT/2, "player");
      console.log("Direction");
    });

    key.pressed.on("a", function(key_event) {
      if( townMap[matX-1][matY] == 1){
        mapX -= 1;
        matX -= 1
      }
      drawViewport(townMap, mapX, mapY);
      drawTile( VIEW_WIDTH/2, VIEW_HEIGHT/2, "player");
      console.log("Direction");
    });

    key.pressed.on("d", function(key_event) {
      if( townMap[matX+1][matY] == 1){
        mapX += 1;
        matX += 1;
      }
      drawViewport(townMap, mapX, mapY);
      drawTile( VIEW_WIDTH/2, VIEW_HEIGHT/2, "player");
      console.log("Direction");
    });
  }
}




// used to draw a tile on the viewport
function drawTile( view_x, view_y, fillStyle ) {
  if( view_x > VIEW_WIDTH || view_y > VIEW_HEIGHT){
    console.error("drawTile out of range.");
    return;
  }
  // if offmap
  if( fillStyle == -2){
    return;
  }
  switch(fillStyle) {
    case "player":
    ctx.fillStyle = "bisque"
    break;
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
  ctx.fillRect( view_x*TILE_SIZE, view_y*TILE_SIZE, TILE_SIZE, TILE_SIZE);
}

// Going to need to be called hella.
// loc_x and loc_y have to be the center
// indexed 0 through 16, 17 total
function drawViewport(map, map_x, map_y) {
  var mat_x = map_x + VIEW_WIDTH/2;
  var mat_y = map_y + VIEW_HEIGHT/2;
  for(var x = 0; x <= VIEW_WIDTH; x++){
    for(var y = 0; y <= VIEW_HEIGHT; y++){
      drawTile(x,y, map[map_x+x][map_y+y])
    }
  }
}
