# Fastify Simple MySQL
Based on [mysql2](https://www.npmjs.com/package/mysql2) library

Features
* named placeholders
* async methods
* config via ENV  

## Prepare
Set env MYSQL_URL (see: [example.env](./example.env)).

Recommend use with [fastify-graceful-shutdown](https://github.com/hemerajs/fastify-graceful-shutdown) plugin for close connection on shutdown.

## Methods
* query - query
* rows - all rows as array of objects
* row - single row as object (first row)
* column - single column as array of values (first column)
* value - single value (first field from first row)
* insert - insert and return insertId
* total - return value of SELECT CALC_FOUND_ROWS() query

## Use
```javascript
// in app
fastify.register(require("fastify-simple-mysql"))

// in route
const r = await this.db.value(`SELECT :a + :b`, {a: 1, b: 2})
```