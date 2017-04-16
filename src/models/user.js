const mongoose = require("mongoose");
const bcrypt   = require("bcrypt");
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

/**
* Compare passwords on user save
*/

userSchema.methods.comparePassword = function(pass, callback) {
  bcrypt.compare(pass, this.password, (error, isMatch) => {
    if (error) {
      return callback(error);
    }
    callback(null, isMatch);
  });
};

/**
* Encrypt password before save
*/

userSchema.pre("save", function(next) {
  let user = this;
  // Check if password has been modified or has yet to be set

  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(10, (error, salt) => {
      if (error) {
        return next(error);
      }

      // Create password hash

      bcrypt.hash(user.password, salt, (error, hash) => {
        if (error) {
          return next(error);
        }

        user.password = hash;
        next();
      });
    })
  } else {
    return next();
  }
});

/**
* Set created and updated at before save
*/

userSchema.pre("save", function(next) {
  let currentDate = new Date();
  this.updatedAt = currentDate;

  if (!this.createdAt) {
    this.createdAt = currentDate;
  }

  next();
});

module.exports = mongoose.model("User", userSchema);
