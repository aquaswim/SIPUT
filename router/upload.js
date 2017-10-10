var express=require('express');
var multer=require('multer');
var fs=require('fs');
var router=express.Router();


var storage=multer.diskStorage({
	destination:function(req,file,callback){
		callback(null,'./upload');
	},
	filename:function(req,file,callback){
		var filename=req.body.nim+'-'+req.body.nkomputer+'-'+req.body.nama+'-'+(new Date()).getTime()+'-'+file.originalname;
		callback(null,filename);
		console.log('incoming file: '+filename);
	}
});

var upload=multer({storage:storage});

router.get('/',function(req,res) {
	res.render('upload_view',{
		title:'Upload Area',
		activeMenu:'upload',
		config:req.app.siputConf
	});
});
router.post('/',upload.single('fileTugas'),function(req,res){
	res.send({success:true});
});

router.get('/list',function(req,res){
	fs.readdir('./upload',function(err,files){
		res.render('list_uploaded_view',{
			title:'Upload List',
			activeMenu:'list',
			config:req.app.siputConf,
			list:files
		});
	});
});

module.exports=router;