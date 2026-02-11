import mongoose from "mongoose";
import app from "./app.js";
import dotenv from "dotenv";

dotenv.config(); /// .env file ==> process.env
//import connectDB from './database.js';

//await connectDB();
try {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("database connected successfully");
} catch (error) {
  console.log("error with connecting database.");
  console.log(error.message);
}
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`);
});
