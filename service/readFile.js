import fs from 'fs';

async function read(path,type){
    var rawdata = '';
    try{
        rawdata=fs.readFileSync(path,'utf8');
    }catch(err){
        (type=='JSON')? rawdata={}:null;
        return rawdata;
    }
    var parsedData=null;
    switch(type){
        case 'JSON' : 
            try{
                parsedData = JSON.parse(rawdata);
                if(!parsedData.dependencies||!parsedData.devDependencies){
                    //maybe safe...
                    return;
                }
                console.log(path,parsedData.dependencies,parsedData.devDependencies);

            }catch(err){
                //weird JSON
                parsedData={}
            }
        break;
        case 'HTML' :
            parsedData=rawdata;
        break;
        default :
            parsedData=rawdata;
    }

    return parsedData;
}

export {
    read as default,
    read
}