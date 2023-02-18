const { movementCommands, specialMessage } = require("./constants");
// Stores the active TCP connection object.
let connection;

// setup interface to handle user input from stdin
const setupInput = function (conn) {
  connection = conn;
  const stdin = process.stdin;
  stdin.setRawMode(true);
  stdin.setEncoding("utf8");
  stdin.resume();

  const handleUserInput = function (key) {
    // check for ctrl + c input
    if (key === "\u0003") {
      process.exit();
    } else if (key in movementCommands) {
      connection.write(movementCommands[key]);
    }

    // send special message
    if (key in specialMessage) {
      connection.write(specialMessage[key]);
    }
  };

  stdin.on("data", handleUserInput);

  return stdin;
};

module.exports = { setupInput };
