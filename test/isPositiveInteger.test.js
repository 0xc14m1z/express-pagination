const expect = require('chai').expect
const isPositiveInteger = require('../src/isPositiveInteger')

module.exports = function () {

  it('should return true if positive integer is given', function () {
    expect(isPositiveInteger(42)).to.be.true
  })

  it('should return false if negative integer is given', function () {
    expect(isPositiveInteger(-42)).to.be.false
  })

  it('should return false if zero is given', function () {
    expect(isPositiveInteger(0)).to.be.false
  })

  it('should return false if float is given', function () {
    expect(isPositiveInteger(4.2)).to.be.false
  })

  it('should return false if NaN is given', function () {
    expect(isPositiveInteger(NaN)).to.be.false
  })

  it('should return false if an array is given', function () {
    expect(isPositiveInteger([1, 2, 3])).to.be.false
  })

  it('should return false if an object is given', function () {
    expect(isPositiveInteger({ a: 1, b: 2 })).to.be.false
  })

  it('should return false if a function is given', function () {
    expect(isPositiveInteger(() => 42)).to.be.false
  })

  it('should return false if a boolean is given', function () {
    expect(isPositiveInteger(true)).to.be.false
    expect(isPositiveInteger(false)).to.be.false
  })

  it('should return false if null is given', function () {
    expect(isPositiveInteger(null)).to.be.false
  })

  it('should return false if nothing is given', function () {
    expect(isPositiveInteger()).to.be.false
    expect(isPositiveInteger(undefined)).to.be.false
  })

  it('should return false if a string is given', function () {
    expect(isPositiveInteger('42')).to.be.false
  })

}
