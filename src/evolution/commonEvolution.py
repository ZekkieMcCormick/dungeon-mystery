# commonEvolution.py
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

from ast import Not
from time import perf_counter
import util
import random
import math

# Used to show all games during evolution instead of only the final champion. For debugging.
SHOW_ALL = False
output = True

#Question 1
def swapMutate(genome, mutationRate):
    """
        Mutation is done by swapping two indices.
        Use util.flipCoin to see if mutation occurs, and if it does,
        swap between two distinct randomly chosen indices.
    """
    #print("original genome: ",genome)

    newGenome = genome.copy()
    flipQueens = random.sample(newGenome, 2) #https://docs.python.org/3.8/library/random.html#random.sample got syntax here
    #print("flipQueens:",flipQueens)
    if util.flipCoin(mutationRate):
        #print("newg[g.in(flipQ[0])]:",newGenome[genome.index(flipQueens[0])],"newg[g.in(flipQ[1])]:",newGenome[genome.index(flipQueens[1])])
        newGenome[genome.index(flipQueens[0])] = genome[genome.index(flipQueens[1])]
        newGenome[genome.index(flipQueens[1])] = genome[genome.index(flipQueens[0])]

    #print("original genome: ",genome, "new genome", newGenome)
    return newGenome
    
#Question 2
def realMutate(genome, mutationRate, sigma = 1.0):
    """
        Mutating a genome of real numbers means that each gene
        has a chance of gaussian perturbation. Use util.flipCoin 
        with the mutationRate once per gene to see if that gene gets
        mutated, and then use random.gauss to shift the weight away
        from the current weight. 
        
        From the Python documentation for the random.gauss function, 
        the mu parameter is the current gene value, and the sigma 
        parameter is already a parameter for this function
        (see above: default value of 1.0).
    """

    newGenome = genome.copy()
    extraGenome = genome.copy()
    count = 0
    for gene in newGenome:
        if util.flipCoin(mutationRate):
            #print("flipcoin true, gene=",gene)
            gene = random.gauss(gene, sigma)
            extraGenome[count] = gene
            #print("gene now:",gene)
        count+=1
    #print(extraGenome)
    #print("original genome: ",genome, "new genome", newGenome)
    return extraGenome
    
#Question 3
def tournamentSelection(performanceGenomePairs):
    """
        The performanceGenomePairs parameter for this function is
        a list of pairs of the form (genome, fitness).
    
        Tournament selection randomly selects 2 distinct individuals
        from the population, and then returns whichever of these 
        genomes has the higher fitness. Though you are selecting from
        a list of pairs, only a genome is returned.
        
        You should use random.sample to make sure you do not
        select any duplicate genomes to be in the tournament.
    """
    contendors = random.sample(performanceGenomePairs, 2)
    if contendors[0][1] > contendors[1][1]:
        return contendors[0][0]
    else:
        return contendors[1][0]

    
#Question 4
def crossover(mother, father):
    """
        Separate mother and father genomes are provided,
        and these two genomes are mated. The new offspring 
        will have one copy of each gene, which will come from 
        one of the two parents. For each gene, there is a 50% 
        chance it will come from the mother, and
        a 50% chance it will come from the father
        (crossover does not need to occur at a specific point).
        
        Be sure you do not modify the mother or father genomes.
    """
    newGenome = mother.copy()
    count = 0
    for gene in newGenome:
        if util.flipCoin(0.5):
            gene = father[count]
            newGenome[count] = gene
        count+=1
    #print("new genome", newGenome)
    return newGenome
    
#Question 5
def getOffspring(performanceGenomePairs, mutationRate, crossoverRate):
    """
        Generate a single offspring. 
        
        Start by seeing if crossover occurs using the util.flipCoin method 
        and the crossoverRate. If it does, then use tournamentSelection twice
        to get mother and father genomes, and send them to the crossover function
        to generate an offspring. Otherwise, just use tournament selection once
        to select a clone from the population.
        
        Whatever the outcome, the resulting genome is then subjected to the
        "mutate" function, which is a global variable set to be a problem-specific
        mutation function. Whatever "mutate" returns is then returned by "getOffspring"
    """
    global mutate
    
    if util.flipCoin(crossoverRate):
        return mutate(crossover(tournamentSelection(performanceGenomePairs), tournamentSelection(performanceGenomePairs)), mutationRate)
    else:
        return mutate(tournamentSelection(performanceGenomePairs), mutationRate)
    
#Question 6
def nextGeneration(performanceGenomePairs,mutationRate,crossoverRate, elitism = 0.1):
    """
        This function creates a new population from the previous population.
        The new population will have the same size as the previous. A small 
        portion of the new population, specified by the "elitism" parameter, 
        will be direct copies from the old population. The specific amount is
        the floor of the population size times the elitism parameter. Import "math"
        to get the floor function. To pick out the best genomes of the previous
        population, you may find Python's "sort" or "sorted" functions useful, which will
        make it easy to sort a list of (genome,fitness) pairs (as in performanceGenomePairs)
        based on a particular "key" (the fitness values).
    
        The remainder of available slots in the new population is filled by
        calling the getOffspring function the required number of times,
        using the mutation and crossover rate parameters.
        
        Note that a list of (genome,fitness) pairs is sent to this function
        in performanceGenomePairs, and a new list of just genomes is returned.
    """
    eliteNum = math.floor(elitism * len(performanceGenomePairs))

    parents = sorted(performanceGenomePairs, key=lambda x: x[1], reverse=True) #https://docs.python.org/3/howto/sorting.html sorting syntax
    newGenome = [parents[i][0] for i in range(eliteNum)]

    while len(newGenome)<len(performanceGenomePairs):
        newGenome.append(getOffspring(performanceGenomePairs, mutationRate, crossoverRate))

    return newGenome
    
def dropEvolutionArguments(args):
    """
        Remove commandline parameters from the args that
        bother the game-running code. Should only be done after
        these values are extracted and saved in variables.
    """
    if 'crossoverRate' in args: args.pop('crossoverRate', None)
    if 'mutationRate' in args: args.pop('mutationRate', None)
    if 'populationSize' in args: args.pop('populationSize', None)
    if 'generations' in args: args.pop('generations', None)
    if 'postEvals' in args: args.pop('postEvals', None)

mutate = realMutate            