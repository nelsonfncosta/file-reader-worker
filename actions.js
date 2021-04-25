export const HELLO = 'HELLO'

export const READ_FILES = 'READ_FILES'

export const hello = data => ({
  type: HELLO,
  payload: data
})

export const readFiles = files => ({
  type: READ_FILES,
  payload: files
})
