# 一、ES6(ECMAScript2015) 学习笔记

## 1.重点变化
* 解决原有语法上的一些问题或者不足
* 对原有语法进行增强
* 全新的对象、全新的方法、全新的功能
* 全新的数据类型和数据结构

## 2.let与块级作用域
* 块级作用域简单来说就是用"{}"或括号包裹起来的代码段，在块级作用域中用let声明的变量外部无法调用
* let 声明的变量不会产生变量提升

## 3.数组的解构
```
//按位置赋值
const arr = [100, 200, 300];
const [foo, bar, baz] = arr;
console.log(foo);

//...将剩余的值赋给rest，只能在解构位置的最后一个使用
const [f, ...rest] = arr;

//对象解构
const obj = {name: 'lin', age: 12};
const { name } = obj;
const { name: objName } = obj;  //重命名
```

## 4.模板字符串
* 字面量
```
const name = "lin";
const str = `my name is ${name}`;
console.log(str);
```

* 标签函数 对模板字符串进行加工
```
const name = "lin";
const gender = true;

function myTagF(string, name, gender){
    // const sex = gender ? 'man' : 'woman';
    // return string[0] + name + string[1] + sex + string[2];
    
    return string[0] + name + string[1] + gender + string[2];
}
//将模板字符串解析返回一个数组['hey,', ' is a ', '.'];
const result = myTagF`hey,${name} is a ${gender}.`;
//返回 hey,lin is a true.
console.log(result);

```

## 5.字符串扩展方法
* includes()
    * 判断字符串是否包含某个值，方便字符串查找
* startsWith()
    * 判断字符串开始是否包含某个值
* endsWith()
    * 判断字符串结尾是否包含某个值

## 6.函数扩展语法
* 参数默认值，没有传递实参、或者实参为undefined时使用形参默认值；如果有多个形参带有默认值的形参要放到最后。
* ...rest，以数组形式接受所有实参，以形参的方式放在最后一位，只可以使用一次
* 展开运算符 ...

## 7.箭头函数
* 不存在this，不会改变this指向，始终指向当前作用域的this，箭头函数中不可加new，也就是说箭头函数不能当构造函数进行使用。
```
const a = (v, a) => v+a;
```

## 8.对象字面量的增强
```
const obj = {
    name: "lin",
    bar,    //key和value值一样可以省略value
    method(){   //函数
        console.log(this.name);
    },
    [2+3]: 1000,    //计算属性名
}
```

## 9.object.assign
* 用第二个变量的属性覆盖第一个变量的相同属性并把其他属性合并到第二个对象
* 浅拷贝

## 10.object.is
* 用于判断两个值是否相等

## 11.Proxy
* object.defineProperty(发布-订阅者模式)
    * 用于捕获对象的读写过程
    * vue的双向绑定原理

* Proxy(数据访问代理器)
    * 能够监视很多对象操作
    * 数组对象的监视，重写数组的操作方法
    * 是以非侵入的方式监管了对象的读写
```
const person = {
    name: 'lin',
    age: 20
}

const personProxy = new Proxy(person, {
    get(target, property){  //获取对象的属性 target 对象本身, property 查找的属性
        console.log(target, property);
        return property in target ? target[property] : 'undefined';
    },
    set(target, property, value){   //添加一个对象属性 target 对象本身, property 添加的属性, value 属性对应的值
        if(property === 'age'){
            if(!Number.isInteger(value)){
                throw new TypeError(`${value} is not number`);
            }
        }

        target[property] = value;
        console.log(target, property, value);
    }
})

personProxy.like = 'JavaScript';

console.log(personProxy.name);
```

## 12.Reflect
* 统一的对象操作api，属于静态类，不能通过new构建
* 内部封装了一系列的对对象的底层操作
* Reflect成员方法就是Proxy处理对象的默认实现

## 13.Promise
* 解决传统异步调用的回调地狱
* promise对象的then方法会返回一个全新的promise对象
* 后面的then方法就是为上一个then返回的promise对象注册回调
* 前面then方法中的回调函数返回值会作为后面then方法回调的参数
* 如果回调返回的是promise，那么后面的then方法的回调会等待它的结果
* 总的来说，then链式调用实际上是调用上一个then返回的promise的对象去添加状态明确过后的回调，这些promise会从前到后依次执行

