import express from "express";
import cors, { CorsOptions } from 'cors'
import morgan from 'morgan'
import router from "./router";
import swaggerUi from 'swagger-ui-express'
import swaggerSpec, { swaggerUiOptions } from "./config/swagger";

// Instancia de express
const server = express();

// Leer datos de formularioo
server.use(express.json());

// Docs (debe ir ANTES del cors restrictivo)
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions))

// Conexion cors
const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (!origin || origin === process.env.FRONTEND_URL) {
      callback(null, true)
    } else {
      callback(new Error('Error de cors'), false)
    }
  }
}
server.use(cors(corsOptions))

// rutas
server.use(morgan('dev'))
server.use("/api/products", router);

export default server;