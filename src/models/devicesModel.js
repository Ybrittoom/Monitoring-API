//Importar o banco de dados e os tipos de dados Postgres
//utilizando desconstruçao
const { pool, getConnection } = require("../config/db")

/* 
    getAllDevices,
    findOneDevice,
    ifDeviceIsKnow,
    deleteDevice,
    createDevice,
    updateLastSeen
*/

const devicesModel = {


    //pegando todos os dispositivos da rede 
    getAllDevices: async () => {
        try {
            const pool = await getConnection() 

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

    //passar o ID do dispositivo como parametro para buscar um dispositivo especifico
    findOneDevice: async (idDispositivo) => {
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
    },

    ifDeviceIsKnow: async (mac_address) => {
        try {
            const pool = await getConnection()

            const queryPG = `
                UPDATE device 
                SET seconhecido = true
                WHERE mac = $1
                RETURNING *
            `
            // O RETURNING * serve para o banco devolver o objeto atualizado

            const result = await pool.query(queryPG, [mac_address])

            if (result.rowCount === 0) {
                console.log("AVISO: Dispositivo nao encontrado no banco de dados!!!!!")
                console.log("Retornaremos NULL")
                return null
            }

            //retornar o dispositivo que acabou de ser atualizado
            return result.rows[0]
        } catch (error) {
            console.error('Erro ao atualiza o dispositivo: ', error)
            throw error
        }
    },

    deleteDevice: async (idDispositivos) => {
        try {
            const pool = await getConnection()

            const queryPG = 'DELETE FROM device WHERE iddispositivo = $1'

            const result = await pool.query(queryPG, [idDispositivo])

            return result.rows[0]
        } catch (error) {
            console.error('Erro ao deletar o disposito: ', error)
            throw error
        }
    },

    createDevice: async (data) => {
        try {
            const pool = await getConnection()

            const queryPG = `
                INSERT INTO device (
                    nomedispositivo,
                    ipdispositivo,
                    mac,
                    vistoprimeiro,
                    vistoultimo,
                    seconhecido
                ) VaLUES (
                    $1,
                    $2,
                    $3,
                    $4,
                    $5,
                    $6
                ) RETURNING *
            `

            //E preciso desmontar, pois device é um valor inteiro
            //precisamos dizer exatamente quais dados passar 
            const values = [
                data.nomedispositivo,
                data.ipdispositivo,
                data.mac,
                data.vistoprimeiro,
                data.vistoporultimo,
                data.seconhecido
            ]

            const result = await pool.query(queryPG, values)//passa sem '[]' pois ja transformamos em array
            return result.rows[0]

        } catch (error) {
            console.error('Erro ao criar dispositivo: ', error)
            throw error
        }
    },

    updateLastSeen: async (idDispositivo) => {
        try {
            const pool = getConnection()

            const queryPG = `
                UPDATE device
                SET vistoprimeiro = NOW()
                WHERE iddispositivo = $1
                RETURNING *
            `

            const result = await pool.query(queryPG, [idDispositivo])

            return result.rows[0]
        } catch (error) {
            console.error("Erro ao carregar 'Visto Por Ultimo' : ", error)
            throw error
        }
    },

    updateIp: async (idDispositivo, ipDispositivo) => {
        try {
            const pool = getConnection()

            const queryPG = `
                UPDATE device 
                SET ipdispositivo = $1
                WHERE iddispositivo = $2
                RETURNING *
            `

            values = [
                ipDispositivo,
                idDispositivo
            ]

            const result = await pool.query(queryPG, values)

            return result.rows[0]
        } catch (error) {
            console.error("Erro ao atualiza o IP do dispositivo: ", error)
            throw error
        }
    }

}

module.exports = {
    devicesModel
}