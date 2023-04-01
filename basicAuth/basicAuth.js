const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const JWT_SECRET = "basicAuth_jwt_secret";
const userData = {};
const saltRounds = 10;

const isAuthenticatedBasicAuth = (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  if (!token) {
    return res.status(401).send({ message: "Unauthorized access" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    console.log("decoded", decoded);
    next();
  } catch (error) {
    res.status(401).send({ message: "Invalid token" });
  }
};

const registerUserBasicAuth = (req, res) => {
  console.log("registerUserBasicAuth => api called");
  const { name, email, password } = req.body;

  if (userData[email]) {
    return res.status(409).send("Oops! User already exist with same email");
  }

  bcrypt.hash(password, saltRounds, function (err, hash) {
    if (err) {
      console.log("err", err, name, email, password);
      return res.status(500).send({
        message:
          "Oops! we are getting internal server error, please try after some time",
      });
    }
    userData[email] = {
      name,
      email,
      hash,
      data: "",
    };

    const token = jwt.sign({ email: email }, JWT_SECRET, { expiresIn: "1h" });

    return res.status(201).send({
      name,
      email,
      token,
      data: "",
      myKey: process.env.myDBHost,
      kk: 22,
    });
  });
};

const loginBasicAuth = (req, res) => {
  console.log("loginBasicAuth => api called");
  const { email, password } = req.body;

  const user = userData[email];
  if (!user) {
    return res.status(404).send("Oops! invalid email, user not found");
  }
  const { name, data } = user;

  bcrypt
    .compare(password, user.hash)
    .then((isPasswordValid) => {
      if (!isPasswordValid) {
        return res.status(401).send({ message: "Invalid password" });
      }
      const token = jwt.sign({ email: email }, JWT_SECRET, { expiresIn: "1h" });
      console.log("loginBasicAuth => user", user);
      res
        .status(200)
        .send({ message: "Logged in successfully", name, email, data, token });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: "Error logging in", error });
    });
};

const getDataBasicAuth = (req, res) => {
  console.log("getDataBasicAuth => api called");
  const { email } = req.user;

  const user = userData[email];
  if (!user) {
    return res.status(404).send("Oops! invalid email, user not found");
  }
  const { name, data } = user;
  res.status(200).send({ message: "got data successfully", name, email, data });
};

const setDataBasicAuth = (req, res) => {
  console.log("setDataBasicAuth => api called");
  const { email } = req.user;
  const { data } = req.body;
  const user = userData[email];
  console.log("setDataBasicAuth => user", user, "r");
  if (!user) {
    return res.status(404).send("Oops! invalid email, user not found");
  }
  user.data = data;
  res.status(200).send({ message: "set data successfully" });
};

module.exports.isAuthenticatedBasicAuth = isAuthenticatedBasicAuth;
module.exports.registerUserBasicAuth = registerUserBasicAuth;
module.exports.loginBasicAuth = loginBasicAuth;
module.exports.getDataBasicAuth = getDataBasicAuth;
module.exports.setDataBasicAuth = setDataBasicAuth;
