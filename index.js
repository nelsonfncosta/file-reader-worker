import { hello, readFiles } from './actions.js'

const worker = new Worker('worker.js', { type: 'module' })

worker.postMessage(hello('from main'))

worker.onmessage = e => {
  console.log('main received message:', e.data)
}

document.getElementById('my-input').onchange = e => {
  worker.postMessage(readFiles(e.target.files))
}
