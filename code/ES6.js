// ES6

/* 数组解构 */
//按位置赋值
// const arr = [100, 200, 300];
// const [foo, bar, baz] = arr;
// console.log(foo);
// console.log(bar);
// console.log(baz);
// //...将剩余的值赋给rest，只能在解构位置的最后一个使用
// const [f, ...rest] = arr;
// console.log(f);
// console.log(rest);

/*==================================*/
/* 对象解构 */
// const obj = {name: 'lin', age: 12};
// const { name } = obj;
// const { name: objName } = obj;  //重命名
// console.log(name);
// console.log(objName);


/*==================================*/
/* 模板字符串 */
// const name = "lin";
// const str = `my name is ${name}`;
// console.log(str);

// 标签函数 对模板字符串进行加工
// const name = "lin";
// const gender = true;
//
// function myTagF(string, name, gender){
//     // const sex = gender ? 'man' : 'woman';
//     // return string[0] + name + string[1] + sex + string[2];
//
//     return string[0] + name + string[1] + gender + string[2];
// }
// //将模板字符串解析返回一个数组['hey,', ' is a ', '.'];
// const result = myTagF`hey,${name} is a ${gender}.`;
// //返回 hey,lin is a true.
// console.log(result);


/*==================================*/
/* 箭头函数 */
// const a = (v, a) => v+a;
// console.log(a(10,20));


/*==================================*/
/* 对象的计算属性名 */
// var bar = "bar";
// const obj = {
//     name: "lin",
//     bar,    //key和value值一样可以省略value
//     method(){   //函数
//         console.log(this.name);
//     },
//     [2+3]: 1000,    //计算属性名
// };
// console.log(obj);


/*==================================*/
/* object.assign实现浅拷贝 */
// let a = {
//     age: 1
// };
// let b = Object.assign({}, a);
// a.age = 2;
// console.log(b.age); // 1


/*==================================*/
/* Proxy */
// const person = {
//     name: 'lin',
//     age: 20
// };
//
// const personProxy = new Proxy(person, {
//     get(target, property){  //获取对象的属性 target 对象本身, property 查找的属性
//         console.log(target, property);
//         return property in target ? target[property] : 'undefined';
//     },
//     set(target, property, value){   //添加一个对象属性 target 对象本身, property 添加的属性, value 属性对应的值
//         if(property === 'age'){
//             if(!Number.isInteger(value)){
//                 throw new TypeError(`${value} is not number`);
//             }
//         }
//
//         target[property] = value;
//         console.log(target, property, value);
//     }
// });
//
// personProxy.like = 'JavaScript';
// console.log(personProxy.name);


/*==================================*/
/* Promise */
//封装ajax
// function ajax(url){
//     return new Promise(function(resolve, reject){
//         let xhr = new XMLHttpRequest();
//         xhr.open('get', url);
//         xhr.responseType = 'json';
//         xhr.onload = function(){
//             if(xhr.status === 200){
//                 resolve(this.response);
//             }else{
//                 reject(new Error(this.statusText));
//             }
//         };
//         xhr.send();
//     })
// }
//
// ajax('./user.json')
//     .then(function onFulfilled(res){
//         console.log(res);
//     }, function noRejected(error){
//         console.log(error);
//     })
//
// //或者
// ajax('./user.json')
//     .then(function onFulfilled(res){
//         console.log(res);
//     })
//     .catch(function noRejected(error){
//         console.log(error);
//     })


/*==================================*/
/* class */
// class Person {
//     constructor(name, age){
//         this.name = name;
//         this.age = age;
//     }
//     sayHi(msg){
//         console.log(`name: ${this.name}, age: ${this.age}, ${msg}`);
//     }
// }
//
// class Student extends Person{
//     constructor(name, age){
//         super(name, age);
//     }
//     static create(name, age){   //静态方法
//         return new Student(name, age);
//     }
// }
//
// const tom = new Person('TOM', 20);
// tom.sayHi("hello ");
// console.log(tom.name);
//
// const jack = Student.create('jack', 10);
// jack.sayHi("hello ");


