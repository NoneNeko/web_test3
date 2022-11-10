// var fs = require("fs");

// module.exports ={
//     prep,
//     allStudents,
//     highGPA,
//     cpa,
//     addStudent,
//     getStudent
// }
// let students = [];

// function prep(){
//     return new Promise((resolve,reject) =>{
//         fs.readFile('./student.json', (err,data)=>{
//             if(err)
//             {
//                 reject("Unable to read file.");
//             }
//             else{
//                 students=JSON.parse(data);
//                 resolve();
//             }
//         });
//     });
// }


// function allStudents(){
//     return new Promise((resolve, reject) =>{
//         if(students.length == 0)
//         {
//             reject("No results returned!");
//         }
//         else{
//             resolve(students);
//         }
//     })
// }

// function addStudent(student){
//     return new Promise((resolve, reject) =>{
//             students[students.length + 1] = student;
//     })
// }
// function cpa(){
//     return new Promise((resolve,reject) =>{
//         let cpa = [], j = 0;
//         for(var i = 0; i<students.length; i++)
//         {
//             if(students[i].program == "CPA")
//             {
//                 cpa[j] = students[i];
//                 j++;
//             }
//         }
//         if(cpa.length == 0)
//         {
//             reject("No result returned!");
//         }
//         else{
//             resolve(cpa);
//         }

//     })
// }
// function highGPA(){
//     return new Promise((resolve, reject) =>{
//         let highest = students[0];
//         for(var i = 0; i< students.length; i++ )
//         {
//             if (highest.gpa < students[i].gpa)
//             {
//                 highest = students[i];
//             }
//         }
//         if (highest.length == 0)
//         {
//             reject("No result returned!");
//         }
//         else{
//             resolve(highest);
//         }
       
//     });
// }

// function getStudent(studNUM)
// {
//     return new Promise((resolve,reject) =>{
//         let desired = [];
//         for (var i = 0; i< students.length; i++)
//         {
//             if (students[i].studId == studNUM)
//             {
//                 desired = students[i];
//             }
//         }
//         if (desired.length == 0)
//         {
//             reject("No result returned!");
//         }
//         else{
//             resolve(desired);
//         }
//     })
   
// }

var fs = require("fs");

var students=[];

exports.prep = ()=>{

   // console.log("Testing");

   return new Promise((resolve, reject)=>{

        fs.readFile("./students.json", (err, data)=>{

            if (err) {reject("unable to read file.");}

            students = JSON.parse(data);

           // console.log(students);

            resolve("File read success.");

        }); 

   });

};



exports.bsd = ()=>{

    return new Promise((resolve, reject)=>{

       let results = students.filter(student => student.program == "BSD");

       (results.length == 0)? reject("No BSD students."):resolve(results);

    });

}





exports.cpa = ()=>{

    return new Promise((resolve, reject)=>{

       let results = students.filter(student => student.program == "CPA");

       (results.length == 0)? reject("No CPA students."):resolve(results);

    });

}

exports.highGPA = ()=>{

    return new Promise((resolve, reject)=>{

        let high = 0;

        let highStudent;

        

        for (let i=0; i<students.length; i++)

        {

            //console.log(students[i].gpa, high);

            if (students[i].gpa > high)

            {

                high = students[i].gpa;

                highStudent = students[i];

            }

        }

        (highStudent) ? resolve(highStudent): reject("Failed finding student with highest GPA");

    }); 

};



exports.lowGPA = ()=>{

    return new Promise((resolve, reject)=>{

        let low = 4.0;

        let lowStudent;

        for (let i=0; i<students.length; i++)

        {

            if (students[i].gpa < low)

            {

                low = students[i].gpa;

                lowStudent = students[i];

            }

        }

        resolve(lowStudent);

    }); 

};



exports.allStudents =()=>{

    return new Promise((resolve, reject)=>{

        if (students.length>0)

        {

            resolve(students);

        } else reject("No students.");

    })

}



exports.addStudent= (stud)=>{

    return new Promise((resolve, reject)=>{

        stud.studId = students.length+1;

        students.push(stud);

        resolve();

    });

}



exports.getStudent = (studId)=>{

    return new Promise((resolve, reject)=>{

        students.forEach(function(student){

            if (student.studId == studId)

                resolve(student);

        });

        reject("No result found!");

    })

}