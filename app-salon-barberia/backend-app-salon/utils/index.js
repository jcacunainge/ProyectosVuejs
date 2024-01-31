import mongoose from "mongoose"
import jwt from "jsonwebtoken"

// Función para validar si un ID de MongoDB es válido
function validateObjectId(id, res){
    if(!mongoose.Types.ObjectId.isValid(id)){
        const error = new Error('El ID no es válido')
        return res.status(400).json({
            msg: error.message
        })
    }
}

// Función para manejar errores de "no encontrado" (404)
function handleNotFoundError(message, res){
    const error = new Error(message)
    return res.status(404).json({
        msg: error.message
    })
}

// Función para generar un ID único basado en la fecha actual y una parte aleatoria
const uniqueId = () => Date.now().toString(32) + Math.random().toString(32).substring(2)

const generateJWT = (id) => {
    const token = jwt.sign( { id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
    return token
}
 


// Exporta las funciones para que puedan ser utilizadas en otros archivos
export {
    validateObjectId,
    handleNotFoundError,
    uniqueId ,
    generateJWT
}

