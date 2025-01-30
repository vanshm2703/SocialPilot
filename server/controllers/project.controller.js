
import Project from '../models/project.model.js';

export const findProjectForClient = async (req , res , next) =>{
    const {clientId} = req.params
    try{
        const projects = await Project.findById(clientId)
        if(!projects){
            return res.status(404).json({ success: false, message: 'Projects not found' });
        }
        res.json({ success: true, data: projects });
        
    }
    catch(error){
        next(error)
    }
}
export const findProjectForManager = async (req , res , next) =>{
    const {managerId} = req.params
    try{
        const projects = await Project.findById(managerId)
        if(!projects){
            return res.status(404).json({ success: false, message: 'Projects not found' });
        }
        res.json({ success: true, data: projects });
        
    }
    catch(error){
        next(error)
    }
}


// Create Project
export const createProject = async (request) => {
    const { clientId, projectName, managerId, projectDiscription, serviceCost, projectDeadline, mediaPlatform } = request;

    // Check if any required field is empty
    if (!clientId || !projectName || !managerId || !projectDiscription || !serviceCost || !projectDeadline || !mediaPlatform) {
        return {
            status: '400',
            message: 'All fields are required and cannot be empty'
        };
    }

    try {
        // Proceed with project creation if all fields are filled
        const newProject = new Project({
            clientId,
            projectName,
            managerId,
            projectDiscription,
            projectCost: serviceCost,  // Assuming you want to set projectCost from serviceCost
            projectDeadline,
            mediaPlatform
        });

        // Save the new project
        const savedProject = await newProject.save();

        console.log('Project created successfully:', savedProject);  // Log project details for debugging

        return {
            status: '201',
            message: 'Project created successfully',
            data: savedProject
        };
    } catch (error) {
        console.error('Error creating project:', error);  // Log the error
        return {
            status: '500',
            message: 'Failed to create project',
            error: error.message
        };
    }
};

// Delete Project
export const deleteProject = async (req, res, next) => {
    const { id } = req.params;

    try {
        const deletedProject = await Project.findByIdAndDelete(id);
        if (!deletedProject) {
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Project deleted successfully'
        });
    } catch (error) {
        next(error); // Handle error using the error handler middleware
    }
};

// Update Project
export const updateProject = async (req, res, next) => {
    const { id } = req.params;
    const { clientId, projectName, managerId, projectDiscription, projectCost, projectDeadline } = req.body;

    // Create an object to hold the update data (only fields that are provided)
    const updateData = {};

    if (clientId) updateData.clientId = clientId;
    if (projectName) updateData.projectName = projectName;
    if (managerId) updateData.managerId = managerId;
    if (projectDiscription) updateData.projectDiscription = projectDiscription;
    if (projectCost) updateData.projectCost = projectCost;
    if (projectDeadline) updateData.projectDeadline = projectDeadline;

    try {
        // Find the project and update only the fields that are provided
        const updatedProject = await Project.findByIdAndUpdate(
            id, 
            updateData, 
            { new: true } // This will return the updated document
        );

        // If the project is not found, return 404
        if (!updatedProject) {
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            });
        }

        // Return the updated project
        res.status(200).json({
            success: true,
            message: 'Project updated successfully',
            data: updatedProject
        });
    } catch (error) {
        next(error); // Handle error using the error handler middleware
    }
};
