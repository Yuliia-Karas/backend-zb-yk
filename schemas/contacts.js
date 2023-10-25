const Joi = require("joi");

const phoneReg = /^\(\d{3}\) \d{3}-\d{4}$/;
const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailReg).required(),
  phone: Joi.string().pattern(phoneReg).required(),
});

module.exports = {
    addSchema, 
}
