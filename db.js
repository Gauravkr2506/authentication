const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.db_username,
  host: process.env.endpoint,
  database: process.env.database_name,
  password: process.env.password,
  port: +process.env.db_port,
});

async function getUserDetails(email) {
  let query = `SELECT * FROM public."userAuth" WHERE email = '${email}'`;
  console.log("query => getUserDetails => ", query);
  let queryData = await pool.query(query);
  console.log("query => queryData => ", queryData.rows);
  if (queryData && queryData.rows.length) {
    return queryData.rows[0];
  }
  throw new Error("invalid Query");
}

async function addNewUser(name, email, password, data) {
  let query = `INSERT INTO public."userAuth"(name, data, password, email)
        VALUES ('${name}', '${data}', '${password}', '${email}');`;

  await pool.query(query);
}

async function updateUserData(data, email) {
  let query = `UPDATE public."userAuth"
	SET data='${data}'
	WHERE email='${email}'`;

  await pool.query(query);
}

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};

async function testDB(req, res) {
  pool.query("SELECT NOW()", (err, res) => {
    if (err) {
      res.status(200).send({ message: "db test", err: err });
    } else {
      res.status(200).send({ message: "db test", process: process.env });
    }
  });
}

module.exports.getUserDetails = getUserDetails;
module.exports.addNewUser = addNewUser;
module.exports.updateUserData = updateUserData;
module.exports.testDB = testDB;
