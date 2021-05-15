const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");
const app = express();
const port = 3020;

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

// For authentication of Admin(prats)
// app.post("/api/auth", (req, res) => {
//   console.log("R:", req.body, " -> ", req.body.AdminUserName);
//   // let sq = `SELECT * FROM admin WHERE UserName=${req.body.AdminUserName}`;
//   db.query(sqlAuth, [req.body.AdminUserName], (err, result) => {
//     console.log("RR: ", result);
//     if(!result) {
//       res.send("L*** lag gaye"); return;
//     }

//     if (result.length > 0) {
//       if (req.body.AdminPassword === result[0].Password) {
//         res.send({
//           result: 1,
//           username: result[0].AdminUserName,
//           name: result[0].AdminName,
//         });
//       } else {
//         res.send({
//           result: 2,
//         });
//       }
//     } else {
//       res.status(400);
//       res.send("3");
//     }
//   });
// });

app.get("/api/studs", (req, res) => {
  console.log("get students");
  let myq = "select * from studentlist";
  db.query(myq, [], (err, result) => {
    if (err) {
      console.log("Err:", err);
      res.send("Bad time bro");
    } else {
      console.log("RS: ", result);
      res.send(result);
    }
  });
});

// register
// const UserName = "admin@vinit";
// const Name = "Vinit Wag";
// const Password = "123";
// const sqlInsert = "INSERT INTO admin(Name,UserName,Password) VALUES (?,?,?);";
// const sqlAuth = "SELECT * FROM admin WHERE UserName=?";
// db.query(sqlInsert, [Name, UserName, Password], (error, result1) => {
//   if (result1) {
//     console.log("User  Created");
//   }
// });

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

// // auth by rahul
app.get("/api/auth", (req, res) => {
  const username = req.query.AdminUserName;
  const pass = req.query.AdminPassword;
  const sqlAuth = "SELECT * FROM admin WHERE UserName=? ";
  db.query(sqlAuth, [username], (err, result) => {
    if (result.length > 0) {
      if (pass === result[0].Password) {
        console.log("username and pass matched");
        res.send({
          result: 1,
          username: result[0].UserName,
          name: result[0].Name,
        });
      } else {
        console.log("username and pass dont match");
        res.send({
          result: 2,
        });
      }
    } else {
      console.log("No user with this username exists");
      res.status(400);
      res.send("3");
    }
  });
});

// student insert
app.post("/api/inserts", (req, res) => {
  const firstname = req.body.firstName;
  const lastname = req.body.lastName;
  const ID = req.body.id;
  const email = req.body.emailAddress;
  const gender = req.body.sex;
  const contact = req.body.phoneno;
  const batch = req.body.currentbatch;
  const dateofbirth = req.body.doB;

  const sqlInsert =
    "INSERT INTO studentlist(firstName,lastName,id,emailAddress,sex,phoneno,currentbatch,doB) VALUES (?,?,?,?,?,?,?,?);";
  const sqlAuth = "SELECT * FROM studentlist WHERE firstName=?";
  db.query(
    sqlAuth,
    [firstname, lastname, ID, email, gender, contact, batch, dateofbirth],
    (err, result) => {
      if (result.length === 0) {
        db.query(
          sqlInsert,
          [firstname, lastname, ID, email, gender, contact, batch, dateofbirth],
          (error, result1) => {
            res.send("success");
          }
        );
      } else {
        res.send("2");
      }
    }
  );
});

//faculty insert
app.post("/api/insertf", (req, res) => {
  const firstname = req.body.firstName;
  const lastname = req.body.lastName;
  const ID = req.body.id;
  const email = req.body.emailAddress;
  const gender = req.body.sex;
  const contact = req.body.phoneno;
  const batch = req.body.currentbatch;
  const dateofbirth = req.body.doB;

  const sqlInsert =
    "INSERT INTO facultylist(firstName,lastName,id,emailAddress,sex,phoneno,currentbatch,doB) VALUES (?,?,?,?,?,?,?,?);";
  const sqlAuth = "SELECT * FROM facultylist WHERE firstName=?";
  db.query(
    sqlAuth,
    [firstname, lastname, ID, email, gender, contact, batch, dateofbirth],
    (err, result) => {
      if (result.length === 0) {
        db.query(
          sqlInsert,
          [firstname, lastname, ID, email, gender, contact, batch, dateofbirth],
          (error, result1) => {
            res.send("successful");
          }
        );
      } else {
        res.send("2");
      }
    }
  );
});

// delete student
app.delete("/api/deletestudent", (req, res) => {
  const ID = req.body.id;
  const sqldelete = "DELETE FROM studentlist WHERE id=?";
  db.query(sqldelete, [ID], (err, result) => {
    console.log(result);
  });
});

// delete faculty
app.delete("/api/deletefaculty", (req, res) => {
  const ID = req.body.id;
  const sqldelete = "DELETE FROM facultylist WHERE id=?";
  db.query(sqldelete, [ID], (err, result) => {
    console.log(result);
  });
});

// view list of students
app.get("/api/view_students", (req, res) => {
  const sqlget = "SELECT * FROM studentlist";
  db.query(sqlget, (err, result) => {
    console.log(result);
  });
});

// view list of faculties
app.get("/api/view_students", (req, res) => {
  const sqlget = "SELECT * FROM facultylist";
  db.query(sqlget, (err, result) => {
    console.log(result);
  });
});

app.listen(port, () => {
  console.log(`College Scape listening at http://localhost:${port}`);
});
