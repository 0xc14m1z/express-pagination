const isPositiveInteger = value =>
  (typeof value === 'number' && !Number.isNaN(value) || value instanceof Number)
    && Number.isFinite(value)
    && Number.isInteger(value)
    && value > 0

export default isPositiveInteger
