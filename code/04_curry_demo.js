// 柯里化案例
// ''.match(/\s+/g) 匹配空格
// ''.match(/\d+/g) 匹配数字

const _ = require('lodash');

const match = _.curry(function(reg, str){
    return str.match(reg);
});

const haveSpace = match(/\s+/g);
const haveNumber = match(/\d+/g);

// console.log(haveSpace('hello world!'));
// console.log(haveNumber('hello world! 123'));

const filter = _.curry(function(func, arr){
    return arr.filter(func);
});

const findSpace = filter(haveSpace);
console.log(findSpace(['hello world!', 'john work', '123_1']));


// 实现 lodash curry方法
function curry(func){
    return function curriedFn(...args){
        // 判断实参和形参的个数
        if(args.length < func.length){
            return function(){
                return curriedFn(...args.concat(Array.from(arguments)));
            }
        }
        return func(...args);
    }
}

function getSum(a, b, c){
    return a + b + c;
}

const curried = curry(getSum);
console.log(curried(1, 2, 3));
console.log(curried(1)(2, 3));
console.log(curried(1, 2)(3));

const filter2 = curry(function(func, arr){
    return arr.filter(func);
});

const findSpace2 = filter2(haveSpace);
console.log("自定义curry方法：");
console.log(findSpace2(['hello world!', 'john work', '123_1']));
