import { exit } from 'node:process'
import { db } from '../db/db'
import { productsTable } from '../db/schema/products.model'

const clearDB = async () => {
  try {
    await db.delete(productsTable)
    console.log('Datos eliminados correctamente')
    exit()
  } catch (error) {
    console.log(error)
    exit(1)
  }
}

if (process.argv[2] === '--clear') {
  clearDB()
}