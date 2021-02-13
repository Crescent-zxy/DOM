/*
 * jQuery
 * 链式风格
 * jQuery(选择器)获取对应元素，返回一个对象
 * jQuery构造出来的对象，可以操作对应的元素
 * -------
 * jQuery是一个不需要加 new 的构造函数，不是常规构造函数 
 */

window.$ = window.jQuery = function (selectorOrArray) {
    let elements
    if (typeof selectorOrArray === 'string') {
        elements = document.querySelectorAll(selectorOrArray)
    } else if (selectorOrArray instanceof Array) {
        elements = selectorOrArray
    }
    // api 可以操作elements
    const api = Object.create(jQuery.prototype)
    // 创建一个对象，这个对象的__proto__为 jQuery.prototype
    // const api = {__proto__: jQuery.prototype}
    Object.assign(api, {
        elements: elements,
        oldApi: selectorOrArray.oldApi
    })
    return api
}

jQuery.prototype = {
    constructor: jQuery,
    // 闭包，函数访问外部变量
    addClass(className) {
        for (let i = 0; i < this.elements.length; i++) {
            this.elements[i].classList.add(className)
        }
        return this
    },
    find(selector) {
        let array = []
        for (let i = 0; i < this.elements.length; i++) {
            const elements2 = Array.from(this.elements[i].querySelectorAll(selector))
            array = array.concat(elements2)
        }
        array.oldApi = this // this 是旧 Api
        return jQuery(array)
    },
    each() {
        for (let i = 0; i < this.elements.length; i++) {
            fn.call(null, this.elements[i], i)
        }
        return this
    },
    parent() {
        const array = []
        this.each(node => {
            if (array.indexOf(node.parentNode === -1)) {
                array.push(node.parentNode)
            }
        })
        return jQuery(array)
    },
    children() {
        const array = []
        this.each(node => {
            array.push(...node.children)
        })
    },
    print() {
        console.log(this.elements)
    },
    end() {
        return this.oldApi
    },
}