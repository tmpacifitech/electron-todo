'use strict'

const { ipcRenderer, remote } = require('electron')

let searchParams = new URLSearchParams(global.location.search.slice(1));
document.getElementById('edit-input').value = searchParams.get('prevContent');

document.getElementById('save-btn').addEventListener('click', (evt) => {
  // input on the form
  const input = document.getElementById('edit-input')

  // send todo to main process
  ipcRenderer.send('edit-finish-todo', parseInt(searchParams.get('id')), input.value)

  // reset input
  input.value = ''
})

document.getElementById('uphill-btn').addEventListener('click', (evt) => {
  ipcRenderer.send('uphill-todo', parseInt(searchParams.get('id')))
})

document.getElementById('downhill-btn').addEventListener('click', (evt) => {
  ipcRenderer.send('downhill-todo', parseInt(searchParams.get('id')))
})