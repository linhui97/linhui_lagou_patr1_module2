const fp = require('lodash/fp');

// 数据
const cars = [
    {name: '1 A', horsepower: 1660, dollar_value: 1, in_stock: true},
    {name: '2 B', horsepower: 2660, dollar_value: 2, in_stock: false},
    {name: '3 C', horsepower: 3660, dollar_value: 3, in_stock: true},
    {name: '4 D', horsepower: 4660, dollar_value: 4, in_stock: false},
    {name: '5 E', horsepower: 5660, dollar_value: 5, in_stock: true}
];

// 练习一：使用组合函数 fp.flowRight() 重新实现下面这个函数
// let isLastInStock = function(cars){
//     // 获取最后一条数据
//     let last_car = fp.last(cars);
//     // 获取最后一条数据的 in_stock 属性值
//     return fp.prop('in_stock', last_car);
// }
// console.log(isLastInStock(cars));

// // 用 fp.flowRight() 实现
// let isLastInStock2 = fp.flowRight(fp.prop('in_stock'), fp.last);
// console.log(isLastInStock2(cars));


// 练习二：使用 fp.flowRight()、fp.prop() 和 fp.first() 获取第一 car 的 name
// let isFirstName = fp.flowRight(fp.prop('name'), fp.first);
// console.log(isFirstName(cars));


// 练习三：使用帮助函数 _average 重构 averageDollarValue，使用函数组合的方式实现
// 无需改动
// let _average = function(xs){
//     return fp.reduce(fp.add, 0, xs) / xs.length
// }

// let averageDollarValue = function(cars){
//     let dollar_value = fp.map(function(car){
//         return car.dollar_value
//     }, cars)
//     return _average(dollar_value);
// }
// console.log(averageDollarValue(cars));

// // 优化
// let dollar_value = fp.map((car) => car.dollar_value);
// let averageDollarValue2 = fp.flowRight(_average, dollar_value);
// console.log(averageDollarValue2(cars));


// 练习4：使用 flowRight 写一个 sanitizeNames()函数，返回一个下划线链接的小写字符串，
// 把数组中的name转换为这种形式：例如sanitizeNames(["Hello Workd"]) => ["hello_workd"]
// 无需改动
let _underscore = fp.replace(/\W+/g, '_');
let carName = fp.map((car) => fp.toLower(car.name));
let sanitizeNames = fp.flowRight(_underscore, carName);
console.log(sanitizeNames(cars));