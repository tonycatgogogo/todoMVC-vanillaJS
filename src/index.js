(function () {
    window.onload = function () {
        //cookies中存储的li缓存名
        const storageKey = 'todoList'
        let todos = []
        const $todoList = document.querySelector('.todo-list')
        const $main = document.querySelector('.main')
        const $newTodo = document.querySelector('.new-todo')
        const $toggleAll = document.querySelector('.toggle-all')

        //声明存储内存函数
        function setLocalStorage(name, value) {
            return localStorage.setItem(name, JSON.stringify(value))
        }

        //声明读取内存函数
        function getLocalStorage(name) {
            return JSON.parse(localStorage.getItem(name))
        }

        //声明li模板函数，每次更改之后用作渲染调用
        function itemList(items) {
            return items.reduce((a, item) => a + `
                <li data-id="${item.id}"${item.completed ? ' class="completed"' : ''}>
                	<div class="view">
                		<input class="toggle" type="checkbox" ${item.completed ? 'checked' : ''}>
                		<label>${item.title}</label>
                		<button class="destroy"></button>
                	</div>
                </li>`, '')
        }

        //页面渲染函数
        function render() {
            let liList = itemList(todos)
            $todoList.innerHTML = liList
            if (todos.length > 0) {
                $main.style.display = 'block'
            } else {
                $main.style.display = 'none'
            }
        }

        //功能1 页面加载完成后查询内存中是否有li缓存，若有则渲染页面

        if (!localStorage.getItem(storageKey)) {
            localStorage.setItem(storageKey, JSON.stringify(todos))
            render()
        } else {
            todos = JSON.parse(localStorage.getItem(storageKey))
            render()
        }
        //渲染页面 渲染之前加一个判断 如果todos.length>0 那就把main 变为block

        //功能2 添加编辑功能

        $newTodo.onkeydown = function (event) {
            if (event.keyCode == '13') {
                let title = $newTodo.value
                $newTodo.value = ''
                if (title.trim() === '') {
                    return
                }
                let item = {
                    id: Date.now(),
                    title: title,
                    completed: false
                }
                todos = getLocalStorage(storageKey)
                todos.push(item)
                setLocalStorage(storageKey, todos)
                render()
            } else if (event.keyCode == '27') {
                $newTodo.value = ''
            }
        }
        //功能3 当点击 .toggle-all的时候 所有的li都标记为completed
        $toggleAll.onclick = function () {
            todos = getLocalStorage(storageKey)
            if ($toggleAll.checked === true) {
                todos.forEach(item => {
                    item.completed = true
                    setLocalStorage(storageKey, todos)
                    render()
                })
            } else {
                todos.forEach(item => {
                    item.completed = false
                    setLocalStorage(storageKey, todos)
                    render()
                })
            }
        }
        //功能4 当点击 .toggle的时候 li标记为completed
        //功能5 当点击 .destroy的时候 移除li
        $todoList.addEventListener('click', event => {
            todos = getLocalStorage(storageKey)
            const targetElement = event.target
            let listItem = targetElement.parentNode.parentNode
            let toggleId = listItem.dataset.id
            if (targetElement.tagName === 'INPUT') {
                todos.forEach((item, index) => {
                    if (item.id === parseInt(toggleId)) {
                        item.completed = !item.completed
                        setLocalStorage(storageKey, todos)
                        render()
                    }
                })
            } else if (targetElement.tagName === 'BUTTON') {
                todos.forEach((item, index) => {
                    if (item.id === parseInt(toggleId)) {
                        todos.splice(index, 1)
                        setLocalStorage(storageKey, todos)
                        render()
                    }
                })
            }

        })
        //功能6 双击li时显示编辑框
        //存储操作函数
        let editHandler = (event) => {
            $todoList.removeEventListener('dblclick', editHandler)
            todos = getLocalStorage(storageKey)
            let target = event.target
            const listItem = target.parentElement.parentElement
            if (!listItem) {
                return
            }
            let itemId = listItem.dataset.id
            listItem.classList.add('editing')
            const input = document.createElement('input')
            input.className = 'edit'
            let title = input.value = target.innerText
            listItem.appendChild(input)
            input.focus()
            input.onkeydown = function (event) {
                if (event.keyCode == '13' || event.keyCode == '27') {
                    let newInput = listItem.querySelector('input.edit')
                    title = newInput.value
                    listItem.removeChild(newInput)
                    listItem.classList.remove('editing')
                    listItem.querySelector('label').textContent = title
                    todos.forEach(item => {
                        if (item.id === parseInt(itemId)) {
                            item.title = title
                            setLocalStorage(storageKey, todos)
                            render()
                        }
                    })
                }
                $todoList.addEventListener('dblclick', editHandler)
            }
        }
        $todoList.addEventListener('dblclick', editHandler)
    }
})()




