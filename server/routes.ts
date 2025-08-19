/**
 * RouteWise API Routes
 * 
 * Defines all REST API endpoints for the RouteWise platform.
 * Handles route discovery, user management, and progress tracking.
 * 
 * API Structure:
 * - GET  /api/routes - Route discovery with filtering
 * - GET  /api/routes/:id - Individual route details
 * - POST /api/routes - Create new routes (admin)
 * - User progress and saved routes management
 * 
 * All endpoints include proper error handling and input validation.
 */

import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertRouteSchema, insertUserRouteProgressSchema, insertSavedRouteSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  /**
   * GET /api/routes - Route Discovery
   * Returns filtered routes based on query parameters
   * Supports filtering by category, duration, distance, and difficulty
   */
  app.get("/api/routes", async (req, res) => {
    try {
      const { category, duration, distance, difficulty } = req.query;
      const routes = await storage.getRoutes({
        category: category as string,
        duration: duration as string,
        distance: distance as string,
        difficulty: difficulty as string,
      });
      res.json(routes);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch routes" });
    }
  });

  app.get("/api/routes/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const route = await storage.getRoute(id);
      if (!route) {
        return res.status(404).json({ message: "Route not found" });
      }
      res.json(route);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch route" });
    }
  });

  app.post("/api/routes", async (req, res) => {
    try {
      const validatedData = insertRouteSchema.parse(req.body);
      const route = await storage.createRoute(validatedData);
      res.status(201).json(route);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid route data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create route" });
    }
  });

  // User route progress API
  app.get("/api/users/:userId/routes/:routeId/progress", async (req, res) => {
    try {
      const { userId, routeId } = req.params;
      const progress = await storage.getUserRouteProgress(userId, routeId);
      if (!progress) {
        return res.status(404).json({ message: "Route progress not found" });
      }
      res.json(progress);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch route progress" });
    }
  });

  app.post("/api/users/:userId/routes/:routeId/progress", async (req, res) => {
    try {
      const { userId, routeId } = req.params;
      const validatedData = insertUserRouteProgressSchema.parse({
        ...req.body,
        userId,
        routeId,
      });
      const progress = await storage.createOrUpdateUserRouteProgress(validatedData);
      res.json(progress);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid progress data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update route progress" });
    }
  });

  app.get("/api/users/:userId/completed-routes", async (req, res) => {
    try {
      const { userId } = req.params;
      const routes = await storage.getUserCompletedRoutes(userId);
      res.json(routes);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch completed routes" });
    }
  });

  // Saved routes API
  app.get("/api/users/:userId/saved-routes", async (req, res) => {
    try {
      const { userId } = req.params;
      const routes = await storage.getUserSavedRoutes(userId);
      res.json(routes);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch saved routes" });
    }
  });

  app.post("/api/users/:userId/saved-routes", async (req, res) => {
    try {
      const { userId } = req.params;
      const { routeId } = req.body;
      const savedRoute = await storage.saveRoute(userId, routeId);
      res.status(201).json(savedRoute);
    } catch (error) {
      res.status(500).json({ message: "Failed to save route" });
    }
  });

  app.delete("/api/users/:userId/saved-routes/:routeId", async (req, res) => {
    try {
      const { userId, routeId } = req.params;
      const success = await storage.unsaveRoute(userId, routeId);
      if (!success) {
        return res.status(404).json({ message: "Saved route not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to unsave route" });
    }
  });

  // User API
  app.get("/api/users/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const user = await storage.getUser(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
