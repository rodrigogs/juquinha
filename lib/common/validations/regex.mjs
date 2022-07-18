export default (exp) => {
  try {
    return !!new RegExp(exp)
  } catch (err) {
    return false
  }
}
