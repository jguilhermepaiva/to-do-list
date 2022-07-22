const createItem = (questName, status, index) => {
    const item = document.createElement('label')
    item.classList.add('todo-item')
    item.innerHTML = `
        <input type="checkbox" ${status} data-index=${index}>
        <div>${questName}</div>
        <input type="button" value="X" data-index=${index}>
    `
    document.getElementById('todoList').appendChild(item)
}

const clearQuests = () => {
    const todoList = document.querySelector('#todoList')
    while(todoList.firstChild) {
        todoList.removeChild(todoList.lastChild)
    }
}

const attWindow = (window) => {
    clearQuests()
    const database = getDatabase()
    database.forEach((item, index) => createItem(item.tarefa, item.status, index))
}



const getDatabase = () => JSON.parse(localStorage.getItem('todoList')) ?? []

const setDatabase = (database) => localStorage.setItem('todoList', JSON.stringify(database))



const addItem = (event) =>{
    const tecla = event.key
    const text = event.target.value
    if(tecla === 'Enter'){
        const database = getDatabase()
        database.push({'tarefa': text, 'status': ''})
        setDatabase(database)
        attWindow()
        event.target.value = ''
    }
}

const removeItem = (index) =>{
    const database = getDatabase()
    database.splice(index, 1)
    setDatabase(database)
    attWindow()
}

const attItem = (index) => {
    const database = getDatabase()
    database[index].status = database[index].status === '' ? 'checked' : ''
    setDatabase(database)
    attWindow()
}

const clickItem = (event) =>{
    const element = event.target
    if (element.type === 'button'){
        const index = element.dataset.index
        removeItem(index)
    }
    else if (element.type === 'checkbox'){
        const index = element.dataset.index
        attItem(index)
    }
}

document.getElementById('newItem').addEventListener('keypress', addItem)
document.getElementById('todoList').addEventListener('click', clickItem)

attWindow()
