//Validation
import Joi from "@hapi/joi"; //must install this vertion otherwise some function will not work  "npm install --save @hapi/joi@15.0.3"

//Register Validation
export const registerValidation = (data) => {
  const schema = {
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  };
  return Joi.validate(data, schema);
};

//Login Validation
export const loginValidation = (data) => {
  const schema = {
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  };
  return Joi.validate(data, schema);
};
