import express from "express";
import cors, { CorsOptions } from 'cors'
import morgan from 'morgan'
import router from "./router";
import swaggerUi from 'swagger-ui-express'
import swaggerSpec, { swaggerUiOptions } from "./config/swagger";

// Instancia de express
const server = express();

// Conexion cors
const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (origin === process.env.FRONTEND_URL) {
      callback(null, true)
    } else {
      callback(new Error('Error de cors'), false)
    }
  }
}
server.use(cors(corsOptions))

// Leer datos de formularioo
server.use(express.json());

// rutas
server.use(morgan('dev'))
server.use("/api/products", router);

// Docs
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions))

export default server;