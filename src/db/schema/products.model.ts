
import { integer, pgTable, varchar, boolean, numeric } from "drizzle-orm/pg-core";

export const productsTable = pgTable("products", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  price: numeric().notNull(),
  availability: boolean().notNull().default(true),
  created_at: integer().notNull().default(Math.floor(Date.now() / 1000)),
  updated_at: integer().notNull().default(Math.floor(Date.now() / 1000)),
});