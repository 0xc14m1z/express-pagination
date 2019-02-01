import { expect } from 'chai'

import isPositiveInteger from 'src/isPositiveInteger'

export default () => {

  it('should return true if positive integer is given', () => {
    expect(isPositiveInteger(42)).to.be.true
  })

  it('should return false if negative integer is given', () => {
    expect(isPositiveInteger(-42)).to.be.false
  })

  it('should return false if zero is given', () => {
    expect(isPositiveInteger(0)).to.be.false
  })

  it('should return false if float is given', () => {
    expect(isPositiveInteger(4.2)).to.be.false
  })

  it('should return false if NaN is given', () => {
    expect(isPositiveInteger(NaN)).to.be.false
  })

  it('should return false if an array is given', () => {
    expect(isPositiveInteger([1, 2, 3])).to.be.false
  })

  it('should return false if an object is given', () => {
    expect(isPositiveInteger({ a: 1, b: 2 })).to.be.false
  })

  it('should return false if a function is given', () => {
    expect(isPositiveInteger(() => 42)).to.be.false
  })

  it('should return false if a boolean is given', () => {
    expect(isPositiveInteger(true)).to.be.false
    expect(isPositiveInteger(false)).to.be.false
  })

  it('should return false if null is given', () => {
    expect(isPositiveInteger(null)).to.be.false
  })

  it('should return false if nothing is given', () => {
    expect(isPositiveInteger()).to.be.false
    expect(isPositiveInteger(undefined)).to.be.false
  })

  it('should return false if a string is given', () => {
    expect(isPositiveInteger('42')).to.be.false
  })

}
