import querystring from 'querystring'

/**
 * @param {Object} obj
 * @returns {boolean}
 */
export const isObject = (obj) => typeof obj === 'object' && obj !== null && !Array.isArray(obj)

/**
 * @param {Object|Array} objectOrArray
 * @returns {Object|Array}
 */
export const unescapeStrings = (objectOrArray) =>
  Object.keys(objectOrArray || {}).reduce(
    (result, key) => {
      const value = objectOrArray[key]
      if (typeof value === 'string') {
        result[key] = querystring.unescape(value)
      }
      if (isObject(value) || Array.isArray(value)) {
        result[key] = unescapeStrings(value)
      }
      return result
    },
    isObject(objectOrArray)
      ? { ...objectOrArray }
      : Array.isArray(objectOrArray)
        ? [...objectOrArray]
        : objectOrArray,
  )

/**
 * This method is useful for when you want to merge
 * database instance objects without loosing instance's class features
 *
 * @param {Object|Array} original
 * @param {[Object|Array]} objects
 * @returns {Object|Array}
 */
export const deepAssign = (original, ...objects) => {
  const allKeys = new Set([
    ...Object.keys(original),
    ...objects.map((obj) => Object.keys(obj)).flat(),
  ])
  return objects.reduce((object, current) => {
    if (!current) return object
    for (const key of allKeys) {
      if (!Object.keys(current).includes(key)) continue
      if (isObject(current[key]) || Array.isArray(current[key])) {
        const p1 = object[key] || (Array.isArray(current[key]) ? [] : {})
        const p2 = current[key]
        object[key] = deepAssign(p1, p2)
        continue
      }
      object[key] = current[key]
    }
    return object
  }, original)
}