### 方法
* promise.resolve()
    * 回调成功的promise对象
* promise.reject()
    * 回调失败的promise对象
* 并行执行
    * promise.all() 
        * 调用所有的promise对象并返回一个新的promise对象，用then接收所有对象的回调结果会放在一个数组中
        * 等待所有的任务完成才能返回回调结果
    * promise.rece
        * 跟promise作用一样，区别是只会等待第一个任务结束

### 基本用法
```
const promise = new Promise(function(resolve, reject){
    // resolve(100);   //成功的回调
    reject(new Error("promise reject error"));  //失败回调
})

promise.then(function(value){
    console.log(`resolve：${value}`);
}, function(error){
    console.log(`reject：${error}`);
})
```

### 使用案例：封装ajax
```
function ajax(url){
    return new Promise(function(resolve, reject){
        let xhr = new XMLHttpRequest();
        xhr.open('get', url);
        xhr.responseType = 'json';
        xhr.onload = function(){
            if(xhr.status === 200){
                resolve(this.response);
            }else{
                reject(new Error(this.statusText));
            }
        }
        xhr.send();
    })
}

ajax('./user.json')
.then(function onFulfilled(res){
    console.log(res);
}, function noRejected(error){
    console.log(error);
})

//或者
ajax('./user.json')
.then(function onFulfilled(res){
    console.log(res);
})
.catch(function noRejected(error){
    console.log(error);
})

```

## 14.class类
* 可使用extends继承类
* 静态方法在方法前面添加关键字static
* 用super访问父类的成员
```
class Person {
    constructor(name, age){
        this.name = name;
        this.age = age;
    }
    sayHi(msg){
        console.log(`name: ${this.name}, age: ${this.age}, ${msg}`);
    }
}

class Student extends Person{
    constructor(name, age){
        super(name, age);
    }
    static create(name, age){   //静态方法
        return new Student(name, age);
    }
}

const tom = new Person('TOM', 20);
tom.sayHi("hello ");
console.log(tom.name);

const jack = Student.create('jack', 10);
jack.sayHi("hello ");
```

## 15.Set
* 不重复的集合
* size()方法获取set长度
* has()方法表示是否包含某个值，返回true或者false
* delete()方法表示删除某一项数据，返回true或者false
* clear()方法表示清空集合
```
//数组去重
let arr1 = [1,1,1,2,2,2,3,3,3,4,4,4,5,5,5,6,6,6];
let arr2 = [...new Set(arr1)];
console.log(arr1);
console.log(arr2);
```

## 16.Map
* 类似于对象的数据
* map可以使用任意类型作为键，而对象的键只能是字符串
```
let m = new Map();
let obj = {
    name: 'lin',
    age: 20
};
m.set(obj, 90);
console.log(m);

```

## 17.Symbol
* 最主要的作用就是为对象添加一个独一无二的属性名
* 可以作为对象的私有属性
* 可以用Object.getOwnPropertySymbols(obj)获取symbol类型的对象属性
```
let obj = {
    name: 'lin',
    age: 20,
    [Symbol(123)]: '123'
};
console.log(obj);
// 获取symbol类型的属性名
console.log(Object.getOwnPropertySymbols(obj));
```

## 18.for-of循环
* 作为遍历所有数据结构的统一方式
* 可以用break终止循环
* 必须要实现Symbol.iterator的方法，Symbol.iterator中必须包含next()方法的对象，不断调用next方法就可以实现内部所有数据的遍历

### 实现可迭代接口
```
const obj = {
    store: ['foo', 'bar', 'baz'],
    [Symbol.iterator]: function() {     //实现可迭代接口 iterable 内部必须要有一个返回迭代器的 iterator 方法
        let index = 0;
        const self = this;

        return {    //实现迭代器接口 iterator 内部必须要有个用于迭代的 next 方法
            next: function() {
                const result = {
                    value: self.store[index],   //当前迭代的数据
                    done: index >= self.store.length    //实现迭代结果接口 iterationResult 表示迭代是否结束，true表示没有，false表示还存在
                }
                index++;
                return result;
            }
        }
    }
}

for (const item of obj){
    console.log("循环体", item);
}
//循环体 foo
//循环体 bar
//循环体 baz
```

