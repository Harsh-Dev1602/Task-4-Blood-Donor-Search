import express from "express"
import dotenv from 'dotenv';
import mongoose from "mongoose";
import userRouter from "./routes/user.route.js";
import cors from "cors";

dotenv.config();
const app = express()
app.use(express.json());
app.use(cors({ origin: "https://blood-donor-steel.vercel.app"}));

const PORT = process.env.PORT || 3001;
const URI = process.env.MONGODB_URI;

try {
  mongoose.connect(URI);
  console.log(" Connected to Mongoose db..");
} catch (error) {
  console.log(error);
}
app.use("/api/user",userRouter);

app.listen(PORT, () => {
  console.log(`app listening on port http://localhost:${PORT}`)
})