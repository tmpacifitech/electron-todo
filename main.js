'use strict'

const path = require('path')
const { app, ipcMain } = require('electron')

const Window = require('./Window')
const DataStore = require('./DataStore')

// require('electron-reload')(__dirname)

// create a new todo store name "Todos Main"
const todosData = new DataStore({ name: 'Todos Main' })

function main() {
  // todo list window
  let mainWindow = new Window({
    file: path.join('renderer', 'index.html')
  })

  // add todo window
  let addTodoWin
  let editTodoWin
  let removeTodoWin

  // TODO: put these events into their own file

  // initialize with todos
  mainWindow.once('show', () => {
    mainWindow.webContents.send('todos', todosData.todos)
  })

  // create add todo window
  ipcMain.on('add-todo-window', () => {
    // if addTodoWin does not already exist
    if (!addTodoWin) {
      // create a new add todo window
      addTodoWin = new Window({
        file: path.join('renderer', 'add.html'),
        width: 400,
        height: 400,
        // close with the main window
        parent: mainWindow
      })
      // cleanup
      addTodoWin.on('closed', () => {
        addTodoWin = null
      })
    }
  })

  ipcMain.on('edit-todo-window', (event, i, prevContent) => {
    // if addTodoWin does not already exist
    if (!editTodoWin) {
      // create a new add todo window
      editTodoWin = new Window({
        file: path.join('renderer', 'edit.html'),
        width: 400,
        height: 400,
        // close with the main window
        parent: mainWindow,
      })
      editTodoWin.loadURL(`file://${__dirname}/renderer/edit.html?id=${i}&prevContent=${prevContent}`);
      // editTodoWin.webContents.send('edit-todo', i, prevContent)

      // cleanup
      editTodoWin.on('closed', () => {
        editTodoWin = null
      })
    }
  })
  ipcMain.on('removebyid-todo-window', () => {
    // if addTodoWin does not already exist
    if (!removeTodoWin) {
      // create a new add todo window
      removeTodoWin = new Window({
        file: path.join('renderer', 'remove.html'),
        width: 400,
        height: 400,
        // close with the main window
        parent: mainWindow,
      })
      // cleanup
      removeTodoWin.on('closed', () => {
        removeTodoWin = null
      })
    }
  })

  // add-todo from add todo window
  ipcMain.on('add-todo', (event, todo) => {
    const updatedTodos = todosData.addTodo(todo).todos
    console.log(updatedTodos)
    mainWindow.send('todos', updatedTodos)
    // new Notification({ title: "Add", body: `${todo} added` }).show()
  })

  ipcMain.on('edit-finish-todo', (event, i, newContent) => {
    let updatedTodos = todosData.todos
    updatedTodos[i].name = newContent
    mainWindow.send('todos', updatedTodos)
  })

  // delete-todo from todo list window
  ipcMain.on('delete-todo', (event, i) => {
    const updatedTodos = todosData.deleteTodo(i).todos
    console.log(i)
    mainWindow.send('todos', updatedTodos)
    // new Notification({ title: "Removing", body: `Index ${i} removed` }).show()
  })

  // delete-todo from todo list window
  ipcMain.on('toggle-todo', (event, i) => {
    const updatedTodos = todosData.toggleTodo(i).todos
    mainWindow.send('todos', updatedTodos)
  })

  ipcMain.on('uphill-todo', (event, i) => {
    const updatedTodos = todosData.todos
    const tmp = updatedTodos[i - 1]
    updatedTodos[i - 1] = updatedTodos[i]
    updatedTodos[i] = tmp
    mainWindow.send('todos', updatedTodos)
  })
  ipcMain.on('downhill-todo', (event, i) => {
    const updatedTodos = todosData.todos
    const tmp = updatedTodos[i + 1]
    updatedTodos[i + 1] = updatedTodos[i]
    updatedTodos[i] = tmp
    mainWindow.send('todos', updatedTodos)
  })
}

app.on('ready', main)

app.on('window-all-closed', function () {
  app.quit()
})

// const sqlite3 = require('sqlite3').verbose();

// // open the database
// let db = new sqlite3.Database('./tasks.db', sqlite3.OPEN_READWRITE, (err) => {
//   if (err) {
//     console.error(err.message);
//   }
//   console.log('Connected to the chinook database.');
// });

// db.serialize(() => {
//   db.each(`SELECT PlaylistId as id,
//                   Name as name
//            FROM playlists`, (err, row) => {
//     if (err) {
//       console.error(err.message);
//     }
//     console.log(row.id + "\t" + row.name);
//   });
// });

// db.close((err) => {
//   if (err) {
//     console.error(err.message);
//   }
//   console.log('Close the database connection.');
// });