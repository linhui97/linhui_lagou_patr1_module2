// PointFree
// Hello  World ---> hello_world

const fp = require('lodash/fp');

const f = fp.flowRight(fp.replace(/\s+/g, '_'), fp.toLower);
console.log(f('Hello  World'));


// 把一个字符串的首字母提取并转换成大写，使用. 作为分隔符
// 例如 hello world point free --> H. W. P. F
const  firstLetterToUpper = fp.flowRight(fp.join('. '), fp.map(fp.first), fp.map(fp.toUpper), fp.split(' '));
const  firstLetterToUpper2 = fp.flowRight(fp.join('. '), fp.map(fp.flowRight(fp.first, fp.toUpper)), fp.split(' '));
console.log(firstLetterToUpper('hello world point free'));
console.log(firstLetterToUpper2('hello world point free'));