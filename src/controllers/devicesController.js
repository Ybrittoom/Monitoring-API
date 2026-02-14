const { devicesModel } = require('../models/devicesModel')

const devicesController = {

    //PEGAR TODOS OS DISPOSITIVOS DA REDE
    getAllDevices: async (req, res) => {
        try {
            // pegar a funçao do model
            const getDevices = await devicesModel.getAllDevices()

            res.status(200).json(getDevices)
        } catch (error) {
            console.log('Erro ao listar os dispositivos: ', error)
            res.status(500).json({
                error: 'Erro ao listar os dispositivos'
            })
        }
    },

    //vamos passar o ID do dispositivo como parametro para buscar um dispositivo especifico
    findOneDevice: async (req, res) => {
        try {
            // Pegar o id do dispositivo da url
            const { idDispositivo} = req.params

            const device = await devicesModel.findOneDevice(idDispositivo)

            console.log("Dispsitivo encontrado: ", device)
            res.status(200).json(device)
        } catch (error) {
            console.error("Erro ao buscar dispositivo por id: ", error)
            res.status(500).json({
                error: "Erro ao buscar dispositivo por id"
            })
        }
    },

    ifDeviceIsKnow: async (req, res) => {
        try {
            // Pegar o mac_address do dispositivo do corpo da requisição
            const { mac_address } = req.body

            //validar se foi enviado o mac_address
            if (!mac_address) {
                return res.status(400).json({
                    error: "O campo mac_address é obrigatorio"
                })
            }

            const device = await devicesModel.ifDeviceIsKnow(mac_address)
            res.status(200).json(device)

        } catch (error) {
            console.error("Erro ao verificar o status do dispositivo(conhecido ou nao): ", error)
            res.status(500).json({
                error: "Erro ao verificar o status do dispositivo(conhecido ou nao)"
            })
        }
    }, 

    //deletar um dispositivo do db pelo ID(apenas deleta do DB, nunca da rede!!!!)
    deleteDevice: async (req, res) => {
        try {
            const { idDispositivo } = req.params

            console.log("Id:" , idDispositivo)

            const device = await devicesModel.deleteDevice(idDispositivo)

            res.status(200).json({ 
                message: "Dispositivo deletado com sucesso"
            })
        } catch (error) {
            console.error("Erro ao deletar dispositivo: ", error)
            res.status(500).json({
                error: "Erro ao deletar dispositivo"
            })
        }
    },

}