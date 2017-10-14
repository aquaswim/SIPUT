var fs=require('fs');

configLoader=function(path){
	var _path=path;
	var _confdef={};
	_confdef.makul='Mata Kuliah';
	_confdef.kelas='Kelas anda';
	_confdef.dosen='Nama Dosen';
	_confdef.catatan='Tidak ada';
	_confdef.port=3000;

	var obj={};
	var loaded=false;
	obj.loadConf=function(){
		if(!loaded){
			if(!fs.existsSync(path)){
				console.warn('Config file: '+_path+' not found!\n\tCreating new config file');
				fs.writeFileSync(_path,JSON.stringify(_confdef));
				console.info('\t..Config file created!');
			}
			var data=fs.readFileSync(path);
			var _conf=JSON.parse(data);
			obj.makul=_conf.makul?_conf.makul:_confdef.makul;
			obj.kelas=_conf.kelas?_conf.kelas:_confdef.kelas;
			obj.dosen=_conf.dosen?_conf.dosen:_confdef.dosen;
			obj.catatan=_conf.catatan?_conf.catatan:_confdef.catatan;
			obj.port=_conf.port?_conf.port:_confdef.port;
			loaded=true;
		}
		else
			console.error('Config is already loaded');
	}
	obj.printConf=function(){
		if(loaded){
			console.info('Mata Kuliah\t: '+obj.makul);
			console.info('Kelas\t\t: '+obj.kelas);
			console.info('Dosen\t\t: '+obj.dosen);
			console.info('Catatan\t\t: '+obj.catatan);
			console.info('Port\t\t: '+obj.port);
		}
		else
			console.error('no config file loaded');
	};
	obj.saveConf=function(callback){
		fs.writeFile(path,JSON.stringify(obj),callback);
	}
	return obj;
};


module.exports=configLoader;