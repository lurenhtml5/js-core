// 在 ts 2.8 中引入了一个条件类型, 示例如下

// T extends U ? X : Y

// 以上语句的意思就是 如果 T 是 U 的子类型的话，那么就会返回 X，否则返回 Y

// type TypeName<T> =
//     T extends string ? "string" :
//     T extends number ? "number" :
//     T extends boolean ? "boolean" :
//     T extends undefined ? "undefined" :
//     T extends Function ? "function" :
//     "object";

// 对于联合类型来说会自动分发条件，例如 T extends U ? X : Y, T 可能是 A | B 的联合类型, 那实际情况就变成(A extends U ? X : Y) | (B extends U ? X : Y)

// type Exclude<T, U> = T extends U ? never : T;  提取T不在U中的类型

type T = Exclude<1 | 2, 1 | 3> // ---> 2不在1｜3中

const exclude: T = 2 // 2