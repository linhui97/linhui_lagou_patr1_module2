// TypeScript

export {}
const hello = (name: any) => {
    console.log(`hello, ${name}`);
}
hello('TypeScript');

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

const fun2: (a: number, b: number) => string = function (a: number, b: number): string{
    return 'function2'
}


/* 任意类型 */
// any代表任意类型，一般在获取dom时使用
let txtName:any = document.getElementById('txtN');

/* 类型断言 代码编译的过程 */
let nums = [1, 2, 3,4];
const res = nums.find(i => i > 0 );
let num1 = res as number;
let num2 = <number>res; //JSX 下不能使用
