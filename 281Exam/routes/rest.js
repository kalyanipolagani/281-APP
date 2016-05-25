var Client = require('node-rest-client').Client;
var http = require('http') ;
var count = "";
var endpoint1 = "http://ELB-Exam-1541338455.us-west-2.elb.amazonaws.com/userdb/credentials";

exports.post = function(req, res) {
	
	var details = {
			data: {"username" : req.body.username,
			"password" : req.body.password},
			//location : req.body.location,
			headers: { "Content-Type": "application/json" }
		};
	
    var client = new Client();
            client.post(endpoint1,details, function(data, response_raw){
            	if(response_raw) {
                     console.log(details);
                     console.log(data);
                   
            	} else {
    				console.log("returned false");
    				  
            	}
            	 });

};

exports.get = function(req, res) {
	var json_responses;
console.log("here")
	 var client = new Client();
	  
	            client.get( endpoint1, function(data, response_raw){
	            	if(response_raw) {
	            		console.log("in");
	            			console.log(data);                  
	                    res.render('values', { data : data });
	            	}  	else {
	    				console.log("returned false");
	  
	            	}
	            	 });
	
	
};

exports.getone = function(req, res) {
	
	var json_responses;
	var response = [];
	console.log("here in one")
	var username = req.param("username");
	
	var endpoint = endpoint1+"?query={\"username\":\""+username+"\"}";
	console.log(endpoint)
		 var client = new Client();
		  
		            client.get( endpoint, function(data, response_raw){
		            	if(response_raw) {
		            		console.log("in");
		            			console.log(data);
		            			console.log(data[0]["_id"])
		                    res.render('values', { data : data });
		            	}  	else {
		    				console.log("returned false");
		  
		            	}
		            	 });
	


};


exports.put = function(req, res) {

	var json_responses;
	var response = [];
	console.log("here in update")
	
	var username = req.param("username");
	
	var details = {
			data: {"username" : req.body.username,
			"password" : req.body.password},
			//location : req.body.location,
			headers: { "Content-Type": "application/json" }
		};
	
	var endpoint_upd;
	
	var upd_id;
	
	
	var endpoint = endpoint1+"?query={\"username\":\""+username+"\"}";
		 var client = new Client();
		  
		            client.get(endpoint, function(data, response_raw){
		            	if(response_raw) {
		            		console.log("in update");
		            			console.log(data);
		            			upd_id = data[0]["_id"]
		            			console.log("id")
		            			console.log(upd_id)
		            					            			
		            			endpoint_upd = endpoint1+"/"+upd_id;
		            			console.log(endpoint_upd)
		            			
		            			
		            			client.put(endpoint_upd,details, function(data, response_raw){
		                        	if(response_raw) {
		                                 console.log(details);
		                                 console.log(data);
		                              
		                        	} else {
		                				console.log("returned false");
		                				 
		                        	}
		                        	 });
		            			
		            	
		            	}  	else {
		    				console.log("returned false");
		  
		            	}
		            	 });
		      
	
	
};



exports.delete_rec = function(req, res) {

	var json_responses;
	var response = [];
	console.log("here in delete")
	var username = req.param("username");
	
	var endpoint_del;
	
	var del_id;
	
	var endpoint = endpoint1+"?query={\"username\":\""+username+"\"}";
	//console.log(endpoint)
		 var client = new Client();
		  
		            client.get(endpoint, function(data, response_raw){
		            	if(response_raw) {
		            		console.log("in");
		            			console.log(data);
		            			del_id = data[0]["_id"]
		            			console.log("id")
		            			console.log(del_id)
		            					            			
		            			endpoint_del = endpoint1+"/"+del_id;
		            			console.log(endpoint_del)
		            			
		            			client.registerMethod("delete_ack",endpoint_del,"DELETE")
		            			client.methods.delete_ack("",function(){
		            				console.log("i m here")
		            			})
		            	
		            	}  	else {
		    				console.log("returned false");
		  
		            	}
		            	 });
		      
};




