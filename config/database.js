var mysql  = require('mysql');
var Config = require('../config/configuration');

exports._start = function _start(){
	// create a connectn for req
	var userconnection = mysql.createConnection({
	  host     : Config.mysql.host,
	  user     : Config.mysql.username,
	  password : Config.mysql.password,
	  database : Config.mysql.database,
	  port 	   : Config.mysql.port,
	});
	userconnection.connect(function(err){
    	if(!err) {
    	    console.log("Database is connected ");    
    	} else {
    	    console.log("Error connecting database ");    
    	}
	});
	return userconnection;
};

exports._reply = function _reply(userconnection){
	userconnection.end();
};