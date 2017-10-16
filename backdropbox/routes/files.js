var mysql = require('./sql');
var fs = require('fs');

function getFiles(req,res){
	//console.log(req.session.isLoggedIn);
	var curdir = req.body.curdir;
	var uid = req.body.userid;
	console.log(curdir+" "+uid);
	var query = "select * from file where owner_id=? and parent_id=?";

	mysql.executeQuery(query,[uid,curdir],function(result){
		if(result.length>0){
			//console.log(result);
			var arr = result.map(function(obj){
				return {
					fileid: obj.file_id,
					filename: obj.file_name,
					filetype: obj.file_type,
					datetime: obj.datetime_created
				}
			});
			//console.log(arr);
			let data = {
				success: '1',
				files: arr
			}
			//console.log(data);
			res.json(data);
		}  
		else{
			let data = {
				success: '0',
				message: 'Empty Directory'
			};
			res.json(data);
		}
	});
	
}

function dlFile(req,res){
	//console.log("hello"+req.session.isLoggedIn);
	var fileid = req.body.fileid;

	var query = "select file_path,file_name from filecontent,file where file.file_id=? and file.file_id=filecontent.file_id";

	mysql.executeQuery(query,[fileid],function(result){
		if(result.length>0){
			var path = result[0].file_path;
			var name = result[0].file_name;
			console.log(path);
			res.download(path,name,function(err){
				console.log(err);
			});
			//res.end(Buffer.from(name));
			//console.log(res);
		}
		else{
			let data = {
				success: '0',
				message: 'No file'
			};
			res.json(data);
		}
	});
}

function deleteFile(req,res){
	var fileid = req.body.fileid;
	console.log(fileid);

	mysql.executeQuery("select file_path from filecontent where file_id=?",[fileid],function(result){
		if(result.length>0){
			var path = result[0].file_path;
			var dir = path.split('/');
			var a=dir.splice(-1);
			var d= dir.join('/');
			console.log(d);
			var query1 = "delete from filecontent where file_id=?";
			var query2 = "delete from file where file_id=?";

			mysql.executeQuery(query1,[fileid],function(result){
				if(result.affectedRows==1){
					mysql.executeQuery(query2,[fileid],function(result){
						if(result.affectedRows==1){
							fs.unlinkSync(path);
							fs.rmdirSync(d);	
						}
						else{

						}
					});
				}
				else{

				}
			});
		}
	})
	
}


exports.getFiles = getFiles;
exports.dlFile = dlFile;
exports.deleteFile = deleteFile;