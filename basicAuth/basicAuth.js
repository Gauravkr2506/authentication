const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { getUserDetails, addNewUser, updateUserData } = require("./../db.js");

const JWT_SECRET = "basicAuth_jwt_secret";
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

  bcrypt.hash(password, saltRounds, async function (err, hash) {
    if (err) {
      console.log("err", err, name, email, password);
      return res.status(500).send({
        message:
          "Oops! we are getting internal server error, please try after some time",
      });
    }

    try {
      await addNewUser(name, email, hash, "");

      const token = jwt.sign({ email: email }, JWT_SECRET, { expiresIn: "1h" });

      return res.status(201).send({
        name,
        email,
        token,
        data: "",
      });
    } catch (error) {
      console.log("error", error);
      return res.status(409).send("Oops! getting error");
    }
  });
};

const loginBasicAuth = async (req, res) => {
  try {
    console.log("loginBasicAuth => api called");
    const { email, password } = req.body;

    const user = await getUserDetails(email);

    if (!user) {
      return res.status(404).send("Oops! invalid email, user not found");
    }
    const { name, data } = user;

    const isPasswordValid = bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).send({ message: "Invalid password" });
    }
    const token = jwt.sign({ email: email }, JWT_SECRET, { expiresIn: "1h" });
    console.log("loginBasicAuth => user", user);
    res
      .status(200)
      .send({ message: "Logged in successfully", name, email, data, token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error logging in", error });
  }
};

const getDataBasicAuth = async (req, res) => {
  try {
    console.log("getDataBasicAuth => api called");
    const { email } = req.user;

    const user = await getUserDetails(email);
    if (!user) {
      return res.status(404).send("Oops! invalid email, user not found");
    }
    const { name, data } = user;
    res
      .status(200)
      .send({ message: "got data successfully", name, email, data });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error in getting data", error });
  }
};

const setDataBasicAuth = async (req, res) => {
  try {
    console.log("setDataBasicAuth => api called");
    const { email } = req.user;
    const { data } = req.body;
    await updateUserData(data, email);

    res.status(200).send({ message: "set data successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error in setting data", error });
  }
};

module.exports.isAuthenticatedBasicAuth = isAuthenticatedBasicAuth;
module.exports.registerUserBasicAuth = registerUserBasicAuth;
module.exports.loginBasicAuth = loginBasicAuth;
module.exports.getDataBasicAuth = getDataBasicAuth;
module.exports.setDataBasicAuth = setDataBasicAuth;
