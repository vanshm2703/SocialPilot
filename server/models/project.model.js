import mongoose from "mongoose";


const projectSchema = new mongoose.Schema({
    clientId: {
        type: mongoose.Types.ObjectId,
        required: true,
        unique: true
    },
    managerId: {
        type: mongoose.Types.ObjectId,
        required: true,
        unique: true
    },
    projectName: {
        type: String,
        required: true,
        unique: true
    },
    projectDiscription: {
        type: String,
        required: true,
    },
    projectCost: {
        type: Number,
        required: true,
    },
    projectStatus: {
        type: String,
        enum: ['completed', 'inProgress', 'notStarted'],
        required: true
    },
    projectDeadline: {
        type: Date,
        required: true
    },
    projectRating:{
        type: Number,
        required: true
    }
    
}, { timestamps: true });

const Project = mongoose.model("Project", projectSchema);

export default Project;