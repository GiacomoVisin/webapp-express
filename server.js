const express = require(`express`)
const app = express()
const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`The server is running on port http://localhost:${port}`)
})


app.get(`/`, (req, res) => {
    res.send(`Hello World!`)
})


function errorHandler(err, req, res, next) {
    res.status(500)
    res.json({ error: "Internal Server Error" })
}


function endpointNotFound(req, res, next){
    res.status(404)
    res.json({ error: "Endpoint not found" })
}


app.use(endpointNotFound)
app.use(errorHandler)



app.use(express.json())