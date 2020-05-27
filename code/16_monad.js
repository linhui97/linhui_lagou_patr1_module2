// monad 函子
const fs = require('fs');
const fp = require('lodash/fp');
const {split, find} = require('lodash/fp');

class IO{
    static of(value){
        return new IO(function(){
            return value;
        });
    }

    constructor(fn){
        this._value = fn;
    }

    map(fn){
        // 把当前的 value 和传入的 fn 组合成一个新的函数
        return new IO(fp.flowRight(fn, this._value));
    }

    join(){
        return this._value();
    }

    flatMap(fn){
        return this.map(fn).join();
    }
    
}

let readFile = function(fileName){
    return new IO(function(){
        return fs.readFileSync(fileName, 'utf-8');
    });
}

let print = function(x){
    return new IO(function(){
        console.log(x);
        return x;
    })
}

let cat = fp.flowRight(print, readFile);
let r = cat('package.json')._value()._value();
console.log(r);

// 优化后调用
let r2 = readFile('package.json')
            .map(split('\n'))
            .map(find(x => x.includes('version')))
            .flatMap(print)
            .join();
console.log(r2);


