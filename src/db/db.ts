import { drizzle } from "drizzle-orm/node-postgres"
import dotenv from "dotenv";
import colors from "colors";
import { eq } from "drizzle-orm";
import { PgTable } from "drizzle-orm/pg-core";
dotenv.config({ debug: false });

const DATABASE_URL = process.env.DATABASE_URL;

const db = drizzle(DATABASE_URL!);

const insert = async (table: any, values: Object): Promise<boolean> => {
  try {
    await db.insert(table).values(values);
    return true
  } catch (error) {
    console.log(error)
    console.log(colors.red.bold("Error al insertar el producto en la base de datos"));
  }
}

const findAll = async (table: any, options: any): Promise<any[]> => {
  try {
    const results = await db.select(options || null).from(table);
    return results;
  } catch (error) {
    console.log(error)
    console.log(colors.red.bold("Error al obtener los productos de la base de datos"));
    return [];
  }
}

const findById = async <T extends PgTable>(
  table: T,
  id: number
): Promise<any | null> => {
  try {
    const result = await db
      .select()
      .from(table as any)
      .where(eq((table as any).id, id))
      .limit(1);

    return result[0] ?? null;
  } catch (error) {
    console.log(error);
    console.log(colors.red.bold("Error al obtener el registro"));
    return null;
  }
};

const update = async (table: any, id: number, values: Object): Promise<boolean> => {
  try {
    await db.update(table).set(values).where(eq(table.id, id));
    return true;
  } catch (error) {
    console.log(error)
    console.log(colors.red.bold("Error al actualizar el producto en la base de datos"));
    return false;
  }
}

const deleteById = async (table: any, id: number): Promise<boolean> => {
  try {
    await db.delete(table).where(eq(table.id, id));
    return true;
  } catch (error) {
    console.log(error);
    console.log(colors.red.bold("Error al eliminar el producto en la base de datos"));
    return false;
  }
};

export {
  db,
  insert,
  findAll,
  findById,
  update,
  deleteById
}

