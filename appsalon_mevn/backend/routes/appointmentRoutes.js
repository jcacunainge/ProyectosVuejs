import express from "express";
import {
  createAppointment,
  getAppointmentsByDate,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
} from "../controllers/appointmentController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Appointments
 *   description: Endpoints para la gestión de citas
 */

/**
 * @swagger
 * /api/appointments:
 *   post:
 *     summary: Crear una nueva cita
 *     tags: [Appointments]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-02-13T10:00:00.000Z"
 *               client:
 *                 type: string
 *                 example: "John Doe"
 *               service:
 *                 type: string
 *                 example: "Corte de cabello"
 *     responses:
 *       201:
 *         description: Cita creada exitosamente
 *       400:
 *         description: Error en la solicitud
 */
router.post("/", authMiddleware, createAppointment);

/**
 * @swagger
 * /api/appointments:
 *   get:
 *     summary: Obtener citas por fecha
 *     tags: [Appointments]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         description: Fecha de las citas a obtener (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Lista de citas obtenida correctamente
 *       401:
 *         description: No autorizado
 */
router.get("/", authMiddleware, getAppointmentsByDate);

/**
 * @swagger
 * /api/appointments/{id}:
 *   get:
 *     summary: Obtener una cita por ID
 *     tags: [Appointments]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la cita
 *     responses:
 *       200:
 *         description: Cita encontrada
 *       404:
 *         description: Cita no encontrada
 */
router.get("/:id", authMiddleware, getAppointmentById);

/**
 * @swagger
 * /api/appointments/{id}:
 *   put:
 *     summary: Actualizar una cita
 *     tags: [Appointments]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la cita
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-02-14T12:00:00.000Z"
 *               client:
 *                 type: string
 *                 example: "Jane Doe"
 *               service:
 *                 type: string
 *                 example: "Afeitado"
 *     responses:
 *       200:
 *         description: Cita actualizada correctamente
 *       404:
 *         description: Cita no encontrada
 */
router.put("/:id", authMiddleware, updateAppointment);

/**
 * @swagger
 * /api/appointments/{id}:
 *   delete:
 *     summary: Eliminar una cita
 *     tags: [Appointments]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la cita
 *     responses:
 *       200:
 *         description: Cita eliminada correctamente
 *       404:
 *         description: Cita no encontrada
 */
router.delete("/:id", authMiddleware, deleteAppointment);

export default router;
