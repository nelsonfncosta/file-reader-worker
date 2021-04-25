/* global FileReaderSync */

import { HELLO, hello, READ_FILES } from './actions.js'

onmessage = e => {
  console.log('worker received message:', e.data)
  const { type, payload } = e.data

  switch (type) {
    case HELLO:
      postMessage(hello('from worker!'))
      break
    case READ_FILES:
      syncReadFiles(payload)
      //   aSyncReadFiles(payload)
      break
    default:
      break
  }
}

function onError (e) {
  postMessage('Worker ERROR: ' + e.toString())
}

function aSyncReadFiles (files) {
  for (let i = 0; i < files.length; i++) {
    const file = files.item(i)
    console.log('ASYNC reading', file.name)

    const reader = new FileReader()

    reader.onload = function (e) {
      postMessage(e.target.result)
    }
    reader.onerror = function (e) {
      onError(e)
    }
    reader.readAsText(file)
  }
}

function syncReadFiles (files) {
  const buffers = []

  for (let i = 0; i < files.length; i++) {
    const file = files.item(i)
    console.log('SYNC reading', file.name)

    const reader = new FileReaderSync()
    buffers.push(reader.readAsText(file))
  }

  postMessage(buffers)
}
