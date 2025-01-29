import mongoose from 'mongoose';

const previousHistory = new mongoose.Schema(
  {
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref:'Client'
    },
    rating: {
      type: String,
      required: true,
    },
    serviceDiscription:{
      type: String,
      required: true,
    },
    serviceCost:{
      type: Double,
      required: true,
    } 
  }
)


const managerInfo = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref:'Manager'
    },
    services: {
      type: [String],
      required: true,
    },
    rating: {
      type: String,
      required: true,
    },
    
    clientsHistory: {
      type: previousHistory,
      default: {},
    },
    projectStatus:{
      enum:['completed','inProgress','notStarted'] ,
      required: true
    }
  },
  { timestamps: true }
);

const ManagerInfo = mongoose.model('ManagerInfo', managerInfo);

export default ManagerInfo;
