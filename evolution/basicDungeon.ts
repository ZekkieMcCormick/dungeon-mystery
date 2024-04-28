import { GenerateDungeon, Dungeon, FloorProperties, CreateMapString } from 'dungeon-mystery'
import { aStarSearch } from './ai_functions'; 

const dungeon_map = GenerateDungeon(new FloorProperties(), new Dungeon());

var scores = 0;
var iterationNum = 1000;
for(var i = 0; i<iterationNum; i++){
    scores+=aStarSearch(CreateMapString(dungeon_map),false)[0];
}

console.log('Average Score:')
console.log(scores/iterationNum);