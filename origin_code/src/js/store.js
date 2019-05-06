export default class Store {
    constructor(name,callback){
        //存储缓存
        const localStorage = window.localStorage
        let liveTodos
        //定义读取内存的方法
        this.getLocalStorage = () => {
            return liveTodos || JSON.parse(localStorage.getItem(name) || '[]')
        }

        //定义存储内存的方法
        this.setLocalStorage = (todos) => {
            localStorage.setItem(name,JSON.stringify(liveTodos=todos))
        }
        if(callback){
            callback()
        }
    }
    find(query, callback){
        const todos = this.getLocalStorage()
        let key
        let todo = (todo) => {
            for(key in query){
                if(query[key] !== todo[key]){
                    return false
                }
            }
            return true
        }
        callback(todos.filter(todo))
    }
    update(update, callback){
        const id = update.id
        const todos = this.getLocalStorage()
        let index = todos.length
        let key
        while (index--){
            if(todos[index].id === id){
                for (key in update){
                    todos[index][key] = update[key]
                }
                break
            }
        } 
        this.setLocalStorage(todos)
        if(callback){
            callback()
        }
    }
    insert(item,callback){
        const todos = this.getLocalStorage()
        todos.push(item)
        this.setLocalStorage(todos)
        if(callback){
            callback()
        }
    }
    remove(query,callback){
        let key
        let todo = (todo) => {
            for(key in query){
                if(query[key] !== todo[key]){
                    return false
                }
            }
            return true
        }
        const todos = this.getLocalStorage().filter(todo)
        this.setLocalStorage(todos)
        if(callback){
            callback()
        }
    }
    count(callback){
        let query = {}
        this.find(query,data => {
            const total = data.length
            let index = data.length
            let completed = 0

            while (index--){
                completed += data[index].completed
            }
            callback(total,total-completed,completed)
        })
    }
}