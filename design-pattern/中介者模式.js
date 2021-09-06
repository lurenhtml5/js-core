/**
 * 中介者模式：解除对象与对象之间的紧耦合关系。增加一个中介者对象后，所有的 相关对象都通过中介者对象来通信，而不是互相引用，所以当一个对象发生改变时，只需要通知 中介者对象即可。中介者使各对象之间耦合松散，而且可以独立地改变它们之间的交互。中介者
            模式使网状的多对多关系变成了相对简单的一对多关系（类似于观察者模式，但是单向的，由中介者统一管理。）
 */



class A {
    
    constructor(number) {
        this.number = number
    }

    setNumber (number, m) {
        this.number = number
        if (m) {
            m.setB()
        }
    }
}

class B {
    
    constructor(number) {
        this.number = number
    }

    setNumber(number, m) {
        this.number = number
        if (m) {
            m.setA()
        }
    }
}

class Mediator {
    constructor (a, b) {
        this.a = a
        this.b = b
    }

    setB() {
        const number = this.b.number
        this.b.setNumber(number / 10)
    }

    setA() {
        const number = this.a.number
        this.a.setNumber(number / 10)
    }
}

const aa = new A(10)
const bb = new B(20)

const m = new Mediator(a, b)

aa.setNumber(30, bb)



