/* 
 * DOM封装
 * 对象风格
 * 命名空间风格
 * 提供 window.dom 作为全局对象
 */

window.dom = {
    /* 增 */
    // 创建节点
    create(string) {
        const container = document.createElement("template");
        container.innerHTML = string.trim();
        return container.content.firstChild;
    },
    // 新增下一个节点
    after(node, node2) {
        node.parentNode.insertBefore(node2, node.nextSibling)
    },
    // 新增上一个节点
    before(node, node2) {
        node.parentNode.insertBefore(node2, node)
    },
    // 新增子节点
    append(parent, node) {
        parent.appendChild(node)
    },
    // 新增 parent 节点
    wrap(node, parent) {
        dom.before(node, parent)
        dom.append(parent, node)
    },
    /* 增 */

    /* 删 */
    // 删除节点
    remove(node) {
        node.parentNode.removeChild(node)
        return node
    },
    // 删除子节点
    empty(node) {
        const {
            childNodes
        } = node
        const array = []
        while (childNodes.length) {
            dom.remove(childNodes[i])
            array.push(childNodes[i])
        }
        return array
    },
    /* 删 */

    /* 改 */
    // 修改和查询属性
    attr(node, name, value) {
        // 重载
        if (arguments.length === 3) {
            node.setAttribute(name, value)
        } else if (arguments.length === 2) {
            return node.getAttribute(name)
        }
    },
    // 修改和查询文本
    text(node, string) {
        if (arguments.length === 2) {
            // 适配
            'innerText' in node ?
                node.innerText = string : // ie
                node.textContent = string // Firefox / chrome
        } else if (arguments.length === 1) {
            return 'innerText' in node ? node.innerText : node.textContent
        }
    },
    // 修改和查询 html
    html(node, string) {
        if (arguments.length === 2) {
            node.innerHTML = string
        } else if (arguments.length === 1) {
            return node.innerHTML
        }
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
    // 类
    class: {
        // 添加
        add(node, className) {
            node.classList.add(className)
        },
        // 移除
        remove(node, className) {
            node.classList.remove(className)
        },
        // 查询
        has(node, className) {
            return node.classList.contains(className)
        }
    },
    // 事件处理
    on(node, eventName, fn) {
        node.addEventListener(eventName, fn)
    },
    off(node, eventName, fn) {
        node.removeEventListener(eventName, fn)
    },
    /* 改 */

    /* 查 */
    // 查找节点
    find(selector, scope) {
        return (scope || document).querySelectorAll(selector)
    },
    // 查找parent节点
    parent(node) {
        return node.parentNode
    },
    // 查找子节点
    children(node) {
        return node.children
    },
    // 查找姐妹节点
    siblings(node) {
        return Array.from(node.parent.children).filter(n => n !== node)
    },
    // 查找后一个节点
    next(node) {
        return node.nextElementSibling
    },
    // 查找前一个节点
    previous(node) {
        return node.previousSibling
    },
    // 遍历
    each(nodeList, fn) {
        for (let i = 0; i < nodeList.length; i++) {
            fn.call(null, nodeList[i])
        }
    },
    // 查询节点位置
    index(node) {
        const list = dom.children(node.parentNode)
        let i
        for (i = 0; i < list.length; i++) {
            if (list[i] === node) {
                break
            }
        }
        return i
    }
    /* 查 */
}