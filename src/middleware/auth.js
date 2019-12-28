const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (res, req, next) => {
  try {
    const token = req.header("Authorization");

    console.log(token);
  } catch (e) {
    console.log("ERROR");

    res.status(401).send({ error: "Please authenticate" });
  }

};

module.exports = auth;
