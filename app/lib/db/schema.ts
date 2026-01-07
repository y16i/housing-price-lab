import { pgTable, serial, integer, varchar } from 'drizzle-orm/pg-core';

export const houses = pgTable('houses', {
  id: serial('id').primaryKey(),
  age_years: integer('age_years').notNull(),
  layout: varchar('layout', { length: 10 }).notNull(),
  location: varchar('location', { length: 255 }).notNull(),
  floor: integer('floor').notNull(),
  price_million_yen: integer('price_million_yen').notNull(),
});

export type House = typeof houses.$inferSelect;
export type NewHouse = typeof houses.$inferInsert;
