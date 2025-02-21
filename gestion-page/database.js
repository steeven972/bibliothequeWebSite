
const mysql = require("mysql");
const express = require("express");
const app = express();

app.use(express.json()); 

const localhostName = "0.0.0.0";
const userName = "root";
const passwordName = "";


const con = mysql.createConnection({
    localhost:localhostName,
    user: userName,
    password:passwordName
})



con.connect(function(err){
    if(err) throw err;
    console.log("Connected");
})

app.post('/add', (req, res) =>{
    const {titre, auteur} = req.body;
    res.send("Hello to the respond")
    console.log(titre);
})

app.listen(5501, () =>{
    console.log("Connected to the server");
})  