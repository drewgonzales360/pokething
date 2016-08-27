/****************************************************************
FileName: main.js
Kenneth Drew Gonzales

Description:
Pokemon Hope. This is a videogame using a tile sized map
and you play one character that moves through the map. The
player is always shown in the center of the screen.

Last Edited: 8/25/16
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
    // frame: false,
    resizable: false
    })

  backgroundProcess = new BrowserWindow({
    width: 400,
    height: 300,
    show: true
  })
  // and load the index.html of the app.
  backgroundProcess.loadURL(`file://${__dirname}/app/bgProcess.html`)
  mainWindow.loadURL(`file://${__dirname}/app/htmlmaps/SproulTown.html`)

  // Open the DevTools.
  mainWindow.webContents.openDevTools()
  backgroundProcess.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
    backgroundProcess = null
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

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
var lastMap = "Route2"
ipc.on('last-map-request', function(event){
    event.returnValue = lastMap;
})