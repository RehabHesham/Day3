import mongoose from "mongoose"; 

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [3,"name should contain at least 3 letters"],
    required: true,
  },
  email: {
    type: String,
    //match: [/^$/,"email must match this regex"],
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export default mongoose.model("User",userSchema);