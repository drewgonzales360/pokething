const canvas = document.getElementById("map");
const ctx = canvas.getContext("2d");
ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;


const TILE_SIZE   = 50
const VIEW_WIDTH  = 16
const VIEW_HEIGHT = 12

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
    case 1:
        ctx.fillStyle = "green"
        break;
    case 0:
        ctx.fillStyle = "blue"
        break;
    default:
        ctx.fillStyle = "black"
  }
  ctx.fillRect( view_x*TILE_SIZE, view_y*TILE_SIZE, TILE_SIZE, TILE_SIZE);
}

// Currently not being used. 
var Tile = function (loc_x, loc_y, tileType) {
  // 1 walk         - green
  // 0 surf         - blue
  // -1 obstructed  - black
  this.x = loc_x
  this.y = loc_y
  this.tileType = tileType;
};

// Generates a map. There will be black sections where you can't walk
// and black sections on ever border. Each map will be whatever section
// of the world that gets loaded.  
function generateMap(width, height) {
  var map = []
  for (var x = 0; x < width; x++) {
    var col = [];
    for(var y = 0; y < height; y++){
      if( x < VIEW_WIDTH/2 || x > width - VIEW_WIDTH/2 || 
          y < VIEW_HEIGHT/2 || y > height - VIEW_HEIGHT/2){
          col.push(-1); // initilize boreders to black. 
      } else {
          col.push(1)// initialze the map to walkable grass.
          
      }
    }
    map.push(col);
  }
  return map
}

// This function will put a building or something on the
// map where the player can't move to. 
// TODO: Add out of bounds logic. 
function insertObstruction(map, loc_x, loc_y, width, height) {
    for(var x = loc_x; x < width; x++){
        for( vary = loc_y; y < height; y++){
            map[x][y] = -1 // code for not walkable. 
        }
    }
    return map
}
var SproulTown = generateMap(50,50);
insertObstruction(SproulTown, 22, 22,5,5);


// Going to need to be called hella.  
function drawViewport(map, loc_x, loc_y) {
    for(var y = 0; y < VIEW_HEIGHT; y++){
        for(var x = 0; x < VIEW_WIDTH; x++){
            drawTile(x,y, map[loc_x+x][loc_y+y])
        }
    }
}


drawTile(3,3,1);
drawTile(15,11, 0)
