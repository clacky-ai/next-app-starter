// Schema Definition Template
// Location: lib/db/schema.ts - ALWAYS start here first

import { pgTable, serial, varchar, text, integer, timestamp, decimal, boolean } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

// Table definition - replace {{ENTITY_PLURAL}} with actual table name (e.g., "books")
export const {{ENTITY_PLURAL}} = pgTable('{{ENTITY_PLURAL}}', {
  id: serial('id').primaryKey(),
  // Add your fields here - examples:
  // title: varchar('title', { length: 255 }).notNull(),
  // author: varchar('author', { length: 255 }).notNull(),
  // stock: integer('stock').notNull().default(0),
  // price: decimal('price', { precision: 10, scale: 2 }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  deletedAt: timestamp('deleted_at'), // Soft delete support
});

// Relations (if needed)
export const {{ENTITY_PLURAL}}Relations = relations({{ENTITY_PLURAL}}, ({ many, one }) => ({
  // Define relationships here
}));

// Auto-generated drizzle-zod schemas
export const insert{{ENTITY}}Schema = createInsertSchema({{ENTITY_PLURAL}}, {
  // Add custom validation rules here
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const select{{ENTITY}}Schema = createSelectSchema({{ENTITY_PLURAL}});
export const update{{ENTITY}}Schema = insert{{ENTITY}}Schema.partial();

// Auto-inferred types
export type {{ENTITY}} = typeof {{ENTITY_PLURAL}}.$inferSelect;
export type New{{ENTITY}} = typeof {{ENTITY_PLURAL}}.$inferInsert;
export type Insert{{ENTITY}} = z.infer<typeof insert{{ENTITY}}Schema>;
export type Update{{ENTITY}} = z.infer<typeof update{{ENTITY}}Schema>;
