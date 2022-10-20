/*************************************************************************
* WEB322–test 2
* I declare that this test is my own work in accordance with Seneca Academic
Policy. No part * of this test has been copied manually or electronically from any
other source
* (including 3rd party web sites) or distributed to other students.
*
* Name: Dai Dung Lam, Student ID: 137 632 196 Date: October-6th-2022
*
* Your app’s URL (from Cyclic) : https://shy-blue-kitten-ring.cyclic.app
*
*************************************************************************/ 
const { json } = require("express");
var express = require("express");
var app = express();
var dataPrep = require("./data_prep");
app.use(express.static('public'));

var HTTP_PORT = process.env.Port || 8080;

function onHttpStart(){
    console.log("Express http server listening on: "+ HTTP_PORT);
}

app.get("/", (req,res) => {
    res.sendFile(__dirname + "/views/home.html");
});

app.get("/allStudents", (req,res) =>{
    dataPrep.allStudents().then((data) =>{
        const student = data;
        let resText = "<br>";
        resText = JSON.stringify(student) + "<br>";
        res.send(resText);
    }).catch((err) =>{
        res.send("Message: ", err);
    })
})

app.get("/cpa", (req,res) =>{
    dataPrep.cpa().then((data) =>{
        const cpaStud = data;
        let resText = "<br>";
        resText = JSON.stringify(cpaStud) + "<br>";
        res.send(resText);
    }).catch((err) =>{
        res.send("Message ", err);
    })
})
app.get("/highGPA", (req,res) =>{
    dataPrep.highGPA().then((data) =>{
        const highStudent = data;
        let resText = "<h1>Highest GPA: </h1>" + "Student ID: " + highStudent.studId + "<br>" + "Name: " + highStudent.name + "<br>"
        + "Program: " + highStudent.program + "<br>" + "GPA: " + highStudent.gpa + "<br>";
        res.send(resText);
    }).catch((err) =>{
        res.send("Message: ", err);
    })
})


app.get("/addStudent", (req,res) =>{
    res.sendFile(__dirname + "/views/addStudent.html");
})

app.post("/addStudent", (req,res) =>{
        const addedStudent = req.body;
        dataPrep.addStudent(addedStudent);
        JSON.stringify(req.body);
        let resText = "<p>Student ID: "+ addedStudent.studID + "</p> <br>" + 
        "<p> Student name:"+ addedStudent.name +"</p> <br>"+
        "<p> Program:"+ addedStudent.program + "</p> <br>" +
        "<p>"+ addedStudent.gpa + "</p> <br>";
        res.send(resText);
})

app.use((req, res) =>{
    res.status(404).send("<b>Error 404: Page not found.</b>");
})

   


dataPrep.prep().then(() =>{
    app.listen(HTTP_PORT, onHttpStart);
}).catch((err) =>{
    console.log(err);
})