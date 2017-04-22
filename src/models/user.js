const mongoose    = require("mongoose");
const timestamps  = require("mongoose-timestamp");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  admin: Boolean,
  profile: {
    name: String,
    email: String,
    website: String
  }
});

userSchema.plugin(timestamps);
module.exports = mongoose.model("User", userSchema);
