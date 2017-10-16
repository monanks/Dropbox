var mysql = require('./sql');
var bcrypt = require("bcrypt");
var session = require('express-session');
var fs = require('fs');
var CryptoJS = require("crypto-js");

function doLogin(req,res)
{
    // check user already exists
    var email = req.body.email;
    var password = CryptoJS.AES.decrypt(req.body.password,"key");
    var password = req.body.password;
    var getUser="select * from login,user where email = ? and login.id=user.user_id";
	console.log("pswd is:"+password);
	console.log(req.body.email+" "+req.body.password);
	mysql.executeQuery(getUser,[email],function(result){
		if(result.length > 0){
			var pwd = result[0].password;
			var salt = result[0].salt;
			var id = result[0].id;
			var first_name = result[0].first_name;
			if(bcrypt.hashSync(password,salt) === pwd){
				console.log("valid Login"+id);
				let data = {
							success: '1',
							email: email,
							userid: id,
							firstname: first_name,
							curdir : 0
						};
						req.session.user_id = result[0].id;
						req.session.isLoggedIn = true;
						res.json(data);
			}
			else{
				console.log("Invalid Login");
				let data = {
						success: '0',
						message : 'Incorrect Password',
					};
				res.json(data);
			}
			
		}
		else {    
			console.log("Invalid Login");
			let data = {
					success: '0',
					message : 'Incorrect Email',
				};
			res.json(data);
		}
	});
}

function doSignup(req,res)
{
    // check user already exists
    var email = req.body.email;
	var password = req.body.password;
	var first = req.body.firstname;
	var last = req.body.lastname;
	var salt = bcrypt.genSaltSync(10);
	
	mysql.executeQuery("select * from login where email=?",[email],function(result){
		if(result.length>0){
			console.log("Invalid Signup");
			data = {
				success : '0',
				message : 'email already exists'
			};
			res.json(data);
		}
		else{
			console.log(req.body);
			console.log(password);
			console.log(salt);
			var insertParameters = {
				"email" : email,
				"password" : bcrypt.hashSync(password,salt),
				"salt" : salt
			};

			mysql.insertData("login",insertParameters,function(result){
				if(result.affectedRows == 1){
					console.log("valid signup");
					
					mysql.executeQuery("select * from login where email=?",[email],function (result) {
						if(result.length>0){
							var id= result[0].id;
							var insertParameters2 = {
								"user_id" : id,
								"first_name" : first,
								"last_name" : last
							};

							mysql.insertData("user",insertParameters2,function(result){
								if(result.affectedRows == 1){

									var dir = './files/'+id;
									if (!fs.existsSync(dir)){
									    fs.mkdirSync(dir);
									}

 									let data = {
										success: '1',
										email: email,
										userid: id,
										first: first,
										curdir: 0
									};
									req.session.user_id = id;
									req.session.isLoggedIn = true;
									res.json(data);
								}
								else{
									let data = {
										success: '0',
										message : 'Error Occurred'
									};
									res.json(data);	
								}
							});
						}
						else{
							let data = {
								success: '0',
								message : 'Error Occurred'
							};
							res.json(data);
						}
					});
				}
				else {    
					console.log("Invalid Signup");
					let data = {
							success: '0',
						};
					res.json(data);
				} 
			});
		}
	});
}

exports.doLogin = doLogin;
exports.doSignup = doSignup;