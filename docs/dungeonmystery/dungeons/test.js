"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dungeon_mystery_1 = require("dungeon-mystery");
var dungeon_map = (0, dungeon_mystery_1.GenerateDungeon)(new dungeon_mystery_1.FloorProperties(), new dungeon_mystery_1.Dungeon());
console.log((0, dungeon_mystery_1.CreateMapString)(dungeon_map));
