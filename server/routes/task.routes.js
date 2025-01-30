import express from 'express';
import {
    createTask,
    getTaskByProjectId,
    updateTask,
    deleteTask
} from '../controllers/task.controller.js'; // Adjust the path as needed

const router = express.Router();

// Route for creating a task
router.post('/createTask', createTask); // Create a new task

// Route for getting tasks by projectId
router.get('/getTaskByProjectId/:projectId', getTaskByProjectId); // Get tasks by projectId

// Route for updating a task
router.put('/updateTask/:id', updateTask); // Update a task by ID

// Route for deleting a task
router.delete('/deleteTask/:id', deleteTask); // Delete a task by ID

export default router;