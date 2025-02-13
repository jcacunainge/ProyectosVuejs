import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Barbería",
      version: "1.0.0",
      description: "Documentación de la API de gestión de citas",
    },
    servers: [
      {
        url: "http://localhost:4000",
        description: "Servidor de desarrollo",
      },
    ],
  },
  apis: ["./routes/*.js"], // Rutas donde estarán los comentarios de Swagger
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

const swaggerDocs = (app) => {
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export default swaggerDocs;
