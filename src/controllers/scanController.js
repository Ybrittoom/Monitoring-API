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

            const output = stdout.split("\n")

            const devicesFound = []

            for (let line of output) {
                const match = line.match(/(\d+\.\d+\.\d+\.\d+)\s+([a-f0-9-]+)/i)

                if (match) {
                    const ip = match[1]
                    const mac = match[2]

                    //jogando o ip e o mac para o devicesFound
                    devicesFound.push({ ip, mac })
                }

                res.json({
                    message: "Scan finalizado!!! /en: scan finished",
                    total: devicesFound.length,
                    devices: devicesFound
                })
            }

        })
    }
}

module.exports = {
    scanController
}