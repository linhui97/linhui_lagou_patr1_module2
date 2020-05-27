// 组合函数 调试
// 案例：NEVER SAY NEVER --> never-say-never

const _ = require('lodash');
// 引入 lodash 的 fp 模块，返回的都是已经被柯里化的函数
const fp = require('lodash/fp');

// 模拟 log 方法
const log = v => {
    console.log(v);
    return v;
}
// 升级版log
const trace = _.curry((tag, v) => {
    console.log(tag, v);
    return v;
});

// _.split() 将字符串按照特定格式分割成数组
const split = _.curry((sep, str) => _.split(str, sep));

// _.join() 将数组转化成特定格式字符串
const join = _.curry((sep, arr) => _.join(arr, sep));

// map 处理数组返回特定格式
const map = _.curry((fn, arr) => _.map(arr, fn));

const f = _.flowRight(trace('join之后：'), join('-'), trace('map之后：'), map(_.toLower), trace('split之后：'), split(' '));
console.log(f('NEVER SAY NEVER'));

// 用 lodash 的 fp 模块实现

const f2 = fp.flowRight(trace('fp 模块join之后：'), fp.join('-'), fp.map(_.toLower), fp.split(' '));
console.log(f2('NEVER SAY NEVER'));