module.exports = function isPositiveInteger(value) {
  return (
    (
      typeof value === 'number' && !Number.isNaN(value)
      || value instanceof Number
    )
      && Number.isFinite(value)
      && Number.isInteger(value)
      && value >= 1
  )
}
