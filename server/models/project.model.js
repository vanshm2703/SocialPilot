import mongoose from "mongoose";


const projectSchema = new mongoose.Schema({
    clientId: {
        type: mongoose.Types.ObjectId,
        required: true,
        
    },
    managerId: {
        type: mongoose.Types.ObjectId,
        required: true,
        
    },
    projectName: {
        type: String,
        required: true,
        
    },
    projectDiscription: {
        type: String,
        required: true,
    },
    projectCost: {
        type: Number,
        required: true,
    },
    mediaPlatform:{
        type: [String],
        required: true
    },
    projectStatus: {
        type: String,
        enum: ['completed', 'inProgress', 'notStarted'],
        required: true,
        default: 'notStarted'
    },
    projectDeadline: {
        type: Date,
        required: true,
        default: () => {
            const date = new Date();
            date.setDate(date.getDate() + 10);
            return date;
        }
    },
   
    
}, { timestamps: true });

const Project = mongoose.model("Project", projectSchema);

export default Project;