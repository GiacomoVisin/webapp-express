const express = require("express")
const router = express.Router()
const connection = require("../database/connection")
const controller = require("../controllers/controller")

router.get("/index", controller.index)

router.get("/show/:id", controller.show)



module.exports = router