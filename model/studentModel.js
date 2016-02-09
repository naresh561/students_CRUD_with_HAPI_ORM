var _start = require('../config/database')._start;
var _reply = require('../config/database')._reply;

module.exports.ListStudent = function(reply){
    var userconnection = _start();
    userconnection.beginTransaction(function(err) {
       
      if(err){
          reply( {"status":0,"message":"Error connection"});
      }
      else{
          userconnection.query("SELECT * FROM `student` ORDER BY `id` ASC limit 0,25 ",function(err,row,fields){
              if(err) reply(err);
              else{_reply(userconnection); reply.view('listall/listall', {title:'Users',data:row});}
          });
      }
    });
};

module.exports.DeleteStudent = function ( reply ,id  ){
    var userconnection = _start();
    userconnection.query("DELETE FROM student WHERE id = ? ",[id] ,function(err,row){
        console.log('deleted ' + row.affectedRows + ' rows');
        if(err) reply(err);
        else{_reply(userconnection); reply({data:"deleted successfully"});}
    });
};

module.exports.AddStudents = function(request,reply){
    var userconnection = _start();
    var Data =[request.payload.rollno,request.payload.fstnme,request.payload.lstnme,request.payload.mail, request.payload.gender,request.payload.marks];
         userconnection.query("INSERT INTO `student`( `rollnumber`, `first_name`, `last_name`, `email`, `gender`, `marks`) VALUES (?,?,?,?,?,?)",Data,function(err,row){
              if(err) reply(err);
              else{_reply(userconnection); reply.view('listall/addstudent' , {title:'Users',data:"Student added Successfully"});}
      });
};

module.exports.editstudent = function ( reply ,id  ){
    try{
        var userconnection = _start();
        userconnection.query("SELECT * FROM student WHERE id = ? ",[id] ,function(err,row){

            if(err) reply(err);
            else{_reply(userconnection); reply.view('listall/editstudent',{title:'Users',data:row[0]});}
        });
    }catch(e){
        console.log(e);
    }
};
module.exports.UpdateStudents = function(request,reply)

{
    try{
        var userconnection = _start();
        var data1=[request.payload.rollno,request.payload.fstnme,request.payload.lstnme,request.payload.mail, request.payload.gender,request.payload.marks,request.payload.id];
        var student={
                      rollnumber : request.payload.rollno,
                      first_name : request.payload.fstnme,
                      last_name : request.payload.lstnme,
                      email : request.payload.mail, 
                      gender : request.payload.gender,
                      marks :  request.payload.marks,
                      id : request.payload.id};
        userconnection.query("UPDATE `student` SET `rollnumber`=?,`first_name`=?,`last_name`=?,`email`=?,`gender`=?,`marks`=? WHERE id = ? ",data1,function(err,row){
              if(err) reply(err);
              else{
                  _reply(userconnection);
                  reply.view('listall/editstudent' , {title:'Users',data:student,message:"Student updated Successfully"});
              }
      });
    }catch(e)
        {
            console.log(e);
        }
};

