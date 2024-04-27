// Importing necessary modules from external sources
import { aStarSearch } from 'C:/Coding/dungeon-mystery/src/ai_functions'; //MAKE THIS NOT ABSOLUTE
import { callPythonScript } from 'C:/Coding/dungeon-mystery/evolution/call_python'; //MAKE THIS NOT ABSOLUTE
import { GenerateDungeon, Dungeon, FloorProperties, GenerationConstants, AdvancedGenerationSettings, CreateMapString, FloorLayout } from 'dungeon-mystery'

function generateDungeonWithParameters(visual: boolean) : number {
    let floor_props = new FloorProperties();
    floor_props.layout = FloorLayout.LAYOUT_LARGE;
    floor_props.room_density = 6;
    floor_props.trap_density = 5;
    floor_props.floor_connectivity = 15;
    floor_props.num_extra_hallways = 10;
    floor_props.monster_house_chance = 20;
    floor_props.room_flags.f_secondary_terrain_generation = true;
    floor_props.secondary_terrain_density = 5;
    floor_props.secondary_structures_budget = 5;
    floor_props.maze_room_chance = 100;

    let dungeon = new Dungeon();

    let generation_constants = new GenerationConstants();
    generation_constants.merge_rooms_chance = 50;

    let advanced_generation_settings = new AdvancedGenerationSettings();
    advanced_generation_settings.allow_wall_maze_room_generation = true;

    const dungeon_map = GenerateDungeon(floor_props, dungeon, generation_constants, advanced_generation_settings);

// Executing the A* search algorithm on the dungeon string to find a path
    return aStarSearch(CreateMapString(dungeon_map), visual); //true signifies display is wanted
}