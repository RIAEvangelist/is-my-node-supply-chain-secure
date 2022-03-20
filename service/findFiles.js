import path from 'path';
import fs from 'fs';
import read from './readFile.js';

async function fromDir(startPath='',filter='',recurse=false){
    if (!fs.existsSync(startPath)){
        return;
    }

    let dir=[];
    try{
        dir=fs.readdirSync(startPath);
    }catch(err){
        //probably restricted permissions
    }
    const files=[];
    
    for(let i=0;i<dir.length;i++){
        const filename=path.join(startPath,dir[i]);
        let stat=null;
        
        try{
            stat=fs.lstatSync(filename);
        }catch(err){
            //dont need it if it errs
            continue;
        }
        if (stat.isDirectory()){
            const recursedFiles=fromDir(filename,filter); //recurse
            (recursedFiles.length>0)? files.push(...recursedFiles): null;
        }
        else if (filename.indexOf(filter)>=0) {
            read(filename.replace(/\\/g,'/'),'JSON');
        };
    };

    return files;
};



export {
    fromDir as default,
    fromDir
}