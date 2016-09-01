/****************************************************************
FileName: main.js
Kenneth Drew Gonzales

Description:
This is a videogame using a tile sized map
and you play one character that moves through the map. The
player is always shown in the center of the screen.

Last Edited: 8/29/16
****************************************************************/

// Module to control application life.
const electron = require('electron')

// Module to create native browser window.
const app             = electron.app
const BrowserWindow   = electron.BrowserWindow
const ipc             = electron.ipcMain;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
let backgroundProcess

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 850,
    height: 650,
    center: true,
    frame: false,
    resizable: false
    })

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/app/htmlmaps/SproulTown.html`)

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
    app.quit();
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

/****************************************************************
Main functions
summary
  In this file you can include the rest of your app's specific main process
  code. You can also put them in separate files and require them here.
****************************************************************/

/****************************************************************
For switching maps. Gotta remember the gate we're coming from 
when a new map is loaded. 
****************************************************************/
var lastMap = "Route2"
ipc.on('last-map-request', function(event){
    event.returnValue = lastMap;
})
ipc.on('memorize-last-map', function(event, lMap){
  lastMap = lMap;
  event.returnValue = lastMap;
})

/****************************************************************
For moving all npc characters. This will randomly generate a 
direction for an npc character to move. If the npc is in
conversation, the character will not move. 
****************************************************************/
ipc.on('npc-update', function (event, map, people) {
  for (var indi in people) {
    console.log(indi);
    // if the npc is being talked to, don't move
    if (people[indi][2]) {
        findOneDirection(map, people[indi]);
    }
  }
  mainWindow.webContents.send('updated-npc', people);
});


function findOneDirection(map, person) {
    let feasibleDirections = [];
    if (map[person[0]][person[1]-1] === 1 ) {  // north
        feasibleDirections.push("north");
    }
    if (map[person[0]-1][person[1]] === 1 ) {   // east
        feasibleDirections.push("east");
    }
    if (map[person[0]][person[1]+1] === 1) {   // south
        feasibleDirections.push("south");
    }
    if (map[person[0]+1][person[1]] === 1) {   // west
        feasibleDirections.push("west");
    }
    console.log(feasibleDirections);
    var directionNotFound = true;
    while ( directionNotFound ) {
        let direction = Math.floor(Math.random()*4);
        switch (direction) {
            case 1: // can i go north
            if (include(feasibleDirections, "north")) {
                person[1] -= 1
                directionNotFound = false;
            }
            break;
            case 2:
            if (include(feasibleDirections, "east")) {
                person[0] -= 1
                directionNotFound = false;
            }
            break;
            case 3:
            if (include(feasibleDirections, "south")) {
                person[1] += 1
                directionNotFound = false;
            }
            break;
            case 4:
            if (include(feasibleDirections, "west")) {
                person[0] += 1
                directionNotFound = false;
            }
            break;
            default:
        }
    }
}

function include(array, value) {
  for (var i = 0; i < array.length; i++) {
    if (array[i] === value) {
      return true;
    }
  }
  return false;
}


