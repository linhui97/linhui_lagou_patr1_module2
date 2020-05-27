// 函数组合示例
function compose(f, g){
    return function(value){
        return f(g(value));
    }
}

// 对数组进行反转
function reverse(arr){
    return arr.reverse();
}

// 获取数组第一个数据
function first(arr){
    return arr[0];
}

const last = compose(first, reverse);
// 获取数组最后一个数据
console.log(last([1, 5, 3, 4, 9, 2]));