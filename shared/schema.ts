import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const tickets = pgTable("tickets", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  categoria: text("categoria").notNull().default("Melhoria"),
  problemaDescricao: text("problema_descricao").notNull(),
  titulo: text("titulo").notNull(),
  sistema: text("sistema").notNull(),
  naoConsegue: text("nao_consegue").notNull(),
  replicacao: text("replicacao").notNull(),
  frequencia: text("frequencia").notNull(),
  impedimento: text("impedimento").notNull(),
  criticidade: text("criticidade").notNull(),
  evidencias: text("evidencias").array(),
  solicitanteNome: text("solicitante_nome").notNull(),
  solicitanteSobrenome: text("solicitante_sobrenome").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertTicketSchema = createInsertSchema(tickets).omit({
  id: true,
  categoria: true,
  createdAt: true,
});

export type InsertTicket = z.infer<typeof insertTicketSchema>;
export type Ticket = typeof tickets.$inferSelect;
