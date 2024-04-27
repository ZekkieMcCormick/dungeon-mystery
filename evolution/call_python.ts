//AI GeneratedS

import { spawn } from 'child_process';

export function callPythonScript(filePath: string): void {
  const pythonProcess = spawn('python', [filePath]);

  pythonProcess.stdout.on('data', (data) => {
    // Handle data from Python script's stdout
    console.log(`Python script output: ${data}`);
  });

  pythonProcess.stderr.on('data', (data) => {
    // Handle data from Python script's stderr
    console.error(`Python script error: ${data}`);
  });

  pythonProcess.on('close', (code) => {
    // Handle Python script's termination
    console.log(`Python script exited with code ${code}`);
  });
}