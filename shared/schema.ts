import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, serial, boolean } from "drizzle-orm/pg-core";
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
  ticketNumber: serial("ticket_number").notNull().unique(),
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
  status: text("status").notNull().default("Chamados abertos"),
  prioridade: text("prioridade").notNull().default("Média"),
  responsavel: text("responsavel"),
  etiquetas: text("etiquetas").array(),
  seguidores: text("seguidores").array(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  finalizadoEm: timestamp("finalizado_em"),
  arquivadoEm: timestamp("arquivado_em"),
  arquivado: boolean("arquivado").notNull().default(false),
});

export const insertTicketSchema = createInsertSchema(tickets).omit({
  id: true,
  ticketNumber: true,
  categoria: true,
  status: true,
  prioridade: true,
  responsavel: true,
  etiquetas: true,
  seguidores: true,
  createdAt: true,
  updatedAt: true,
  finalizadoEm: true,
  arquivadoEm: true,
  arquivado: true,
});

export type InsertTicket = z.infer<typeof insertTicketSchema>;
export type Ticket = typeof tickets.$inferSelect;

export const ticketComments = pgTable("ticket_comments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  ticketId: varchar("ticket_id").notNull().references(() => tickets.id, { onDelete: 'cascade' }),
  author: text("author").notNull(),
  content: text("content").notNull(),
  mentions: text("mentions").array(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertCommentSchema = createInsertSchema(ticketComments).omit({
  id: true,
  createdAt: true,
});

export type InsertComment = z.infer<typeof insertCommentSchema>;
export type TicketComment = typeof ticketComments.$inferSelect;

export const ticketHistory = pgTable("ticket_history", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  ticketId: varchar("ticket_id").notNull().references(() => tickets.id, { onDelete: 'cascade' }),
  action: text("action").notNull(),
  field: text("field"),
  oldValue: text("old_value"),
  newValue: text("new_value"),
  author: text("author").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertHistorySchema = createInsertSchema(ticketHistory).omit({
  id: true,
  createdAt: true,
});

export type InsertHistory = z.infer<typeof insertHistorySchema>;
export type TicketHistory = typeof ticketHistory.$inferSelect;
