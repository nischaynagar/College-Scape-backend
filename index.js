const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");
const app = express();
const port = 3000;

const db = mysql.createPool({
  host: "sql6.freesqldatabase.com",
  user: "sql6409566",
  password: "7fzVPL6NbF",
  database: "sql6409566",
  port: "3306",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome to collegeScape");
});

app.get("/api/auth", (req, res) => {
  //For authentication of Admin
  const name = req.query.AdminUserName;
  const pass = req.query.AdminPass;
  const sqlAuth = "SELECT * FROM admin WHERE AdminUserName=? ";
  db.query(sqlAuth, [name], (err, result) => {
    if (result.length > 0) {
      if (pass === result[0].AdminPass) {
        res.send({
          result: 1,
          username: result[0].AdminUserName,
          name: result[0].AdminName,
        });
      } else {
        res.send({
          result: 2,
        });
      }
    } else {
      res.status(400);
      res.send("3");
    }
  });
});

app.listen(port, () => {
  console.log(`College Scape listening at http://localhost:${port}`);
});
