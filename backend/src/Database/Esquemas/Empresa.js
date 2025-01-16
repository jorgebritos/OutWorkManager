import mongoose from "mongoose";

const schemaEnterprise = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: null,
    },
    is_valid: {
      type: Boolean,
      default: false,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuarios",
      default: null,
    },
  },
  { timestamps: true }
);

schemaEnterprise.index({ user_id: 1 }, { unique: true, partialFilterExpression: { user_id: { $ne: null } } });


export default mongoose.model("Enterprise", schemaEnterprise);
