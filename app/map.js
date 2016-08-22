const canvas = document.getElementById("map");
const ctx = canvas.getContext("2d");
ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;


const TILE_SIZE   = 50
const VIEW_WIDTH  = 15
const VIEW_HEIGHT = 11


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


var Tile = function (loc_x, loc_y, tileType) {
  // 1 walk         - green
  // 0 surf         - blue
  // -1 obstructed  - black
  this.x = loc_x
  this.y = loc_y
  this.tileType = tileType;
};

function generateMap(width, height) {
  var map = []
  for (var y = 0; y < width; y++) {
    var row = [];
    for(var x = 0; x < height; x++){
      row.push(1)// initialze the map to walkable grass.
    }
    map.push(row);
  }
}

var SproulTown = []



drawTile(3,3,1);
drawTile(15,11, 0)
