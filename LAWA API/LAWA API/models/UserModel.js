const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        default: function () {
            return new mongoose.Types.ObjectId();
        },
        unique: true,
        required: true,
    },
    username: {
        type: String,
        required: [true, "Please enter the user's username"],
    },
    password: {
        type: String,
        required: [true, "Please enter the user's password"],
    },
    firstName: {
        type: String,
        required: [true, "Please enter the user's first name"],
    },
    lastName: {
        type: String,
        required: [true, "Please enter the user's last name"],
    },
    address: String,
    dateOfBirth: Date,
    email: {
        type: String,
        required: [true, "Please enter the user's email"],
        unique: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    validated: {
        type: Boolean,
        default: false,
      },
    });


userSchema.pre('save', function (next) {
  try {
    if (this.isModified('password') || this.isNew) {
      const hashedPassword = bcrypt.hashSync(this.password, 10);
      this.password = hashedPassword;
    }
    next();
  } catch (error) {
    next(error);
  }
});

// Define the 'User' model
const User = mongoose.model('User', userSchema);

module.exports = User;
