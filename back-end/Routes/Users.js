const express = require("express");
const pool = require("../database");
var router = express.Router();

router.post(`/api/user/register`, async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  try {
    //Select data given the variables above
    const user = await pool.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);
    //If user already exists return error message stating it already exists
    if (user.rowCount > 0) {
      return res.send("Username already exists");
    }
    //If user doesnt exists attempt to create user and return message
    else {
      await pool
        .query(
          `INSERT INTO users(password, username) VALUES(crypt($1, gen_salt('bf')), $2)`,
          [password, username]
        )
        .then(() => {
          return res.send("User successfully created");
        })
        .catch((err) => {
          return res.send("User not successfuly created");
        });
    }
  } catch (error) {
    console.log(error);
  }
});

router.post(`/api/user/login`, async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    //Select data given the variables above
    const data = await pool.query(
      `SELECT * FROM users WHERE username = $1 AND password = crypt($2, password)`,
      [username, password]
    );
    //If query above comes back with no results no user exists
    if (data.rowCount == 0) {
      return res.send("Username or password incorrect");
    }
    //Else user exists, let front end know
    else {
      return res.status(200).send("User logged in");
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
