import { Request, Response } from "express";
import { findAll, insert, findById, update, deleteById } from "../db/db";
import { productsTable } from "../db/schema/products.model";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await findAll(productsTable, { id: productsTable.id, name: productsTable.name, price: productsTable.price, availability: productsTable.availability });

    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No se encontraron productos" });
    }

    // Convertir `price` pr(string) a number antes de enviar la respuesta
    const parsed = products.map((p: any) => ({
      ...p,
      price: typeof p.price === "string" ? (p.price === null ? null : Number(p.price)) : p.price,
    }));

    return res.status(200).json({ data: parsed });
  } catch (error) {
    console.log(error)
  }
}

export const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const product = await findById(productsTable, id as unknown as number);

    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    product.price = typeof product.price === "string" ? (product.price === null ? null : Number(product.price)) : product.price,

      res.status(200).json({ data: product });
  } catch (error) {
    console.log(error)
  }
}

export const createProduct = async (req: Request, res: Response) => {
  const { name, price, availability } = req.body;

  try {
    // Insertar producto en base de datos
    const success = await insert(productsTable, { name, price, availability });

    // Manejar respuesta
    if (!success) {
      return res.status(500).json({ message: "Error al crear el producto" });
    }

    return res.status(201).json({ data: { name, price, availability } });
  } catch (error) {
    console.log(error)
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const product = await findById(productsTable, id as unknown as number);

    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    // Actualizar
    const { name, price, availability } = req.body;

    const succes = await update(productsTable, id as unknown as number, { name, price, availability, updated_at: Math.floor(Date.now() / 1000) });

    if (!succes) {
      return res.status(500).json({ error: "Error al actualizar el producto" });
    }

    res.status(200).json({ data: { name, price, availability } });
  } catch (error) {
    console.log(error)
  }
}

export const updateAvailability = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const product = await findById(productsTable, id as unknown as number);

    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    delete product.id
    product.availability = !product.availability
    const succes = await update(productsTable, id as unknown as number, { ...product, updated_at: Math.floor(Date.now() / 1000) });

    if (!succes) {
      return res.status(500).json({ message: "Error al actualizar el producto" });
    }

    res.status(200).json({ data: product });
  } catch (error) {
    console.log(error)
  }
}


export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const product = await findById(productsTable, id as unknown as number);

    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    const success = await deleteById(productsTable, id as unknown as number)

    if (success) {
      return res.status(200).json({ data: "Producto eliminado" });
    }
  } catch (error) {
    console.log(error)
  }
}