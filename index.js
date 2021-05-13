const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Welcome to collegeScape");
});

app.listen(port, () => {
  console.log(`College Scape listening at http://localhost:${port}`);
});
