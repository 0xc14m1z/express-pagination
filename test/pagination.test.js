const expect = require('chai').expect
const pagination = require('../src/pagination')
const sinon = require('sinon')

module.exports = function () {

  it('should be a function', function () {
    expect(pagination).to.be.a('function')
  })

  it('should return the middleware generator function', function () {
    expect(pagination()).to.be.a('function')
  })

  it('should apply custom configuration if given', function () {
    const config = {
            input: {
              page: 'pagina',
              perPage: 'per-pagina'
            },
            output: {
              property: 'paginazione',
              page: 'page',
              perPage: 'limit',
              from: 'offset',
              defaultPerPage: 50
            }
          },
          generator = pagination(config),
          middleware = generator(),
          request = { params: { pagina: 3, 'per-pagina': 21 } },
          response = {},
          next = function () {}

    middleware(request, response, next)
    expect(request).to.have.property('paginazione')
    expect(request.paginazione).to.have.property('page', 3)
    expect(request.paginazione).to.have.property('limit', 21)
    expect(request.paginazione).to.have.property('offset', 42)
  })

  describe('middleware generator', function () {
    let addPagination

    before(function () {
      addPagination = pagination()
    })

    it('should be a function', function () {
      expect(addPagination).to.be.a('function')
    })

    it(
      'should throw if results per page is not an positive integer',
      function () {
        expect(() => addPagination('42')).to.throw(TypeError)
        expect(() => addPagination({})).to.throw(TypeError)
        expect(() => addPagination([])).to.throw(TypeError)
        expect(() => addPagination(4.2)).to.throw(TypeError)
        expect(() => addPagination(() => 42)).to.throw(TypeError)
        expect(() => addPagination(-5)).to.throw(TypeError)
        expect(() => addPagination(true)).to.throw(TypeError)

        expect(() => addPagination(42)).not.to.throw
      }
    )

    it('should return a middleware function', function () {
      expect(addPagination()).to.be.a('function')
    })

    describe('middleware', () => {
      let middleware
      const RESULTS_PER_PAGE = 42

      before(function () {
        middleware = addPagination(RESULTS_PER_PAGE)
      })

      it('should take three parameters', function () {
        expect(middleware.length).to.equal(3)
      })

      it('should call next when finishes', function () {
        const request = {},
              response = {},
              next = sinon.spy()

        middleware(request, response, next)
        expect(next.called).to.be.true
      })

      it('should set a property on the request named as specified in configuration', function () {
        const request = {},
              response = {},
              next = function () {}

        middleware(request, response, next)
        expect(request).to.have.property('pagination')
        expect(request.pagination).to.have.all.keys(['page', 'perPage', 'from'])
      })

      it('should set a from property named as specified in configuration', function () {
        const request = { params: { page: 3, perPage: 21 } },
              response = {},
              next = function () {}

        middleware(request, response, next)
        expect(request.pagination).to.have.property('from', 42)
      })

      it('should set 1 as default page number if no page param is given', function () {
        const request = {},
              response = {},
              next = function () {}

        middleware(request, response, next)
        expect(request.pagination).to.have.property('page', 1)
      })

      it('should use given page number from query string parameters', function () {
        const request = { query: { page: 10 } },
              response = {},
              next = function () {}

        middleware(request, response, next)
        expect(request.pagination).to.have.property('page', 10)
      })

      it('should use given page number from url parameters', function () {
        const request = { params: { page: 20 } },
              response = {},
              next = function () {}

        middleware(request, response, next)
        expect(request.pagination).to.have.property('page', 20)
      })

      it('should use given page number from request body', function () {
        const request = { body: { page: 30 } },
              response = {},
              next = function () {}

        middleware(request, response, next)
        expect(request.pagination).to.have.property('page', 30)
      })

      it('should set RESULTS_PER_PAGE as default results per page if no results per page param is given', function () {
        const request = {},
              response = {},
              next = function () {}

        middleware(request, response, next)
        expect(request.pagination).to.have.property('perPage', RESULTS_PER_PAGE)
      })

      it('should use given results per page number from query string parameters', function () {
        const request = { query: { perPage: 10 } },
              response = {},
              next = function () {}

        middleware(request, response, next)
        expect(request.pagination).to.have.property('perPage', 10)
      })

      it('should use given results per page number from url parameters', function () {
        const request = { params: { perPage: 20 } },
              response = {},
              next = function () {}

        middleware(request, response, next)
        expect(request.pagination).to.have.property('perPage', 20)
      })

      it('should use given results per page number from request body', function () {
        const request = { body: { perPage: 30 } },
              response = {},
              next = function () {}

        middleware(request, response, next)
        expect(request.pagination).to.have.property('perPage', 30)
      })

    })
  })

}
