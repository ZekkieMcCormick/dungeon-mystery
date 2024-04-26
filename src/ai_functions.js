"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringToMatrix = void 0;
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
