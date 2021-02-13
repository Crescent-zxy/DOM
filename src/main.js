window.dom = {
    // 查找节点
    find(selector, scope) {
        return (scope || document).querySelectorAll(selector)
    },
    // 修改和查询样式
    style(node, name, value) {
        if (arguments.length === 3) {
            node.style[name] = value
        } else if (arguments.length === 2) {
            if (typeof name === 'string') {
                return node.style[name]
            } else if (name instanceof Object) {
                for (let key in name) {
                    node.style[key] = name[key]
                }
            }
        }
    },
    // 遍历
    each(nodeList, fn) {
        for (let i = 0; i < nodeList.length; i++) {
            fn.call(null, nodeList[i])
        }
    }
}