import express from 'express'
import { register, verifyAccount, login, user, forgotPassword, verifyPasswordResetToken, updatePassword, admin } from '../controllers/authController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Endpoints de autenticación y gestión de usuarios
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registra un nuevo usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *       400:
 *         description: Error en la solicitud
 */
router.post('/register', register)

/**
 * @swagger
 * /api/auth/verify/{token}:
 *   get:
 *     summary: Verifica la cuenta de un usuario con un token
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Token de verificación
 *     responses:
 *       200:
 *         description: Cuenta verificada
 *       400:
 *         description: Token inválido o expirado
 */
router.get('/verify/:token', verifyAccount)

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Inicia sesión y devuelve un token JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *       401:
 *         description: Credenciales incorrectas
 */
router.post('/login', login)

/**
 * @swagger
 * /api/auth/forgot-password:
 *   post:
 *     summary: Solicita un enlace para restablecer la contraseña
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Enlace enviado al correo
 *       400:
 *         description: Error en la solicitud
 */
router.post('/forgot-password', forgotPassword)

/**
 * @swagger
 * /api/auth/forgot-password/{token}:
 *   get:
 *     summary: Verifica si el token de restablecimiento de contraseña es válido
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Token de restablecimiento
 *     responses:
 *       200:
 *         description: Token válido
 *       400:
 *         description: Token inválido o expirado
 *   post:
 *     summary: Restablece la contraseña del usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contraseña actualizada correctamente
 *       400:
 *         description: Error en la solicitud
 */
router.route('/forgot-password/:token')
    .get(verifyPasswordResetToken)
    .post(updatePassword)

/**
 * @swagger
 * /api/auth/user:
 *   get:
 *     summary: Obtiene la información del usuario autenticado
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Información del usuario
 *       401:
 *         description: No autorizado
 */
router.get('/user', authMiddleware, user)

/**
 * @swagger
 * /api/auth/admin:
 *   get:
 *     summary: Accede al área de administración (requiere JWT)
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Acceso permitido
 *       403:
 *         description: Acceso denegado
 */
router.get('/admin', authMiddleware, admin)

export default router
