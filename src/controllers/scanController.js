const { exec } = require('child_process')
const { devicesModel } = require('../models/devicesModel')
const { error } = require('console')
const { stdout, stderr } = require('process')

const scanController = {
    
    scanNetWork: async (req, res) => {
        exec("arp -a", async (error, stdout, stderr) => {
            if (error) {
                console.error("Erro no scan")
                return res.status(500).json({
                    error: 'Erro ao executar o scan'
                })
            }
        })
    }
}