# 一、TypeScript
## 1.内容概要
* 强类型与弱类型（类型安全）
    * 强类型：语言层面限制函数的实参类型必须与形参类型相同
        * 不允许随意的隐式类型转换
        * 强类型的优势
        * 错误更早暴露
        * 代码更智能，编码更准确
        * 重构会更牢靠
        * 减少不必要的类型判断

    * 弱类型：语言层面不会限制实参类型
        * 允许任意的隐式类型转换


* 静态类型与动态类型（类型检查）
    * 静态类型：一个变量声明时它的类型就是明确的
        * 声明过后，它的类型不允许在修改
    * 动态类型：运行阶段才能明确变量类型
        * 变量类型可以随时改变
        * 动态类型语言中的变量没有类型，变量中存放的值是有类型的

* JavaScript 自有类型系统的问题
    * 没有编译环节
    * 弱类型/动态类型
    * 类型异常要等到程序运行才能发现
    * 类型不明确导致函数功能发生改变
    * 对对象索引器错误的用法 

* Flow 静态类型检查方案
    * 类型注解
    ```
    // @flow
    function sum (a: number, b: number){
        return a+b;
    }

    sum(100, 50);
    ```
    * 初始化项目 yarn init --yes
    * 安装依赖 yarn add flow-bin --dev
    * 初始化flow配置 yarn flow init
    * 运行 yarn run flow
    * 结束运行 yarn flow stop
    * 编译移除注释
        * flow-remove-types
            * 安装flow-remove-types工具 yarn add --dev flow-remove-types
            * 指定编译的文件目录 yarn run flow-remove-types src/ -- -d dist/
            * 或者添加到package.json中
            ```
            {
                "name": "my-project",
                "main": "lib/index.js",
                "scripts": {
                    "build": "flow-remove-types src/ -d dist/",
                    "prepublish": "yarn run build"
                }
            }
            ```
        * Babel
            * 安装Babel工具 yarn add --dev @babel/core @babel/cli @babel/preset-flow、
            * 在根目录中创建.babelrc文件，在文件中添加如下配置
            ```
            {
                "presets": ["@babel/preset-flow"]
            }
            ```
            * 指定编译的文件目录 yarn run babel src/ -- -d dist/
            * 或者添加到package.json中
            ```
            {
                "name": "my-project",
                "main": "lib/index.js",
                "scripts": {
                    "build": "babel src/ -d dist/",
                    "prepublish": "yarn run build"
                }
            }
            ```

    * 安装flow开发工具插件 Flow Language Support
        * 在编写过程就能看到报错的代码

    * 类型推断：根据代码的使用情况推断出变量类型，建议使用类型注解不要使用类型推断

    * 类型注解 :类型，如 :number
    ```
    // @flow

    function sum (a: number, b: number){ //用于标识形参类型
        return a + b;
    }

    sum(50, 120);

    let num: number = 100;  //用于标识变量类型

    function foo():string{  //用于标识函数返回值类型，没有返回值类型的用:void
        return 'lin';
    }

    ```

    * 原始类型
    ```
    let str: string = 'lin';    //字符串

    let nb: number = Infinity; // NaN  // 100  数字

    let b: boolean = false; //布尔值

    let n: null = null; //null

    let d: void = undefined; //undefined

    let s: symbol = Symbol(); //Symbol
    ```
    
    * 数组类型
    ```
    let arr1: Array<number> = [1, 2, 3];
    // 或者
    let arr2: number[] = [1, 2, 3];

    // 元组
    let arr3: [string, number] = ['lin', 3];
    ```

    * 对象类型
    ```
    // 指定键对应值的类型（必须包含foo、bar）
    const obj1: {foo: string, bar: number} ={foo: 'string', bar: 100};

    // 指定键对应值的类型（foo可选，必须包含bar）
    const obj2: {foo?: string, bar: number} ={bar: 100};

    // 指定键值类型，允许添加多个但必须和类型一致
    const obj3: {[string]: string} ={};
    obj3.key1 = 'v1';
    obj3.key2 = 'v2';
    ```

    * 函数类型
    ```
    function foo(callback:(string, number) => void) {
        callback('lin', 100);
    }

    foo(function(str, n){
        //  console.log(str, n)
    })
    ```

    * 特殊类型
    ```
    // 字面量
    let a1: 'foo' = 'foo';

    // 或类型
    let a2: string | number = 'foo';

    // 声明类型
    type strNum = string | number;
    let a3: type = 'foo';
    
    // maybe 不确定类型
    let a4?: number = 123;
    // 等价于
    let a5: number | null |void = 123;
    
    // mixed 接收任意类型（所有类型的联合类型），强类型
    function pMixed(value: mixed){
        if(typeof value === 'string'){
            value.substr(1);
        }
        if(typeof value === 'number'){
            value++;
        }
    }
    pMixed('lin');
    pMixed(100);

    // any 接收任意类型,弱类型
    function pAny(value: any){
        value.substr(1);
        value++;
    }
    pAny('lin');
    pAny(100);

    ```

* TypeScript 语言规范与基本应用

## 2.概述
* 功能更为强大，生态也更健全、更完善
* 缺点：
    * 语言本身多了很多概念
    * typescript属于渐进式
    * 项目初期，typescript会增加一些成本.

## 3.安装
* 初始化项目 yarn init --yes
* 安装到项目也可以全局安装 yarn add typescript --dev
* 运行.ts文件  yarn tsc .\src\index.ts
    * tsc作用：负责将ts代码转为浏览器和nodejs识别的就是代码
    * 文件后缀名：.ts
