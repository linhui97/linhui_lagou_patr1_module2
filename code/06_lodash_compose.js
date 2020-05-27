// lodash 组合函数
// flow() 是从左到右运行
// flowRight() 是从右到左运行，使用的更多一些

const _ = require('lodash');

// 对数组进行反转
const reverse = (arr) => arr.reverse();

// 获取数组第一个数据
const first = (arr) => arr[0];

// 将数据中的字母转换成大写
const toUpper = (s) => s.toUpperCase();

const f = _.flowRight(toUpper, first, reverse);

// 获取数组最后一个数据并转换成大写
console.log(f(['aa', 'bb', 'cc', 'dd', 'ee', 'ff']));


// 实现 lodash 中的 flowRight 方法
 function compose(...args){
     return function(value){
         return args.reverse().reduce(function(acc, fn){
             return fn(acc);
         }, value);
     }
}
// 用ES6箭头函数优化 compose 方法
const compose2 = (...args) => (value) => args.reverse().reduce((acc, fn) => fn(acc), value);
    


const f2 = compose2(toUpper, first, reverse);

// 获取数组最后一个数据并转换成大写
console.log(f2(['aa', 'bb', 'cc', 'dd', 'ee', 'ff']));


// 函数组合要满足结合律
const func1 = _.flowRight(_.toUpper, _.first, _.reverse);
const func2 = _.flowRight(_.flowRight(_.toUpper, _.first), _.reverse);
const func3 = _.flowRight(_.toUpper, _.flowRight(_.first, _.reverse));

console.log(func1(['one', 'two', 'three']));
console.log(func2(['one', 'two', 'three']));
console.log(func3(['one', 'two', 'three']));