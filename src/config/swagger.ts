import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

const options: swaggerJSDoc.Options = {
  swaggerDefinition: {
    openapi: '3.0.2',
    tags: [
      {
        name: 'Products',
        description: "API ipretaions related to products"
      }
    ],
    info: {
      title: 'REST API Node.js / Express / Typescript',
      version: '1.0.0',
      description: 'API Docs for products'
    }
  },
  apis: [
    './src/router.ts'
  ]
}

const swaggerUiOptions: SwaggerUiOptions = {
  customCss: `
    .topbar-wrapper .link {

    }
  `,
  customSiteTitle: "Documentación REST API Express / Typescript"
}

const swaggerSpec = swaggerJSDoc(options)

export default swaggerSpec
export {
  swaggerUiOptions
}