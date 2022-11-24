var fs = require("fs");

const Sequelize = require("sequelize");

module.exports ={
    prep,
    allStudents,
    highGPA,
    cpa,
    addStudent,
    getStudent
}
let students = [];

function prep(){
    return new Promise((resolve,reject) =>{
        fs.readFile('./student.json', (err,data)=>{
            if(err)
            {
                reject("Unable to read file.");
            }
            else{
                students=JSON.parse(data);
                resolve();
            }
        });
    });
}


function allStudents(){
    return new Promise((resolve, reject) =>{
        if(students.length == 0)
        {
            reject("No results returned!");
        }
        else{
            resolve(students);
        }
    })
}

function addStudent(stud){
    return new Promise((resolve, reject) =>{
        stud.studId = students.length+1;

        students.push(stud);

        resolve();
    })
}
function cpa(){
    return new Promise((resolve,reject) =>{
        let cpa = [], j = 0;
        for(var i = 0; i<students.length; i++)
        {
            if(students[i].program == "CPA")
            {
                cpa[j] = students[i];
                j++;
            }
        }
        if(cpa.length == 0)
        {
            reject("No result returned!");
        }
        else{
            resolve(cpa);
        }

    })
}
function highGPA(){
    return new Promise((resolve, reject) =>{
        let highest = students[0];
        for(var i = 0; i< students.length; i++ )
        {
            if (highest.gpa < students[i].gpa)
            {
                highest = students[i];
            }
        }
        if (highest.length == 0)
        {
            reject("No result returned!");
        }
        else{
            resolve(highest);
        }
       
    });
}

function getStudent(studNUM)
{
    return new Promise((resolve,reject) =>{
        let desired = [];
        for (var i = 0; i< students.length; i++)
        {
            if (students[i].studId == studNUM)
            {
                desired = students[i];
            }
        }
        if (desired.length == 0)
        {
            reject("No result returned!");
        }
        else{
            resolve(desired);
        }
    })
   
}

var sequelize = new Sequelize("jybsjjyv", "jybsjjyv","LKmJhJixYNx4TKEXMH1HpanhKIp0s1jN",
{
    host:"mouse.db.elephantsql.com (mouse-01)",
    dialect: "postgres",
    port: 5432,
    dialectOptions: {
        ssl: {
            require:true,
            rejectUnauthorized: false
        }
    },
    query: {raw:true}
})

sequelize.authenticate().then(()=> console.log("connection success!"))
.catch((e)=>{
    console.log("connection failed!");
    console.log(e);
})