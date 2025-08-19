/**
 * RouteWise Database Schema
 * 
 * Defines the complete data model for the travel route discovery platform.
 * Uses Drizzle ORM with PostgreSQL for type-safe database operations.
 * 
 * Key Features:
 * - Full TypeScript type safety
 * - Zod validation schemas
 * - JSON storage for complex data (stops, photos)
 * - User progress tracking
 * - Route favorites/bookmarks
 */

import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

/**
 * Users Table
 * Stores user account information and profile data
 */
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  profileImage: text("profile_image"),
  location: text("location"), // User's city/region for personalized recommendations
  createdAt: timestamp("created_at").defaultNow(),
});

/**
 * Routes Table
 * Core table storing all walking route information
 * 
 * Routes can be:
 * - AI-generated (reviewed by team before publishing)
 * - Expert-created (manual curation by local experts)
 * - Premium (paid routes with enhanced content)
 */
export const routes = pgTable("routes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(), // Route display name
  description: text("description").notNull(), // Brief summary for cards
  longDescription: text("long_description"), // Detailed description for route page
  category: text("category").notNull(), // 'food-drink', 'culture-art', 'hidden-gems', 'nightlife'
  heroImage: text("hero_image").notNull(), // Main image URL for route
  duration: integer("duration").notNull(), // Total time in minutes (1-4 hours typical)
  distance: decimal("distance", { precision: 4, scale: 2 }).notNull(), // Walking distance in km
  difficulty: text("difficulty").notNull().default('easy'), // 'easy', 'moderate', 'challenging'
  rating: decimal("rating", { precision: 2, scale: 1 }).notNull().default('0'), // Average user rating (0-5)
  reviewCount: integer("review_count").notNull().default(0), // Number of user reviews
  stops: jsonb("stops").$type<RouteStop[]>().notNull(), // Array of route waypoints with GPS coordinates
  isPublished: boolean("is_published").notNull().default(false), // Only published routes are visible
  createdBy: varchar("created_by").references(() => users.id), // Route creator (expert or admin)
  createdAt: timestamp("created_at").defaultNow(),
});

export const userRouteProgress = pgTable("user_route_progress", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  routeId: varchar("route_id").notNull().references(() => routes.id),
  currentStopIndex: integer("current_stop_index").notNull().default(0),
  isCompleted: boolean("is_completed").notNull().default(false),
  photosShared: jsonb("photos_shared").$type<RoutePhoto[]>().notNull().default([]),
  startedAt: timestamp("started_at").defaultNow(),
  completedAt: timestamp("completed_at"),
});

export const savedRoutes = pgTable("saved_routes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  routeId: varchar("route_id").notNull().references(() => routes.id),
  createdAt: timestamp("created_at").defaultNow(),
});

/**
 * Type definitions for complex JSON fields stored in database
 * These interfaces define the structure of JSON data stored in JSONB columns
 */

/**
 * RouteStop - Individual waypoints within a route
 * Contains GPS coordinates and timing information for navigation
 */
export interface RouteStop {
  id: string; // Unique identifier for the stop
  name: string; // Display name (e.g., "Golden Gate Park")
  description: string; // What users will see/do here
  image: string; // Photo URL for the stop
  latitude: number; // GPS coordinate for navigation
  longitude: number; // GPS coordinate for navigation  
  order: number; // Sequence number in the route (1, 2, 3...)
  estimatedTimeMinutes: number; // How long to spend at this stop
}

/**
 * RoutePhoto - User-generated photos at route stops
 * Tracks photo sharing and social features
 */
export interface RoutePhoto {
  id: string; // Unique photo identifier
  stopId: string; // Which stop this photo was taken at
  imageUrl: string; // Cloud storage URL for the image
  caption?: string; // Optional user caption
  takenAt: string; // ISO timestamp when photo was captured
}

// Zod schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertRouteSchema = createInsertSchema(routes).omit({
  id: true,
  createdAt: true,
  rating: true,
  reviewCount: true,
});

export const insertUserRouteProgressSchema = createInsertSchema(userRouteProgress).omit({
  id: true,
  startedAt: true,
  completedAt: true,
});

export const insertSavedRouteSchema = createInsertSchema(savedRoutes).omit({
  id: true,
  createdAt: true,
});

// Type exports
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Route = typeof routes.$inferSelect;
export type InsertRoute = z.infer<typeof insertRouteSchema>;

export type UserRouteProgress = typeof userRouteProgress.$inferSelect;
export type InsertUserRouteProgress = z.infer<typeof insertUserRouteProgressSchema>;

export type SavedRoute = typeof savedRoutes.$inferSelect;
export type InsertSavedRoute = z.infer<typeof insertSavedRouteSchema>;
