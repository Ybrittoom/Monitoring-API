const express = require('express')
const router = express.Router()
const { devicesController } = require("../controllers/devicesController")

//rota get do devices
router.get('/devices', devicesController.getAllDevices);

module.exports = {
    devicesRoutes: router
}