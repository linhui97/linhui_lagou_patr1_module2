// 类和接口

export {}   //确保跟其他实例没有成员冲突

// 吃 接口
interface Eat {
    eat(food: string): void;
}

// 跑 接口
interface Run {
    run(distance: number): void;
}

// 人类 实现吃、跑接口
class Person implements Eat, Run{
    eat(food: string): void{
        console.log(`人类吃：${food}`);
    }
    run(distance: number): void{
        console.log(`人类跑：${distance}`);
    }
}

// 动物类 实现吃、跑接口
class Animal implements Eat, Run{
    eat(food: string): void{
        console.log(`动物类吃：${food}`);
    }
    run(distance: number): void{
        console.log(`动物类跑：${distance}`);
    }
}