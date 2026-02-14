const express = require("express")//pegando o express
require('dotenv').config()
const app = express()
const PORT = process.env.PORT
const {devicesRoutes} = require('./src/routes/devicesRoutes')

app.use(express.json())


app.use('/', devicesRoutes)


app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})