const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    employeeID: {
        type: mongoose.Schema.Types.ObjectId,
        default: function() {
            return new mongoose.Types.ObjectId();
        },
        unique: true,
        required: true,
    },
    firstName: {
        type: String,
        required: [true, "Please enter the employee's first name"],
    },
    lastName: {
        type: String,
        required: [true, "Please enter the employee's last name"],
    },
    address: String,
    dateOfBirth: Date,
    email: {
        type: String,
        required: [true, "Please enter the employee's email"],
        unique: true,
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    validated: {
        type: Boolean,
        default: false,
      },
    });

// Define the 'Employee' model
const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
