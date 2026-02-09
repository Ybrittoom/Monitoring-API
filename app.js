const express = require("express")//pegando o express
require('dotenv').config()
const app = express()
const PORT = process.env.PORT

app.use(express.json())



app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})