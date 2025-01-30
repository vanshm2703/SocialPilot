import Task from "../models/task.model.js";
export const createTask = async (req, res, next) => {
    try {
      const { projectId, content, title, image, category, suggestedChanges ,status} = req.body;
  
      // Create new task instance
      const newTask = new Task({
        projectId,
        content,
        title,
        image,
        category,
        suggestedChanges,
        status
      });
  
      // Save the task to the database
      const savedTask = await newTask.save();
  
      // Return the created task
      res.status(201).json({
        status: 200,
        message: 'Task created successfully',
        data: savedTask
      });
    } catch (error) {
      next(error);
    }
  };
  export const getTaskByProjectId = async (req, res, next) => {
    try {
      const { projectId } = req.params;
  
      const task = await Task.find({projectId: new mongoose.Types.ObjectId(projectId)});
  
      if (!task) {
        return res.status(404).json({
          status: 404,
          message: 'Task not found',
        });
      }
  
      res.status(200).json({
        status: 200,
        data: task
      });
    } catch (error) {
      next(error);
    }
  };

  export const updateTask = async (req, res, next) => {
    try {
      const { id } = req.params;
      const updatedTask = await Task.findByIdAndUpdate(id, {
        $set: {
            title: req.body.title,
            content: req.body.content,
            category: req.body.category,
            image: req.body.image,
            suggestedChanges: req.body.suggestedChanges,
            status: req.body.status
        },
      },{new: true});
      res.status(200).json(updatedPost);
  
      res.status(200).json({
        status: 200,
        message: 'Task updated successfully',
        data: updatedTask
      });
    } catch (error) {
      next(error);
    }
  };

  export const deleteTask = async (req, res, next) => {
    try{
        const { id } = req.params;
        const deletedTask = await Task.findByIdAndDelete(id);
        if (!deletedTask) {
            return res.status(404).json({
                status: 404,
                message: 'Task not found'
            });
        }
        res.status(200).json({
            status: 200,
            message: 'Task deleted successfully'
        });
    }
    catch(error){
        next(error);
    }
  };