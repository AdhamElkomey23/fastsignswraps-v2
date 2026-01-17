import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Projects
  app.get(api.projects.list.path, async (req, res) => {
    const projects = await storage.getProjects();
    res.json(projects);
  });

  app.get(api.projects.get.path, async (req, res) => {
    const project = await storage.getProject(Number(req.params.id));
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  });

  app.post(api.projects.create.path, async (req, res) => {
    try {
      const input = api.projects.create.input.parse(req.body);
      const project = await storage.createProject(input);
      res.status(201).json(project);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  // Inquiries
  app.post(api.inquiries.create.path, async (req, res) => {
    try {
      const input = api.inquiries.create.input.parse(req.body);
      const inquiry = await storage.createInquiry(input);
      res.status(201).json(inquiry);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  // Seed Data (if empty)
  const existingProjects = await storage.getProjects();
  if (existingProjects.length === 0) {
    await storage.createProject({
      title: "Matte Black Tesla Model 3",
      description: "Complete color change wrap with satin finish and chrome delete.",
      imageUrl: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      category: "Color Change"
    });
    await storage.createProject({
      title: "Cyberpunk GT-R Itasha",
      description: "Custom designed full wrap featuring high-detail anime character art.",
      imageUrl: "https://images.unsplash.com/photo-1626245366367-727a810d2966?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      category: "Itasha"
    });
    await storage.createProject({
      title: "Fleet Commercial Branding",
      description: "Uniform branding design for a local logistics company fleet.",
      imageUrl: "https://images.unsplash.com/photo-1616455579100-2ceaa4eb2d37?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      category: "Commercial"
    });
    await storage.createProject({
      title: "Carbon Fiber Hood & Roof",
      description: "High-gloss carbon fiber accents for BMW M4.",
      imageUrl: "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      category: "Partial Wrap"
    });
  }

  return httpServer;
}
