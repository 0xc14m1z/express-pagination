# express-pagination

[![TravisCI][build-badge]][build-url]
[![Coveralls][coverage-badge]][coverage-url]
[![CodeClimate][maintainability-badge]][maintainability-url]
[![Codacy][code-quality-badge]][code-quality-url]

Configurable ExpressJS pagination middleware.

---

The purpose of this package is to simplify handling of pagination for ExpressJS
applications. It can be used as fast as possible as shown in the [Basic Usage](#basic-usage)
section, or it can be highly configured to perfectly reflect your application
needs.

This middleware allows your application to read two parameters for pagination
(the current page number and the number of desired results per page) and setup
a configurable property in the request object that gets passed to
your route handler.

## installation

```
npm install --save @0xc14m1z/express-pagination
```

## default behaviour

This middleware:
- looks for a `page` parameter as the current page number;
- looks for a `perPage` parameter as the desired number of results per page;
- sets a `pagination` property on the `request` object;
  - sets a `page` property to the given current page number or fallback to page
    `1`;
  - sets a `perPage` property to the given desired number of results per page
    or fallback to `50`;
  - sets a `from` property to the number of results to skip;

All of these properties can be configured as shown in the [Advanced Usage](#advanced-usage) section.

## basic usage

This package exports two convenient methods to be used as ExpressJS middlewares
on route or application basis.

If you don't have special needs, you can just import a middleware and use it like:

```js
const pagination = require('@0xc14m1z/express-pagination')

app.get('/first-route', pagination.add, function (req, res) {
  // your handler here
})
```

Now your route can be called as: `/first-route?page=3` or
`/first-route?page=3&perPage=30`.

If no `perPage` parameter is given, the value `50` is used for it.

With this setup you'll have pagination information in `req.pagination` as:

```js
{
  page: 3,
  perPage: 30, // or 50, if this parameter isn't given
  from: 60
}

```

If you want to change the default number of desired results per page, you can
use a slightly different middleware:

```js
const pagination = require('@0xc14m1z/express-pagination')

app.get('/second-route', pagination.addWith(25), function (req, res) {
  // your handler here
})
```

## advanced usage

The default export of this package is a function that takes a configuration in
input and returns a middleware generator.

This middleware generator can than be used in your application:

```js
// customPagination.js
const pagination = require('@0xc14m1z/express-pagination')

module.exports = pagination(/* custom configuration here */)
```

```js
// controller.js
const addPagination = require('./customPagination')

// here the number results per page is taken from the configuration
app.get('/first-route', addPagination(), function (req, res) {
  // your handler here
})

// here the given number results per page overrides the configuration value
app.get('/second-route', addPagination(100), function (req, res) {
  // your handler here
})
```

---

The default configuration is:

```js
{
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
```

Let's say that we have an application that receives paging information in a
shorter format, for instance: `/paged-route?p=4&pp=30`

Where `p` is the current page number and `pp` is the desired number of results
per page, we can set the configuration as:

```js
{
  input: {
    page: 'p',
    perPage: 'pp'
  }
}
```

Let's say that, for instance, we are using Sequelize ORM to perform our database
queries. It allows to narrow query results using the standard SQL keywords:
`limit` and `offset`.

We may set the configuration to:

```js
{
  input: {
    page: 'p',
    perPage: 'pp'
  },
  output: {
    property: 'queryLimits'
    perPage: 'limit',
    from: 'offset'
  }
}
```

And use it like:

```js
// controller.js
const addPagination = require('./customPagination')

app.get('/users', addPagination(), function (req, res) {
  const { limit, offset } = req.queryLimits

  User.findAll({ limit, offset })
  // or even User.findAll({ ...req.queryLimits })
})
```






[build-badge]: https://img.shields.io/travis/0xc14m1z/express-pagination.svg
[build-url]: https://travis-ci.org/0xc14m1z/express-pagination

[coverage-badge]: https://img.shields.io/coveralls/github/0xc14m1z/express-pagination.svg
[coverage-url]: https://coveralls.io/github/0xc14m1z/express-pagination

[maintainability-badge]: https://img.shields.io/codeclimate/maintainability/0xc14m1z/express-pagination.svg
[maintainability-url]: https://codeclimate.com/github/0xc14m1z/express-pagination

[code-quality-badge]: https://img.shields.io/codacy/grade/c5eb6609f4744298bca301b20b11c102.svg
[code-quality-url]: https://www.codacy.com/app/0xc14m1z/express-pagination
