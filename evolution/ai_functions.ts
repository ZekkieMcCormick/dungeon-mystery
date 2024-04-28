
// converts dungeon string to matrix[n][m]
function stringToMatrix(str: string, n: number): string[][] {
    const matrix: string[][] = [];
    const filteredStr = str.replace(/[\s\n]/g, ''); // Remove whitespace and newline characters
    
    for (let i = 0; i < filteredStr.length; i += n) {
      const row = filteredStr.slice(i, i + n).split('');
      matrix.push(row);
    }
    
    // Pad the last row with empty strings if necessary
    if (matrix.length > 0) {
      const lastRow = matrix[matrix.length - 1];
      while (lastRow.length < n) {
        lastRow.push('-');
      }
    }
    
    // Pad the matrix with empty rows if necessary
    while (matrix.length < 2) {
      matrix.push(Array(n).fill('-'));
    }
    
    return matrix;
  }

  //portions of this were ai generated

  interface Node {
    row: number;
    col: number;
  }

  // Define the heuristic function (Manhattan distance)
  function heuristic(node: Node, goal: Node): number {
    return Math.abs(node.row - goal.row) + Math.abs(node.col - goal.col);
  }
  
  // Define the A* search algorithm
  export function aStarSearch(dungeonString: string, visible: boolean): [number, string] {

    const width = 56; //default width is 56, may pass as parameter later
    //converts string to a matrix
    const matrix = stringToMatrix(dungeonString, width)

    const rows = matrix.length;
    const cols = matrix[0].length;

    const startingPositions: Node[] = [];
  
    // Find the starting position, random position in a room
    let start: Node | null = null;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (matrix[i][j] === 'X') {
          startingPositions.push({ row: i, col: j }); //push all possible starts into list of nodes
        }
      }
    }
    const randomIndex = Math.floor(Math.random() * startingPositions.length); //find a random starting position from the list
    start = startingPositions[randomIndex]; //set that equal to start

    // inserts an s into map to signify the start
    const position = (start.row*width+start.col)*2; //mul by 2 because there are spaces between each char
    //Edit the string to display the start
    const beforeDungeon: string = dungeonString.substring(0, position);
    const afterDungeon: string = dungeonString.substring(position + 1);
    dungeonString = beforeDungeon + 'S' + afterDungeon;
  
    // Define the goal position
      // goal represented by = sign
    let goal: Node | null = null;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (matrix[i][j] === '=') {
          goal = { row: i, col: j };
          break;
        }
      }
    }
  
    if (!start || !goal) {
      // Invalid matrix, no start or goal found
      throw new Error('Invalid matrix: No start or goal found');
    }

    //console.log(goal);
    //console.log(start);
  
    // Initialize the open and closed lists
    const openList: Node[] = [];
    const closedList: Set<string> = new Set();
  
    // Create a priority queue and add the starting node
    const fScores: Map<string, number> = new Map();
    const gScores: Map<string, number> = new Map();
    openList.push(start);
    gScores.set(`${start.row},${start.col}`, 0);
    fScores.set(`${start.row},${start.col}`, heuristic(start, goal));
  
    // Run the A* search
    while (openList.length > 0) {
      openList.sort((a, b) => (fScores.get(`${a.row},${a.col}`) || 0) - (fScores.get(`${b.row},${b.col}`) || 0));
      const currentNode = openList.shift()!;
      const currentNodeKey = `${currentNode.row},${currentNode.col}`;
  
      // Check if the goal is reached
      if (matrix[currentNode.row][currentNode.col] === '=') {
        // Reconstruct the path
        const pathLength = gScores.get(currentNodeKey) || 0;

        // where it returns - does it console.log
        if(visible){
          console.log(dungeonString);
          console.log(`Start at: (${start.col}, ${start.row})`);
          console.log(`Path length: ${pathLength}`);
        }

        // only the returned values are visible to python
        return [pathLength,dungeonString];
      }
      //console.log(currentNodeKey);
      closedList.add(currentNodeKey);
  
      // Generate the neighboring nodes
      const directions = [
        { row: -1, col: 0 }, // Up
        { row: 1, col: 0 },  // Down
        { row: 0, col: -1 }, // Left
        { row: 0, col: 1 },  // Right
      ];
  
      for (const direction of directions) {
        const newRow = currentNode.row + direction.row;
        const newCol = currentNode.col + direction.col;
  
        if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
          if (matrix[newRow][newCol] === 'P' || matrix[newRow][newCol] === 'X' || matrix[newRow][newCol] === '=') {
            const neighbor: Node = { row: newRow, col: newCol };
            const neighborKey = `${newRow},${newCol}`;
  
            if (closedList.has(neighborKey)) continue;
  
            // Calculate the g score
            const gScore = (gScores.get(currentNodeKey) || 0) + 1;
  
            if (!gScores.has(neighborKey) || gScore < (gScores.get(neighborKey) || 0)) {
              // Update the g score and f score
              gScores.set(neighborKey, gScore);
              const fScore = gScore + heuristic(neighbor, goal);
              fScores.set(neighborKey, fScore);
  
              // Add the neighbor to the open list if it's not already there
              if (!openList.some(node => node.row === neighbor.row && node.col === neighbor.col)) {
                openList.push(neighbor);
              }
            }
          }
        }
      }
    }
  
    // Goal not found
    return [0, dungeonString]; //Some bad dungeons won't have a path. Return zero instead of error.
    throw new Error('No path found to the goal');
  }