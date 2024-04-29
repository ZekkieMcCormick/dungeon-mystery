"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dungeon_mystery_1 = require("dungeon-mystery");
var ai_functions_1 = require("./ai_functions");
function randomNumber(defaultValue) {
    return (Math.random() * (2 * defaultValue) - defaultValue) + defaultValue;
}
var floor_props = new dungeon_mystery_1.FloorProperties();
floor_props.layout = dungeon_mystery_1.FloorLayout.LAYOUT_LARGE;
floor_props.room_density = randomNumber(6);
floor_props.item_density = randomNumber(5);
floor_props.enemy_density = randomNumber(10);
floor_props.trap_density = randomNumber(5);
floor_props.floor_connectivity = randomNumber(15);
floor_props.num_extra_hallways = randomNumber(10);
floor_props.room_flags.f_secondary_terrain_generation = true;
floor_props.secondary_terrain_density = randomNumber(5);
floor_props.secondary_structures_budget = randomNumber(5);
floor_props.maze_room_chance = randomNumber(100);
var dungeon = new dungeon_mystery_1.Dungeon();
var generation_constants = new dungeon_mystery_1.GenerationConstants();
generation_constants.merge_rooms_chance = 50;
var advanced_generation_settings = new dungeon_mystery_1.AdvancedGenerationSettings();
advanced_generation_settings.allow_wall_maze_room_generation = true;
var dungeon_map = (0, dungeon_mystery_1.GenerateDungeon)(floor_props, dungeon, generation_constants, advanced_generation_settings);
var scores = 0;
var iterationNum = 10000;
for (var i = 0; i < iterationNum; i++) {
    scores += (0, ai_functions_1.aStarSearch)((0, dungeon_mystery_1.CreateMapString)(dungeon_map), false)[0];
}
console.log('Average Score:');
console.log(scores / iterationNum);
