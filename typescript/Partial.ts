
/**
 * Partial: 作用是将传入的属性变为可选项.
 */

interface Foo {
    name: string,
    age: string
}
const aFoo: Partial<Foo> = {
    name: 'luren',
}

// 相当于将Foo ===> { name?: string, age?: string }

//实现：type Partial<T> = { [P in keyof T]?: T[P] }
