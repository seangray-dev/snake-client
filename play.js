const { connect } = require("./client");
const { setupInput } = require("./input");

console.log("Connecting ...");

const conn = connect(); // store conn object returned by connect
setupInput(conn); // pass conn object to setupInput
