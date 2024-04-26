export function stringToMatrix(str: string, n: number): string[][] {
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
  
  type Matrix = string[][];
  
  // Define the heuristic function (Manhattan distance)
  function heuristic(node: Node, goal: Node): number {
    return Math.abs(node.row - goal.row) + Math.abs(node.col - goal.col);
  }
  
  // Define the A* search algorithm
  export function aStarSearch(matrix: Matrix): number {
    const rows = matrix.length;
    const cols = matrix[0].length;
  
    // Find the starting position
    let start: Node | null = null;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (matrix[i][j] === 'P' || matrix[i][j] === 'X') {
          if (!start || (i + j) < (start.row + start.col)) {
            start = { row: i, col: j };
          }
        }
      }
    }
  
    // Define the goal position
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
      return -1;
    }
  
    // Initialize the open and closed lists
    const openList: Node[] = [];
    const closedList: Set<string> = new Set();
  
    // Create a priority queue and add the starting node
    openList.push(start);
    const gScores: Map<string, number> = new Map();
    gScores.set(`${start.row},${start.col}`, 0);
  
    // Run the A* search
    while (openList.length > 0) {
      openList.sort((a, b) => {
        const fScoreA = (gScores.get(`${a.row},${a.col}`) || 0) + heuristic(a, goal!);
        const fScoreB = (gScores.get(`${b.row},${b.col}`) || 0) + heuristic(b, goal!);
        return fScoreA - fScoreB;
      });
  
      const currentNode = openList.shift()!;
  
      // Check if the goal is reached
      if (matrix[currentNode.row][currentNode.col] === '=') {
        // Reconstruct the path
        const pathLength = gScores.get(`${currentNode.row},${currentNode.col}`) || 0;
        return pathLength;
      }
  
      const currentNodeKey = `${currentNode.row},${currentNode.col}`;
      closedList.add(currentNodeKey);
  
      // Generate the neighboring nodes
      const neighbors: Node[] = [];
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (i === 0 && j === 0) continue;
          const newRow = currentNode.row + i;
          const newCol = currentNode.col + j;
          if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
            if (matrix[newRow][newCol] === 'P' || matrix[newRow][newCol] === 'X') {
              neighbors.push({ row: newRow, col: newCol });
            }
          }
        }
      }
  
      // Process each neighboring node
      for (const neighbor of neighbors) {
        const neighborKey = `${neighbor.row},${neighbor.col}`;
        if (closedList.has(neighborKey)) continue;
  
        // Calculate the g score
        const gScore = (gScores.get(currentNodeKey) || 0) + 1;
  
        if (!gScores.has(neighborKey) || gScore < (gScores.get(neighborKey) || 0)) {
          // Update the g score and f score
          gScores.set(neighborKey, gScore);
          const fScore = gScore + heuristic(neighbor, goal);
  
          // Add the neighbor to the open list
          openList.push(neighbor);
        }
      }
    }
  
    // Goal not found
    return -1;
  }