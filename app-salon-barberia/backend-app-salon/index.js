import express  from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import cors from 'cors'
import { db } from './config/db.js'
import servicesRoutes from './routes/servicesRoutes.js'

//Variables de entorno
dotenv.config()

//Configurar la app
const app = express()

//Leer datos via body
app.use(express.json())

//Conectar a la bases de datos
db()

//Definir y configurar CORS

const whiteList = [process.env.FRONTEND_URL]

const corsOptions = {
    origin: function(origin, callback) {
        if(whiteList.includes(origin)){
            //Permite la conexión
            callback(null, true)
        } else {
            //No permitir la conexión
            callback(new Error('Error de CORS'))
        }

    }
}
app.use(cors(corsOptions))


//Definir una ruta
app.use('/api/services', servicesRoutes)

//Definir puerto
const PORT = process.env.PORT || 4000 

//Arrancar la app
app.listen(PORT, () => {
    console.log( colors.blue('El servidor se esta ejecutando en el puerto', PORT))
})