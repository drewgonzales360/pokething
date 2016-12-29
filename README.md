## Synopsis

This is an unpurposed game that is based on a tile-map system
and can be expanded to any game that a user chooses. Right now,
I don't have any really cool ideas for a story line, but I
the concept is there.

The folder jsmaps has all the js files that correspond to a
different 'map.' A map is a set of coordinates that is readily
accessable to the player without going through a 'gate'.

The 'gates' allow users to visit different maps.
![alt tag](https://cloud.githubusercontent.com/assets/6912711/21553278/7632b4b2-cdbc-11e6-9964-d7b2d671e213.png)
## Installation

Open a unix terminal, change directories until you're in the same directory
as the "Makefile", then type make

drew@alfred$ make

## API Reference
This will require the Map. Each webpage html should only have one
map. The map is the visible part of the screen where the user
is, so going through a gate will move you to a new map.
```javascript
var Map = require('../map');
```

This will construct the map with the first parameter creating
the width with, and the second parameter creating the height.
```javascript
Map.generateMap( int width, int height);
Map.generateMap( 13,18);
```

This will randomly generate npc characters that walk around the map
aimlessly. They'll just wander around and you can talk to them, but
right now, they'll just tel you their name.
```javascript
Map.generateCrowd(9);
```

A gate is a path from one map to another map. It's good practice for
north gate to enter the next map from the south so that the user
has some continuation between maps. The second paramter says which
edge of the current map the gate will appear on, and the third
parameter will say how far from the left the gate will be.

The second parameter can be only "north", "east", "south", "west".
```javascript
Map.insertGate(string thisMap, string wallOfMap, int fromLeft)
Map.insertGate("Route7", "north", 8);
```

This will just start the map and name is. When you make a new map
connecting, you should use the name provided here. 
```javascript
Map.initMap("Ikea");
```


Uses the following npm packages:
  "electron-prebuilt": "^1.3.5",
  "key-emit": "0.0.4"


## License

Copyright 2017 Kenneth Drew Gonzales

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
