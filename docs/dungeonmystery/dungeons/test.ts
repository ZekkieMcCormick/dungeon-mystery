/*
 * File: test.ts
 * Description: This script generates a dungeon map and finds a path through it using the A* search algorithm for testing purposes.
 *
 * Dependencies:
 *   - dungeon-mystery module 
 *   - ai_functions module (file path: C:/Coding/dungeon-mystery/src/ai_functions)
 */

// Importing necessary modules from external sources
import { GenerateDungeon, Dungeon, FloorProperties, CreateMapString } from 'dungeon-mystery';
import { stringToMatrix, aStarSearch } from 'C:/Coding/dungeon-mystery/src/ai_functions';

// Generating a dungeon map using functions from "dungeon-mystery" module
const dungeon_map = GenerateDungeon(new FloorProperties(), new Dungeon());
// Logging the dungeon map as a string representation
console.log(CreateMapString(dungeon_map));

// Converting the string representation of the dungeon map into a matrix representation
const dungeon_matrix = stringToMatrix(CreateMapString(dungeon_map), 56); //56 represents the width, 56 is the default
//console.log(dungeon_matrix);

// Executing the A* search algorithm on the dungeon matrix to find a path
const pathLength = aStarSearch(dungeon_matrix);
// Logging the length of the path found by the A* search algorithm
console.log(`Path length: ${pathLength}`);