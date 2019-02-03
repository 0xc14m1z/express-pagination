const isPositiveInteger = require('./isPositiveInteger')

const RESULTS_PER_PAGE_ERROR_MESSAGE =
  'The number of results per page must be a positive integer.'

const DEFAULT_CONFIG = {
  input: {
    page: 'page',
    perPage: 'perPage'
  },
  output: {
    property: 'pagination',
    page: 'page',
    perPage: 'perPage',
    from: 'from',
    defaultPerPage: 50
  }
}

const DEFAULT_PAGE = 1

module.exports = function pagination(config) {
  config = config || {}

  const input = config.input || DEFAULT_CONFIG.input,
        output = config.output || DEFAULT_CONFIG.output

  return function(localPerPage) {
    localPerPage = localPerPage || output.defaultPerPage

    if ( !isPositiveInteger(localPerPage) )
      throw new TypeError(RESULTS_PER_PAGE_ERROR_MESSAGE)

    return function(request, _, next) {
      const query = request.query || {},
            params = request.params || {},
            body = request.body || {},
            page = Number(query[input.page]
                          || params[input.page]
                          || body[input.page]
                          || DEFAULT_PAGE),
            perPage = Number(query[input.perPage]
                             || params[input.perPage]
                             || body[input.perPage]
                             || localPerPage),
            from = (page - 1) * perPage

      request[output.property] = {
        [output.page]: page,
        [output.perPage]: perPage,
        [output.from]: from
      }

      next()
    }
  }
}
