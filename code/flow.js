// @flow

function sum (a: number, b: number){ //用于标识形参类型
    return a + b;
}

sum(50, 120);

let num: number = 100;  //用于标识变量类型

function foo():string{  //用于标识函数返回值类型，没有返回值类型的用:void
    return 'lin';
}

//原始类型
let str: string = 'lin';    //字符串

let nb: number = Infinity; // NaN  // 100  数字

let b: boolean = false; //布尔值

let n: null = null; //null

let d: void = undefined; //undefined

let s: symbol = Symbol(); //Symbol

//数组类型
let arr1: Array<number> = [1, 2, 3];
// 或者
let arr2: number[] = [1, 2, 3];

// 元组
let arr3: [string, number] = ['lin', 3];

// 对象类型
// 指定键对应值的类型（必须包含foo、bar）
const obj1: {foo: string, bar: number} ={foo: 'string', bar: 100};

// 指定键对应值的类型（foo可选，必须包含bar）
const obj2: {foo?: string, bar: number} ={bar: 100};

// 指定键值类型，允许添加多个但必须和类型一致
const obj3: {[string]: string} ={};
obj3.key1 = 'v1';
obj3.key2 = 'v2';


//函数类型
 function foo(callback:(string, number) => void) {
     callback('lin', 100);
 }

//  foo(function(str, n){
    //  console.log(str, n)
//  })

//特殊类型
// 字面量
let a1: 'foo' = 'foo';

// 或类型
let a2: string | number = 'foo';

// 声明类型
type strNum = string | number;
let a3: strNum = 'foo';

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
