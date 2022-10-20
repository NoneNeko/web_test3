var fs = require("fs");

module.exports ={
    prep,
    cpa,
    highGPA,
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


function cpa(){
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
