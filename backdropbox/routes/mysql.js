var ejs= require('ejs');
var mysql = require('mysql');

//Put your mysql configuration settings - user, password, database and port
var pool = mysql.createPool({
    connectionLimit : 1000,
    host     : 'localhost',
    user     : 'monank',
    password : '12345678',
    database : 'dropbox',
    port	 : 3306
});	

function fetchData(callback,sqlQuery,packet){
	
	console.log("\nSQL Query::"+sqlQuery);
	
	pool.getConnection(function(err,connection){
        if (err) {
            connection.release();
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;
        }
        
        console.log('connected as id ' + connection.threadId);

        connection.query(sqlQuery,packet, function(err, rows, fields) {
            if(err){
                console.log("ERROR: " + err.message);
            }
            else 
            {	// return err or result
                console.log("DB Results:"+rows);
                callback(err, rows);
            }
        });
        console.log("\nConnection released..");
        connection.release();

    });
}	

function insertData(sqlQuery,packet){
	
	console.log("\nSQL Query::"+sqlQuery);
	
	pool.getConnection(function(err,connection){
        if (err) {
            connection.release();
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;
        }
        
        console.log('connected as id ' + connection.threadId);

        connection.query(sqlQuery,packet,function(err, rows) {
            if(err){
                console.log("ERROR: " + err.message);
            }
            else 
            {	// return err or result
                console.log("DB Results:"+rows);
            }
        });
        console.log("\nConnection released..");
        connection.release();

    });	
}	

exports.fetchData=fetchData;
exports.insertData=insertData;