import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertTicketSchema, insertCommentSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/tickets", async (req, res) => {
    try {
      const validatedData = insertTicketSchema.parse(req.body);
      const ticket = await storage.createTicket(validatedData);
      res.json(ticket);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/tickets/:id", async (req, res) => {
    try {
      const ticket = await storage.getTicket(req.params.id);
      if (!ticket) {
        return res.status(404).json({ error: "Ticket not found" });
      }
      res.json(ticket);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/tickets", async (req, res) => {
    try {
      const tickets = await storage.getAllTickets();
      res.json(tickets);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.patch("/api/tickets/:id/status", async (req, res) => {
    try {
      const { status, author = "Sistema" } = req.body;
      const ticket = await storage.updateTicketStatus(req.params.id, status, author);
      if (!ticket) {
        return res.status(404).json({ error: "Ticket not found" });
      }
      res.json(ticket);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.patch("/api/tickets/:id/priority", async (req, res) => {
    try {
      const { prioridade, author = "Sistema" } = req.body;
      const ticket = await storage.updateTicketPriority(req.params.id, prioridade, author);
      if (!ticket) {
        return res.status(404).json({ error: "Ticket not found" });
      }
      res.json(ticket);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.patch("/api/tickets/:id/assignee", async (req, res) => {
    try {
      const { responsavel, author = "Sistema" } = req.body;
      const ticket = await storage.updateTicketResponsavel(req.params.id, responsavel, author);
      if (!ticket) {
        return res.status(404).json({ error: "Ticket not found" });
      }
      res.json(ticket);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.patch("/api/tickets/:id", async (req, res) => {
    try {
      const { author = "Sistema", ...updates } = req.body;
      const ticket = await storage.updateTicket(req.params.id, updates, author);
      if (!ticket) {
        return res.status(404).json({ error: "Ticket not found" });
      }
      res.json(ticket);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/tickets/:id/comments", async (req, res) => {
    try {
      const commentData = insertCommentSchema.parse({
        ...req.body,
        ticketId: req.params.id,
      });
      const comment = await storage.addComment(commentData);
      res.json(comment);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/tickets/:id/comments", async (req, res) => {
    try {
      const comments = await storage.getCommentsByTicket(req.params.id);
      res.json(comments);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/tickets/:id/history", async (req, res) => {
    try {
      const history = await storage.getHistoryByTicket(req.params.id);
      res.json(history);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