* 自动编译项目
    * 运行 yarn tsc --init 创建 tsconfig.json 文件
* 提示中文报错信息  yarn tsc --locale zh-CN

## 4.数据类型 非严格模式默认允许为空
```
/*  原始数据类型 */
let a: string = 'lin'; // 字符串

let b: number = 123; // 数值

let c: boolean = false; // 布尔

let d: void = undefined; // 空类型

let e: null = null; // null

let f: undefined = undefined; // undefined

let g: symbol = Symbol(); // symbol

/* 数组类型 */
let arr1: Array<string> = ['123', '456'];
let arr2: string[] = ['123', '456'];

/* 元组  */
// 一个规定了元素数量和每个元素类型的数组，而每个元素的类型可以不相同
// 声明时，要指定元素个数，要为每个元素规定类型
let tup:[string, number, boolean] = ['123', 456, false];

/* 枚举  */
// 枚举项：一般用英文和数字；
// 枚举值：用整型数字。
// 常量枚举不会在编译生成的文件中，在枚举声明关键字前面加一个const就可创建一个常量枚举
enum colors{
    red = 1,
    blue = 2,
    green = 3
}
let color:colors = colors.red;

/* 函数类型 */
function fun1(a: number, b: number = 11, ...rest: number[]): string{
    console.log(a, b, rest)
    return 'function1'
}
fun1(12,1,45,122,1);
// 函数表达式
const fun2: (a: number, b: number) => string = function (a: number, b: number): string{
    return 'function2'
}

/* 任意类型 */
// any代表任意类型，一般在获取dom时使用
let txtName:any = document.getElementById('txtN');
```

## 5.隐式类型推断
* 如果变量的声明和初始化是在同一行，可以省略掉变量类型的声明

## 6.类型断言 
* 仅代码编译的过程
```
let nums = [1, 2, 3,4];
const res = nums.find(i => i > 0 );
let num1 = res as number;
let num2 = <number>res; //JSX 下不能使用
```

## 7.接口 interface
* 约束对象的结构，一个对象实现一个接口必须要拥有接口中约束的所有成员
```
// 接口声明
interface Post{
    title: string,
    content: string,
    subTitle?: string,   //可选成员
    readonly summary: string,   //只读成员
}
// 定义一个实现接口的对象
function printPost(post: Post){
    console.log(post.title);
    console.log(post.content);
    console.log(post.summary);
}
// 调用
printPost({
    title: 'title string',
    content: 'content string',
    summary: 'summary string'
})

//动态成员接口
interface Cache {
    [prop: string]: string
}
const cache:Cache = {};
cache.foo = 'val1';
cache.bar = 'val2';
```

## 8.类 class
* 描述一类具体事物的抽象特征
```
class Person {
    public name: string;
    private age: number;    //访问修饰符 private私有的,只能在内部访问到
    protected gender: boolean;    //访问修饰符 protected受保护的,只能在内部和子类中访问到访问到
    protected readonly reade: string = "1234656";    //readonly 只读属性

    constructor(name: string, age: number){
        this.name = name;
        this.age = age;
    }

    sayHi(msg: string): void{
        console.log(`name: ${this.name}, age: ${this.age}, ${msg}`);
    }
}

class Student extends Person{
    constructor(name: string, age: number){
        super(name, age);
        console.log(this.gender);
    }
    static create(name: string, age: number){   //静态方法
        return new Student(name, age);
    }
}

const tom = new Person('TOM', 20);
tom.sayHi("hello ");
console.log(tom.name);

const jack = Student.create('jack', 10);

```

## 9.ts中接口interface与类class的区别
* interface 接口只声明成员方法，不做实现。
* class 类声明并实现方法。
```
// 吃 接口
interface Eat {
    eat(food: string): void;
}

// 跑 接口
interface Run {
    run(distance: number): void;
}

// 人类 实现吃、跑接口
class Person implements Eat, Run{
    eat(food: string): void{
        console.log(`人类吃：${food}`);
    }
    run(distance: number): void{
        console.log(`人类跑：${distance}`);
    }
}

// 动物类 实现吃、跑接口
class Animal implements Eat, Run{
    eat(food: string): void{
        console.log(`动物类吃：${food}`);
    }
    run(distance: number): void{
        console.log(`动物类跑：${distance}`);
    }
}
```

## 10.抽象类
* abstract 修饰，里面可以没有抽象方法。
* 抽象方法(abstract method)的类必须声明为抽象类(abstract class)
```
abstract class Animal{
    public name:string;
    constructor(name:string){
        this.name=name;
    }
 
    //抽象方法 ，不包含具体实现，要求子类中必须实现此方法
    abstract eat():any;
 
    //非抽象方法，无需要求子类实现、重写
    run(){
        console.log('非抽象方法，不要子类实现、重写');
    }
}
 
class  Dog extends Animal{
 
    //子类中必须实现父类抽象方法，否则ts编译报错
    eat(){
       return this.name+"吃肉";
    }
}
```

## 11.泛型
* 就是把我们定义时不能够明确的类型变成一个参数，在使用的时候再去传递这样的一个类型参数。
```
// 利用泛型定义一个可以创建多种类型的数组
function createArray<T>(length: number, value: T): T[]{
    const arr =Array<T>(length).fill(value);
    return arr;
}

let arr = createArray<string>(5, '123');
```

## 12.类型声明
* 在定义的时候因为各种原因，没有一个明确的类型，在使用的时候们可以单独为它再做出一个明确的声明
* 使用declare关键字声明