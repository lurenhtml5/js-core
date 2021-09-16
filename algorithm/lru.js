// 定义节点类
class Node {
    constructor(pre, next, value, key) {
        this.pre = pre
        this.next = next
        this.value = value
        this.key = key
    }
}

// 定义双向链表
class DoubleList {
    constructor(head, tail) {
        this.head = head
        this.tail = tail
    }
}

class LRUCache {
    constructor(max) {
        this.max = max
        this.map = new Map()
        let node = new Node(null, null, null, null)
        this.doubleList = new DoubleList(node, node)
    }

    get(key) {
        let node = this.map.get(key)
        if (!node) {
            return -1
        } else {
            // 将节点移动到尾巴，设置当前node为最活跃的node
            this.moveNode2Tail(key, node)
            return node.value
        }
    }
    /**
     * 插入缓存
     * 1.不存在对应的key，加到尾巴
     * 2.存在对应的key,更新对应的key,并放到末尾
     * 3.超出容量，去掉头部数据
     * @param {*} key 
     * @param {*} value 
     */
    put(key, value) {
        const node = this.map.get(key)
        if (node) {
            // 更新
            if (!node.next) {
                // 已经在末尾了
                return node.value = value
            }
            // 不在末尾, 先删除当前node
            deleteCurNode(node)
        }
        // 将node放到末尾
        let newNode = new Node(null, null, value, key)
        newNode.pre = this.doubleList.tail
        this.doubleList.tail.next = newNode
        this.doubleList.tail = newNode
        this.map.set(key, newNode)
        // 数量溢出，去掉头部数据
        if (this.map.size > this.max) {
            // 初始的头部和尾部数据都是无效的null，所以去掉doubleList.head.next
            this.map.delete(this.doubleList.head.next.key)
            this.doubleList.head.next = this.doubleList.head.next.next
            thi.doubleList.head.next.pre = thi.doubleList.head
        }
    }   
    deleteCurNode(node) {
        node.pre.next = node.next
        node.next.pre = node.pre
    }

    
    // 将节点移到末尾
    moveNode2Tail(key, node) {
        if (!node.next) {
            // 证明当前node已经在末尾
            return 
        }
        // 删除当前node
        this.deleteCurNode(node)
        this.map.delete(key)
        // 新增node，放到末尾
        const newNode = new Node(null, null, node.value, key)
        newNode.pre = this.doubleList.tail
        this.doubleList.tail.next = newNode
        this.doubleList.tail = newNode
        this.map.set(key, newNode)
    }
}

const lru = new LRUCache(5)

lru.put('luren', 'luren')
lru.put('yangqi', 'yangqi')
lru.put('jiawei', 'jiawei')

console.log(lru.get('luren'), lru, 'lru')