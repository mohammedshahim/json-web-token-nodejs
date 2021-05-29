import jwt from "jsonwebtoken";

//if we this verifyToken to any router then it will verify the user.

export default (req, res, next) => {
  const token = req.header("auth-token"); //this token is created while login which will pass to here. (look at login router)
  if (!token) return res.status(401).send("Access Denied"); //if token is invalid or not corrent it will return this statment.

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET); //verity the token and return what are the data are present in token.
    req.user = verified; //here now we have only userId so it will assing userid to req.user   (eg. this can access in posts router)
    //here we can also perform more with data that prensent in token. token data is avilable in 'verified'. or to view console.log(verified)
    next();
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
};
