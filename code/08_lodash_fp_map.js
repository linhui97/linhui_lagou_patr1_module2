// lodash 和 lodash/fp 模块中 map 方法的区别
// map 方法接收的参数不同

const _ = require('lodash');

// 引入 lodash 的 fp 模块，返回的都是已经被柯里化的函数
const fp = require('lodash/fp');

const map1 = _.map(['123', '5', '69'], parseInt);
console.log(map1);
// parseInt('123', 0, array)  123  第二个参数表示将数字转换成几进制
// parseInt('5', 1, array)    NAN
// parseInt('69', 2, array)   NAN 

const map2 = fp.map(parseInt, ['123', '5', '69']);
console.log(map2);
