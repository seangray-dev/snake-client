const net = require("net");
const { IP, PORT } = require("./constants");

// establishes a connection with the game server
const connect = function () {
  const conn = net.createConnection({
    host: IP,
    port: PORT,
  });

  // interpret incoming data as text
  conn.setEncoding("utf8");

  // hanlde data incoming from server
  conn.on("data", (data) => {
    console.log("Server says: ", data);
  });

  // handle connection event
  conn.on("connect", () => {
    console.log("Successfully connected to game server");
    // send intial name prompt on connection
    conn.write("Name: SG");
  });

  return conn;
};

module.exports = { connect };
