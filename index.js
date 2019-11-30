"use strict"

const fp = require("fastify-plugin")
const { URL } = require("url")
const { createPool } = require("mysql2/promise")
const Db = require("./db.js")

if (!process.env.MYSQL_URL) {
    throw new Error("ENV: MYSQL_URL not defined")
}

function plugin(fastify, opts, done) {
    const url = new URL(process.env.MYSQL_URL)
    url.searchParams.set("namedPlaceholders", "1")
    url.searchParams.set("waitForConnections", "1")
    const pool = createPool(url)
    const db = new Db(pool)
    fastify
        .decorate("db", db)
        .decorateRequest("db", db)
        .addHook("onClose", () => db.end())

    if (process.env.NODE_ENV !== "production") {
        fastify.after(async () => {
            let testDb = await db.val(`SELECT :a + :a * :a`, { a: 2 })
            console.info({ testDb })
        })
    }
    done()
}

module.exports = fp(plugin)
