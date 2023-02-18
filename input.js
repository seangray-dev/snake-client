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
    } else if (key === "w") {
      connection.write("Move: up"); // send "Move: up" message to the server
    } else if (key === "a") {
      connection.write("Move: left"); // send "Move: left" message to the server
    } else if (key === "s") {
      connection.write("Move: down"); // send "Move: down" message to the server
    } else if (key === "d") {
      connection.write("Move: right"); // send "Move: right" message to the server
    }
  };

  stdin.on("data", handleUserInput);

  return stdin;
};

module.exports = { setupInput };
