"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aStarSearch = void 0;
function stringToMatrix(str, n) {
    var matrix = [];
    var filteredStr = str.replace(/[\s\n]/g, ''); // Remove whitespace and newline characters
    for (var i = 0; i < filteredStr.length; i += n) {
        var row = filteredStr.slice(i, i + n).split('');
        matrix.push(row);
    }
    // Pad the last row with empty strings if necessary
    if (matrix.length > 0) {
        var lastRow = matrix[matrix.length - 1];
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
// Define the heuristic function (Manhattan distance)
function heuristic(node, goal) {
    return Math.abs(node.row - goal.row) + Math.abs(node.col - goal.col);
}
// Define the A* search algorithm
function aStarSearch(dungeonString) {
    var width = 56; //default width is 56, may pass as parameter later
    //converts string to a matrix
    var matrix = stringToMatrix(dungeonString, width);
    var rows = matrix.length;
    var cols = matrix[0].length;
    var startingPositions = [];
    // Find the starting position, random position in a room
    var start = null;
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            if (matrix[i][j] === 'X') {
                startingPositions.push({ row: i, col: j }); //push all possible starts into list
            }
        }
    }
    var randomIndex = Math.floor(Math.random() * startingPositions.length); //find a random one
    start = startingPositions[randomIndex]; //set that equal to start
    var position = (start.row * width + start.col) * 2; //mul by 2 because there are spaces between each char
    //Edit the string to display the start
    var beforeDungeon = dungeonString.substring(0, position);
    var afterDungeon = dungeonString.substring(position + 1);
    dungeonString = beforeDungeon + 'S' + afterDungeon;
    // Define the goal position
    var goal = null;
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
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
    var openList = [];
    var closedList = new Set();
    // Create a priority queue and add the starting node
    var fScores = new Map();
    var gScores = new Map();
    openList.push(start);
    gScores.set("".concat(start.row, ",").concat(start.col), 0);
    fScores.set("".concat(start.row, ",").concat(start.col), heuristic(start, goal));
    // Run the A* search
    while (openList.length > 0) {
        openList.sort(function (a, b) { return (fScores.get("".concat(a.row, ",").concat(a.col)) || 0) - (fScores.get("".concat(b.row, ",").concat(b.col)) || 0); });
        var currentNode = openList.shift();
        var currentNodeKey = "".concat(currentNode.row, ",").concat(currentNode.col);
        // Check if the goal is reached
        if (matrix[currentNode.row][currentNode.col] === '=') {
            // Reconstruct the path
            var pathLength = gScores.get(currentNodeKey) || 0;
            console.log(dungeonString);
            console.log("Start at: (".concat(start.col, ", ").concat(start.row, ")"));
            console.log("Path length: ".concat(pathLength));
            return pathLength;
        }
        //console.log(currentNodeKey);
        closedList.add(currentNodeKey);
        // Generate the neighboring nodes
        var directions = [
            { row: -1, col: 0 }, // Up
            { row: 1, col: 0 }, // Down
            { row: 0, col: -1 }, // Left
            { row: 0, col: 1 }, // Right
        ];
        var _loop_1 = function (direction) {
            var newRow = currentNode.row + direction.row;
            var newCol = currentNode.col + direction.col;
            if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
                if (matrix[newRow][newCol] === 'P' || matrix[newRow][newCol] === 'X' || matrix[newRow][newCol] === '=') {
                    var neighbor_1 = { row: newRow, col: newCol };
                    var neighborKey = "".concat(newRow, ",").concat(newCol);
                    if (closedList.has(neighborKey))
                        return "continue";
                    // Calculate the g score
                    var gScore = (gScores.get(currentNodeKey) || 0) + 1;
                    if (!gScores.has(neighborKey) || gScore < (gScores.get(neighborKey) || 0)) {
                        // Update the g score and f score
                        gScores.set(neighborKey, gScore);
                        var fScore = gScore + heuristic(neighbor_1, goal);
                        fScores.set(neighborKey, fScore);
                        // Add the neighbor to the open list if it's not already there
                        if (!openList.some(function (node) { return node.row === neighbor_1.row && node.col === neighbor_1.col; })) {
                            openList.push(neighbor_1);
                        }
                    }
                }
            }
        };
        for (var _i = 0, directions_1 = directions; _i < directions_1.length; _i++) {
            var direction = directions_1[_i];
            _loop_1(direction);
        }
    }
    // Goal not found
    throw new Error('No path found to the goal');
}
exports.aStarSearch = aStarSearch;
