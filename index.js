const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");
const app = express();
const port = 3000;

var db = mysql.createPool({
  host: "sql6.freesqldatabase.com",
  user: "sql6412158",
  password: "B2wz1krpmX",
  database: "sql6412158",
  port: "3306",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome to collegeScape");
});

// db.connect((err) => {
//   if (!err) {
//     console.log("Connected");
//   } else {
//     console.log("Connection failed");
//   }
// });

// app.get("/api/auth", (req, res) => {
//For authentication of Admin

// db.query(sqlAuth, [name], (err, result) => {
//   if (result.length > 0) {
//     if (pass === result[0].AdminPass) {
//       res.send({
//         result: 1,
//         username: result[0].AdminUserName,
//         name: result[0].AdminName,
//       });
//     } else {
//       res.send({
//         result: 2,
//       });
//     }
//   } else {
//     res.status(400);
//     res.send("3");
//   }
// });
// });

// const UserName = "Nischay";
// const name = "req.body.EmpName";
// const pass = "req.body.EmpPass";
// const type = "req.body.type";
// const sqlInsert =
//   "INSERT INTO employee(EmpUserName,EmpName,EmpPass,EmpType) VALUES (?,?,?,?);";
// const sqlAuth = "SELECT * FROM employee WHERE EmpUserName=?";
// db.query(sqlInsert, [UserName, name, pass, type], (error, result1) => {});

app.listen(port, () => {
  console.log(`College Scape listening at http://localhost:${port}`);
});
