class Container {
    static of(value){
        return new Container(value);
    }

    constructor(value){
        this._value = value;
    }
    map(fn){
        return Container.of(fn(this._value));
    }
}

class MayBe{
    static of(x){
        return new MayBe(x);
    }
    constructor(x){
        this._value = x;
    }

    map(fn){
        return this.isNothing() ? this : MayBe.of(fn(this._value));
    }
    // 判断传递的参数是否为空
    isNothing(){
        return this._value === null || this._value === undefined;
    }
}

const fp = require('lodash/fp');

// 练习一：使用fp.add(x, y)和fp.map(f, x)创建一个能让functor里的值增加的函数ex1
// function add(n) {
//     return fp.add(n, n);
//   }
// let maybe = MayBe.of([5, 6, 1]);
// console.log(maybe);
// let ex1 = maybe.map(x => fp.map(add, x));
// console.log(ex1);


// 练习二：实现一个函数ex2，能够使用fp.first获取列表的第一个元素
// let xs = Container.of(['do', 'rad', 'me', 'fa', 'so', 'la', 'ti', 'do']);

// // 实现
// let ex2 = xs.map(x => fp.first(x));
// console.log(xs);
// console.log(ex2);


// 练习3：实现一个函数ex3，使用safeProp和fp.first找到user的名字的首字母
// let safeProp = fp.curry(function(x, o){
//     return MayBe.of(o[x])
// })
// let user = {id: 2, name: 'Albert'};
// // 实现
// let ex3 = fp.first(safeProp('name', user)._value);
// console.log(ex3);


// 练习4：使用Maybe重新ex4，不要有if语句
let ex4 = function(n){
    if(n){
        return parseInt(n)
    }
}
console.log(ex4(null));

// 重写
ex4 = MayBe.of(null).map(x => parseInt(x));
console.log(ex4._value);