const express = require('express');
const router = express.Router();
const vacationController = require('../controllers/vacationController');
const { authMiddleware, isValidator } = require('../middleware/auth');

// Create a new vacation request (all authenticated users)
router.post('/', authMiddleware, vacationController.createRequest);

// Get all vacation requests (filtered by role)
router.get('/', authMiddleware, vacationController.getRequests);

// Get a specific vacation request
router.get('/:id', authMiddleware, vacationController.getRequestById);

// Update vacation request status (validators only)
router.put('/:id', authMiddleware, isValidator, vacationController.updateRequestStatus);

module.exports = router;