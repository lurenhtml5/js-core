
/**
 * Mutable: 作用就是将 T 的所有属性的 readonly 移除,你也可以写一个相反的出来.
 */

type Mutable<T> = {
    -readonly [P in keyof T]: T[P]
}
interface cFoo {
    readonly name: string,
    readonly age: string
}
const cFoo: Mutable<cFoo> = {
    name: 'luren',
    age: '30'
}
cFoo.age = '29' // 不报错
 