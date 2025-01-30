import mongoose from 'mongoose';

const previousHistory = new mongoose.Schema(
  {
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Client',
    },
    rating: {
      type: String,
      required: true,
    },
    serviceDescription: {
      type: String,
      required: true,
    },
    serviceCost: {
      type: Number,
      required: true,
    },
  },
  { _id: false } // अगर हर एंट्री का अलग _id नहीं चाहिए
);

const managerInfo = new mongoose.Schema(
  {
    manager: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Manager',
    },
    managerUsername: {
      type: String,
      required: true,
    },
    managerEmail: {
      type: String,
      required: true,
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
      type: [previousHistory], 
      default: [],
    },
    projectStatus: {
      type: String, // ✅ सही किया गया
      enum: ['completed', 'inProgress', 'notStarted'],
      required: true,
    },
  },
  { timestamps: true }
);

const ManagerInfo = mongoose.model('MangerInfo', managerInfo);

export default ManagerInfo;
