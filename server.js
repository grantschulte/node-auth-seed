const app    = require("./src/app");
const utils  = require("./src/utils/utils");
const http   = require("http");
const port   = process.env.DEFAULT_PORT || process.env.PORT || 5000;

/**
* Start Server
*/

let server = http.createServer(app);
server.listen(port);
server.on("error", onServerError);
server.on("listening", onServerListening);

/**
 * Event listener for HTTP server "error" event.
 */

function onServerError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string"
    ? `Pipe ${port}`
    : `Port ${port}`;

  // Friendly server error messages
  switch (error.code) {
    case "EACCES":
      console.error(`-x- ${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(`-x- ${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onServerListening() {
  const addr = server.address();
  const bind = typeof addr === "string"
    ? `pipe ${addr}`
    : `port ${addr.port}`;

  utils.bootLog(bind, app.get("env"));
}

/**
 * Node process exit logging
 */

process.on("exit", () => {
  console.log("-x- Server disconnected");
});
