/************************************************************************
* WEB322–test 5
* I declare that this test is my own work in accordance with Seneca Academic
Policy. No part * of this test has been copied manually or electronically from any
other source
* (including 3rd party web sites) or distributed to other students.
*
* Name: Dai Dung Lam, Student ID: 137 632 196 Date: November-24-2022
*
* Your app’s URL (from Cyclic) : https://gold-repulsive-angelfish.cyclic.app/
*
*************************************************************************/ 
const { json } = require("express");
var express = require("express");
var app = express();
var dataPrep = require("./data_prep");
app.use(express.static('public'));
const exphbs = require("express-handlebars");

app.use(express.json());

app.use(express.urlencoded({extended: true}));

var HTTP_PORT = process.env.Port || 8080;

function onHttpStart(){
    console.log("Express http server listening on: "+ HTTP_PORT);
}


app.use(function(req,res,next){
    let route = req.baseUrl + req.path;
    app.locals.activeRoute = (route == "/") ? "/" : route.replace(/\/$/, "");
    next();
   });

app.engine(".hbs", exphbs.engine({
    extname:".hbs",
    defaultLayout: "main",
    helpers: {
        navLink: function(url, options){
            return '<li' +
            ((url == app.locals.activeRoute) ? ' class="active" ' : '') +
            '><a href=" ' + url + ' ">' + options.fn(this) + '</a></li>';
           }
    }
}));

app.set("view engine", ".hbs");

app.get("/", (req,res) => {
   res.render("home");
});

app.get("/allStudents", (req,res) =>{
    dataPrep.allStudents().then((data) =>{
        res.render("students", {students: data});
    }).catch((err) =>{
        res.render({message: "no results"});
    })
})

app.get("/cpa", (req,res) =>{
    dataPrep.cpa().then((data) =>{
        res.render("students", {students: data});
    }).catch((err) =>{
        res.render({message: "no results"});
    })
})
app.get("/highGPA", (req,res) =>{
    dataPrep.highGPA().then((data) =>{
        res.render("student", {student: data});
    }).catch((err) =>{
        res.render({message: "no results"});
    })
})


app.get("/addStudent", (req,res) =>{
    res.sendFile(__dirname + "/views/addStudent.html");
})

app.post("/addStudent", (req, res)=>{

    dataPrep.addStudent(req.body).then(()=>{
        var data = req.body;
        res.render("student", {student: data});

    }).catch((reason)=>res.render({message: "no result"}));

});

app.get("/student/:studId",(req, res)=>{

    dataPrep.getStudent(req.params.studId).then((data)=>{

        res.render("student", {student: data});

    }).catch((reason)=>res.render({message: "no result"}));

});


app.use((req, res) =>{
    res.status(404).send("<b>Error 404: Page not found.</b>");
})

   


dataPrep.prep().then(() =>{
    app.listen(HTTP_PORT, onHttpStart);
}).catch((err) =>{
    console.log(err);
})