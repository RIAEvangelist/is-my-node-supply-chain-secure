import fs from 'fs';
import find from './service/findFiles.js';
import read from './service/readFile.js';


const rootFiles=await find('/','package.json');

console.log(rootFiles);

