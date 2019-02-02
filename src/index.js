const pagination = require('./pagination')

const addPaginationWith = pagination()
const addPagination = addPaginationWith()

module.exports = pagination
module.exports.addPaginationWith = addPaginationWith
module.exports.addPagination = addPagination
