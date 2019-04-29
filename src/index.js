(function () {
    window.onload = function () {
        //cookies中存储的li缓存名
        const storageKey = 'todoList'
        //cookies中存储的li缓存值
        // let todos = [{id: new Date().getTime(), completed: 'completed', title: 'test'},
        //     {id: Date.now(), completed: '', title: 'test1'},
        //     {id: Date.now(), completed: '', title: 'test2'},
        // ]
        let todos = []
        const $todoList = document.querySelector('.todo-list')
        const $main = document.querySelector('.main')
        const $newTodo = document.querySelector('.new-todo')
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
            if(todos.length > 0) {
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

        $newTodo.onkeydown = function(event) {
            if (event.keyCode == '13') {
                let title = $newTodo.value
                $newTodo.value = ''
                let item = {
                    id : Date.now(),
                    title:title,
                    completed:false
                }
                todos = getLocalStorage(storageKey)
                todos.push(item)
                setLocalStorage(storageKey, todos)
                render()
            } else if(event.keyCode == '27'){
                $newTodo.value = ''
            }
        }
        //功能3 当点击
    }
})()




