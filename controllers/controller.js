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

function indexID(req, res) {
    const { id } = req.params;


    const sql = `SELECT id, title, director, genre, image FROM movies WHERE id = ?`;

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



function addReview(req, res) {
    const { id } = req.params;

    const { name, text, vote } = req.body;

    const sql = `INSERT INTO reviews (movie_id, name, text, vote) VALUES (?, ?, ?, ?)`
    connection.query(sql, [id, name, text, vote], (err, results) => {
        if (err){
            console.error("Error in the execution of the insert review query:", err);
            res.status(500).json({ error: "Internal Server Error" });
            return;
        }
        res.status(201).json({ 
            message: "Review added successfully",
            results: results 
        });
    })
}


module.exports = { index, indexID, addReview }