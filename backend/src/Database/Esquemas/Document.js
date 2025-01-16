import mongoose from 'mongoose';

const DocumentSchema = new mongoose.Schema({
  url_document: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  expire: {
    type: Date,
    default: null
  },
  type: {
    type: String,
    default: null
  },
  is_valid: {
    type: Boolean,
    default: false
  },
  operator_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Operator',
    default: null
  },
  enterprise_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Enterprise',
    default: null
  },
  job_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    default: null
  }
}, { timestamps: true });

export default mongoose.model('Document', DocumentSchema);
