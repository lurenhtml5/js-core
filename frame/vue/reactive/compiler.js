class Compiler {
    // vm --> vue实例
    constructor(vm) {
        this.vm = vm
        this.el = vm.$el
        this.compile(this.el)
    }

    // 编译模版
    compile(el) {
        const childNodes = [...el.childNodes]
        childNodes.forEach(node => {
            if (this.isTextNode(node)) {
                // 文本节点
                this.compileText(node)
            } else if (this.isElementNode(node)) {
                // 元素节点
                this.compileElement(node)
            }
            // 判断是否还存在子节点递归
            if (node.childNodes && node.childNodes.length) {
                this.compile(node)
            }
        })
    }

    // 编译文本节点
    compileText(node) {
        const reg = /\{\{(.+?)\}\}/
        const val = node.textContent
        // 判断是否有{{}}
        if (reg.test(val)) {
            // 捕获到{{a}} ---> a
            const key = RegExp.$1.trim()
            node.textContent = val.replace(reg, this.vm[key])
            // 创建观察者
            new Watcher(this.vm, key, (newValue) => {
                node.textContent = newValue
            })
        }
    }

    // 编译元素节点
    compileElement(node) {
        ![...node.attributes].forEach(attr => {
            let attrName = attr.name
            // 判断是否是v-开头
            if (this.isDirective(attrName)) {
                // v-name ---> name
                attrName = attrName.substr(2)
                // v-name = "luren" ---> 'luren'
                const key = attr.value
                this.update(node, key, attrName)
            }
        })
    }
    
    // 添加指令方法 执行
    update(node, key, attrName) {
        const updateFn = this[attrName + 'Updater']
        updateFn && updateFn.call(this, node, key, this.vm[key])
    }

    textUpdater(node, key, value) {
        node.textContent = value
        // 初始化观察者，从this.vm[key]中取出旧值，在update的时候对比；同时，将观察者push进发布者
        new Watcher(this.vm, key, (newValue) => { 
            node.textContent = newValue
        })
    }

    modelUpdater(node, key, value) {
        node.value = value
        new Watcher(this.vm, key, (newValue) => {
            node.value = newValue
        })
        node.addEventListener('input', (e) => {
            this.vm[key] = node.value
        })
    }
   
    // 判断元素是不是vue指令
    isDirective(attr) {
        return attr.startsWith('v-')
    }
    // 判断是否是 文本 节点
    isTextNode(node) {
        return node.nodeType === 3
    }
     // 判断是否是元素节点
     isElementNode(node) {
        return node.nodeType === 1
    }
}