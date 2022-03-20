import fs from 'fs';
import Is from 'strong-type';

const is=new Is(false);

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

                console.log(`Checking module ${path}`)

                for(const version of Object.values(parsedData.dependencies)){
                    try{
                        if(
                            !is.NaN(
                                Number(version[0])
                            )
                        ){
                            //maybe safe...
                            console.log(version[0],Number(version[0]))
                            continue;
                        }
                    }catch(err){
                        console.log(`ERR: ${err}`);
                        continue;
                    }

                    console.log('vulnerablity found')
                }

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