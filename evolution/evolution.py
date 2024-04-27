# evolution.py
# ------------------
#
# This extension to the PacMan Projects made by Jacob Schrum
# (schrum2@southwestern.edu) of Southwestern University.
# http://people.southwestern.edu/~schrum2/
# Original licensing information below.
#
# Licensing Information:  You are free to use or extend these projects for
# educational purposes provided that (1) you do not distribute or publish
# solutions, (2) you retain this notice, and (3) you provide clear
# attribution to UC Berkeley, including a link to http://ai.berkeley.edu.
# 
# Attribution Information: The Pacman AI projects were developed at UC Berkeley.
# The core projects and autograders were primarily created by John DeNero
# (denero@cs.berkeley.edu) and Dan Klein (klein@cs.berkeley.edu).
# Student side autograding was added by Brad Miller, Nick Hay, and
# Pieter Abbeel (pabbeel@cs.berkeley.edu).
#
# Adapted for our AI final project code for Pokemon Mystery Dungeon.

import util
import random
import math
import commonEvolution
import call_javascript
import argparse
import json
import os
    
def evolution(args):
    """
        Basic framework for evolution.
        1) Initialize the population
        2) Evaluate population
        3) Get next generation through selection, mutation, and crossover
        4) Repeat from step 2 until done
    """
    # Extract parameters important for evolution
    populationSize = args['populationSize']
    generations = args['generations']
    mutationRate = args['mutationRate']
    crossoverRate = args['crossoverRate']
    magnitude = args['magnitude']

    # Get initial population
    population = initialPopulation(populationSize, magnitude)
    print("Generated initial pop")
    # Evolve for specified number of generations
    for g in range(generations):
        if commonEvolution.output: print("Starting generation", g)
        # Evaluate all genomes
        performanceGenomePairs = evaluatePopulation(population, **args)
        # Display fitness information
        justFitnesses = [f for (g,f) in performanceGenomePairs]
        championFitness = max(justFitnesses)
        averageFitness = sum(justFitnesses) / len(performanceGenomePairs)
        if commonEvolution.output: print("Champion Fitness:", championFitness, ", Average Fitness:", averageFitness)
        # Select next generation
        population = commonEvolution.nextGeneration(performanceGenomePairs,mutationRate,crossoverRate)

    return population

def initialPopulation(populationSize, magnitude):
    """
        Fill starting population with specified number of
        randomized genomes

        room_density
        trap_density
        floor_connectivity
        num_extra_hallways
        monster_house_chance
        secondary_terrain_density
        secondary_structures_budget
        maze_room_chance
        merge_rooms_chance

    """
    population = [] 
    for i in range(populationSize):
        genome = {}
        genome["visible"] = 0
        genome["room_density"] = randomValue(6,magnitude) #first number comes from default example dungeon
        genome["trap_density"] = randomValue(5,magnitude)
        genome["floor_connectivity"] = randomValue(15,magnitude)
        genome["num_extra_hallways"] = randomValue(10,magnitude)
        genome["monster_house_chance"] = randomValue(20,magnitude)
        genome["secondary_terrain_density"] = randomValue(5,magnitude)
        genome["secondary_structures_budget"] = randomValue(5,magnitude)
        genome["maze_room_chance"] = randomValue(100,magnitude)
        genome["merge_rooms_chance"] = randomValue(50,magnitude)

        population.append(genome)
    
    return population

def randomValue(default, magnitude):
    return default + random.uniform(-magnitude*default, magnitude*default) #multiply by default values to replicate scale
        
def postEvaluations(args, population):
    """
        Called after evolution to determine the final champion(s),
        whose behavior is then displayed.
    """
    # Evaluate the final population
    finalPerformanceGenomePairs = evaluatePopulation(population, **args)
    # Display fitness information from final generation
    finalChampionFitness = max([f for (g,f) in finalPerformanceGenomePairs])
    championGenomes = [g for (g,f) in finalPerformanceGenomePairs if f == finalChampionFitness]
    if commonEvolution.output: print("Final Champion Training Fitness",finalChampionFitness)
    for genome in championGenomes:
        genome["visible"] = 1
        genome_json = json.dumps(genome) #converts dictionary to passable string
        call_javascript.callJavascript('evolveDungeon.js', 'generateDungeonWithParameters', genome_json) #calls JS file with a*
    return championGenomes # Return all champion genomes
        
def evaluatePopulation(population, **args):
    """
        Evaluate each genome in the population and return
        a list of score/genome tuples.
    """
    performanceGenomePairs = []
    for x in range(len(population)):
        fitness = evaluateGenome(population[x], **args)
        if commonEvolution.output: print("\tGenome",x,":",fitness)
        performanceGenomePairs.append((population[x],fitness))
    
    return performanceGenomePairs
    
def evaluateGenome(genome, **args):
    """
        Update the agent vessels to use the genome to control their
        behavior, then subject the Agents to several games for
        the sake of evaluation. The average game score across
        these games is returned as the fitness of the genome.
    """
    scores = []
    while len(scores) < args['trials']: #runs number of provided trials on single genome
        genome_json = json.dumps(genome) #converts dictionary to passable string
        scores.append(call_javascript.callJavascript('evolveDungeon.js', 'generateDungeonWithParameters', genome_json)) #calls JS file with a*
    # Calculate fitness as average score
    fitness = sum(scores) / args['trials']
    return fitness

def main():    
    """
        Set up and then launch evolution.
    """
    args = {}
    # Parsing code originates as AI generated
    # Argument parser
    parser = argparse.ArgumentParser(description='Script description')
    # Population flag
    parser.add_argument('-p', action='store_true', default=10, help='Population Size')
    # Generations flag
    parser.add_argument('-g', action='store_true', default=10, help='Generation Number')
    # Mutation flag
    parser.add_argument('-mu', action='store_true', default=0.5, help='Mutation Rate')
    # Crossover flag
    parser.add_argument('-c', action='store_true', default=0.5, help='Crossover Rate')
    # Trials flag
    parser.add_argument('-t', action='store_true', default=10, help='Trials Number')
    # Magnitude flag
    parser.add_argument('-ma', action='store_true', default=1, help='Magnitude')
    # Parse the command-line arguments
    command_parameters = parser.parse_args()

    args['populationSize'] = command_parameters.p
    args['generations'] = command_parameters.g
    args['mutationRate'] = command_parameters.mu
    args['crossoverRate'] = command_parameters.c
    args['magnitude'] = command_parameters.ma
    args['trials'] = command_parameters.t

    commonEvolution.mutate = commonEvolution.realMutate
    print("Starting evolution")
    population = evolution(args) #Call evolution to start
    return postEvaluations(args, population) #Returns list of champion genomes

if __name__ == '__main__':
    print(main())
    pass