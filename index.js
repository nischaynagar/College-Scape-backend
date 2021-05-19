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

// display student list
app.get("/api/studs", (req, res) => {
  console.log("get students");
  let myq = "select * from studentlist";
  db.query(myq, [], (err, result) => {
    if (err) {
      console.log("Err:", err);
      res.send("Bad time bro");
    } else {
      // console.log("Student list ", result);
      res.send(result);
    }
  });
});

// display faculty list
app.get("/api/facts", (req, res) => {
  console.log("get faculties");
  let myq = "select * from facultylist";
  db.query(myq, [], (err, result) => {
    if (err) {
      console.log("Err:", err);
      res.send("Bad time bro");
    } else {
      console.log("Faculty list ", result);
      res.send(result);
    }
  });
});

// display courses list
app.get("/api/coursedisp", (req, res) => {
  console.log("get courses");
  let myq = "select * from courselist";
  db.query(myq, [], (err, result) => {
    if (err) {
      console.log("Err:", err);
      res.send("Bad time bro");
    } else {
      console.log("Courses list ", result);
      res.send(result);
    }
  });
});

// register
// const UserName = "admin@123";
// const firstName = "Nischay";
// const lastName = "Nagar";
// const Password = "123";
// const email = "admin123@cs.in";
// const contact = 3221213123;
// const sqlInsert =
//   "INSERT INTO admin(UserName,Password, firstName, lastName, email, contact) VALUES (?,?,?,?,?,?);";
// const sqlAuth = "SELECT * FROM admin WHERE UserName=?";
// db.query(
//   sqlInsert,
//   [UserName, Password, firstName, lastName, email, contact],
//   (error, result1) => {
//     if (result1) {
//       console.log("User  Created");
//     }
//   }
// );

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
  console.log("inside api auth");
  const sqlAuth = "SELECT * FROM admin WHERE UserName=? ";
  db.query(sqlAuth, [username], (err, result) => {
    if (result.length > 0) {
      if (pass === result[0].Password) {
        console.log("username and pass matched");
        res.send({
          result: 1,
          username: result[0].UserName,
          firstName: result[0].firstName,
          lastName: result[0].lastName,
          email: result[0].email,
          contact: result[0].contact,
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

  console.log(
    "info received : ",
    firstname,
    " ",
    lastname,
    " ",
    ID,
    " ",
    email,
    " ",
    gender,
    " ",
    contact,
    " ",
    batch,
    " ",
    dateofbirth
  );

  const sqlCheck = "SELECT * FROM studentlist";
  const sqlInsert =
    "INSERT INTO studentlist(firstName,lastName,id,email,gender,contact,batch,DOB) VALUES (?,?,?,?,?,?,?,?);";
  const sqlAuth = "SELECT * FROM studentlist WHERE firstName=?";
  db.query(
    sqlInsert,
    [firstname, lastname, ID, email, gender, contact, batch, dateofbirth],
    (err, result) => {
      if (err) {
        // res.send("DB insert query error");
        console.log(err);
        db.query(sqlCheck, (e, r) => {
          if (e) {
            r.send("extracting info failed");
            return;
          }
          console.log(r);
        });
        return;
      }
      console.log(result);
      res.send("success");
      console.log("Successfully inserted data");
    }
  );
});

//update student
app.put("/api/update_student", (req, res) => {
  console.log("inside update stud info method");
  const ID = req.body.id;
  const fName = req.body.fName;
  const lName = req.body.lName;
  const batch = req.body.batch;
  const contact = req.body.contact;
  const dob = req.body.dob;
  const gender = req.body.gender;
  const email = req.body.email;
  const sqlUpdate =
    "UPDATE studentlist SET firstName = ?, lastName = ? ,batch = ? ,contact = ?, DOB = ?, gender = ? ,email = ?   WHERE id =?;";
  db.query(
    sqlUpdate,
    [fName, lName, batch, contact, dob, gender, email, ID],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send("failed to update data");
        return;
      }
      console.log("Student info Updated");
      res.send("success");
    }
  );
});

//update admin
app.put("/api/update_admin", (req, res) => {
  console.log("inside update admin info method");
  const username = req.body.username;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const contact = req.body.contact;
  const sqlAssign =
    "UPDATE admin SET firstName = ?, lastName = ? ,email = ? , contact = ?  WHERE UserName = ? ;";
  db.query(
    sqlAssign,
    [firstName, lastName, email, contact, username],
    (err, result) => {
      res.send("success");
      if (result) {
        console.log("Admin info Updated");
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

  console.log(
    "info received : ",
    firstname,
    " ",
    lastname,
    " ",
    ID,
    " ",
    email,
    " ",
    gender,
    " ",
    contact,
    " ",
    batch,
    " ",
    dateofbirth
  );

  const sqlCheck = "SELECT * FROM facultylist";
  const sqlInsert =
    "INSERT INTO facultylist(firstName,lastName,id,email,contact,gender,batch,DOB) VALUES (?,?,?,?,?,?,?,?);";
  // const sqlAuth = "SELECT * FROM studentlist WHERE firstName=?";
  db.query(
    sqlInsert,
    [firstname, lastname, ID, email, contact, gender, batch, dateofbirth],
    (err, result) => {
      if (err) {
        // res.send("DB insert query error");
        console.log(err);
        db.query(sqlCheck, (e, r) => {
          if (e) {
            r.send("extracting info fail");
            return;
          }
          console.log(r);
        });
        return;
      }
      console.log(result);
      res.send("success");
      console.log("Successfully inserted data");
    }
  );
});

// delete student
// app.delete("/api/deletestudent", (req, res) => {
//   const ID = req.body.id;
//   const sqldelete = "DELETE FROM studentlist WHERE id=?";
//   db.query(sqldelete, [ID], (err, result) => {
//     console.log(result);
//   });
// });

// delete faculty
app.delete("/api/deletefaculty", (req, res) => {
  const ID = req.body.id;
  const sqldelete = "DELETE FROM facultylist WHERE id=?";
  db.query(sqldelete, [ID], (err, result) => {
    console.log(result);
  });
});

// delete admin
app.delete("/api/deleteAdmin", (req, res) => {
  const username = req.body.username;
  const sqldelete = "DELETE FROM admin WHERE UserName=?";
  db.query(sqldelete, [username], (err, result) => {
    console.log(result);
  });
});

// view list of students
app.get("/api/view_students", (req, res) => {
  const sqlget = "SELECT * FROM studentlist";
  db.query(sqlget, (err, result) => {
    // console.log(result);
  });
});

// view list of faculties
app.get("/api/view_faculties", (req, res) => {
  const sqlget = "SELECT * FROM facultylist";
  db.query(sqlget, (err, result) => {
    console.log(result);
  });
});

// get total number of students
// app.get("/api/count_students", (req, res) => {

//   const sqlget = "SELECT COUNT(*) FROM studentlist"
//   db.query(sqlget, (err, result) => {
//       res.send(result)
//   })
// });

// get list of courses
app.get("/api/list_courses", (req, res) => {
  const sqlget = "SELECT COUNT(*) FROM courselist";
  db.query(sqlget, (err, result) => {
    res.send(result);
  });
});

// get list of all faculties
app.get("/api/list_faculties", (req, res) => {
  const sqlget = "SELECT COUNT(*) FROM facultylist";
  db.query(sqlget, [TName], (err, result) => {
    res.send(result);
  });
});

// get total number of students
app.get("/api/count_students", (req, res) => {
  //var ctr_stud=0,ctr_course=0,ctr_faculty=0;
  //const count_array=[]
  // console.log("in count student");
  const sqlgets = "SELECT COUNT(*) FROM studentlist";
  db.query(sqlgets, (err, result1) => {
    // res.send(result)
    if (err) {
      console.log(err);
      res.send("error in getting count stud");
      return;
    }
    var string = JSON.stringify(result1);
    // console.log('>> string: ', string );
    var json = JSON.parse(string);
    //console.log('>> json: ', json);
    const ctr_stud = Object.values(json[0])[0];
    //  console.log(ctr_stud);
    console.log("count stud", ctr_stud);
    res.send({
      result: ctr_stud,
    });
    //count_array.push(ctr_stud);
  });

  // const sqlgetc= "SELECT COUNT(*) FROM courselist"
  // db.query(sqlgetc, (err, result2) => {

  //     // res.send(result)
  //     if(err){
  //       console.log(err);
  //       res.send("error in getting count stud");
  //       return;
  //     }
  //     var string=JSON.stringify(result2);
  //     // console.log('>> string: ', string );
  //     var json =  JSON.parse(string);
  //     //console.log('>> json: ', json);
  //    ctr_course=Object.values(json[0])[0];
  //   //  console.log(result1);
  //     console.log("count course",ctr_course);
  //     count_array.push(ctr_course);
  // })

  // const sqlgetf= "SELECT COUNT(*) FROM facultylist"
  // db.query(sqlgetf, (err, result3) => {
  //     // res.send(result)
  //     if(err){
  //       console.log(err);
  //       res.send("error in getting count stud");
  //       return;
  //     }
  //     var string=JSON.stringify(result3);
  //     // console.log('>> string: ', string );
  //     var json =  JSON.parse(string);
  //     //console.log('>> json: ', json);
  //     ctr_faculty=Object.values(json[0])[0];
  //   //  console.log(result1);
  //     console.log("count faculty",ctr_faculty);

  //    count_array.push(ctr_faculty);
  // })
  //console.log("count faculty",ctr_faculty);
  // res.send({
  //   result: count_array,
  //   // count_student: ctr_stud,
  //   // count_courses: ctr_course,
  //   // count_faculty: ctr_faculty
  // })
});

// get total number of courses
app.get("/api/count_courses", (req, res) => {
  const sqlgetc = "SELECT COUNT(*) FROM courselist";
  db.query(sqlgetc, (err, result2) => {
    // res.send(result)
    if (err) {
      console.log(err);
      res.send("error in getting count stud");
      return;
    }
    var string = JSON.stringify(result2);
    // console.log('>> string: ', string );
    var json = JSON.parse(string);
    //console.log('>> json: ', json);
    const ctr_course = Object.values(json[0])[0];
    //  console.log(result1);
    console.log("count course", ctr_course);

    res.send({
      result: ctr_course,
    });
    // count_array.push(ctr_course);
  });
});

// get total number of faculties
app.get("/api/count_faculties", (req, res) => {
  const sqlgetf = "SELECT COUNT(*) FROM facultylist";
  db.query(sqlgetf, (err, result3) => {
    // res.send(result)
    if (err) {
      console.log(err);
      res.send("error in getting count stud");
      return;
    }
    var string = JSON.stringify(result3);
    // console.log('>> string: ', string );
    var json = JSON.parse(string);
    //console.log('>> json: ', json);
    const ctr_faculty = Object.values(json[0])[0];
    //  console.log(result1);
    console.log("count faculty", ctr_faculty);
    res.send({
      result: ctr_faculty,
    });
    //  count_array.push(ctr_faculty);
  });
  // console.log("count faculty",ctr_faculty);
});

app.post("/api/deletes", (req, res) => {
  const id = req.body.StudentID;
  console.log("inside api delete id: ", id);
  const sqlAuth = "DELETE FROM studentlist WHERE id=?;";
  db.query(sqlAuth, [id], (err, result) => {
    if (!err) {
      console.log("student deleted");
      res.send(result);
    } else {
      console.log("invalid id", err);
      res.send("bekaar");
    }
  });
});
app.post("/api/deletef", (req, res) => {
  const id = req.body.FacultyID;
  console.log("inside faculty api delete id: ", id);
  const sqlAuth = "DELETE FROM facultylist WHERE id=?;";
  db.query(sqlAuth, [id], (err, result) => {
    if (!err) {
      console.log("faculty deleted");
      res.send(result);
    } else {
      console.log("invalid id", err);
      res.send("bekaar");
    }
  });
});
app.listen(port, () => {
  console.log(`College Scape listening at http://localhost:${port}`);
});

app.post("/api/studentid", (req, res) => {
  const id = req.body.id;
  console.log("inside apii auth id: ", id);

  const sqlAuth = "SELECT * FROM studentlist WHERE id=?;";
  db.query(sqlAuth, [id], (err, result) => {
    if (!err) {
      console.log("student sent");
      res.send(result);
    } else {
      console.log("No student with this id exists", err);
      res.status(400);
      res.send("3");
    }
  });
});

app.post("/api/facultyid", (req, res) => {
  const id = req.body.id;
  console.log("inside api auth id: ", id);
  const sqlAuth = "SELECT * FROM facultylist WHERE id=?;";
  db.query(sqlAuth, [id], (err, result) => {
    if (!err) {
      console.log("faculty sent");
      res.send(result);
    } else {
      console.log("No faculty with this id exists", err);
      res.status(400);
      res.send("3");
    }
  });
});

// insert courses
app.post("/api/insertc", (req, res) => {
  const coursename = req.body.courseName;
  const courseid = req.body.courseID;
  const faculty = req.body.facultyInCharge;

  console.log("info received : ", coursename, " ", courseid, " ", faculty);

  const sqlCheck = "SELECT * FROM courselist";
  const sqlInsert =
    "INSERT INTO courselist(courseName,courseID,facultyInCharge) VALUES (?,?,?);";
  const sqlAuth = "SELECT * FROM courselist WHERE courseName=?";
  db.query(sqlInsert, [coursename, courseid, faculty], (err, result) => {
    if (err) {
      // res.send("DB insert query error");
      console.log(err);
      db.query(sqlCheck, (e, r) => {
        if (e) {
          r.send("extracting info failed");
          return;
        }
        console.log(r);
      });
      return;
    }
    console.log(result);
    res.send("success");
    console.log("Successfully inserted data");
  });
});

// get course id
app.post("/api/courseid", (req, res) => {
  const id = req.body.courseID;
  console.log("inside api auth id: ", id);
  const sqlAuth = "SELECT * FROM courselist WHERE courseID=?;";
  db.query(sqlAuth, [id], (err, result) => {
    if (!err) {
      console.log("course data sent");
      res.send(result);
    } else {
      console.log("No course with this id exists", err);
      res.status(400);
      res.send("3");
    }
  });
});

// delete course
app.delete("/api/deletecourse", (req, res) => {
  const ID = req.body.courseID;
  const sqldelete = "DELETE FROM courselist WHERE courseID=?";
  db.query(sqldelete, [ID], (err, result) => {
    console.log(result);
  });
});

app.post("/api/stud_course", (req, res) => {
  const id = req.body.courseID;
  console.log("inside api auth id: ", id);
  const sqlAuth = "SELECT * FROM studentcourses WHERE studentID=?;";
  db.query(sqlAuth, [id], (err, result) => {
    if (!err) {
      console.log("student's course data sent");
      res.send(result);
    } else {
      console.log("No student with this id exists", err);
      res.status(400);
      res.send("3");
    }
  });
});
