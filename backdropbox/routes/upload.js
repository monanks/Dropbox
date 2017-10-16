var mysql = require('./sql');
var express = require('express');
var router = express.Router();
var multer = require('multer');
var glob = require('glob');
var fs = require('fs');
const datetime = require('date-time');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './files/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

var upload = multer({storage:storage});

router.post('/doUpload', upload.single('file'), function (req, res, next) {

    console.log(req.body);
    console.log(req.file);
    console.log(req.body.curdir);

    var insertParameters = {
    	"owner_id" : req.body.ownerid,
    	"file_name" : req.file.originalname,
    	"file_type" : 1,
    	"datetime_created" : datetime(),
    	"shared" : 0,
    	"file_size" : req.file.size,
    	"parent_id" : req.body.curdir
    }

    console.log(insertParameters);

    mysql.insertData("file",insertParameters,function(result){
    	if(result.affectedRows == 1){
    		mysql.executeQuery(
    			"select * from file where owner_id=? and file_name=? and parent_id=?",
    			[
    				req.body.ownerid,
    				req.file.originalname,
    				req.body.curdir
    			],
    			function(result){
    				if(result.length>0){
    					var oldpath = './files/'+req.file.originalname;
		    			var newpath = './files/'+req.body.ownerid+'/'+result[0].file_id+'/'+req.file.originalname;
		    			var dir = './files/'+req.body.ownerid+'/'+result[0].file_id;
						if (!fs.existsSync(dir)){
						    fs.mkdirSync(dir);
						}
		    			fs.rename(oldpath,newpath,function(err){
		    				console.log("rename callback",err);
		    			})

		    			var insertParameters2 = {
		    				file_id : result[0].file_id,
		    				file_path : newpath
		    			}

		    			mysql.insertData("filecontent",insertParameters2,function(result){})
		    			res.status(204).end();

    				}
    				else{

    				}

    		});
    		
    	}
    	else{

    	}
    });

    
});

//exports.doUpload = doUpload;

module.exports = router;