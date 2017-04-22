const mongoose = require("mongoose");

const DB_HOST = process.env.DB_HOST;
const DB_NAME = process.env.DB_NAME;
const DB_URI  = `mongodb://${DB_HOST}/${DB_NAME}`;

mongoose.Promise = Promise;
mongoose.connect(DB_URI);

let db = mongoose.connection;

/**
* Mongoose connection monitoring
*/

db.on("connected", () => {
  console.log("-o- Database connected at: " + DB_URI);
});

db.on("error", (error) => {
  console.log("-x- Database connection error: " + error);
});

db.on("disconnected", () => {
  console.log("-x- Database disconnected");
});

/**
* Close mongoose connection if server disconnects
*/

process.on("SIGINT", () => {
  db.close(() => {
    console.log("-x- Database connection disconnected app termination");
    process.exit(0);
  });
});
