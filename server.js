// /************************************************************************
// * WEB322–test 3
// * I declare that this test is my own work in accordance with Seneca Academic
// Policy. No part * of this test has been copied manually or electronically from any
// other source
// * (including 3rd party web sites) or distributed to other students.
// *
// * Name: Dai Dung Lam, Student ID: 137 632 196 Date: October-20th-2022
// *
// * Your app’s URL (from Cyclic) : https://gold-repulsive-angelfish.cyclic.app/
// *
// *************************************************************************/ 
// const { json } = require("express");
// var express = require("express");
// var app = express();
// var dataPrep = require("./data_prep");
// app.use(express.static('public'));

// var HTTP_PORT = process.env.Port || 8080;

// function onHttpStart(){
//     console.log("Express http server listening on: "+ HTTP_PORT);
// }

// app.get("/", (req,res) => {
//     res.sendFile(__dirname + "/views/home.html");
// });

// app.get("/allStudents", (req,res) =>{
//     dataPrep.allStudents().then((data) =>{
//         const student = data;
//         let resText = "<br>";
//         resText = JSON.stringify(student) + "<br>";
//         res.send(resText);
//     }).catch((err) =>{
//         res.send("Message: ", err);
//     })
// })

// app.get("/cpa", (req,res) =>{
//     dataPrep.cpa().then((data) =>{
//         const cpaStud = data;
//         let resText = "<br>";
//         resText = JSON.stringify(cpaStud) + "<br>";
//         res.send(resText);
//     }).catch((err) =>{
//         res.send("Message ", err);
//     })
// })
// app.get("/highGPA", (req,res) =>{
//     dataPrep.highGPA().then((data) =>{
//         const highStudent = data;
//         let resText = "<h1>Highest GPA: </h1>" + "Student ID: " + highStudent.studId + "<br>" + "Name: " + highStudent.name + "<br>"
//         + "Program: " + highStudent.program + "<br>" + "GPA: " + highStudent.gpa + "<br>";
//         res.send(resText);
//     }).catch((err) =>{
//         res.send("Message: ", err);
//     })
// })


// app.get("/addStudent", (req,res) =>{
//     res.sendFile(__dirname + "/views/addStudent.html");
// })

// app.post("/addStudent", (req,res) =>{
//         const addedStudent = req.body;
//         dataPrep.addStudent(addedStudent);
//         JSON.stringify(req.body);
//         let resText = "<p>Student ID: "+ addedStudent.studId + "</p> <br>" + 
//         "<p> Student name:"+ addedStudent.name +"</p> <br>"+
//         "<p> Program:"+ addedStudent.program + "</p> <br>" +
//         "<p>"+ addedStudent.gpa + "</p> <br>";
//         res.send(resText);
// })

// app.get('/student/:studId', (req,res) =>{
//     console.log(request.params);
//     res.json(request.params);
// })

// app.use((req, res) =>{
//     res.status(404).send("<b>Error 404: Page not found.</b>");
// })

   


// dataPrep.prep().then(() =>{
//     app.listen(HTTP_PORT, onHttpStart);
// }).catch((err) =>{
//     console.log(err);
// })

var express = require("express");

var app = express();

var data_prep = require("./data_prep.js");

var path = require("path");



app.use(express.json());

app.use(express.urlencoded({extended: true}));



var HTTP_PORT = process.env.PORT || 8080;

function onHttpStart() 

{

    console.log("Express http server listening on " + HTTP_PORT);

}



app.get("/",(req,res)=>{

    let resText = "<h2>Declaration (text size in heading 2): </h2> ";

    resText += "<p> The rest text is displayed in paragraph as shown in screenshot. </p>";

    resText += " <p> I acknowledge the College’s academic integrity policy – and my own integrity ";

    resText += "– remain in effect whether my work is done remotely or onsite.";

    resText += " Any test or assignment is an act of trust between me and my instructor, ";

    resText += " and especially with my classmates… even when no one is watching.";

    resText += " I declare I will not break that trust. </p>";

    resText += "<p>Name: <mark> <b> highlight Your Real Name </b> </mark> </p>";

    resText += "<p>Student Number: <mark><b> highlight Your Real Student Number </b> </mark> </p>";

    

    resText += `<ul>

                <li> <a href = "/CPA"> CPA Students </a></li>

                <li> <a href = "/highGPA"> Highest GPA </a></li>

                <li> <a href = "/allStudents"> All Students </a></li>

                <li> <a href = "/addStudent"> Add A New Student </a></li>

                <li> Note: Locate specific student by student Id, e.g., <br>

                 http://localhost:8080/student/3 </li>

                `



    res.send(resText);

});



app.get("/BSD", (req,res)=>{

    data_prep.bsd().then((data)=>{

        res.json(data);

    }).catch((reason)=>{

        res.json({message:reason});

    });

});



app.get("/CPA", (req,res)=>{

    data_prep.cpa().then((data)=>{

        res.json(data);

    }).catch((reason)=>{

        res.json({message:reason});

    });

});



app.get("/highGPA", (req, res)=>{

    data_prep.highGPA().then((data)=>{

        let resText = `<h2> Highest GPA: </h2>

        <p> Student ID: ${data.studId} </p>

        <p> Name:  ${data.name} </p>

        <p> Program: ${data.program} </p>

        <p> GPA: ${data.gpa} </p> `;

        res.send(resText);

    });

});



app.get("/allStudents", (req, res)=>{

    data_prep.allStudents().then((data)=>{

        res.json(data);

    }).catch((reason)=>res.json({message:reason}));

});



app.get("/addStudent", (req, res)=>{

    res.sendFile(path.join(__dirname, "/test3_views/addStudent.html"));

});



app.post("/addStudent", (req, res)=>{

    data_prep.addStudent(req.body).then(()=>{

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

        //res.redirect("/allStudents");



    }).catch((reason)=>res.json({message:reason}));

});



app.get("/student/:studId",(req, res)=>{

    data_prep.getStudent(req.params.studId).then((data)=>{

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



app.get("*", (req, res)=>{

    res.status(404).send("Error 404: page not found.")

});



data_prep.prep().then((data)=>{

    //console.log(data);

    app.listen(HTTP_PORT, onHttpStart);

}).catch((err)=>{

    console.log(err);

});