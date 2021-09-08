// 在阅读源码之前我们需要了解一下 infer 这个关键字, 在条件类型语句中, 我们可以用 infer 声明一个类型变量并且对它进行使用

// type ReturnType<T> = T extends (
//     ...args: any[]
//   ) => infer R
//     ? R
//     : any;

function foo(x: number): Array<number> {
    return [x];
}
type fn = ReturnType<typeof foo>;