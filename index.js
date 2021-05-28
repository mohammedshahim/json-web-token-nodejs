import express from "express";
const app = express();

//import Routes
import authRoute from "./routers/auth";

app.use("/api/user", authRoute);

app.listen(3000, () => console.log("Server is up and live!"));
