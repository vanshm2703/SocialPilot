import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
        clientId: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'Client'
        },
        managerId: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'Manager'
        },
        projectName: {
            type: String,
            required: true,
            
        },
        projectDiscription: {
            type: String,
            required: true,
        },
        mediaPlatform: {
            type: [String],
            required: true
        },
        serviceCost: {
            type: Number,
            required: true,
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
});

const Request = mongoose.model("Request", requestSchema);

export default Request;
