require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");

const {
  registerUserBasicAuth,
  loginBasicAuth,
  getDataBasicAuth,
  isAuthenticatedBasicAuth,
  setDataBasicAuth,
} = require("./basicAuth/basicAuth.js");

const { testDB } = require("./db.js");

const app = express();
app.use(express.static("public"));
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());

// Basic auth API
app.post("/registerUserBasicAuth", registerUserBasicAuth);
app.post("/loginBasicAuth", loginBasicAuth);
app.get("/getDataBasicAuth", isAuthenticatedBasicAuth, getDataBasicAuth);
app.post("/setDataBasicAuth", isAuthenticatedBasicAuth, setDataBasicAuth);

app.get("/testDB", testDB);

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
