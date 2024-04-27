"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Importing necessary modules from external sources
var ai_functions_1 = require("./ai_functions");
var dungeon_mystery_1 = require("dungeon-mystery");
function generateDungeonWithParameters(args) {
    var genome = JSON.parse(args); //convert the dict-string back into a dictionary
    //GENOME IS YOUR DICT
    var visible = false;
    if (genome["visible"] > 0) {
        visible = true;
    }
    var floor_props = new dungeon_mystery_1.FloorProperties();
    floor_props.room_density = 6;
    floor_props.trap_density = 5;
    floor_props.floor_connectivity = 15;
    floor_props.num_extra_hallways = 10;
    floor_props.monster_house_chance = 20;
    floor_props.room_flags.f_secondary_terrain_generation = true; //DO NOT TOUCH WITH DICT, ALWAYS TRUE
    floor_props.secondary_terrain_density = 5;
    floor_props.secondary_structures_budget = 5;
    floor_props.maze_room_chance = 100;
    var dungeon = new dungeon_mystery_1.Dungeon();
    var generation_constants = new dungeon_mystery_1.GenerationConstants();
    generation_constants.merge_rooms_chance = 50;
    var advanced_generation_settings = new dungeon_mystery_1.AdvancedGenerationSettings();
    advanced_generation_settings.allow_wall_maze_room_generation = true;
    var dungeon_map = (0, dungeon_mystery_1.GenerateDungeon)(floor_props, dungeon, generation_constants, advanced_generation_settings);
    // Executing the A* search algorithm on the dungeon string to find a path
    return (0, ai_functions_1.aStarSearch)((0, dungeon_mystery_1.CreateMapString)(dungeon_map), visible);
}
