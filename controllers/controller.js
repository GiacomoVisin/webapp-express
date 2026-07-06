const connection = require(`../database/connection`)

function index(req, res) {
    const sql = `SELECT * FROM movies`
    connection.query(sql, (err, results) => {
        if (err) {
            console.error("Error executing query:", err)
            res.status(500).json({ error: "Internal Server Error" })
            return
        }
        res.json(results)
    })
}

module.exports = {index}