import { GenerateDungeon, Dungeon, FloorProperties, GenerationConstants, AdvancedGenerationSettings, CreateMapString, FloorLayout } from 'dungeon-mystery'
import { aStarSearch } from './ai_functions'; 

function randomNumber(defaultValue: number): number { //This replicates the randomization done for the initial genomes.
    return (Math.random() * (2 * defaultValue) - defaultValue)+defaultValue;
}

let floor_props = new FloorProperties();
floor_props.layout = FloorLayout.LAYOUT_LARGE;
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

let dungeon = new Dungeon();

let generation_constants = new GenerationConstants();
generation_constants.merge_rooms_chance = 50;

let advanced_generation_settings = new AdvancedGenerationSettings();
advanced_generation_settings.allow_wall_maze_room_generation = true;

const dungeon_map = GenerateDungeon(floor_props, dungeon, generation_constants, advanced_generation_settings);

var scores = 0;
var iterationNum = 10000;
for(var i = 0; i<iterationNum; i++){
    scores+=aStarSearch(CreateMapString(dungeon_map),false)[0];
}

console.log('Average Score:')
console.log(scores/iterationNum);