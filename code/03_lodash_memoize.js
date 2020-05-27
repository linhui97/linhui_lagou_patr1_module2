// lodash memoize
const _ = require('lodash');

// 获取圆的面积
function getArea(r){
    console.log(r);
    return Math.PI * r * r;
}

//lodash方式
let getAreaWithMemory = _.memoize(getArea);
console.log(getAreaWithMemory(5));
console.log(getAreaWithMemory(5));
console.log(getAreaWithMemory(5));

// 实现memoize
function memoize(f){
    let cache = {};
    return function(){
        let key = JSON.stringify(arguments);
        cache[key] = cache[key] || f.apply(f, arguments);
        return cache[key];
    }
}

let getAreaWithMemory2 = _.memoize(getArea);
console.log(getAreaWithMemory2(4));
console.log(getAreaWithMemory2(4));
console.log(getAreaWithMemory2(4));