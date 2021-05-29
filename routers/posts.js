import express from "express";
import verifyToken from "./verifyToken";
const router = express.Router();

router.get("/", verifyToken, (req, res) => {
  res.send(req.user);
});

export default router;
