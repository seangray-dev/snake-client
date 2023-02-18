const { movementCommands, specialMessage } = require("./constants");
// Stores the active TCP connection object.
let connection;
// flag to track current direction of snake
let currentDirection;
// flag to track movement interval
let intervalId;

// setup interface to handle user input from stdin
const setupInput = function (conn) {
  connection = conn;
  const stdin = process.stdin;
  stdin.setRawMode(true);
  stdin.setEncoding("utf8");
  stdin.resume();

  // handle user input
  stdin.on("data", handleUserInput);

  return stdin;
};

const handleUserInput = function (key) {
  // check for ctrl + c input to exit game
  if (key === "\u0003") {
    process.exit();
  }

  // update movement direction
  if (key in movementCommands) {
    // get new direction
    const newDirection = movementCommands[key];
    // check if new direction is not same as current direction 
    // and if new direction is not opposite of current direction
    if (
      newDirection !== currentDirection &&
      !areDirectionsOpposite(newDirection, currentDirection)
    ) {
      // update current direction
      currentDirection = newDirection;

      // clear previous intervals
      clearInterval(intervalId);
      
      // continuously move snake in current direction
      intervalId = setInterval(() => {
        connection.write(currentDirection);
      }, 50);
    }
  }

  // send special message
  if (key in specialMessage) {
    connection.write(specialMessage[key]);
  }
};

// helper function to check if two directions are opposite
const areDirectionsOpposite = function (direction1, direction2) {
  if (direction1 === "Move: up" && direction2 === "Move: down") {
    return true;
  } else if (direction1 === "Move: down" && direction2 === "Move: up") {
    return true;
  } else if (direction1 === "Move: left" && direction2 === "Move: right") {
    return true;
  } else if (direction1 === "Move: right" && direction2 === "Move: left") {
    return true;
  } else {
    return false;
  }
};

module.exports = { setupInput };
