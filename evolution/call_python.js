"use strict";
//AI Generated
Object.defineProperty(exports, "__esModule", { value: true });
exports.callPythonScript = void 0;
var child_process_1 = require("child_process");
function callPythonScript(filePath) {
    var pythonProcess = (0, child_process_1.spawn)('python', [filePath]);
    pythonProcess.stdout.on('data', function (data) {
        // Handle data from Python script's stdout
        console.log("Python script output: ".concat(data));
    });
    pythonProcess.stderr.on('data', function (data) {
        // Handle data from Python script's stderr
        console.error("Python script error: ".concat(data));
    });
    pythonProcess.on('close', function (code) {
        // Handle Python script's termination
        console.log("Python script exited with code ".concat(code));
    });
}
exports.callPythonScript = callPythonScript;
