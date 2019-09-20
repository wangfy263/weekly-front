if (!sessionStorage) {
  throw new Error('Current brower does not support Storage')
}
let _sessionStorage = sessionStorage
export function setSessionValue (key, value) {
  _sessionStorage[key] = value
}
export function getSessionValue (key) {
  return _sessionStorage[key] || ' '
}
export function setSessionObject (key, value) {
  _sessionStorage[key] = JSON.stringify(value)
}
export function getSessionObject (key) {
  return JSON.parse(_sessionStorage[key] || null)
}
export function removeSession (key) {
  _sessionStorage.removeItem(key)
}
