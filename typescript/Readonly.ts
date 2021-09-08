
/**
 * Readonly: 将传入的属性变为只读选项
 */
interface rFoo {
    name: string,
    age: string
}
const rFoo: Readonly<rFoo> = {
    name: 'luren',
    age: '30'
}
rFoo.age = '29' // 报错

// type Readonly<T> = { readonly [P in keyof T]: T[P] };