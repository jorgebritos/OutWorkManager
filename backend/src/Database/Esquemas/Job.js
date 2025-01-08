import { bd, mongoose } from "../../config/bd.js"
bd()
const JobSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  enterpriseId: { type: mongoose.Schema.Types.ObjectId, ref: "Enterprise", required: true },
  operatorIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Operator" }],
  documents: [
    {
      title: { type: String },
      url: { type: String },
      datatang: { type: Date },
      valid: { type: Boolean },
    },
  ],
  dates: [
    {
      date: { type: Date, required: true },
      startTime: { type: String, required: true }, // HH:mm format
      endTime: { type: String, required: true },  // HH:mm format
      description: { type: String },             // Optional details about the date
    },
  ],
});

const Job = mongoose.model("Job", JobSchema);

export {
  Job
}