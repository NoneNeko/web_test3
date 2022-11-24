var fs = require("fs");
const { userInfo } = require("os");


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
               sequelize.sync(data).then(()=>{
                resolve();
               }).catch((e)=>console.log(e))
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
    sequelize.sync().then(()=>{
        student.create({
            name: stud.name,
            program: stud.program,
            gpa: stud.gpa
        })
    }).catch(() => reject("unable to add the student"))
}
function cpa(){
    return new Promise((resolve,reject) =>{
        sequelize.sync().then(() =>
        {
         student.findAll({
             attributes:['studId', 'name', 'program', 'gpa'],
             where: {program: "CPA"}
         }).then((data)=>{
             resolve(data);
         }).catch(()=>{
             reject("no result returned");
         })
        })

    })
}
function highGPA(){
    return new Promise((resolve, reject) =>{
       sequelize.sync.then(() =>{
        student.findAll({
            attributes:['studId', 'name', 'program', 'gpa'],
            where: {gpa: 4}
        }).then((data) =>{
            resolve(data);
        }).catch(()=>{
            reject("no result returned");
        })
       })
       
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
    host:"mouse.db.elephantsql.com",
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

var student = sequelize.define("Student", {
    StudId :{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name : Sequelize.STRING,
    program: Sequelize.STRING,
    gpa : Sequelize.FLOAT
}, {
    createdAt: false,
    updatedAt: false
});