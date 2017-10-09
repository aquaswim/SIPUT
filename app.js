var express=require('express');

var app=express();

//some router
app.use('/upload',require('./router/upload.js'));

app.get('/',function(req,res) {
	res.redirect('/upload');
});

app.listen(3000,function(){
	console.log('listen at port 3000');
	console.log(__dirname);
});