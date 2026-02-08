import { Router } from "express";
import { createProduct, getProductById, getProducts, updateProduct, updateAvailability, deleteProduct } from "./handlers/product";
import { body, param } from "express-validator";
import { handleInputErrors } from "./middleware";

const router = Router();
/**
 * @swagger
 * components:
 *  schemas:
 *    Product:
 *      type: Object
 *      properties: 
 *        id: 
 *          type: Integer
 *          description: The Product Id
 *          example: 1
 *        name:
 *          type: String
 *          description: The Product Name
 *          example: Monitor Curvo de 49 Pulgadas
 *        price: 
 *         type: Number
 *         description: The Product Price
 *         example: 300
 *        availability: 
 *         type: Boolean
 *         description: The Product availability
 *         example: true
 */

/**
 * @swagger
 * /api/products:
 *  get:
 *    summary: Get a list of products
 *    tags: 
 *      - Products
 *    description: Return a list of products
 *    responses: 
 *      200: 
 *          description: Succesful repsonse
 *          content: 
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Product'
 * 
 * 
 * 
 */
router.get("/", getProducts);

/**
 * @swagger
 * /api/products/{id}:
 *  get:
 *    summary: Get a product by id
 *    tags: 
 *      - Products
 *    description: Return a product based on its unique ID
 *    parameters: 
 *    - in: path
 *      name: id
 *      description: The id of the product to retrive
 *      requiered: true
 *      schema:
 *        type: integer
 *    responses: 
 *      200:
 *        description: succesfull response
 *        content: 
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Product'
 *      400:
 *        description: Bad Request - Invalid Id
 *      404: 
 *        description: Not Found
 *     
 * 
 */
router.get("/:id",
  param("id", "El ID debe ser un número válido").isInt(),
  handleInputErrors,
  getProductById);

/***
 * @swagger
 * /api/products:
 *  post:
 *    summary: Creates a new product
 *    tags:
 *      - Products
 *    description:  Returns a new record in the database
 *    responses:
 *      201:
 *        description: Succesful response
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      400:
 *        description: Bad Request - Invalid input data
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name: 
 *                type: string
 *                example: "Monitor Curvo 49 pulgadas"
 *              price:
 *                type: number
 *                example: 399
 */
router.post("/",
  // Validar datos de entrada
  body('name', 'El nombre es obligatorio').notEmpty(),
  body('price')
    .isFloat({ gt: 0 }).withMessage("Valor no valido")
    .notEmpty().withMessage("El precio es obligatorio"),
  handleInputErrors,
  createProduct)

/***
 * @swagger
 * /api/products/{id}:
 *  put:
 *    summary: Updates a product with user info
 *    tags:
 *      - Products
 *    description: Returns the updated product
 *    parameters: 
 *    - in: path
 *      name: id
 *      description: The id of the product to retrive
 *      requiered: true
 *      schema:
 *        type: integer
 *    responses:
 *      200:
 *        description: Succesful response
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      400:
 *        description: Bad Request - Invalid id or Invalid input data
 *      404:
 *        description: Product Not Found
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name: 
 *                type: string
 *                example: "Monitor Curvo 49 pulgadas"
 *              price:
 *                type: number
 *                example: 399
 *              availability:
 *                type: boolean
 *                example: true
 */
router.put("/:id",
  // Validar datos de entrada
  param("id", "El ID debe ser un número válido").isInt(),
  body('name', 'El nombre es obligatorio').notEmpty(),
  body('price')
    .isFloat({ gt: 0 }).withMessage("Valor no valido")
    .notEmpty().withMessage("El precio es obligatorio"),
  body('availability').isBoolean().withMessage('El valor de "availability válido"'),
  handleInputErrors,
  updateProduct)

/**
 * @swagger
 * /api/products/{id}:
 *  patch:
 *    summary: update product availability
 *    tags:
 *      - Products
 *    description: Returns eht updated availability
 *    parameters: 
 *    - in: path
 *      name: id
 *      description: The id of the product to retrive
 *      requiered: true
 *      schema:
 *        type: integer
 *    responses:
 *      200:
 *        description: Succesful response
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      400:
 *        description: Bad Request - Invalid id
 *      404:
 *        description: Product Not Found
 * 
 */
router.patch("/:id",
  param("id", "El ID debe ser un número válido").isInt(),
  handleInputErrors,
  updateAvailability)

/**
 * @swagger
 * /api/products/{id}:
 *  delete:
 *    summary: Deletes a product by a given Id
 *    tags:
 *      - Products
 *    description: Returns a confirmation message
 *    parameters: 
 *    - in: path
 *      name: id
 *      description: The id of the product to delete
 *      requiered: true
 *      schema:
 *        type: integer
 *    responses:
 *      200:
 *        description: Succesful response
 *        content:
 *          application/json:
 *            schema:
 *              type: string
 *              value: Producto eliminado
 *      404:
 *        description: Product Not Found
 * 
 */
router.delete("/:id",
  param("id", "El ID debe ser un número válido").isInt(),
  handleInputErrors,
  deleteProduct
)

export default router;