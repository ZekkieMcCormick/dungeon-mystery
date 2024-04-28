"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Importing necessary modules from external sources
var ai_functions_1 = require("./ai_functions");
var dungeon_mystery_1 = require("dungeon-mystery");
function generateDungeonWithParameters(args) {
    var genome = JSON.parse(args); //convert the dict-string back into a dictionary
    //The dict must always output a number, so the visibility/secondary terrian generation boolean comes through as a number to be converted
    var visible = false;
    if (genome["visible"] > 0) {
        visible = true;
    }
    // features to be editted, read from dict
    var floor_props = new dungeon_mystery_1.FloorProperties();
    floor_props.room_density = genome["room_density"]; // 6; 
    floor_props.trap_density = Math.abs(genome["trap_density"]); // 5;
    floor_props.floor_connectivity = Math.abs(genome["floor_connectivity"]); // 15; Crashes when negative
    floor_props.num_extra_hallways = Math.abs(genome["num_extra_hallways"]); // 10;
    floor_props.maze_room_chance = Math.abs(genome["maze_room_chance"]); // 100;
    floor_props.enemy_density = genome["enemy_density"]; // 4;
    floor_props.secondary_terrain_density = Math.abs(genome["secondary_terrain_density"]); // 5;
    if (genome["f_secondary_terrain_generation"] > 0) {
        floor_props.room_flags.f_secondary_terrain_generation = true;
    }
    var dungeon = new dungeon_mystery_1.Dungeon();
    var generation_constants = new dungeon_mystery_1.GenerationConstants();
    generation_constants.merge_rooms_chance = genome["merge_rooms_chance"]; // 50;
    var advanced_generation_settings = new dungeon_mystery_1.AdvancedGenerationSettings();
    advanced_generation_settings.allow_wall_maze_room_generation = true; // Not in dict
    var dungeon_map = (0, dungeon_mystery_1.GenerateDungeon)(floor_props, dungeon, generation_constants, advanced_generation_settings);
    // Executing the A* search algorithm on the dungeon string to find a path
    //console.log(CreateMapString(dungeon_map));
    return (0, ai_functions_1.aStarSearch)((0, dungeon_mystery_1.CreateMapString)(dungeon_map), visible);
}
