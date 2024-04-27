"use strict";
/*
 * File: test.ts
 * Description: This script generates a dungeon map and finds a path through it using the A* search algorithm for testing purposes.
 *
 * Dependencies:
 *   - dungeon-mystery module
 *   - ai_functions module (file path: C:/Coding/dungeon-mystery/src/ai_functions)
 */
Object.defineProperty(exports, "__esModule", { value: true });
// Importing necessary modules from external sources
var dungeon_mystery_1 = require("dungeon-mystery");
var ai_functions_1 = require("C:/Coding/dungeon-mystery/src/ai_functions"); //MAKE THIS NOT ABSOLUTE
// Generating a dungeon map using functions from "dungeon-mystery" module
var dungeon_map = (0, dungeon_mystery_1.GenerateDungeon)(new dungeon_mystery_1.FloorProperties(), new dungeon_mystery_1.Dungeon());
// Executing the A* search algorithm on the dungeon string to find a path
var pathLength = (0, ai_functions_1.aStarSearch)((0, dungeon_mystery_1.CreateMapString)(dungeon_map), true); //true signifies display is wanted
//callPythonScript('evolution.py');
