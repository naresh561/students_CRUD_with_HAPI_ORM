var StudentModel = require('../model/studentModel');
exports.liststudents = {
    handler: function(request, reply) {
		try{
           // StudentModel.ListStudents(reply);
             var models = request.server.plugins['hapi-sequelize'].db.sequelize.models; 
             
            models.oneofThem.findAll({
                order: [["id","ASC"]],
                limit: 25,
                
            }).then(function(student){
                    reply.view('listall/listall',{title:'Users',data:student});
            });
		}catch(e){
			console.log(e);
		}	     
    }
};
exports.deleteStudent = {
    handler: function(request, reply) {
              const i =  encodeURIComponent(request.params.id);
		try {            
           // StudentModel.DeleteStudent(reply , i);
             var models = request.server.plugins['hapi-sequelize'].db.sequelize.models; 
             models.oneofThem.destroy({
            where: {
                id :request.params.id
            }
        }).then(function(student) {
               reply({data:"deleted successfully"});
            });
		} catch(e){
			console.log(e);
		}
	    
    }
};

exports.newstudent = {
    handler: function(request, reply) {
		try{
            reply.view('listall/addstudent');
		}catch(e){
			console.log(e)
		}
	    
    }
};

exports.addstudent = {
    handler: function(request, reply) {
		try{
             //StudentModel.AddStudents(request,reply);     
            var models = request.server.plugins['hapi-sequelize'].db.sequelize.models;
            models.oneofThem.create({
                rollnumber:request.payload.rollno,
                firstName:request.payload.fstnme,
                lastName:request.payload.lstnme,
                email:request.payload.mail, 
                gender:request.payload.gender,
                marks:parseInt(request.payload.marks)
            }).then(function(student) {
                reply.view('listall/addstudent' , {title:'Users',data:"Student added Successfully",message:"Student updated Successfully" + student.firstname});
            });
		}catch(e){
			console.log(e);
            reply.view('listall/addstudent' , {title:'Users',data:"internal error"});
		}
	    
    }
};



exports.editstudent = {
    handler:function(request,reply){
        try{
            var models = request.server.plugins['hapi-sequelize'].db.sequelize.models; 
             
            models.oneofThem.findOne({
                 where: {  id :request.params.id }
                
            }).then(function(student){
                    reply.view('listall/editstudent',{title:'Users',data:student});
            });
           
        }catch(e){
             console.log(e);
        }
    }
};
    
exports.updatestudent = {
    handler:function(request,reply){
        try{
         var models = request.server.plugins['hapi-sequelize'].db.sequelize.models; 
             
            models.oneofThem.update({
                rollnumber:request.payload.rollno,
                firstName:request.payload.fstnme,
                lastName:request.payload.lstnme,
                email:request.payload.mail, 
                gender:request.payload.gender,
                marks:parseInt(request.payload.marks)  
                
            }, {
  where: {
     id :request.payload.id
  }}).then(function(student) {
                reply.view('listall/addstudent' , {title:'Users',data:"Student added Successfully"});
            });
        } catch(e){
            console.log(e);
        }
    }
};