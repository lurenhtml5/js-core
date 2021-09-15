class Person {
    @logProperty
    public name: string
    public surname: string
    constructor(name: string, surname: string) {
        this.name = name
        this.surname = surname
    }
}

function logProperty(target: any, key: string) {
    let _val = this[key]
    const getter = function () {
        return _val
    }
    const setter = function (newVal) {
        _val = newVal
    }
    if (delete this[key]) {
        Object.defineProperty(target, key, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true
        })
    }
}

const p = new Person('luren', 'haha')
delete p.name