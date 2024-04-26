/*
 * File: test.js
 * Description: This script generates a dungeon map and finds a path through it using the A* search algorithm.
 *
 * Dependencies:
 *   - dungeon-mystery module
 *   - ai_functions module (file path: C:/Coding/dungeon-mystery/src/ai_functions)
 */

"use strict";

// Importing necessary modules from external sources.
Object.defineProperty(exports, "__esModule", { value: true });
var dungeon_mystery_1 = require("dungeon-mystery");
var ai_functions_1 = require("C:/Coding/dungeon-mystery/src/ai_functions");

// Generating a dungeon map using functions from "dungeon-mystery" module.
var dungeon_map = (0, dungeon_mystery_1.GenerateDungeon)(new dungeon_mystery_1.FloorProperties(), new dungeon_mystery_1.Dungeon());

// Logging the dungeon map as a string representation.
console.log((0, dungeon_mystery_1.CreateMapString)(dungeon_map));

// Converting the string representation of the dungeon map into a matrix representation.
var dungeon_matrix = (0, ai_functions_1.stringToMatrix)((0, dungeon_mystery_1.CreateMapString)(dungeon_map), 56); //56 represents the width, 56 is the default
//console.log(dungeon_matrix);

// Executing the A* search algorithm on the dungeon matrix to find a path.
var pathLength = (0, ai_functions_1.aStarSearch)(dungeon_matrix);

// Logging the length of the path found by the A* search algorithm.
console.log("Path length: ".concat(pathLength));
