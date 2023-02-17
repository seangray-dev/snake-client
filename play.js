const { connect } = require("./client");

const connection = connect();

// setup interface to handle user input from stdin

const setupInput = function () {
  const stdin = process.stdin;
  stdin.setRawMode(true);
  stdin.setEncoding("utf8");
  stdin.resume();

  const handleUserInput = function (key) {
    // check for ctrl + c input
    if (key === "\u0003") {
      process.exit();
    }
  };

  stdin.on("data", handleUserInput);

  return stdin;
};


setupInput();

console.log("Connecting ...");
