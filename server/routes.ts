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

  app.post("/api/tickets/:id/etiquetas", async (req, res) => {
    try {
      const { etiqueta, author = "Sistema" } = req.body;
      const ticket = await storage.getTicket(req.params.id);
      if (!ticket) {
        return res.status(404).json({ error: "Ticket not found" });
      }
      const etiquetas = ticket.etiquetas || [];
      if (!etiquetas.includes(etiqueta)) {
        etiquetas.push(etiqueta);
        const updatedTicket = await storage.updateTicket(req.params.id, { etiquetas }, author);
        res.json(updatedTicket);
      } else {
        res.json(ticket);
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.delete("/api/tickets/:id/etiquetas/:etiqueta", async (req, res) => {
    try {
      const { author = "Sistema" } = req.body;
      const ticket = await storage.getTicket(req.params.id);
      if (!ticket) {
        return res.status(404).json({ error: "Ticket not found" });
      }
      const etiquetas = (ticket.etiquetas || []).filter(e => e !== req.params.etiqueta);
      const updatedTicket = await storage.updateTicket(req.params.id, { etiquetas }, author);
      res.json(updatedTicket);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/tickets/:id/seguir", async (req, res) => {
    try {
      const { seguidor, author = "Sistema" } = req.body;
      const ticket = await storage.getTicket(req.params.id);
      if (!ticket) {
        return res.status(404).json({ error: "Ticket not found" });
      }
      const seguidores = ticket.seguidores || [];
      if (!seguidores.includes(seguidor)) {
        seguidores.push(seguidor);
        const updatedTicket = await storage.updateTicket(req.params.id, { seguidores }, author);
        res.json(updatedTicket);
      } else {
        res.json(ticket);
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.delete("/api/tickets/:id/seguir/:seguidor", async (req, res) => {
    try {
      const { author = "Sistema" } = req.body;
      const ticket = await storage.getTicket(req.params.id);
      if (!ticket) {
        return res.status(404).json({ error: "Ticket not found" });
      }
      const seguidores = (ticket.seguidores || []).filter(s => s !== req.params.seguidor);
      const updatedTicket = await storage.updateTicket(req.params.id, { seguidores }, author);
      res.json(updatedTicket);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/tickets/:id/share", async (req, res) => {
    try {
      const ticket = await storage.getTicket(req.params.id);
      if (!ticket) {
        return res.status(404).json({ error: "Ticket not found" });
      }
      const shareUrl = `${req.protocol}://${req.get('host')}/kanban?ticket=${ticket.id}`;
      res.json({ shareUrl, ticketNumber: ticket.ticketNumber });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/tickets-archived", async (req, res) => {
    try {
      const tickets = await storage.getArchivedTickets();
      res.json(tickets);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.patch("/api/tickets/:id/evidencias", async (req, res) => {
    try {
      const { evidencias, author = "Sistema" } = req.body;
      const ticket = await storage.updateEvidencias(req.params.id, evidencias, author);
      if (!ticket) {
        return res.status(404).json({ error: "Ticket not found" });
      }
      res.json(ticket);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/tickets/:id/archive", async (req, res) => {
    try {
      const ticket = await storage.archiveTicket(req.params.id);
      if (!ticket) {
        return res.status(404).json({ error: "Ticket not found" });
      }
      res.json(ticket);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
