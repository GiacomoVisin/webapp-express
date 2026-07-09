const express = require("express")
const router = express.Router()
const connection = require("../database/connection")
const controller = require("../controllers/controller")

router.get("/index", controller.index)

router.get("/index/:id", controller.indexID)

router.post("/addReview/:id", controller.addReview)

module.exports = router