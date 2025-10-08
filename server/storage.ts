import { type User, type InsertUser, type Ticket, type InsertTicket, type TicketComment, type InsertComment, type TicketHistory, type InsertHistory } from "@shared/schema";
import { randomUUID } from "crypto";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createTicket(ticket: InsertTicket): Promise<Ticket>;
  getTicket(id: string): Promise<Ticket | undefined>;
  getAllTickets(): Promise<Ticket[]>;
  getArchivedTickets(): Promise<Ticket[]>;
  updateTicketStatus(id: string, status: string, author: string): Promise<Ticket | undefined>;
  updateTicketPriority(id: string, prioridade: string, author: string): Promise<Ticket | undefined>;
  updateTicketResponsavel(id: string, responsavel: string | null, author: string): Promise<Ticket | undefined>;
  updateTicket(id: string, updates: Partial<Ticket>, author: string): Promise<Ticket | undefined>;
  archiveTicket(id: string): Promise<Ticket | undefined>;
  autoArchiveOldTickets(): Promise<number>;
  updateEvidencias(id: string, evidencias: string[], author: string): Promise<Ticket | undefined>;
  addComment(comment: InsertComment): Promise<TicketComment>;
  getCommentsByTicket(ticketId: string): Promise<TicketComment[]>;
  getHistoryByTicket(ticketId: string): Promise<TicketHistory[]>;
  addHistory(history: InsertHistory): Promise<TicketHistory>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private tickets: Map<string, Ticket>;
  private comments: Map<string, TicketComment>;
  private history: Map<string, TicketHistory>;
  private ticketNumberCounter: number;

  constructor() {
    this.users = new Map();
    this.tickets = new Map();
    this.comments = new Map();
    this.history = new Map();
    this.ticketNumberCounter = 1;
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createTicket(insertTicket: InsertTicket): Promise<Ticket> {
    const id = randomUUID();
    const ticket: Ticket = {
      ...insertTicket,
      id,
      ticketNumber: this.ticketNumberCounter++,
      categoria: "Melhoria",
      evidencias: insertTicket.evidencias ?? null,
      status: "Chamados abertos",
      prioridade: "Média",
      responsavel: null,
      etiquetas: null,
      seguidores: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      finalizadoEm: null,
      arquivadoEm: null,
      arquivado: false,
    };
    this.tickets.set(id, ticket);
    return ticket;
  }

  async getTicket(id: string): Promise<Ticket | undefined> {
    return this.tickets.get(id);
  }

  async getAllTickets(): Promise<Ticket[]> {
    await this.autoArchiveOldTickets();
    return Array.from(this.tickets.values()).filter(t => !t.arquivado);
  }

  async getArchivedTickets(): Promise<Ticket[]> {
    return Array.from(this.tickets.values()).filter(t => t.arquivado);
  }

  async updateTicketStatus(id: string, status: string, author: string): Promise<Ticket | undefined> {
    const ticket = this.tickets.get(id);
    if (!ticket) return undefined;
    
    const oldStatus = ticket.status;
    ticket.status = status;
    ticket.updatedAt = new Date();
    
    if (status === "Finalizados" && !ticket.finalizadoEm) {
      ticket.finalizadoEm = new Date();
    }
    
    this.tickets.set(id, ticket);
    
    await this.addHistory({
      ticketId: id,
      action: "status_changed",
      field: "status",
      oldValue: oldStatus,
      newValue: status,
      author,
    });
    
    return ticket;
  }

  async updateTicketPriority(id: string, prioridade: string, author: string): Promise<Ticket | undefined> {
    const ticket = this.tickets.get(id);
    if (!ticket) return undefined;
    
    const oldPriority = ticket.prioridade;
    ticket.prioridade = prioridade;
    ticket.updatedAt = new Date();
    this.tickets.set(id, ticket);
    
    await this.addHistory({
      ticketId: id,
      action: "priority_changed",
      field: "prioridade",
      oldValue: oldPriority,
      newValue: prioridade,
      author,
    });
    
    return ticket;
  }

  async updateTicketResponsavel(id: string, responsavel: string | null, author: string): Promise<Ticket | undefined> {
    const ticket = this.tickets.get(id);
    if (!ticket) return undefined;
    
    const oldResponsavel = ticket.responsavel;
    ticket.responsavel = responsavel;
    ticket.updatedAt = new Date();
    this.tickets.set(id, ticket);
    
    await this.addHistory({
      ticketId: id,
      action: "assignee_changed",
      field: "responsavel",
      oldValue: oldResponsavel || "",
      newValue: responsavel || "",
      author,
    });
    
    return ticket;
  }

  async updateTicket(id: string, updates: Partial<Ticket>, author: string): Promise<Ticket | undefined> {
    const ticket = this.tickets.get(id);
    if (!ticket) return undefined;
    
    const updatedTicket = { ...ticket, ...updates, updatedAt: new Date() };
    this.tickets.set(id, updatedTicket);
    
    for (const [key, value] of Object.entries(updates)) {
      if (key !== 'updatedAt') {
        await this.addHistory({
          ticketId: id,
          action: "field_updated",
          field: key,
          oldValue: String((ticket as any)[key] || ""),
          newValue: String(value || ""),
          author,
        });
      }
    }
    
    return updatedTicket;
  }

  async archiveTicket(id: string): Promise<Ticket | undefined> {
    const ticket = this.tickets.get(id);
    if (!ticket) return undefined;
    
    ticket.arquivado = true;
    ticket.arquivadoEm = new Date();
    ticket.updatedAt = new Date();
    this.tickets.set(id, ticket);
    
    await this.addHistory({
      ticketId: id,
      action: "ticket_archived",
      field: null,
      oldValue: null,
      newValue: null,
      author: "Sistema",
    });
    
    return ticket;
  }

  async autoArchiveOldTickets(): Promise<number> {
    const fifteenDaysAgo = new Date();
    fifteenDaysAgo.setDate(fifteenDaysAgo.getDate() - 15);
    
    let archivedCount = 0;
    
    for (const ticket of this.tickets.values()) {
      if (
        ticket.finalizadoEm &&
        !ticket.arquivado &&
        new Date(ticket.finalizadoEm) < fifteenDaysAgo
      ) {
        await this.archiveTicket(ticket.id);
        archivedCount++;
      }
    }
    
    return archivedCount;
  }

  async updateEvidencias(id: string, evidencias: string[], author: string): Promise<Ticket | undefined> {
    const ticket = this.tickets.get(id);
    if (!ticket) return undefined;
    
    const oldEvidencias = ticket.evidencias;
    ticket.evidencias = evidencias.length > 0 ? evidencias : null;
    ticket.updatedAt = new Date();
    this.tickets.set(id, ticket);
    
    await this.addHistory({
      ticketId: id,
      action: "evidencias_updated",
      field: "evidencias",
      oldValue: oldEvidencias?.join(", ") || "",
      newValue: evidencias.join(", "),
      author,
    });
    
    return ticket;
  }

  async addComment(insertComment: InsertComment): Promise<TicketComment> {
    const id = randomUUID();
    const comment: TicketComment = {
      ...insertComment,
      id,
      mentions: insertComment.mentions ?? null,
      createdAt: new Date(),
    };
    this.comments.set(id, comment);
    
    await this.addHistory({
      ticketId: insertComment.ticketId,
      action: "comment_added",
      field: null,
      oldValue: null,
      newValue: null,
      author: insertComment.author,
    });
    
    return comment;
  }

  async getCommentsByTicket(ticketId: string): Promise<TicketComment[]> {
    return Array.from(this.comments.values()).filter(
      (comment) => comment.ticketId === ticketId
    );
  }

  async getHistoryByTicket(ticketId: string): Promise<TicketHistory[]> {
    return Array.from(this.history.values())
      .filter((h) => h.ticketId === ticketId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async addHistory(insertHistory: InsertHistory): Promise<TicketHistory> {
    const id = randomUUID();
    const historyEntry: TicketHistory = {
      ...insertHistory,
      id,
      field: insertHistory.field ?? null,
      oldValue: insertHistory.oldValue ?? null,
      newValue: insertHistory.newValue ?? null,
      createdAt: new Date(),
    };
    this.history.set(id, historyEntry);
    return historyEntry;
  }
}

export const storage = new MemStorage();
