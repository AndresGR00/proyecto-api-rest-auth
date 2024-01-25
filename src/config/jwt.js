require("dotenv").config({ path: "../utils/.env" });
const jwt = require("jsonwebtoken");

//Create key
const generateSign = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

//Verify
const verifyJwt = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET); //Eso da un boolean
};

module.exports = { generateSign, verifyJwt };
