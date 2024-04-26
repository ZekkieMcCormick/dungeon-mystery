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