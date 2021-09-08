/**
 * Pick：从 T 中取出 一系列 K 的属性
 */

interface pFoo {
    name: string
    age: string
}
const pFoo: Pick<pFoo, 'name'> = {
    name: 'luren',
}

// type Pick<T, K extends keyof T> = { [P in K]: T[P] };