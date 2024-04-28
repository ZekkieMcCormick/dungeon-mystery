"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dungeon_mystery_1 = require("dungeon-mystery");
var ai_functions_js_1 = require("C:/Coding/dungeon-mystery/evolution/ai_functions.js"); //CHANGE FROM ABSOLUTE TO WORK
var dungeon_map = (0, dungeon_mystery_1.GenerateDungeon)(new dungeon_mystery_1.FloorProperties(), new dungeon_mystery_1.Dungeon());
var scores = 0;
var iterationNum = 1000;
for (var i = 0; i < iterationNum; i++) {
    scores += (0, ai_functions_js_1.aStarSearch)((0, dungeon_mystery_1.CreateMapString)(dungeon_map), false)[0];
}
console.log('Average Score:');
console.log(scores / iterationNum);
