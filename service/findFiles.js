import path from 'path';
import fs from 'fs';

function fromDir(startPath,filter,recurse){
    if (!fs.existsSync(startPath)){
        return;
    }

    var dir=[];
    try{
        dir=fs.readdirSync(startPath);
    }catch(err){
        //probably restricted permissions
    }
    var files=[];
    
    for(var i=0;i<dir.length;i++){
        var filename=path.join(startPath,dir[i]);
        var stat=null;
        
        try{
            stat=fs.lstatSync(filename);
        }catch(err){
            //dont need it if it errs
            continue;
        }
        if (stat.isDirectory()){
            var recursedFiles=fromDir(filename,filter); //recurse
            (recursedFiles.length>0)? files.push.apply(files, recursedFiles): null;
        }
        else if (filename.indexOf(filter)>=0) {
            files.push(filename.replace(/\\/g,'/'));
        };
    };

    return files;
};

export {
    fromDir as default,
    fromDir
}