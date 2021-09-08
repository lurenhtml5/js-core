// 根据源码我们推断出 Extract 的作用是提取出 T 包含在 U 中的元素, 换种更加贴近语义的说法就是从 T 中提取出 U，和Exclude相反


type TE = Extract<1 | 2, 1 | 3> // ---> 1在1｜3中

const extract: TE = 1 // 1