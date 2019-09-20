if (!localStorage) {
  throw new Error('Current brower does not support Local Storage')
}
let _localStorage = localStorage
/**
 * 保存字符串
 * @param {string} key
 * @param {string} value
 */
export function setLocalValue (key, value) {
  _localSotorage[key] = value
}
/**
 * 获取保存的字符串
 * @param {string} key
 * @returns {string}
 */
export function getLocalValue (key) {
  return _localStorage[key] || ' '
}
/**
 * 保存对象
 * @param {string} key
 * @param {string} value
 */
export function setLocalObject (key, value) {
  _localStorage[key] = JSON.stringify(value)
}
/**
 * 获取保存对象
 * @param {string} key
 * @returns {any}
 */
export function getLocalObject (key) {
  return JSON.parse(_localStorage[key || null])
}
/**
 * 移除保存的数据
 * @param {string} key
 * @returns {any}
 */
export function removeLocal (key) {
  _localStorage.removeItem(key)
}
