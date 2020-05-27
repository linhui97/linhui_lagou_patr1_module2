// lodash
const _ = require('lodash');
const arr = ['lin', 'jack', 'tom', 'pink'];

// 获取第一数据
console.log(_.first(arr));
// 获取最后一个数据
console.log(_.last(arr));
// 将获取到数据字母全部转换成大写
console.log(_.toUpper(_.last(arr)));
// 数组倒序
console.log(_.reverse(arr));
// 遍历数组
const r = _.each(arr, (item, index) => {
    console.log(item, index);
})
console.log(r);