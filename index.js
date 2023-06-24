const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql");

const conn = mysql.createConnection({
  host: "localhost",
  port: "3307",
  database: "cadets_db",
  user: "root",
  password: "",
});

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/nccregister", (req, res) => {
    const Regimental_Number = req.body.Regimental_Number;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const Rank = req.body.Rank;
    const gender = req.body.gender;
    const phonenumber = req.body.phonenumber;
    const email = req.body.email;
    const password = req.body.password;
  
    conn.query(
      "INSERT INTO cadets (Regimental_Number, firstname, lastname, Rank, gender, phonenumber, email, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [Regimental_Number, firstname, lastname,Rank, gender, phonenumber, email, password],
      (error, results) => {});
  });

app.post('/nccenrollment',(req,res)=>{
    const lRegimental_Number=req.body.Regimental_Number;
    const lpassword=req.body.password;

    conn.query("SELECT * from cadets where Regimental_Number=? and password=?",[lRegimental_Number,lpassword],(error,results)=>{
        if(results.length==0){
            return res.status(401).json({message: 'Invalid Details'});
        }
        else{
            res.render(__dirname+'/views'+'/fenroll',{results:results});
        }
    });
});
  

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
