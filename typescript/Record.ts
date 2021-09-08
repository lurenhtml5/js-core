/**
 * Record: 将 K 中所有的属性的值转化为 T 类型
 */
interface dFoo {
    name?: string
    age?: string
}
const dFoo: Record<'name' | 'age', number> = {
    name: 20,
    age: 30
}
// type Record<K extends keyof any, T> = { [P in K]: T };