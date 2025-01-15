import mongoose from 'mongoose';

const { Schema } = mongoose;

const JobSchema = new Schema({
  description: {
    type: String,
    required: true
  },
  is_check: {
    type: Boolean,
    default: false
  },
  is_check_enterprise: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    required: true
  },
  in_time: {
    type: String,
    required: true
  },
  in_time_confirm: {
    type: Boolean,
    default: false
  },
  out_time: {
    type: String,
    required: true
  },
  out_time_confirm: {
    type: Boolean,
    default: false
  },
  enterprise_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Empresa',
    required: true
  }
}, { timestamps: true });

export default mongoose.model('Job', JobSchema);

