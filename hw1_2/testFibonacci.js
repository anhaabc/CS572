const childProcess = require("child_process");
console.log("1. Start");
const newProcess = childProcess.spawn("node", ["fibonacci.js"], {stdio: "inherit"})
console.log("2. End");

