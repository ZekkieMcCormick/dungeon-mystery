"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dungeon_mystery_1 = require("dungeon-mystery");
var ai_functions_1 = require("C:/Coding/dungeon-mystery/src/ai_functions");
var dungeon_map = (0, dungeon_mystery_1.GenerateDungeon)(new dungeon_mystery_1.FloorProperties(), new dungeon_mystery_1.Dungeon());
console.log((0, dungeon_mystery_1.CreateMapString)(dungeon_map));
var dungeon_matrix = (0, ai_functions_1.stringToMatrix)((0, dungeon_mystery_1.CreateMapString)(dungeon_map), 56); //56 represents the width, 56 is the default
//console.log(dungeon_matrix);
var pathLength = (0, ai_functions_1.aStarSearch)(dungeon_matrix);
console.log("Path length: ".concat(pathLength));
