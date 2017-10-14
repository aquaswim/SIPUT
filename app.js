var express=require('express');
var bodyParser=require('body-parser');
var cookieParser = require('cookie-parser');
var cf=require('./utils/config-loader.js');
var fs=require('fs');

var app=express();
app.siputConf=cf('config.json');

//load config
console.info("read the config.json..");
app.siputConf.loadConf();
app.siputConf.printConf();

//check for upload folder
if(!fs.existsSync('./upload')){
	console.warn('Upload folder not found!\n\tCreating new upload folder.');
	fs.mkdirSync('./upload');
	console.info('\tDone');
}

app.set('view engine','pug');
app.set('views','./view');

//body parser,
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
//cookie parser
app.use(cookieParser());

//some router
app.use('/upload',require('./router/upload.js'));
app.use('/admin',require('./router/admin.js'));
app.use(express.static('./public'));

app.get('/',function(req,res) {
	res.redirect('/upload');
});

app.listen(app.siputConf.port,function(){
	console.log('listen at port '+app.siputConf.port);
});