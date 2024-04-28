# AI Dungeon Generation Notes
This project builds off of Dungeon Mystery, which generates mazes from the Pokemon Mystery Dungeon games randomly. There is the ability to adjust parameters to change the likelihood of certain events, i.e. the generation of a maze room.

Our project aims to maximize the shortest path a given agent with a random start position has to take in order to reach the exit. In other words, our AI evolves with the path length returned from an A* search of the dungeon as its fitness function.

Developed by Joanna Lewis, Zekkie McCormick, Alexa Delenela, and Sera Crayton.

Added dependencies:
- Python
- ExecJS
    - Run `pip install PyExecJS`

To create a dungeon:
- Install node.js
- Run `npm install dungeon-mystery`
- Run `npm install -g typescript` (may be necessary)
- Create `(filename).ts` file with dungeon info (examples in docs/dungeonmystery/Examples.md)
- Compile with `tsc (filename).ts`
- Run `node (filename).js`

To evolve a dungeon:
- Follow steps 1-3 above
- Install added dependencies (above)
- cd into evolution folder
    - Run `cd evolution`
- Run `python evolution.py`
    - Flags can be set: `python evolution.py -p POPULATION_SIZE -g GENERATION_NUMBER -mu MUTATION_RATE -c CROSSOVER_RATE -t TRIAL_NUMBER -ma MAGNITUDE`
    - The trial number is the amount of times dungeons of a single genome are run and averaged in order to determine fitness score.
    - Magnitude is the amount the initial population is randomized by. Try to keep below 2 or backend code has small chance of crashing, 5 has high chance.

To create dungeons without evolving:
 - Follow steps 1-3 above
 - Run `node basicDungeon.js`
 - Output is the average path length for 1000 generated dungeons, no evolution applied 

Files created:
- ai_functions.ts/js : contains A* function and other useful functions for interpreting dungeon output
- aStarTest.ts/js : generates a single plain dungeon and runs A* search on it, displaying output
- call_javascript.py : calls a javascript file from python
- evolveDungeon.ts/js : takes a dictionary of arguments to appropriately generate a given dungeon and return its fitness function, as defined by A* search
- basicDungeon.ts/js : creates 10000 basic dungeons and averages their path length. No evolution. Typically outputs 25-35.

Files added and adapted from previous projects:
- commonEvolution.py : low-level evolution functions that perform small tasks related to evolution
- evolution.py : high-level evolution functions to evolve agents for a given problem

Files added and NOT adapted from previous projects:
- util.py : contains utility functions used in commonEvolution.py

Evolution Workflow:
- call evolution.py
    - args dict is created with command line parameters
    - passed into evolution()
    - evolution calls initialPopulation() to generate starter genomes
        - This population is created by randomly adding or subtracting a given magnitude from default values
    - for the number of given generations, evaluate the population by finding the fitness function of each genome by calling evalutatePopulation() which calls evaluateGenome()
        - This is done by calling call_javascript.py, which calls evolveDungeon.js (which is automatically created after compiling evolveDungeon.ts)
            - NOTE: This is done by passing the genome dictionary as a JSON string and reassembling it in the JS
        - evolveDungeon.js calls aStarSearch() in ai_functions.ts, and returns the length of the shortest path from a random legal starting point which is then used as its fitness function
    - create the next generation by calling project code found in commonEvolution.py
    - after all generations have completed, call all champions with postEvaluations() to generate dungeons and run A* on them, displaying results

Parameters changed:
- Certain dungeon parameters are changed with AI
    - room_density: the number of rooms generated on a floor
    - trap_density: the number of traps spawned on a floor
    - floor_connectivity: the number of hallways generated between rooms
    - num_extra_hallways: the number of extra hallways to be generated
    - maze_room_chance: the percentage chance for a special wall maze room to be generated
    - merge_rooms_chance: the percentage chance that 2 rooms merge into one, large room
    - enemy_density: the number of enemies spawned on a floor

# dungeon-mystery

[![npm](https://img.shields.io/npm/v/dungeon-mystery)](https://www.npmjs.com/package/dungeon-mystery)

![dungeon-mystery512x487](https://github.com/EpicYoshiMaster/dungeon-mystery/assets/32598419/8aeb7f74-c97d-473b-943a-115f4c83e015)

Logo by [@sgtmug](https://twitter.com/sergeantmug)
 
dungeon-mystery is a Typescript implementation of Pokémon Mystery Dungeon: Explorers of Sky's dungeon algorithm.

This package is the main code behind [Pokémon Dungeoneer](https://github.com/EpicYoshiMaster/pokemon-dungeoneer), a web tool for generating and visualizing PMD layouts.

It's built to replicate the original algorithm as closely as possible, while also being much more readable and useful as a reference.

This package features:

- Fully commented functions with address references for the NA version of Explorers of Sky
- Complete map generation, returning all relevant data associated with the map as used in the game.

## Installation

```bash
npm install dungeon-mystery
```

## Documentation

Documentation is available [here](https://epicyoshimaster.github.io/dungeon-mystery/)!

## License

[GNU GPL v3](LICENSE)

## Sources

This project could not exist without the amazing work by members of the community who have researched and documented the map generation process extensively.

[pmdsky-debug](https://github.com/UsernameFodder/pmdsky-debug) - Central resource for debugging information to reverse engineer Explorers of Sky

[dungeon-eos](https://github.com/SkyTemple/dungeon-eos) - Python implementation of the dungeon algorithm used as part of [SkyTemple](https://skytemple.org/)

[Map generation](https://docs.google.com/document/d/1HuJIEOtTYCtSHK6R-sp4LC2gk1RDL_mfoFL6Qn_wdkE/edit) - Document by End45 detailing the map generation process

[Dungeon data](https://docs.google.com/document/d/1UfiFz4xAPtGd-1X2JNE0Jy2z-BLkze1PE4Fo9u-QeYo/edit) - Document by End45 detailing how dungeon-related data is organized and structured
