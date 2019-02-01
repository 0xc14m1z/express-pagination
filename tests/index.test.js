import paginationTests from './pagination.test'

import isPositiveIntegerTests from './isPositiveInteger.test'

describe('express-pagination', () => {
  describe('#pagination', paginationTests)

  describe('utils', () => {
    describe('#isPositiveInteger', isPositiveIntegerTests)
  })
})
