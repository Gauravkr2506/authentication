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

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
//c
