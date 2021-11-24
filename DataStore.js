'use strict'

const Store = require('electron-store')
const { Notification } = require('electron')

class DataStore extends Store {
  constructor(settings) {
    super(settings)

    // initialize with todos or empty array
    this.todos = this.get('todos') || []
  }

  saveTodos() {
    // save todos to JSON file
    this.set('todos', this.todos)

    // returning 'this' allows method chaining
    return this
  }

  getTodos() {
    // set object's todos to todos in JSON file
    this.todos = this.get('todos') || []

    return this
  }

  addTodo(todo) {
    // merge the existing todos with the new todo
    this.todos = [...this.todos, { name: todo, completed: false }]

    return this.saveTodos()
  }

  deleteTodo(todo) {
    // filter out the target todo
    this.todos = this.todos.filter((t, i) => i !== todo)
    return this.saveTodos()
  }

  toggleTodo(i) {
    this.todos[i].completed = !this.todos[i].completed
    return this.saveTodos()
  }
}

module.exports = DataStore
