/**
 * Omit: 用之前的 Pick 和 Exclude 进行组合, 实现忽略对象某些属性功能
 */
// type Omit<T, K> = Pick<T, Exclude<keyof T, K>>

type OFoo = Omit<{name: string, age: number}, 'name'> // -> { age: number }