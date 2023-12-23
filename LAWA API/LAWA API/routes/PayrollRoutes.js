const express = require('express');
const PayrollController = require('../controllers/PayrollController');
const authenticateToken = require('../middleware/UserJwtMiddleware');
const adminauthenticateToken = require('../middleware/AdminJwtMiddleware');

const router = express.Router();

// Define routes for managing payrolls
router.get('/user', authenticateToken, PayrollController.getPayrolls); // Get all payrolls
router.get('/:id', adminauthenticateToken, PayrollController.getPayrollsByUserId); // Get payrolls by user ID
router.post('/', authenticateToken, PayrollController.createPayroll); // Create a new payroll
router.put('/:id', authenticateToken, PayrollController.updatePayroll); // Update a payroll by ID
router.delete('/:id', authenticateToken, PayrollController.deletePayroll); // Delete a payroll by ID

module.exports = router;
