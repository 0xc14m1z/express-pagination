const pagination = require('./pagination')

const addPaginationWith = pagination()
const addPagination = addPaginationWith()

module.exports = pagination
module.exports.addWith = addPaginationWith
module.exports.add = addPagination
