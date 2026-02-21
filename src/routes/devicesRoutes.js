const express = require('express')
const router = express.Router()
const { devicesController } = require("../controllers/devicesController")
const { scanController } = require("../controllers/scanController")

//rota get do devices
router.get('/devices', devicesController.getAllDevices);

//rota post do scan
router.post('/scan', scanController.scanNetWork)

module.exports = {
    devicesRoutes: router,
    scanRoutes: router
}