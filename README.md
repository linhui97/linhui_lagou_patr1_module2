# 一、简答题
## 1.描述引用计数器的工作原理和优缺点。
* 核心思想：设置引用数，判断当前引用数是否为0
* 引用关系改变时修改引用数字
* 引用数字为0时立即回收
* 优点：
    * 发现垃圾时立即回收
    * 最大限度减少程序暂停
* 缺点：
    * 无法回收循环引用的对象
    * 资源消耗大、时间开销大

## 2.描述标记整理算法的工作流程
* 标记整理可以看做是标记清除的增强
* 标记阶段遍历所有对象找标记活动对象，遍历所有对象清除没有标记对象
* 清除阶段会先执行整理，移动对象位置

## 3.描述V8中新生代存储区垃圾回收流程
* 回收过程采用复制算法 + 标记整理
* 新生代内存区分为两个等大小空间
* 使用空间为from，空闲空间为to
* 活动对象存储于from空间
* 标记整理后将活动对象拷贝至to
    * 拷贝过程中可能出现晋升
    * 晋升就是讲新生代对象移动至老生代
    * 一轮GC还存活的新生代需要晋升
    * to空间的使用率不能超过25%
* from与to交换空间完成释放
    * 使用空间换时间

## 4.描述增量标记算法在何时使用，及工作原理。
* 使用：在程序运行过程中穿插进行，逐步完成垃圾回收， 极大地降低了GC的最大暂停时间.
* 工作原理：具体分为标记阶段和清除阶段
    * 结合一小段代码来看
    ```
    var a = A; // 标记 A
    var b = C; // 标记C
    b = B;     // 标记B，这是C成为了漂浮垃圾，也就是不被任何对象引用
    gc();      // 这里会释放C
    
    // 这里总共引用了三个对象A,B,C
    // 可以看出执行gc的时候C已经成为了垃圾对象
    ```

    * a：标记A,B,C
    * b：标记root及其可访问的对象 (这时候A,B,C对象都已经被标记了，root下面没有其他对象)
    * c：标记A、B、C，U长度为0，第一轮GC完成！
    * d：标记所有对象为0，第二轮GC开始
    * e：标记Root，这时root可达的只有A、B，所以将A、B放入U，C不变
    * f：标记A、B，U长度为0，C标记为0，可被垃圾回收器发现并回收！


# 二、代码题1
## 基于以下代码完成下面的四个练习
```
const fp = require('lodash/fp');

// 数据
const cars = [
    {name: '1 A', horsepower: 1660, dollar_value: 1, in_stock: true},
    {name: '2 B', horsepower: 2660, dollar_value: 2, in_stock: false},
    {name: '3 C', horsepower: 3660, dollar_value: 3, in_stock: true},
    {name: '4 D', horsepower: 4660, dollar_value: 4, in_stock: false},
    {name: '5 E', horsepower: 5660, dollar_value: 5, in_stock: true}
];

```

## 练习1：：使用组合函数 fp.flowRight() 重新实现下面这个函数
```
let isLastInStock = function(cars){
    // 获取最后一条数据
    let last_car = fp.last(cars);
    // 获取最后一条数据的 in_stock 属性值
    return fp.prop('in_stock', last_car);
}
console.log(isLastInStock(cars));


// 用 fp.flowRight() 实现
let isLastInStock2 = fp.flowRight(fp.prop('in_stock'), fp.last);
console.log(isLastInStock2(cars));

```

## 练习二：使用 fp.flowRight()、fp.prop() 和 fp.first() 获取第一 car 的 name
```
let isFirstName = fp.flowRight(fp.prop('name'), fp.first);
console.log(isFirstName(cars));
```

## 练习三：使用帮助函数 _average 重构 averageDollarValue，使用函数组合的方式实现
```
// 无需改动
let _average = function(xs){
    return fp.reduce(fp.add, 0, xs) / xs.length
}

let averageDollarValue = function(cars){
    let dollar_value = fp.map(function(car){
        return car.dollar_value
    }, cars)
    return _average(dollar_value);
}
console.log(averageDollarValue(cars));

// 优化
let dollar_value = fp.map((car) => car.dollar_value);
let averageDollarValue2 = fp.flowRight(_average, dollar_value);
console.log(averageDollarValue2(cars));

```

## 练习4：使用 flowRight 写一个 sanitizeNames()函数，返回一个下划线链接的小写字符串，把数组中的name转换为这种形式：例如sanitizeNames(["Hello Workd"]) => ["hello_workd"]
```
// 无需改动
let _underscore = fp.replace(/\W+/g, '_');

// 实现
let carName = fp.map((car) => fp.toLower(car.name));
let sanitizeNames = fp.flowRight(_underscore, carName);
console.log(sanitizeNames(cars));
```

# 代码题2
## 基于以下代码完成下面的四个练习
```
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

```

## 练习一：使用fp.add(x, y)和fp.map(f, x)创建一个能让functor里的值增加的函数ex1
```
let maybe = MayBe.of([5, 6, 1]);

// 实现
function add(n) {
    return fp.add(n, n);
  }
let ex1 = maybe.map(x => fp.map(add, x));
console.log(ex1);   // MayBe { _value: [ 10, 12, 2 ] }

```

## 练习二：实现一个函数ex2，能够使用fp.first获取列表的第一个元素
```
let xs = Container.of(['do', 'rad', 'me', 'fa', 'so', 'la', 'ti', 'do']);

// 实现
let ex2 = xs.map(x => fp.first(x));
console.log(xs);
console.log(ex2);

```

## 练习3：实现一个函数ex3，使用safeProp和fp.first找到user的名字的首字母
```
let safeProp = fp.curry(function(x, o){
    return MayBe.of(o[x])
})
let user = {id: 2, name: 'Albert'};

// 实现
let ex3 = fp.first(safeProp('name', user)._value);
console.log(ex3);
```

## 练习4：使用Maybe重新ex4，不要有if语句
```
let ex4 = function(n){
    if(n){
        return parseInt(n)
    }
}
console.log(ex4(null));

// 重写
ex4 = MayBe.of(null).map(x => parseInt(x));
console.log(ex4._value);

```