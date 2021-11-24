'use strict'

const { remote, ipcRenderer } = require('electron')

// delete todo by its text value ( used below in event listener)
const deleteTodo = (e) => {
  ipcRenderer.send('delete-todo', parseInt(e.target.parentElement.parentElement.querySelectorAll('div:nth-of-type(2)')[0].textContent) - 1)
}

const editTodo = (e) => {
  ipcRenderer.send('edit-todo-window', parseInt(e.target.parentElement.parentElement.querySelectorAll('div:nth-of-type(2)')[0].textContent) - 1, e.target.parentElement.parentElement.querySelectorAll('div:nth-of-type(3)')[0].textContent)
}

const toggleTodo = (e) => {
  ipcRenderer.send('toggle-todo', parseInt(e.target.parentElement.parentElement.querySelectorAll('div:nth-of-type(2)')[0].textContent) - 1)
}

const upHillTodo = (e) => {
  const indexFromEle = parseInt(e.currentTarget.parentElement.parentElement.querySelectorAll('div:nth-of-type(2)')[0].textContent)
  if (indexFromEle > 1)
    ipcRenderer.send('uphill-todo', indexFromEle - 1)
}

const downHillTodo = (e) => {
  const indexFromEle = parseInt(e.currentTarget.parentElement.parentElement.querySelectorAll('div:nth-of-type(2)')[0].textContent)
  if (indexFromEle < e.currentTarget.len)
    ipcRenderer.send('downhill-todo', indexFromEle - 1)
}

// create add todo window button
document.getElementById('createTodoBtn').addEventListener('click', () => {
  ipcRenderer.send('add-todo-window')
})

document.getElementById('removeTodoBtn').addEventListener('click', () => {
  ipcRenderer.send('removebyid-todo-window')
})

remote.globalShortcut.register('Control+N', () => {
  ipcRenderer.send('add-todo-window')
})

remote.globalShortcut.register('Delete', () => {
  ipcRenderer.send('removebyid-todo-window')
})

// on receive todos
ipcRenderer.on('todos', (event, todos) => {
  // get the todoList ul
  const todoList = document.getElementById('todoList')
  // create html string
  const todoItems = todos.reduce((html, todo, i) => {
    html += `<li class="todo-item">
              <div>
                <div class="${todo.completed ? 'status-badge-active' : 'status-badge-inactive'}"></div>
              </div>
              <div>${i + 1}</div>
              <div>${todo.name}</div>
              <div>
                <button class="btn btn-warning edit-btn" type="button">Edit</button>
                <button class="btn btn-error del-btn" type="button">Remove</button>
                <button class="btn btn-success toggle-btn" type="button">Toggle</button>
                <button class="btn uphill-btn">
                  <svg width="14" height="8" viewBox="0 0 14 8" color="black" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.333008 2.66667L2.99967 2.66667L2.99967 5.33333H5.66634L5.66634 8L8.33301 8L8.33301 5.33333H10.9997V2.66667H13.6663V0L10.9997 1.16564e-07V2.66667L8.33301 2.66667V5.33333L5.66634 5.33333V2.66667H2.99967V4.66255e-07L0.333008 5.82818e-07L0.333008 2.66667Z" fill="black"/>
                  </svg>
                </button>
                <button class="btn downhill-btn">
                  <svg width="14" height="8" viewBox="0 0 14 8" color="black" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.333008 2.66667L2.99967 2.66667L2.99967 5.33333H5.66634L5.66634 8L8.33301 8L8.33301 5.33333H10.9997V2.66667H13.6663V0L10.9997 1.16564e-07V2.66667L8.33301 2.66667V5.33333L5.66634 5.33333V2.66667H2.99967V4.66255e-07L0.333008 5.82818e-07L0.333008 2.66667Z" fill="black"/>
                  </svg>
                </button>
              </div>
            </li>`

    return html
  }, '')

  // set list html to the todo items
  todoList.innerHTML = todoItems

  // add click handlers to delete the clicked todo
  todoList.querySelectorAll('.del-btn').forEach(item => {
    item.addEventListener('click', deleteTodo)
  })
  todoList.querySelectorAll('.edit-btn').forEach(item => {
    item.addEventListener('click', editTodo)
  })
  todoList.querySelectorAll('.toggle-btn').forEach(item => {
    item.addEventListener('click', toggleTodo)
  })
  todoList.querySelectorAll('.uphill-btn').forEach(item => {
    item.addEventListener('click', upHillTodo)
  })
  todoList.querySelectorAll('.downhill-btn').forEach(item => {
    item.addEventListener('click', downHillTodo)
    item.len = todoList.querySelectorAll('.downhill-btn').length;
  })
})
