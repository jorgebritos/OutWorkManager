import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
  content: { type: String, required: true },

  enterprise_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Enterprise", 
    required: true 
  },

  job_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Job", 
    required: true,
    unique: true
  }

}, { timestamps: true });

const Notification = mongoose.model("Notification", NotificationSchema);

export default Notification;
