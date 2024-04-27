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
    
def evolution(args, gameRunner, agentVessels, featureKeys):
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
    # Some functions are bothered by the presence of these extra parameters
    commonEvolution.dropEvolutionArguments(args)

    # Get initial population
    population = initialPopulation(agentVessels, populationSize, featureKeys)
    # Evolve for specified number of generations
    for g in range(generations):
        if commonEvolution.output: print("Starting generation", g)
        # Evaluate all genomes
        performanceGenomePairs = evaluatePopulation(gameRunner,agentVessels,population, **args)
        # Display fitness information
        justFitnesses = [f for (g,f) in performanceGenomePairs]
        championFitness = max(justFitnesses)
        averageFitness = sum(justFitnesses) / len(performanceGenomePairs)
        if commonEvolution.output: print("Champion Fitness:", championFitness, ", Average Fitness:", averageFitness)
        # Select next generation
        population = commonEvolution.nextGeneration(performanceGenomePairs,mutationRate,crossoverRate)

    return population

def initialPopulation(agentVessels, populationSize, featureKeys, magnitude = 1.0):
    """
        Fill starting population with specified number of
        randomized genomes
    """
    for pm in agentVessels:
        pm.setFeatureKeys(featureKeys)
    # Last agent will be left in pm for use in next loop
    population = [] 
    for i in range(populationSize):
        population.append(pm.randomGenome(magnitude))
    
    return population
        
def postEvaluations(args, postEvals, gameRunner, agentVessels, population):
    """
        Called after evolution to determine the final champion(s),
        whose behavior is then displayed.
    """
    # Evaluate the final population
    finalPerformanceGenomePairs = evaluatePopulation(gameRunner,agentVessels,population, **args)
    # Display fitness information from final generation
    finalChampionFitness = max([f for (g,f) in finalPerformanceGenomePairs])
    championGenomes = [g for (g,f) in finalPerformanceGenomePairs if f == finalChampionFitness]
    if commonEvolution.output: print("Final Champion Training Fitness",finalChampionFitness)

    return championGenomes # Return all champion genomes
        
def evaluatePopulation(gameRunner, agentVessels, population, **args):
    """
        Evaluate each genome in the population and return
        a list of score/genome tuples.
    """
    performanceGenomePairs = []
    for x in range(len(population)):
        fitness = evaluateGenome(gameRunner, agentVessels, population[x], **args)
        if commonEvolution.output: print("\tGenome",x,":",fitness)
        performanceGenomePairs.append((population[x],fitness))
    
    return performanceGenomePairs
    
def evaluateGenome(gameRunner, agentVessels, genome, silent = True, **args):
    """
        Update the agent vessels to use the genome to control their
        behavior, then subject the Agents to several games for
        the sake of evaluation. The average game score across
        these games is returned as the fitness of the genome.
    """
    if commonEvolution.SHOW_ALL: silent = False
    if not commonEvolution.output: silent = True
    # Replace genome in agents
    for pm in agentVessels: 
        pm.setGenome(genome)
    # Evaluate in game(s)
    if 'pacman' in args or 'agents' in args: # For both Pacman variants
        args['numTraining'] = args['numGames']+1 if silent else 0 # Evolving/Training or Post evaluation
    else: # 8 queens
        args['silent'] = silent
    scores = gameRunner.runGames( **args ) 
    # Calculate fitness as average score
    fitness = sum(scores) / len(scores)
    return fitness

def main():    
    """
        Set up and then launch evolution. 
        Champion performance is shown at end.
    """
    gameRunner = pacman
    args = gameRunner.readCommand( sys.argv[2:] ) # MAKE A HARD CODED LIST OF ARGS
    tempRules = gameRunner.ClassicGameRules()
    agentVessels = [args['pacman']]
    featureKeys = commonEvolution.getPacmanFeatureKeys(args,tempRules,agentVessels[0])
    commonEvolution.mutate = commonEvolution.realMutate
   
    postEvals = args['postEvals'] # Save here, because it is removed when dropEvolutionArguments is called in evolution
    population = evolution(args, gameRunner, agentVessels, featureKeys)
    return postEvaluations(args, postEvals, gameRunner, agentVessels, population)

if __name__ == '__main__':
    print(main())
    pass