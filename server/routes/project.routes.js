import express from 'express';
import {
    findProjectForClient,
    findProjectForManager,
    createProject,
    deleteProject,
    updateProject
} from '../controllers/project.controller.js'; // Adjust the path as needed

const router = express.Router();

// Routes for finding projects
router.get('/findProjectForClient/:clientId', findProjectForClient); // Find projects by clientId
router.get('/findProjectForManager/:managerId', findProjectForManager); // Find projects by managerId

// Route for creating a project
router.post('/createProject', createProject); // Create a new project

// Route for deleting a project
router.delete('/deleteProject/:id', deleteProject); // Delete a project by ID

// Route for updating a project
router.put('/updateProject/:id', updateProject); // Update a project by ID

export default router;