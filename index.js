import find from './service/findFiles.js';

console.log('Statrting Check, please be patient, if there any vulnerabilities, they will show up here.');
await find('/','package.json');


