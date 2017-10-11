var express=require('express');
var bodyParser=require('body-parser');
var fs=require('fs');

var app=express();

console.info("read the config.json..");
fs.readFile('config.json',function(err,data){
	if(err){
		console.warn("no config.json file found, atempting to recreate it with default value. Make sure there is no directory named config.json.");
		data={
			makul:"lorem",
			kelas:"ipsum",
			dosen:"somedosen",
			catatan:"Tidak ada"};
		fs.writeFileSync('config.json',JSON.stringify(data));
		console.info("..done");
	}
	else{
		data=JSON.parse(data);
	}
	//check is some field is missing
	if(data.makul===undefined)
		data.makul="lorem";
	if(data.kelas===undefined)
		data.kelas="ipsum";
	if(data.dosen===undefined)
		data.dosen="somedosen";
	if(data.catatan===undefined)
		data.catatan="Tidak ada";
	if(data.port===undefined)
		data.port=3000;
	//do something with data
	console.info('config preview: ');
	console.info('makul\t: '+data.makul);
	console.info('kelas\t: '+data.kelas);
	console.info('dosen\t: '+data.dosen);
	console.info('catatan\t: '+data.catatan);
	if(!fs.existsSync('./upload')){
		console.info('\nUpload folder not found,creating new.');
		fs.mkdirSync('./upload');
		console.info('\tDone');
	}
	else{
		console.info('\nUpload folder found');
	}

	console.info('\nStarting Server...');
	app.siputConf=data;
	startServer(app);
});

function startServer(app){
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
}