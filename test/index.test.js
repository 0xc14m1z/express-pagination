const paginationTests = require('./pagination.test')

const isPositiveIntegerTests = require('./isPositiveInteger.test')

describe('express-pagination', function () {
  describe('#pagination', paginationTests)

  describe('utils', function () {
    describe('#isPositiveInteger', isPositiveIntegerTests)
  })
})
