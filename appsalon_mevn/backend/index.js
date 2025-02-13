import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import { db } from "./config/db.js";
import servicesRoutes from "./routes/servicesRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import swaggerDocs from "./config/swagger.js"; // Importar Swagger

// Variables de entorno
dotenv.config();

// Configurar la app
const app = express();

// Leer datos via body
app.use(express.json());

// Conectar a BD
db();

// Configurar CORS correctamente
app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

// O permite todas las conexiones (solo en desarrollo)
app.use(cors())




// Definir rutas
app.use("/api/services", servicesRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/users", userRoutes);

// Integrar Swagger
swaggerDocs(app);

// Definir puerto
const PORT = process.env.PORT || 4000;

// Arrancar la app
app.listen(PORT, () => {
  console.log(
    colors.blue("El servidor se está ejecutando en el puerto:"),
    colors.blue.bold(PORT)
  );
  console.log(colors.green("📖 Documentación disponible en: http://localhost:" + PORT + "/api/docs"));
});
