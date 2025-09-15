export default function deepTrack (obj1, obj2, prefix = '') {
  const diffs = []

  const isObject = val =>
    typeof val === 'object' && val !== null && !Array.isArray(val)

  const keys = new Set([...Object.keys(obj1 || {}), ...Object.keys(obj2 || {})])

  for (const key of keys) {
    const path = prefix ? `${prefix}.${key}` : key
    const val1 = obj1 ? obj1[key] : undefined
    const val2 = obj2 ? obj2[key] : undefined

    // Case 1: both are objects
    if (isObject(val1) && isObject(val2)) {
      diffs.push(...deepTrack(val1, val2, path))
    }
    // Case 2: both are arrays
    else if (Array.isArray(val1) && Array.isArray(val2)) {
      const maxLen = Math.max(val1.length, val2.length)
      for (let i = 0; i < maxLen; i++) {
        const subPath = `${path}[${i}]`
        if (i < val1.length && i < val2.length) {
          // recurse if both are objects/arrays
          if (isObject(val1[i]) && isObject(val2[i])) {
            diffs.push(...deepTrack(val1[i], val2[i], subPath))
          } else if (Array.isArray(val1[i]) && Array.isArray(val2[i])) {
            diffs.push(
              ...deepTrack({ arr: val1[i] }, { arr: val2[i] }, subPath)
            )
          } else if (val1[i] !== val2[i]) {
            diffs.push({
              key: subPath,
              old: val1[i],
              new: val2[i]
            })
          }
        } else if (i < val1.length) {
          diffs.push({
            key: subPath,
            old: val1[i],
            new: undefined
          })
        } else {
          diffs.push({
            key: subPath,
            old: undefined,
            new: val2[i]
          })
        }
      }
    }
    // Case 3: value changed (primitive, null, etc.)
    else if (val1 !== val2) {
      diffs.push({
        key: path,
        old: val1,
        new: val2
      })
    }
  }

  return diffs.filter(item => item.key !== "status")
}
