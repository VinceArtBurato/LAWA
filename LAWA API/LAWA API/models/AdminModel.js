const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const adminSchema = new mongoose.Schema({
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        default: function () {
            return new mongoose.Types.ObjectId();
        },
        unique: true,
        required: true,
    },
    Username: {
        type: String,
        required: [true, "Please enter the admin's username"],
    },
    Password: {
        type: String,
        required: [true, "Please enter the admin's password"],
    },
    FirstName: {
        type: String,
        required: [true, "Please enter the admin's first name"],
    },
    LastName: {
        type: String,
        required: [true, "Please enter the admin's last name"],
    },
    Address: String,
    DateOfBirth: Date,
    Email: {
        type: String,
        required: [true, "Please enter the admin's email"],
        unique: true,
    },
    Role: {
        type: String,
        enum: ['admin'], // You can extend this array for other roles if needed
        default: 'admin',
    },
});

adminSchema.pre('save', function (next) {
    try {
        if (this.isModified('Password') || this.isNew) {
            const hashedPassword = bcrypt.hashSync(this.Password, 10);
            this.Password = hashedPassword;
        }
        next();
    } catch (error) {
        next(error);
    }
});

// Define the 'Admin' model
const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
