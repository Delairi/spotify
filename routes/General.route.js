import express from 'express'
import GeneralController from '../controllers/General.controller.js'
const routerGeneral = express.Router()

routerGeneral.get('/token', async (req, res) => {

    try {

        const token = await GeneralController().GetToken(req, res)
        res.send(token)

    } catch (err) {

        res.status(500).json({ message: err.message })

    }

})

routerGeneral.get('/search', async (req, res) => {

    try {

        const search = await GeneralController().Search(req, res)
        res.send(search)

    } catch (err) {

        res.status(500).send(err)

    }

})

export default routerGeneral;