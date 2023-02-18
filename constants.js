const IP = "localhost";
const PORT = 50541;

const movementCommands = {
  w: "Move: up",
  a: "Move: left",
  s: "Move: down",
  d: "Move: right",
};

const specialMessage = {
  m: "Say: monkeys",
  n: "Say: noo",
  y: "Say: yeah",
  e: "Say: ssss",
};

module.exports = { IP, PORT, movementCommands, specialMessage };
