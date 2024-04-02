import mongoose from "mongoose";
const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  descriptor: {
    type: [Number],
    required: true,
    unique: true,
  },
});
export default mongoose.model("User", userSchema); //We are exporting the schema of the user
//users
