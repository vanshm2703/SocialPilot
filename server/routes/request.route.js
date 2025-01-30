import express from 'express';
import {
    createRequest,
    getRequestsByManagerId,
    getRequestsByClientId,
    approveRequest
} from '../controllers/request.controller.js'; // Adjust the path as needed

const router = express.Router();

router.post('/createRequest', createRequest); // Create a new request

// Route for  requests by managerId
router.get('/getRequestsByManagerId/:ManagerId', getRequestsByManagerId); // Get requests by managerId

// Route for getting requests by clientId
router.get('/getRequestsByClientId/:clientId', getRequestsByClientId); // Get requests by clientId

// Route for approving a request
router.post('/approveRequest/:requestId', approveRequest); // Approve a request by ID

export default router;