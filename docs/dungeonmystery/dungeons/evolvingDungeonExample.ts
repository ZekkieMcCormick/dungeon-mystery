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
import { aStarSearch } from 'C:/Coding/dungeon-mystery/src/ai_functions'; //MAKE THIS NOT ABSOLUTE
import { callPythonScript } from 'C:/Coding/dungeon-mystery/evolution/call_python'; //MAKE THIS NOT ABSOLUTE

// Generating a dungeon map using functions from "dungeon-mystery" module
const dungeon_map = GenerateDungeon(new FloorProperties(), new Dungeon());

// Executing the A* search algorithm on the dungeon string to find a path
const pathLength = aStarSearch(CreateMapString(dungeon_map), true); //true signifies display is wanted

//callPythonScript('evolution.py');