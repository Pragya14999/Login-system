const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
 
const app = express();
const port = 3001;
 
app.use(express.json());
app.use(cors());
 
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'loginsystem',
});
db.connect((err) => {
  if (err) throw err;
  console.log('Server Connected!');
});
 
app.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
 
  db.query(
    "INSERT INTO users(username, password) VALUES (?,?)",
    [username, password],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
      res.send(result);
    });
})


 
app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
 
  db.query(
    "SELECT * FROM users WHERE username = ? AND password=? ",
    [username, password],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send({ err: err });
      }
 
      if (result.length > 0) {
        res.send(result);
      } else {
        res.send({ message: "Entered Data does not exists in registered users" });
      }
    });
})
 
app.listen(port, () => {
  console.log(`App working at ${port}`);
})