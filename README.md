# 一、简答题
## 1.请说出下列最终的执行结果，并解释为什么？
```
var a = [];
for (var i = 0; i < 10; i++){
    a[i] = function () {
        console.log(i);
    }
}
a[6]();
```
* 结果为：10
* 解释：变量i是var命令声明的，在全局范围内都有效，所以全局只有一个变量i。每一次循环，变量i的值都会发生改变，而循环内被赋给数组a的函数内部的console.log(i)，里面的i指向的就是全局的i。也就是说，所有数组a的成员里面的i，指向的都是同一个i，导致运行时输出的是最后一轮的i的值，也就是 10。

## 2.请说出下列最终的执行结果，并解释为什么？
```
var tmp = 123;
if (true){
    console.log(tmp);
    let tmp;
}
```
* 结果：tmp is not defined
* 解释：存在全局变量tmp，但是块级作用域内let又声明了一个局部变量tmp，导致后者绑定这个块级作用域，所以在let声明变量前，打印tmp值会报错。

## 3.结合ES6新语法，用最简单的方式找出数组中的最小值
```
var arr = [12, 34, 32, 89, 4];
```
* 使用：console.log(Math.min(...arr)); // 4

## 4.请详细说明var、let、const三种声明变量的方式之间的具体差别？
* let 所声明的变量，只在let命令所在的代码块内有效。不存在变量提升，如果在let前使用，会导致报 "XXX is not defined" 的错。let不允许在相同作用域内，重复声明同一个变量。
* const 声明一个只读常量，一旦声明常量的值就不能改变，只声明不赋值会报错，不能留到以后赋值。不存在变量提升，只能在声明后使用。
* 如果块区中存在let和const命令，就会形成块作用域，只在声明所在的块级作用域内有效。
* var 存在变量提升，变量可以在声明之前使用，值为undefined，允许重复声明变量。

## 5.请说出下列代码最终输出的结果，并解释为什么？
```
var a = 10;
var obj = {
    a: 20,
    fn() {
        setTimeout(() => {
            console.log(this.a);
        })
    }
};

obj.fn();
```
* 结果：20
* 解释：setTimeout的参数是一个箭头函数，这个箭头函数的定义生效是在fn函数里。箭头函数导致this总是指向函数定义生效时所在的对象obj，所以this.a输出的是20。

## 6.简述Symbol类型的用途？
* Symbol 是为了解决属性名的冲突而新加的一种原始数据类型。比如使用了一个他人提供的对象，想为这个对象添加新的方法或者新方法的名字就有可能与现有方法产生冲突。
* Symbol 表示独一无二的值，可以保证不会与其他属性名产生冲突。
* Symbol 是一个原始类型的值，不能使用new命令。
* Symbol 函数可以接受一个字符串作为参数，表示对 Symbol 实例的描述，主要是在为了控制台显示，或者转为字符串时，比较容易区分。
* Symbol函数的参数只是表示对当前 Symbol 值的描述，因此相同参数的Symbol函数的返回值是不相等的。
* 可以作为对象的私有属性。
* 可以用Object.getOwnPropertySymbols(obj)获取symbol类型的对象属性

## 7.说说什么是浅拷贝，什么是深拷贝
* 浅拷贝
    * 浅拷贝只复制指向某个对象的指针，而不复制对象本身，新旧对象还是共享同一块内存
    * 可以通过 Object.assign 来实现
    * 或者展开运算符

* 深拷贝
    * 深拷贝会另外创造一个一模一样的对象，新对象跟原对象不共享内存，修改新对象不会改到原对象。
    * 可以通过 JSON.parse(JSON.stringify(object)) 来实现
        * 会忽略 undefined
        * 不能序列化函数
        * 不能解决循环引用的对象
        
