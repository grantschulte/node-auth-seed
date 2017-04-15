const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const userSchema = new Schema({
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
  },
  createdAt: Date,
  updatedAt: Date
});

userSchema.pre("save", (next) => {
  let currentDate = new Date();
  this.updatedAt = currentDate;

  if (!this.createdAt) {
    this.createdAt = currentDate;
  }

  next();
});

module.exports = mongoose.model("User", userSchema);
