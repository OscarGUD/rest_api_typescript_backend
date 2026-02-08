import request from "supertest";
import server from "../../server";

describe("POST /api/products", () => {
  it('should display validation errors', async () => {
    const response = await request(server).post('/api/products').send()

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(3)

    expect(response.status).not.toBe(404)
    expect(response.body.errors).not.toHaveLength(1)

  })

  it('should validate that the price is a number and greater than 0', async () => {
    const response = await request(server).post('/api/products').send(
      {
        "name": "Mouse",
        "price": 0
      }
    )

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(1)

    expect(response.status).not.toBe(404)
    expect(response.body.errors).not.toHaveLength(3)
  })

  it('should create a new product', async () => {
    const response = await request(server).post('/api/products').send(
      {
        "name": "Mouse - Testing",
        "price": 50
      }
    )

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('data')

    expect(response.status).not.toBe(400)
    expect(response.status).not.toBe(200)
    expect(response.body).not.toHaveProperty('errors')

  })
})

describe('GET /api/products', () => {
  it('should check if api/procuts url exists', async () => {
    const response = await request(server).get('/api/products')
    expect(response.status).not.toBe(404)
  })

  it('GET a JSON response with procuts', async () => {
    const response = await request(server).get('/api/products')

    expect(response.status).toBe(200)
    expect(response.headers['content-type']).toMatch(/json/)
    expect(response.body.data).toHaveLength(1)
    expect(response.body).toHaveProperty('data')

    expect(response.body).not.toHaveProperty('errors')
  })
})

describe('GET /api/products/:id', () => {
  it('should return a 404 response for a non-existent product', async () => {
    const productId = 200000
    const response = await request(server).get(`/api/products/${productId}`)

    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('error')
    expect(response.body.error).toBe('Producto no encontrado')
  })

  it('should check a valid ID in the URL', async () => {
    const response = await request(server).get(`/api/products/not-valid-url`)

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(1)
    expect(response.body.errors[0].msg).toBe("El ID debe ser un número válido")
  })
})

describe('PUT /api/products', () => {
  it('should check a valid ID in the URL', async () => {
    const response = await request(server).put(`/api/products/not-valid-url`).send({
      "name": "Monitor Nuevo - Actualizado",
      "price": 200,
      "availability": true
    })

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(1)
    expect(response.body.errors[0].msg).toBe("El ID debe ser un número válido")
  })
  it('should display validation error message when a updating a product', async () => {
    const response = await request(server).put(`/api/products/1`).send({})

    expect(response.status).toBe(400)
    expect(response.body.errors).toBeTruthy()
    expect(response.body.errors).toHaveLength(4)

    expect(response.status).not.toBe(200)
  })
  it('should validate that ther price is grater than 0', async () => {
    const response = await request(server).put(`/api/products/1`).send({
      "name": "Monitor Nuevo - Actualizado",
      "price": -200,
      "availability": true
    })

    expect(response.status).toBe(400)
    expect(response.body.errors).toBeTruthy()
    expect(response.body.errors).toHaveLength(1)
    expect(response.body.errors[0].msg).toBe("Valor no valido")

    expect(response.status).not.toBe(200)
  })
  it('should return a 404 response for a non-existent product', async () => {
    const productId = 20000
    const response = await request(server).put(`/api/products/${productId}`).send({
      "name": "Monitor Nuevo - Actualizado",
      "price": 200,
      "availability": true
    })

    expect(response.status).toBe(404)
    expect(response.body.error).toBe("Producto no encontrado")

    expect(response.status).not.toBe(200)
  })
  it('should update an existing product with a valid data', async () => {
    const productId = 50
    const response = await request(server).put(`/api/products/${productId}`).send({
      "name": "Monitor Nuevo - Actualizado",
      "price": 200,
      "availability": true
    })

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty("data")

    expect(response.status).not.toBe(400)
    expect(response.body).not.toHaveProperty("errors")

  })
})

describe('Delete /api/products/:id', () => {
  it('should check a valid ID in the URL', async () => {
    const response = await request(server).delete(`/api/products/not-valid-url`)

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(1)
    expect(response.body.errors[0].msg).toBe("El ID debe ser un número válido")
  })
  it('should return a 404 resoibse for a non-existent product', async () => {
    const productId = 20000
    const response = await request(server).delete(`/api/products/${productId}`)

    expect(response.status).toBe(404)
    expect(response.body.error).toBe("Producto no encontrado")
    expect(response.status).not.toBe(200)

  })
  it('should delete a product', async () => {
    const productId = 50
    const response = await request(server).delete(`/api/products/${productId}`)

    expect(response.status).toBe(200)
    expect(response.body.data).toBe("Producto eliminado")

    expect(response.status).not.toBe(404)

  })
})