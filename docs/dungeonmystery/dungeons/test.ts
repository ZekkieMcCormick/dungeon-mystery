import { GenerateDungeon, Dungeon, FloorProperties, CreateMapString } from 'dungeon-mystery';
import { stringToMatrix } from 'C:/Coding/dungeon-mystery/src/ai_functions';

const dungeon_map = GenerateDungeon(new FloorProperties(), new Dungeon());

console.log(CreateMapString(dungeon_map));

const dungeon_matrix = stringToMatrix(CreateMapString(dungeon_map), 56); //56 represents the width, 56 is the default

console.log(dungeon_matrix);