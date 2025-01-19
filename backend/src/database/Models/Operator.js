import mongoose from "mongoose";

const OperatorSchema = new mongoose.Schema({
  ci: { type: String, required: true },
  name: { type: String, required: true },
  authorized: { type: Boolean, required: true },
  role_description: { type: String, required: true },
  enterprise_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Enterprise", 
    default: null 
  }
}, { timestamps: true });

const Operator = mongoose.model("Operator", OperatorSchema);

export default Operator;
