import express from "express";
const router = express.Router();
import User from "../model/User";
import { registerValidation, loginValidation } from "../validation";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

router.post("/register", async (req, res) => {
  //Lets validate the data befor we add a user
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Cheking user is already in database
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email alredy exists");

  //Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  // Create new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
  });

  try {
    const savedUser = await user.save(); //here user will changed to same as savedUser data after saving to database
    res.send({ user: user._id });
  } catch (error) {
    res.status(400).send(error);
  }
});

//Login
router.post("/login", async (req, res) => {
  //Lets validate the data befor checkin a user
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Cheking email is in database
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email doesn't exists"); //if user exist user have all data of that specific user. using that we need to compare the password.

  //Cheking password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Invalid Password");

  //Create and assign a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET); //we can check the data in token by visit www.jwt.io and paste the token in their.
  res.setHeader("auth-token", token); //setup header with this token. then if you go any any page with authentication with user then we need to cross check with this header jwt. we created a posts page. this can only view if you are logged in. for that we use middleware for authenticate the token.
  //we can also add expire time in this token. for more info search doc of jsonwebtoken in npm

  res.send(token);

  // try {
  // } catch (error) {}
});

export default router;
