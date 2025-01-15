import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const schemaUser = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    rol: {
        type: String,
        enum: ['Admin', 'Guard', 'Enterprise'],
        required: true,
    },
}, { timestamps: true });

schemaUser.pre("save", async function (next) {
  const user = this;

  try {
    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(user.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

schemaUser.methods.compare_password = async function (pass) {
  return await bcryptjs.compare(pass, this.password);
};

export default mongoose.model('User', schemaUser);

