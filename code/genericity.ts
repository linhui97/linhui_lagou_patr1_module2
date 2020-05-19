// 泛型

export {}   //确保跟其他实例没有成员冲突

// 利用泛型定义一个可以创建多种类型的数组
function createArray<T>(length: number, value: T): T[]{
    const arr =Array<T>(length).fill(value);
    return arr;
}

let arr = createArray<string>(5, '123');