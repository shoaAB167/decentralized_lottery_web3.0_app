//path is node library, return last part of path
//fs is node library - used to read files on your computer
const path = require('path');
const fs = require('fs');
const solc = require('solc');

const LotteryPath = path.resolve(__dirname,'contracts','Lottery.sol');
const source = fs.readFileSync(LotteryPath, 'utf8');

//It export bytecode and ABI code which we can see using
module.exports = solc.compile(source,1).contracts[':lottery'];
