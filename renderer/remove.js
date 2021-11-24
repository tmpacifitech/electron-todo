'use strict'

const { ipcRenderer, remote } = require('electron')

document.getElementById('removebyid-btn').addEventListener('click', (evt) => {
  // console.log(window.process.argv.slice(-3))
  // input on the form
  const input = document.getElementById('index-input')

  // send todo to main process
  ipcRenderer.send('delete-todo', parseInt(input.value) - 1)

  // reset input
  input.value = ''
})

// remote.globalShortcut.register('Delete', () => {
//   ipcRenderer.send('removebyid-todo', parseInt(document.getElementById('index-input').value))
// })