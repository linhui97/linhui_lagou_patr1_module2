/* 函数式编程 */

//非函数式
// let num1 = 2;
// let num2 = 2;
// let sum1 = num1 + num2;
// console.log(sum1);


/* ======================================== */
//函数式
// function add(a, b){
//     return a+b;
// }
// let sum2 = add(2, 2);
// console.log(sum2);


/* ======================================== */
// 把函数赋给变量（函数表达式）
// let fn = function(){
//     console.log("hello world");
// }
// fn();


/* ======================================== */
// 函数作为参数 
// forEach
// function forEach(array, fn){
//     for (let i = 0; i < array.length; i++){
//         fn(array[i]);
//     }
// }

// filter
// function filter(array, fn){
//     let results = [];
//     for (let i = 0; i < array.length; i++){
//         if(fn(array[i])){
//             results.push(array[i]);
//         }
//     }
//     return results;
// }

// map
// const map = (array, fn) => {
//     let results = [];
//     for (let value of array){
//         results.push(fn(value));
//     }
//     return results;
// }

// every
// const every = (array, fn) => {
//     let result = true;
//     for (let value of array){
//         result = fn(value);
//         if(!result){
//             break;
//         }
//     }
//     return result;
// }

// some
const some = (array, fn) => {
    let result = false;
    for (let value of array){
        result = fn(value);
        if(result){
            break;
        }
    }
    return result;
}

let arr = [1, 2, 3, 4, 5, 6];

let r = some(arr, v => v % 2 !== 0);
console.log(r);

// let r = every(arr, v => v>0);
// console.log(r);

// let newArr = map(arr, v => v*2);
// console.log(newArr);

// forEach(arr, function(item){
//     console.log(item);
// });

// let newArr = filter(arr, function(item){
//     return item % 2 !== 0;
// });
// console.log(newArr);


/* ======================================== */
// 可以把函数作为另一个函数的返回结果
// once
// function once(fn){
//     let done = false;
//     return function(){
//         if(!done){
//             done = true;
//             return fn.apply(this, arguments);
//         }
//     }
// }

// let pay = once(function(money){
//     console.log(`支付金额为：${money}`);
// });
// pay(123456);
// pay(100);
// pay(20);


/* ======================================== */
// 纯函数 slice
