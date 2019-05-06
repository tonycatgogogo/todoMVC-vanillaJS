/**
 * 封装dom查询元素
 * @param selector 选择器
 * @param scope 可以自定义dom对象 默认为document
 */

export function qs(selector, scope) {
    return (scope || document).querySelector(selector)
}

/**
 * 封装事件监听函数
 * @param target
 * @param type
 * @param callback
 */
export function $on(target, type ,callback) {
    target.addEventListener(type,callback)
}

export function $delegate(target, selector, type, handler) {
    const dispatchEvent = event => {
        const targetElement = event.target
        const potentialElements = target.querySelector(selector)
        let i = potentialElements.length

        while (i--){
            if(potentialElements[i] === targetElement){
                handler.call(targetElement, event)
                break
            }
        }
    }
    $on(target,type,dispatchEvent)
}

