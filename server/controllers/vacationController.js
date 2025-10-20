const { VacationRequest, User } = require('../models');
const { Op } = require('sequelize');

// Create a new vacation request
exports.createRequest = async (req, res) => {
  try {
    const { startDate, endDate, reason } = req.body;
    const userId = req.user.id;
    
    // Validate dates
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (end < start) {
      return res.status(400).json({ message: 'End date must be after start date' });
    }
    
    const request = await VacationRequest.create({
      userId,
      startDate,
      endDate,
      reason,
      status: 'Pending'
    });
    
    res.status(201).json(request);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};




// Get all vacation requests (filtered by role)
exports.getRequests = async (req, res) => {
  try {
    const userId = req.user.id;
    const role = req.user.role;
    const { status } = req.query;
    
    const queryOptions = {
      include: [
        {
          model: User,
          attributes: ['id', 'name', 'email', 'role']
        }
      ],
      order: [['created_at', 'DESC']]
    };
    
    // Filter by status if provided
    if (status && ['Pending', 'Approved', 'Rejected'].includes(status)) {
      queryOptions.where = { status };
    }
    
    // If requester, only show their own requests
    if (role === 'Requester') {
      queryOptions.where = {
        ...queryOptions.where,
        userId
      };
    }
    
    const requests = await VacationRequest.findAll(queryOptions);
    
    res.json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a specific vacation request
exports.getRequestById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const role = req.user.role;
    
    const request = await VacationRequest.findByPk(id, {
      include: [
        {
          model: User,
          attributes: ['id', 'name', 'email', 'role']
        }
      ]
    });
    
    if (!request) {
      return res.status(404).json({ message: 'Vacation request not found' });
    }
    
    // If requester, verify ownership
    if (role === 'Requester' && request.userId !== userId) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    res.json(request);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update vacation request status (for validators)
exports.updateRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, comments } = req.body;
    
    if (!['Approved', 'Rejected'].includes(status)) {
      return res.status(400).json({ message: 'Status must be Approved or Rejected' });
    }
    
    const request = await VacationRequest.findByPk(id);
    
    if (!request) {
      return res.status(404).json({ message: 'Vacation request not found' });
    }
    
    if (request.status !== 'Pending') {
      return res.status(400).json({ 
        message: 'Only pending requests can be updated' 
      });
    }
    
    // If rejecting, comments should be provided
    if (status === 'Rejected' && !comments) {
      return res.status(400).json({ 
        message: 'Comments are required when rejecting a request' 
      });
    }
    
    // Update request
    request.status = status;
    if (comments) {
      request.comments = comments;
    }
    
    await request.save();
    
    res.json(request);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};