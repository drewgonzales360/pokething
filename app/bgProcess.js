
const ipc     = require('electron').ipcRenderer

var lastGate = "Route2";

// once main has asked for the last gate, send it back
ipc.on('requested-last-gate', function(event) {
  ipc.send('last-gate-enclosed', lastGate);
})

// main just told me the last map we were in.
ipc.on('remembering-current-map', function(event, currentMap){
  String(currentMap);
  lastGate = currentMap;
})
