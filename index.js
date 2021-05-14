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

// const UserName = "admin@123";
// const Name = "Nischay Nagar";
// const Password = "123";
// const sqlInsert = "INSERT INTO admin(Name,UserName,Password) VALUES (?,?,?);";
// const sqlAuth = "SELECT * FROM admin WHERE UserName=?";
// db.query(sqlInsert, [Name, UserName, Password], (error, result1) => {});

// app.get("/api/authp", (req, res) => {
//For authentication of Admin
// const username = "admin@123";
// const name = "Nischay Nagar";
// const pass = "123";
// const sqlAuth = "SELECT * FROM admin WHERE UserName=? ";
// db.query(sqlAuth, [username], (err, result) => {
//   if (result.length > 0) {
//     if (pass === result[0].Password) {
//       console.log("username and pass matched");
//       res.send({
//         result: 1,
//         username: result[0].UserName,
//         name: result[0].Name,
//       });
//     } else {
//       console.log("username and pass dont match");
//       res.send({
//         result: 2,
//       });
//     }
//   } else {
//     console.log("No user with this username exists");
//     res.status(400);
//     res.send("3");
//   }
// });
// });

const username = "admin@123";
const name = "Nischay Nagar";
const pass = "1234";
const sqlAuth = "SELECT * FROM admin WHERE UserName=? ";
db.query(sqlAuth, [username], (err, result) => {
  if (result.length > 0) {
    if (pass === result[0].Password) {
      console.log("username and pass matched");
      // res.send({
      //   result: 1,
      //   username: result[0].UserName,
      //   name: result[0].Name,
      // });
    } else {
      console.log("username and pass dont match");
      // res.send({
      //   result: 2,
      // });
    }
  } else {
    console.log("No user with this username exists");
    // res.status(400);
    // res.send("3");
  }
});

app.listen(port, () => {
  console.log(`College Scape listening at http://localhost:${port}`);
});
