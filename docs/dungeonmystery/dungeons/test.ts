import { GenerateDungeon, Dungeon, FloorProperties, CreateMapString } from 'dungeon-mystery'

const dungeon_map = GenerateDungeon(new FloorProperties(), new Dungeon());

console.log(CreateMapString(dungeon_map));