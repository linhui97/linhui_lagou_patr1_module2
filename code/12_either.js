// either函子 
class Left{
    static of(value){
        return new Left(value);
    }

    constructor(value){
        this._value = value;
    }

    map(fn){
        return this;
    }
    
}

class Right{
    static of(value){
        return new Right(value);
    }

    constructor(value){
        this._value = value;
    }

    map(fn){
        return Right.of(fn(this._value));
    }
    
}

function parseJSON(str){
    try{
        return Right.of(JSON.parse(str));
    } catch(e){
        return Left.of({error: e.message});
    }
}

// 错误的输入
let r1 = parseJSON('{name: "lin"}');
console.log(r1);

// 正确的输入
let r2 = parseJSON('{"name": "lin"}').map(x => x.name.toUpperCase());
console.log(r2);

