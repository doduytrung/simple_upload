//define dependencies
var express=require("express");
var multer=require("multer");
var app=express();
var doneFlag=false;

//configure the multer
app.use(multer({dest:"./upload/",
		rename:function(fieldname,filename){
				return filename+Date.now();
		},
		onFileUploadStart:function(file){
			console.log(file.originalname+' is starting...');
		},
		onFileUploadComplete:function(file){
			console.log(file.fieldname+' uploaded to '+file.path);
			doneFlag=true;
		}
	}));

//handling routers
app.get('/',function(req,res){
	res.sendfile("index.html");
});

app.post('/api/photo',function(req,res){
	if(doneFlag==true){
		console.log(req.files);
		res.end("File uploaded!");
	}else{
		console.log('OK');
	}
});

app.listen(3000,function(){
	console.log("Working on port 3000");
});
