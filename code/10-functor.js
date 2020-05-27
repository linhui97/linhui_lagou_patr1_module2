// functor
class Container{
    constructor(value){
        this._value = value;
    }

    map(fn){
        return new Container(fn(this._value));
    }
}
let r = new Container(10).map(x => x-1).map(x => x % 2);
console.log(r);

// 优化
class Container2{
    // 静态创建方法
    static of(value){
        return new Container2(value);
    }
    // 构造方法
    constructor(value){
        this._value = value;
    }
    // map方法
    map(fn){
        return Container2.of(fn(this._value));
    }
}
let r2 = Container2.of(10).map(x => x-2).map(x => x % 2);
console.log(r2);
