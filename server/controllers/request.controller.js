import Request from '../models/request.model.js';  
import { createProject } from './project.controller.js';
import mongoose from 'mongoose';
export const createRequest = async (req, res, next) => {
    const { clientId, managerId, projectName, projectDiscription, mediaPlatform ,serviceCost} = req.body;

    // Check if any required field is empty
    if (!clientId || !managerId || !projectName || !projectDiscription || !mediaPlatform || !serviceCost) {
        return res.status(400).json({
            success: false,
            message: 'All fields are required and cannot be empty'
        });
    }

    try {
        // Proceed with creating the new request if all fields are filled
        const newRequest = new Request({
            clientId,
            managerId,
            projectName,
            projectDiscription,
            mediaPlatform,
            serviceCost
        });

        // Save the new request to the database
        await newRequest.save();

        res.status(201).json({
            success: true,
            message: 'Request created successfully',
            data: newRequest
        });
    } catch (error) {
        next(error); // Pass the error to the error handler middleware
    }
};

export const getRequestsByManagerId = async (req, res, next) => {
    const { ManagerId } = req.params;
    try {
        // Find all requests in the database
        const requests = await Request.findById(ManagerId);

        // If no request is found, return a 404 error
        if (requests.length === 0) {
            return res.status(404).json({ success: false, message: 'Requests not found' });
        }

        // Return the requests if found
        res.json({ success: true, data: requests });

    } catch (error) {
        next(error); // Pass the error to the error handler middleware
    }
};
export const getRequestsByClientId = async (req, res, next) => {
    const { clientId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(clientId)) {
        return res.status(400).json({ success: false, message: 'Invalid clientId format' });
    }
    try {
        const requests = await Request.find({ clientId: new mongoose.Types.ObjectId(clientId) })

        // If no request is found, return a 404 error
        if (requests.length === 0) {
            return res.status(404).json({ success: false, message: 'Requests not found' });
        }

        // Return the requests if found
        res.json({ success: true, data: requests });

    } catch (error) {
        next(error); // Pass the error to the error handler middleware
    }
};



export const approveRequest = async (req, res, next) => {
    const { requestId } = req.params;  // Expecting requestId in URL params
    console.log('requestId:', requestId);

    try {
        // Find the request by ID
        const request = await Request.findById(requestId);
        if (!request) {
            return res.status(404).json({ success: false, message: 'Request not found' });
        }

        // Log the request object to make sure we have the correct data
        console.log('request:', request);

        // Call your createProject function (passing the request object)
        const createPrj = await createProject(request);  // Handle errors inside createProject directly
        console.log('createPrj:', createPrj);  // Log the response from createProject

        if (createPrj.status === '201') {
            // Delete the request if project creation is successful
            const del = await deleteRequest(requestId);
            if (del.status === '200') {
                return res.status(200).json({ success: true, message: 'Request approved successfully' });
            } else {
                return res.status(500).json({ success: false, message: 'Failed to delete request' });
            }
        } else {
            return res.status(400).json({ success: false, message: 'Request not approved' });
        }
    } catch (error) {
        console.error(error);  // Log the error for debugging
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};




const deleteRequest = async (requestId) => {
    try {
        const result = await Request.findByIdAndDelete(requestId);
        if (!result) {
            return {
                status: '404',
                message: 'Request not found for deletion'
            };
        }
        return {
            status: '200',
            message: 'Request deleted successfully'
        };
    } catch (error) {
        return {
            status: '500',
            message: 'Failed to delete request',
            error: error.message
        };
    }
};
