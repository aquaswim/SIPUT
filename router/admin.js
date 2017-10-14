var express=require('express');
var router=express.Router();

router.get('/',function(req,res){
	//if not login
	if(true){
		res.redirect('./admin/login');
	}
});

router.get('/login',function(req,res){
	res.render('login_view',{
		title:'Login Area'
	});
});
router.post('/login',function(req,res){
	console.log(req.body);
	res.render('login_view',{
		title:'Login Area'
	});
});
router.get('/dasboard',function(req,res){
	res.render('dasboard_view',{
		title:'Dashboard',
		config:req.app.siputConf
	});
})
router.post('/dasboard',function(req,res){
	var conf=req.app.siputConf;
	var post=req.body;

	conf.makul=post.makul?post.makul:conf.makul;
	conf.kelas=post.kelas?post.kelas:conf.kelas;
	conf.dosen=post.dosen?post.dosen:conf.dosen;
	conf.catatan=post.catatan?post.catatan:conf.catatan;
	conf.adminUname=post.username?post.username:conf.adminUname;
	conf.adminPassword=post.password?post.password:conf.adminPassword;
	conf.saveConf(function(err){
			if(err){
				res.send('Error!!');
				console.log('error saving config',err);
			}else{
				console.log('new config saved!');
				req.app.siputConf.printConf();
				res.render('dasboard_view',{
					title:'Dashboard',
					config:req.app.siputConf
				});
			}
	});
})

module.exports=router;