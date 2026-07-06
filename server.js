const express = require(`express`)
const app = express()
const port = process.env.API_SERVER_PORT || 3000
const router = require(`./router/routes`)

app.listen(port, () => {
    console.log(`The server is running on port http://localhost:${port}`)
})



function errorHandler(err, req, res, next) {
    res.status(500)
    res.json({ error: "Internal Server Error" })
}


function endpointNotFound(req, res, next){
    res.status(404)
    res.json({ error: "Endpoint not found" })
}



app.use(express.json())
app.use(`/`,router)


app.use(endpointNotFound)
app.use(errorHandler)