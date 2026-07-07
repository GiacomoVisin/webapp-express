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

function show(req, res) {
    const { id } = req.params;


    const sql = `SELECT id, title, director, genre FROM movies WHERE id = ?`;

    connection.query(sql, [id], (err, results) => {
        if (err) {
            console.error("Error in the execution of the movie query:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        const movie = results[0];


       const sqlReview = `SELECT name, text, vote FROM reviews WHERE movie_id = ?`;

        connection.query(sqlReview, [id], (err, reviewResults) => {
            if (err) {
                console.error("Error in the execution of the reviews query:", err);
                return res.status(500).json({ error: "Internal Server Error" });
            }

            movie.reviews = reviewResults;


            res.json(movie);
        });
    });
}

module.exports = { index, show }