import express from "express";
const app = express();
import dotenv from "dotenv";
import mongoose from "mongoose";
//import Routes
import authRoute from "./routers/auth";
import postRoute from "./routers/posts";

dotenv.config();

//Middleware
app.use(express.json());

//Connect to DB
mongoose.connect(
  process.env.DB_CONNECT,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => {
    console.log("Connected to DB");
  }
);

//Route Middleware
app.use("/api/user", authRoute);
app.use("/api/posts", postRoute);

app.listen(3000, () => console.log("Server is up and live!"));
