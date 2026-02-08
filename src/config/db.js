const { Pool } = require('pg')
require('dotenv').config() //carregar as variaveis de ambiente

//configurando o Pool com as variaveis do arq, .env
const pool = new Pool ({
    user:process.env.DB_USER ,
    host:process.env.DB_HOST ,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    dbPort: process.env.DB_PORT,
    port: process.env.DB_PORT
})

async function getConnection() {
    try {
        const client = await pool.connect()
        return client
    } catch (error) {
        console.error("Erro ao conectar com o Banco de dados!!!")
        throw error
    }
}


(async () => {
  try {
    const client = await getConnection()
    console.log('Conectado ao PostgreSQL com sucesso 🚀')
    client.release()
  } catch (err) {
    console.error(err)
  }
})()
