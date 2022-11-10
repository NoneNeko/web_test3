/************************************************************************
* WEB322–test 3
* I declare that this test is my own work in accordance with Seneca Academic
Policy. No part * of this test has been copied manually or electronically from any
other source
* (including 3rd party web sites) or distributed to other students.
*
* Name: Dai Dung Lam, Student ID: 137 632 196 Date: October-20th-2022
*
* Your app’s URL (from Cyclic) : https://gold-repulsive-angelfish.cyclic.app/
*
*************************************************************************/ 
const { json } = require("express");
var express = require("express");
var app = express();
var dataPrep = require("./data_prep");
app.use(express.static('public'));

app.use(express.json());

app.use(express.urlencoded({extended: true}));

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

app.post("/addStudent", (req, res)=>{

    dataPrep.addStudent(req.body).then(()=>{

        var data = req.body;

        var txt =  ` <h2 style="color:red;"> The New Student Information  </h2>

        <p> Student id: ${data.studId}</p>

         <p> Student name: ${data.name} </p>

        <p> Program: ${data.program} </p>

        <p> GPA: ${data.gpa} </p>

        <a href="/allStudents"> All Students </a> <br>

        <a href="/"> Go Home </a>

        `;

        res.send(txt);

        res.redirect("/allStudents");



    }).catch((reason)=>res.json({message:reason}));

});

app.get("/student/:studId",(req, res)=>{

    dataPrep.getStudent(req.params.studId).then((data)=>{

        var txt = `

        <h2 style="color:red;"> This Student Information  </h2>

        <p> Student id: ${data.studId}</p>

        <p> Student name: ${data.name} </p>

        <p> Program: ${data.program} </p>

        <p> GPA: ${data.gpa} </p>

        <a href="/allStudents"> Show All Students </a> <br>

        <a href="/"> Go Home </a>

        `;

        res.send(txt);

       // res.json(data);

       // {"studId":3,"name":"name3","program":"BSD","gpa":3.3}

    }).catch((reason)=>res.json({message:reason}));

});


app.use((req, res) =>{
    res.status(404).send("<b>Error 404: Page not found.</b>");
})

   


dataPrep.prep().then(() =>{
    app.listen(HTTP_PORT, onHttpStart);
}).catch((err) =>{
    console.log(err);
})