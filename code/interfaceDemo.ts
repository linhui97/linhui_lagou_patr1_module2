// 接口 约束对象的结构，一个对象实现一个接口必须要拥有接口中约束的所有成员

export {}   //确保跟其他实例没有成员冲突
// 接口声明
interface Post{
    title: string,
    content: string,
    subTitle?: string,   //可选成员
    readonly summary: string,   //只读成员
}
// 定义一个实现接口的对象
function printPost(post: Post){
    console.log(post.title);
    console.log(post.content);
    console.log(post.summary);
}
// 调用
printPost({
    title: 'title string',
    content: 'content string',
    summary: 'summary string'
})

//动态成员接口
interface Cache {
    [prop: string]: string
}
const cache:Cache = {};
cache.foo = 'val1';
cache.bar = 'val2';