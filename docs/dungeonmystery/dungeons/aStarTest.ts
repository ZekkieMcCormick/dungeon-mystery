// Importing necessary modules from external sources
import { aStarSearch } from 'C:/Coding/dungeon-mystery/evolution/ai_functions.js';
import { GenerateDungeon, Dungeon, FloorProperties, GenerationConstants, AdvancedGenerationSettings, CreateMapString, FloorLayout } from 'dungeon-mystery'

    let floor_props = new FloorProperties();
    floor_props.room_density = 0; //genome["room_density"]
    floor_props.trap_density = -5;
    //floor_props.floor_connectivity = -2; // 15; Seemingly causing an issue when this value is evolved. CANNOT BE NEGATIVE
    floor_props.num_extra_hallways = -10;
    floor_props.room_flags.f_secondary_terrain_generation = true; //Always true
    floor_props.secondary_terrain_density = -5;
    floor_props.secondary_structures_budget = -5;
    floor_props.maze_room_chance = 150;

    floor_props.enemy_density = 110;
    floor_props.secondary_terrain_density = 110;

    let dungeon = new Dungeon();

    let generation_constants = new GenerationConstants();
    generation_constants.merge_rooms_chance = 150;

    let advanced_generation_settings = new AdvancedGenerationSettings();
    advanced_generation_settings.allow_wall_maze_room_generation = true;  // Not in dict

    const dungeon_map = GenerateDungeon(floor_props, dungeon, generation_constants, advanced_generation_settings);

// Executing the A* search algorithm on the dungeon string to find a path
    console.log(aStarSearch(CreateMapString(dungeon_map), true)[1]);