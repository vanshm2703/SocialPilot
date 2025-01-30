import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    projectId: {
      type: String,
      required: true,
      ref: 'Project',
    },
    content: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default:
        'https://images.unsplash.com/photo-1501618669935-18b6ecb13d6d?q=80&w=2949&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    category: {
      type: String,
      default: 'uncategorized',
    },
    suggestedChanges:{
        type: String,
        default: ''
    },
    status: {
      type: String,
      enum:['pending','completed'],
      default: 'pending',
    },

  },
  { timestamps: true }
);

const Task = mongoose.model('Task', taskSchema);

export default Task;