/*==================================*/
/* Set */
//数组去重
// let arr1 = [1,1,1,2,2,2,3,3,3,4,4,4,5,5,5,6,6,6];
// let arr2 = [...new Set(arr1)];
// console.log(arr1);
// console.log(arr2);


/*==================================*/
/* Map */
// let m = new Map();
// let obj = {
//     name: 'lin',
//     age: 20
// };
// m.set(obj, 90);
// console.log(m);


/*==================================*/
/* Symbol */
// let obj = {
//     name: 'lin',
//     age: 20,
//     [Symbol(123)]: '123'
// };
// console.log(obj);
// // 获取symbol类型的属性名
// console.log(Object.getOwnPropertySymbols(obj));


/*==================================*/
/* for-of循环 */
// 实现可迭代接口
// const obj = {
//     store: ['foo', 'bar', 'baz'],
//     [Symbol.iterator]: function() {     //实现可迭代接口 iterable 内部必须要有一个返回迭代器的 iterator 方法
//         let index = 0;
//         const self = this;
//
//         return {    //实现迭代器接口 iterator 内部必须要有个用于迭代的 next 方法
//             next: function() {
//                 const result = {
//                     value: self.store[index],   //当前迭代的数据
//                     done: index >= self.store.length    //实现迭代结果接口 iterationResult 表示迭代是否结束，true表示没有，false表示还存在
//                 };
//                 index++;
//                 return result;
//             }
//         }
//     }
// };
//
// for (const item of obj){
//     console.log("循环体", item);
// }

// 迭代器模式
// const todoList = {
//     store: ['foo', 'bar', 'baz'],
//     life: ['吃饭', '睡觉', '看动漫'],
//     learn: ['JavaScript', 'java', 'node'],
//
//     each: function(callback){   //对外提供一个统一的遍历接口
//         const all = [].concat(this.store, this.life, this.learn);
//         for (const item of all){
//             callback(item);
//         }
//     },
//
//     [Symbol.iterator]: function() {  //自定义可迭代的接口（迭代器）
//         let index = 0;
//         const all = [...this.store, ...this.life, ...this.learn];
//
//         return {
//             next: function() {
//                 const result = {
//                     value: all[index],
//                     done: index >= all.length
//                 };
//                 index++;
//                 return result;
//             }
//         }
//     }
// };
//
// //普通方法
// todoList.each(function(item){
//     console.log(item);
// });
//
// console.log("++++++++++++++++++++++++++++");
//
// //迭代器方法
// for (const item of todoList){
//     console.log(item);
// }


/*==================================*/
/* 生成器 Generator */
// function * foo() {
//     console.log("111");
//     yield 100;
//     console.log("222");
//     yield 200;
//     console.log("333");
//     yield 100;
// }
//
// const generator = foo();
//
// console.log(generator.next());
// console.log(generator.next());
// console.log(generator.next());
// console.log(generator.next());

// 生成器应用：发号器
// function * createId() {
//    let id = 1;
//    while (true){
//        yield id++;
//    }
// }
//
// const id = createId();
//
// console.log(id.next().value);
// console.log(id.next().value);
// console.log(id.next().value);

// 实现对象的iterator方法
// const todos = {
//     store: ['foo', 'bar', 'baz'],
//     life: ['吃饭', '睡觉', '看动漫'],
//     learn: ['JavaScript', 'java', 'node'],
//     [Symbol.iterator]: function * () {
//         const all = [...this.store, ...this.life, ...this.learn];
//         for (const item of all){
//             yield item
//         }
//     }
// };
//
// for (const item of todos){
//     console.log(item);
// }

/*==================================*/
/* async-await */
let a = 0;
let b = async () => {
    a = a + await 10;
    console.log('2', a) ;// -> '2' 10
    a = (await 10) + a;
    console.log('3', a); // -> '3' 20
};
b();
a++;
console.log('1', a) ;// -> '1' 1
