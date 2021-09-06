/**
 * 迭代器模式：提供一种方法顺序一个聚合对象中各个元素，而又不暴露该对象的内部表示
 */

class Iterator {
    constructor(container) {
        this.list = container.list
        this.index = 0
    }

    next() {
        if (this.hasNext()) {
            return this.list[this.index++]
        }
        return null
    }

    hasNext() {
        if (this.index >= this.list.length) {
            return false
        }
        return true
    }
}


class Container {

    constructor(list) {
        this.list = list
    }

    getIterator () {
        return new Iterator(this)
    }
}

const container = new Container([1, 2, 3, 4, 5])
const it = container.getIterator()

while (it.hasNext()) {
    console.log(it.next(), '1122')
}
// 访问一个聚合对象的内容而无需暴露它的内部表示。
// 为遍历不同的集合结构提供一个统一的接口，从而支持同样的算法在不同的集合结构上进行操作