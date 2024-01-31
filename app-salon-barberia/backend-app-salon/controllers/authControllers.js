// Importa el modelo de usuario y la función para enviar correos electrónicos de verificación
import User from '../models/User.js'
import { sendEmailVerification } from '../email/authEmailService.js'
import { generateJWT } from '../utils/index.js'

// Controlador para el registro de usuarios
const register = async (req, res) => {
    // Valida si algún campo está vacío
    if (Object.values(req.body).includes('')) {
        const error = new Error('Todos los campos son obligatorios')
        return res.status(400).json({
            msg: error.message
        })
    }

    // Extrae campos del cuerpo de la solicitud
    const { email, password, name } = req.body

    // Evita registros duplicados verificando si el usuario ya existe
    const userExist = await User.findOne({ email })
    if (userExist) {
        const error = new Error('El usuario ya se encuentra registrado')
        return res.status(400).json({
            msg: error.message
        })
    }

    // Valida la longitud mínima del password
    const MIN_PASSWORD_LENGTH = 8
    if (password.trim().length < MIN_PASSWORD_LENGTH) {
        const error = new Error(`El password debe tener al menos ${MIN_PASSWORD_LENGTH} caracteres`)
        return res.status(400).json({
            msg: error.message
        })
    }

    try {
        // Crea un nuevo objeto de usuario
        const user = new User(req.body)

        // Guarda el usuario en la base de datos
        const result = await user.save()

        // Extrae información del resultado
        const { name, email, token } = result

        // Envia un correo electrónico de verificación
        sendEmailVerification({ name, email, token })

        // Responde con un mensaje de éxito
        res.json({ msg: 'El Servicio se creó correctamente, revisa tu email' })
    } catch (error) {
        // Maneja errores de forma general
        console.log(error)
       
    }
}

// Controlador para verificar la cuenta a través del token proporcionado
const verifyAccount = async (req, res) => {
    // Extrae el token de los parámetros de la solicitud
    const { token } = req.params

    // Busca un usuario con el token proporcionado
    const user = await User.findOne({ token })

    // Si no se encuentra un usuario con el token, responde con un error
    if (!user) {
        const error = new Error('Hubo un error, token no válido')
        return res.status(401).json({ msg: error.message })
    }

    // Si el usuario es válido, confirma la cuenta actualizando el estado de verificación y eliminando el token
    try {
        user.verified = true
        user.token = ''
        await user.save()
        // Responde con un mensaje de éxito
        res.json({ msg: 'Usuario Confirmado Correctamente' })
    } catch (error) {
        // Maneja errores de forma general
        console.log(error)
        
    }
}

const login = async (req, res) => {
    const { email, password } = req.body
    //Revizar que el usuario existe
    const user = await User.findOne({email})
    if(!user){
        const error = new Error('El usuario no existe')
        return res.status(401).json({ msg: error.message }) 
    }
    //Revizar que el usuario confirma su cuenta
    if(!user.verified){
        const error = new Error('Tu cuenta no ha sido confirma aún')
        return res.status(401).json({ msg: error.message }) 
    } 
    //Comprobar el password
    if( await user.checkPassword(password)) {
        const token = generateJWT(user._id)
        res.json({
            token
        })
    }
    else{
        const error = new Error('El password es Incorrecto')
        return res.status(401).json({ msg: error.message })
    }
}

const user = async (req, res) => {
    const { user } = req
    res.json(
        user
    )
}

// Exporta los controladores para su uso en otras partes de la aplicación
export {
    register,
    verifyAccount,
    login,
    user
}