### 迭代器模式
* 对外提供统一接口，不考虑内部的结构

```
const todos = {
    store: ['foo', 'bar', 'baz'],
    life: ['吃饭', '睡觉', '看动漫'],
    learn: ['JavaScript', 'java', 'node'],

    each: function(callback){   //对外提供一个统一的遍历接口
        const all = [].concat(this.store, this.life, this.learn);
        for (const item of all){
            callback(item);
        }
    },

    [Symbol.iterator]: function() {  //自定义可迭代的接口（迭代器）
        let index = 0;
        const all = [...this.store, ...this.life, ...this.learn];

        return {
            next: function() {
                const result = {
                    value: all[index],
                    done: index >= all.length
                }
                index++;
                return result;
            }
        }
    }
}

//普通方法
todos.each(function(item){
    console.log(item);
})

console.log("++++++++++++++++++++++++++++");

//迭代器方法
for (const item of todos){
    console.log(item);
}
```

## 19.生成器 Generator
* 在普通函数的前面添加一个 * 就可以变成一个生成器函数
* 避免异步编程中回调嵌套过深，提供更好的异步编程解决方案
* 自动返回一个生成器对象，调用这个对象的next方法函数体才开始执行，遇到yield关键字函数会暂停，yield后的值会作为next返回结果返回，继续调用next会从暂停的位置往后执行，直到函数体完全结束
```
function * foo() {
    console.log("111");
    yield 100;
    console.log("222");
    yield 200;
    console.log("333");
    yield 100;
}

const generator = foo();

console.log(generator.next());
// 111
// { value: 100, done: false }

console.log(generator.next());
// 222
// { value: 200, done: false }

console.log(generator.next());
// 333
// { value: 100, done: false }

console.log(generator.next());
// { value: undefined, done: true }
```

### 生成器应用：发号器
```
function * createId() {
   let id = 1;
   while (true){
       yield id++;
   }
}

const id = createId();

console.log(id.next().value);
```

### 实现对象的iterator方法
```
const todos = {
    store: ['foo', 'bar', 'baz'],
    life: ['吃饭', '睡觉', '看动漫'],
    learn: ['JavaScript', 'java', 'node'],
    [Symbol.iterator]: function * () {
        const all = [...this.store, ...this.life, ...this.learn];
        for (const item of all){
            yield item
        }
    }
}

for (const item of todos){
    console.log(item);
}
```

## 20.模块化 Modules
* 语言层面的模块化标准


# 二、ECMAScript2016
## 1.新增内容
* 数组的include方法，判断数组中是否包含制定元素，返回布尔值
* 数字的指数运算符 2**10

# 三、ECMAScript2017
## 1.新增内容
* object对象方法
    * value()方法，返回对象中所有值所组成的数组
    * entries()方法，以数组的形式返回对象中的所有键值对，因此可以用for-of遍历对象
    * getOwnPropertyDescriptors()方法，获取对象属性的完整描述信息

* 字符串填充，可以用作是字符串对其输出
    * String.prototype.padStart
    * String.prototype.padEnd

* 在函数参数中添加尾逗号
* async-await
    * 本质上promise的语法糖
    ```
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
    ```

# 四、JavaScript异步编程
## 1.js单线程
* js执行环境中负责执行代码的线程只有一个
* 优点
    * 安全、简单
* 缺点
    * 容易造成阻塞、页面卡死的情况

## 2.同步模式
* 代码中的任务依次执行，后面的任务要等待前面的任务结束才开始执行，跟代码编写的顺序一致

## 3.异步模式
* 回调函数是所有异步编程方案的根基
    * 可以理解为一件想要做的事情
    * 调用者定义，交给执行者执行的函数 
* 不会等待当前任务结束才开始下一个任务
* 开启过后就立即往后执行下一个任务，后续逻辑一般会通过回调函数的方式定义
* 优点
    * 解决单线程JavaScript语言同时处理耗时任务
