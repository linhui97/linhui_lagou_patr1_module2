// 类 class

export {}   //确保跟其他实例没有成员冲突

class Person {
    public name: string;
    private age: number;    //访问修饰符 private私有的,只能在内部访问到
    protected gender: boolean;    //访问修饰符 protected受保护的,只能在内部和子类中访问到访问到
    protected readonly reade: string = "1234656";    //readonly 只读属性

    constructor(name: string, age: number){
        this.name = name;
        this.age = age;
    }

    sayHi(msg: string): void{
        console.log(`name: ${this.name}, age: ${this.age}, ${msg}`);
    }
}

class Student extends Person{
    constructor(name: string, age: number){
        super(name, age);
        console.log(this.gender);
    }
    static create(name: string, age: number){   //静态方法
        return new Student(name, age);
    }
}

const tom = new Person('TOM', 20);
tom.sayHi("hello ");
console.log(tom.name);

const jack = Student.create('jack', 10);