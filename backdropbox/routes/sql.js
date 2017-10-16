var mysql = require("mysql");

// Transactions will be useful for Cart Checkout Query Execution: https://github.com/mysqljs/mysql#transactions

function getConnection() {
	var connection = mysql.createConnection({
		host : 'localhost',
		user : 'root',
		password : '12345678',
		database : 'dropbox',
		port : 3306
	});
	return connection;
}

function Pool(connection_no) {
	this.pool = [];
	this.isAvail = [];
	for (var i = 0; i < connection_no; i++) {
		this.pool.push(getConnection());
	}
	for (var j = 0; j < connection_no; j++) {
		this.isAvail.push(true);
	}
}

Pool.prototype.get = function(useConnection) {
	var cli;
	var connectionNumber;
	for (var i = 0; i < this.pool.length; i++) {
		if (this.isAvail[i]) {
			cli = this.pool[i];
			// Enable Connection Pooling
			this.isAvail[i] = false;
			// Disable Connection Pooling
//			this.isAvail[i] = true;
			connectionNumber = i;
			break;
		}
		if (i === this.pool.length - 1) {
			i = 0;
		}
	}

	// Enable Connection Pooling
	useConnection(connectionNumber, cli);
	// Disable Connection Pooling
//	useConnection(connectionNumber, getConnection());
};

Pool.prototype.release = function(connectionNumber, connection) {
	// Enable Connection Pooling
	this.isAvail[connectionNumber] = true;
	// Disable Connection Pooling
//	connection.end();
};

function initializeConnectionPool() {
	var p = new Pool(100);
	return p;
}

var connectionPool = initializeConnectionPool();

module.exports = {
	fetchData	:	function(selectFields, tableName, queryParameters, processResult) {
		connectionPool.get(function(connectionNumber, connection) {
			var queryString = "SELECT " + selectFields + " FROM " + tableName;
			if(queryParameters !== null) {
				queryString = "SELECT " + selectFields + " FROM " + tableName + " WHERE ?";
			}
			var query = connection.query(queryString, queryParameters, function(error, rows) {
				if (error) {
					throw error;
				} else {
					processResult(rows);
				}
			});
			connectionPool.release(connectionNumber, connection);
		});
	},
	
	executeQuery:	function(sqlQuery, parameters, processResult) {
		connectionPool.get(function(connectionNumber, connection) {
			var query = connection.query(sqlQuery, parameters, function(error, rows) {
				if (error) {
					throw error;
				} else {
					processResult(rows);
				}
            });
            
			connectionPool.release(connectionNumber, connection);
		});
	},

	insertData	:	function(tableName, insertParameters, processInsertStatus) {
		connectionPool.get(function(connectionNumber, connection) {
			var queryString = "INSERT INTO " + tableName + " SET ?";
			var query = connection.query(queryString, insertParameters, function(error, rows) {
				if (error) {
					throw error;
				} else {
					processInsertStatus(rows);
				}
			});
			connectionPool.release(connectionNumber, connection);
		});
	},
	
	updateData	:	function(tableName, insertParameters, queryParameters, processUpdateStatus) {
		connectionPool.get(function(connectionNumber, connection) {
			var queryString = "UPDATE " + tableName + " SET ? WHERE ?";
			var query = connection.query(queryString, [insertParameters, queryParameters], function(error, rows) {
				if (error) {
					throw error;
				} else {
					processUpdateStatus(rows);
				}
			});
			connectionPool.release(connectionNumber, connection);
		});
	}
};