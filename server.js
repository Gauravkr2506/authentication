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

const { query } = require("./db.js");

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

// app.get("/testDB", async (req, res) => {
//   try {
//     const result = await query(
//       `SELECT * FROM public."userAuth" WHERE email = 'Gaurav@123'`
//     );
//     console.log("result", result);
//     res.status(200).send({ message: "set data successfully", result });
//   } catch (error) {
//     console.log(error);
//     return res.status(404).send(error);
//   }
// });

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
