import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 255,
  },
  email: {
    type: String,
    required: true,
    maxLength: 255,
    minLength: 6,
  },
  password: {
    type: String,
    required: true,
    maxLength: 1024,
    minLength: 6,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("User", userSchema);
