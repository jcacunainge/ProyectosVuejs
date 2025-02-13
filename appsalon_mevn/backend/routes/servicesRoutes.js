import express from 'express'
import { createService, getServices, getServiceById, updateService, deleteService } from '../controllers/servicesController.js'

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Services
 *   description: Endpoints para gestionar servicios
 */

/**
 * @swagger
 * /api/services:
 *   post:
 *     summary: Crea un nuevo servicio
 *     tags: [Services]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Corte de cabello
 *               price:
 *                 type: number
 *                 example: 20.00
 *     responses:
 *       201:
 *         description: Servicio creado exitosamente
 *       400:
 *         description: Error en la solicitud
 */
router.post('/', createService)

/**
 * @swagger
 * /api/services:
 *   get:
 *     summary: Obtiene todos los servicios
 *     tags: [Services]
 *     responses:
 *       200:
 *         description: Lista de servicios obtenida correctamente
 *       500:
 *         description: Error en el servidor
 */
router.get('/', getServices)

/**
 * @swagger
 * /api/services/{id}:
 *   get:
 *     summary: Obtiene un servicio por su ID
 *     tags: [Services]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del servicio
 *     responses:
 *       200:
 *         description: Servicio encontrado
 *       404:
 *         description: Servicio no encontrado
 */
router.get('/:id', getServiceById)

/**
 * @swagger
 * /api/services/{id}:
 *   put:
 *     summary: Actualiza un servicio por su ID
 *     tags: [Services]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del servicio
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Corte y lavado
 *               price:
 *                 type: number
 *                 example: 25.00
 *     responses:
 *       200:
 *         description: Servicio actualizado correctamente
 *       404:
 *         description: Servicio no encontrado
 *       400:
 *         description: Error en la solicitud
 */
router.put('/:id', updateService)

/**
 * @swagger
 * /api/services/{id}:
 *   delete:
 *     summary: Elimina un servicio por su ID
 *     tags: [Services]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del servicio
 *     responses:
 *       200:
 *         description: Servicio eliminado correctamente
 *       404:
 *         description: Servicio no encontrado
 */
router.delete('/:id', deleteService)

export default router
