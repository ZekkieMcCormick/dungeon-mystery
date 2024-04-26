"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aStarSearch = exports.stringToMatrix = void 0;
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
exports.stringToMatrix = stringToMatrix;
// Define the heuristic function (Manhattan distance)
function heuristic(node, goal) {
    return Math.abs(node.row - goal.row) + Math.abs(node.col - goal.col);
}
// Define the A* search algorithm
function aStarSearch(matrix) {
    var rows = matrix.length;
    var cols = matrix[0].length;
    // Find the starting position
    var start = null;
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            if (matrix[i][j] === 'P' || matrix[i][j] === 'X') {
                if (!start || (i + j) < (start.row + start.col)) {
                    start = { row: i, col: j };
                }
            }
        }
    }
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
        return -1;
    }
    // Initialize the open and closed lists
    var openList = [];
    var closedList = new Set();
    // Create a priority queue and add the starting node
    openList.push(start);
    var gScores = new Map();
    gScores.set("".concat(start.row, ",").concat(start.col), 0);
    // Run the A* search
    while (openList.length > 0) {
        openList.sort(function (a, b) {
            var fScoreA = (gScores.get("".concat(a.row, ",").concat(a.col)) || 0) + heuristic(a, goal);
            var fScoreB = (gScores.get("".concat(b.row, ",").concat(b.col)) || 0) + heuristic(b, goal);
            return fScoreA - fScoreB;
        });
        var currentNode = openList.shift();
        // Check if the goal is reached
        if (matrix[currentNode.row][currentNode.col] === '=') {
            // Reconstruct the path
            var pathLength = gScores.get("".concat(currentNode.row, ",").concat(currentNode.col)) || 0;
            return pathLength;
        }
        var currentNodeKey = "".concat(currentNode.row, ",").concat(currentNode.col);
        closedList.add(currentNodeKey);
        // Generate the neighboring nodes
        var neighbors = [];
        for (var i = -1; i <= 1; i++) {
            for (var j = -1; j <= 1; j++) {
                if (i === 0 && j === 0)
                    continue;
                var newRow = currentNode.row + i;
                var newCol = currentNode.col + j;
                if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
                    if (matrix[newRow][newCol] === 'P' || matrix[newRow][newCol] === 'X') {
                        neighbors.push({ row: newRow, col: newCol });
                    }
                }
            }
        }
        // Process each neighboring node
        for (var _i = 0, neighbors_1 = neighbors; _i < neighbors_1.length; _i++) {
            var neighbor = neighbors_1[_i];
            var neighborKey = "".concat(neighbor.row, ",").concat(neighbor.col);
            if (closedList.has(neighborKey))
                continue;
            // Calculate the g score
            var gScore = (gScores.get(currentNodeKey) || 0) + 1;
            if (!gScores.has(neighborKey) || gScore < (gScores.get(neighborKey) || 0)) {
                // Update the g score and f score
                gScores.set(neighborKey, gScore);
                var fScore = gScore + heuristic(neighbor, goal);
                // Add the neighbor to the open list
                openList.push(neighbor);
            }
        }
    }
    // Goal not found
    return -1;
}
exports.aStarSearch = aStarSearch;