## 8.谈谈你是如何理解JS异步编程的，EventLoop是做什么的，什么是宏任务，什么是微任务？
* 1.JS异步编程
    * js执行环境中负责执行代码的线程，只有一个如果有一个耗时任务，很容易造成阻塞、页面卡死的情况
    * 异步编程为了解决JavaScript中同时处理大量的耗时任务
    * 异步编程的实现方式
          * 回调函数
              * 优点：简单、容易理解
              * 缺点：不利于维护，代码耦合高
          * 事件监听(采用时间驱动模式，取决于某个事件是否发生)：
              * 优点：容易理解，可以绑定多个事件，每个事件可以指定多个回调函数
              * 缺点：事件驱动型，流程不够清晰
          * 发布/订阅(观察者模式)
              * 类似于事件监听，但是可以通过‘消息中心’，了解现在有多少发布者，多少订阅者
          * Promise对象
              * 优点：可以利用then方法，进行链式写法；可以书写错误时的回调函数；
              * 缺点：编写和理解，相对比较难
          * Generator函数
              * 优点：函数体内外的数据交换、错误处理机制
              * 缺点：流程管理不方便
          * async函数
              * 优点：内置执行器、更好的语义、更广的适用性、返回的是Promise、结构清晰。
              * 缺点：错误处理机制

* 2.EventLoop
    * 主线程从"任务队列"中读取事件，这个过程是循环不断的，所以整个的这种运行机制又称为Event Loop（事件循环）。
    * 事件循环可以简单的描述为以下四个步骤:
        * 函数入栈，当Stack中执行到异步任务的时候，就将他丢给WebAPIs,接着执行同步任务,直到Stack为空；
        * 此期间WebAPIs完成这个事件，把回调函数放入队列中等待执行（微任务放到微任务队列，宏任务放到宏任务队列）
        * 执行栈为空时，Event Loop把微任务队列执行清空；
        * 微任务队列清空后，进入宏任务队列，取队列的第一项任务放入Stack(栈）中执行，回到第1步。

* 3.宏任务
    * script
    * setTimeout
    * setInterval
    * setImmediate
    * I/O
    * UI rendering
    
* 4.微任务
    * process.nextTick
    * promise
    * Object.observe
    * MutationObserver
    
* 浏览器会先执行一个宏任务，接下来有异步代码的话就先执行微任务

## 9.将下面异步代码使用Promise改进？   
```
setTimeout(function () {
    var a = "hello ";
    setTimeout(function () {
        var b = "lagou ";
        setTimeout(function () {
            var c = "I ♥ U";
            console.log(a + b + c);

        }, 10);
    }, 10);
}, 10);
```
* 改进
```
function output(msg) {
    return new Promise(function (resolve, reject) {
        if(typeof(msg) !== 'string'){
            reject(new Error(`${msg} is not string`));
        }
        resolve(msg);
    })
}
let msg = "";
output("hello ").then(function (res) {
    msg += res;
    return output("lagou ");
}).then(function (res) {
    msg += res;
    return output("I ♥ U");
}).then(function (res) {
    msg += res;
    console.log(msg);
}).catch(function noRejected(error){
    console.log(error);
});
```   

## 10.请简述 TypeScript 与 JavaScript 之前的关系
* TypeScript基于JavaScript的超集，可以使用JavaScript 中的所有代码和编码概念，使用的时候要将TypeScript转换为JavaScript才能被浏览器解析。
* TypeScript添加类型检查，避免在开发中有可能会出现的类型异常，提高编码的效率，以及代码的可靠程度。
* TypeScript 中的数据要求带有明确的类型，JavaScript不要求。
* TypeScript 引入了 JavaScript 中没有的“类”、“接口”概念。

## 11.谈谈你所认为的 TypeScript 优缺点？
* 优点：
    * 规范了数据的类型，在编码的过程中就能检测错误
    * 功能更为强大，生态也更健全、更完善
    * 可用于开发大型的应用
    * TypeScript 拥有活跃的社区
* 缺点：
    * 语言本身多了很多概念
    * 项目初期，TypeScript会增加一些成本
    * 可能和一些库结合的不是很完美    
    
      

