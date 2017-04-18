const config = require('dotenv').config();
let origin = process.env.CLIENT_URL_PROD;

if (process.env.NODE_ENV === "development") {
  origin = process.env.CLIENT_URL_DEV;
}

module.exports = {
  origin: origin
};
