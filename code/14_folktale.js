// folktale 中的 compose、curry
const {compose, curry} = require('folktale/core/lambda');
const {toUpper, first} = require('lodash/fp');

let f = curry(2, (x, y) => {
    return x * y;
})
console.log(f(3, 5));
console.log(f(3)(5));

let f2 = compose(toUpper, first);
console.log(f2(["lin", "make"]));