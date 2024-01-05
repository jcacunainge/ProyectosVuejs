import express from 'express'
import { services } from '../data/beautyServices.js'

const router = express.Router()
// Definir una ruta
router.get('/', (req, res) =>{
    res.json(services)
})

export default router
// WaC1f5H0F7PFkKcf