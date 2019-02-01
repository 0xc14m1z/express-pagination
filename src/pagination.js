import isPositiveInteger from './isPositiveInteger'

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

const pagination = config => {
  config = config || {}
  
  const input = config.input || DEFAULT_CONFIG.input,
        output = config.output || DEFAULT_CONFIG.output

  return localPerPage => {
    localPerPage = localPerPage || output.defaultPerPage

    if ( !isPositiveInteger(localPerPage) )
      throw new TypeError(RESULTS_PER_PAGE_ERROR_MESSAGE)

    return (request, _, next) => {
      const { query, params, body } = request,
            source = query || params || body || {},
            page = source[input.page] || DEFAULT_PAGE,
            perPage = source[input.perPage] || localPerPage,
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

export default pagination
