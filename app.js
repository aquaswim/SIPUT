var express=require('express');
var bodyParser=require('body-parser');
var cf=require('./utils/config-loader.js');
var fs=require('fs');

var app=express();
app.siputConf=cf('config.json');

console.info("read the config.json..");
app.siputConf.loadConf();
app.siputConf.printConf();

app.set('view engine','pug');
app.set('views','./view');

//body parser,
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//some router
app.use('/upload',require('./router/upload.js'));
app.use(express.static('./public'));

app.get('/',function(req,res) {
	res.redirect('/upload');
});

app.listen(app.siputConf.port,function(){
	console.log('listen at port '+app.siputConf.port);
});