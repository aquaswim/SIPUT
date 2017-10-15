var express=require('express');
var session=require('express-session');
var router=express.Router();


router.use(session({secret: 'ssshhhhh',saveUninitialized:false,resave:true}));

function checkSession(sess,conf){
	return sess.adminUsr?((sess.adminUsr.username===conf.adminUname)&&(sess.adminUsr.password===conf.adminPassword)):false;
}

router.get('/',function(req,res){
	//if not login
	console.log(req.session);
	if(checkSession(req.session,req.app.siputConf)){
		res.redirect('./admin/dasboard');
	}else{
		res.redirect('./admin/login');
	}
});

router.use('/login',function(req,res,next){
	if(checkSession(req.session,req.app.siputConf)){
		return res.redirect('./dasboard');
	}
	next();
});

router.get('/login',function(req,res){
	res.render('login_view',{
		title:'Login Area'
	});
});
router.post('/login',function(req,res){
	if((req.body.username===req.app.siputConf.adminUname)&&(req.body.password===req.app.siputConf.adminPassword)){
		req.session.adminUsr={username:req.app.siputConf.adminUname,password:req.app.siputConf.adminPassword};
		res.redirect('./dasboard');
	}
	else{
		res.render('login_view',{
			title:'Login Area',
			errmsg:'Username and password not match!'
		});	
	}
});

router.use('/dasboard',function(req,res,next){
	if(!checkSession(req.session,req.app.siputConf)){
		return res.redirect('./login');
	}
	next();
})
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