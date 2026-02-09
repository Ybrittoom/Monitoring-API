//Importar o banco de dados e os tipos de dados Postgres
//utilizando desconstruçao
const { pool, getConnection } = require("../config/db")

/*ENDPOINT : {
    LISTAR TODOS 
    BUSCAR UM DISPOSITIVO POR ID
    MARCA UM DISPOSITIVO COMO CONHECIDO OU DESCONHECIDO
    ATUALIZAR IP DO DISPOSITIVO
    DELETAR DISPOSITIVO
}*/

const devicesModel = {


    //pegando todos os dispositivos da rede 
    listaDispositivos: async () => {
        try {
            const pool = await getConnection() //pegando a funçao e esperando ela acontecer com o "await"

            let queryPG = "select * from device" //comando para buscar todos os dispositivos da tabela

            //No postgres, usamos direto o pool.query ou pegamos um client
            const result = await pool.query(queryPG)
            /*No pg, você pode disparar a query direto do pool. 
            Ele mesmo se encarrega de pegar uma conexão, 
            rodar o comando e devolver a conexão para o "balcão" (pool) automaticamente.*/

            return result.rows//Em postgres usamos .rows  
        } catch (error) {
            console.error('Erro ao listar todos os produtos:', error)
            throw error
        }
    },

    buscarUmDispositivo: async () => {
        try {
            const pool = await getConnection()

            const queryPG = `
                select * from device where iddispositivo = $1
            `

            const result = await pool.query(queryPG, [idDispositivo])

            return result.rows[0]

        } catch (error) {
            console.error('Erro ao buscar um dispositivo: ', error)
            throw error
        }   
    }

}

module.exports = {
    devicesModel
}