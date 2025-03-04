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
  in_datetime: {
    type: String,
    required: true
  },
  in_datetime_confirm: {
    type: String,
    default: false
  },
  out_datetime: {
    type: String,
    required: true
  },
  out_datetime_confirm: {
    type: String,
    default: false
  },
  enterprise_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Enterprise',
    required: true
  }
}, { timestamps: true });

export default mongoose.model('Job', JobSchema);

