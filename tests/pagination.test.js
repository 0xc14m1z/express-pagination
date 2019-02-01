import { express } from 'chai'

import pagination from 'src/pagination'

export default () => {

  it('should be a function')
  it('should return the middleware generator function')
  it('should have default configuration')
  it('should apply configuration if given')

  describe('middleware generator', () => {
    it('should be a function')
    it('should throw if results per page is not an positive integer')
    it('should return a middleware function')

    describe('middleware', () => {
      it('should take three parameters')
      it('should call next when finishes')
      it('should set a property on the request named as specified in configuration')
      it('should set an offset property named as specified in configuration')
      it('should set 1 as default page number if no page param is given')
      it('should use given page number via GET request')
      it('should use given page number via POST request')
      it('should set PER_PAGE as default results per page if no results per page param is given')
      it('should use given results per page number via GET request')
      it('should use given results per page number via POST request')

    })
  })

}
