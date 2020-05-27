// maybe函子
class MayBe{
    static of(value){
        return new MayBe(value);
    }

    constructor(value){
        this._value = value;
    }

    map(fn){
        return this.isNothing() ? MayBe.of(null) : MayBe.of(fn(this._value));
    }
    // 判断传递的参数是否为空
    isNothing(){
        return this._value === null || this._value === undefined;
    }
}
let r1 = MayBe.of(20).map(x => x-2).map(x => x % 2);
let r2 = MayBe.of(null).map(x => x-2).map(x => x % 2);
let r3 = MayBe.of(20).map(x => null).map(x => x % 2);
console.log(r1);
console.log(r2);
console.log(r3);
