import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  profileImage: text("profile_image"),
  location: text("location"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const routes = pgTable("routes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  longDescription: text("long_description"),
  category: text("category").notNull(), // 'food-drink', 'culture-art', 'hidden-gems', 'nightlife'
  heroImage: text("hero_image").notNull(),
  duration: integer("duration").notNull(), // in minutes
  distance: decimal("distance", { precision: 4, scale: 2 }).notNull(), // in km
  difficulty: text("difficulty").notNull().default('easy'), // 'easy', 'moderate', 'challenging'
  rating: decimal("rating", { precision: 2, scale: 1 }).notNull().default('0'),
  reviewCount: integer("review_count").notNull().default(0),
  stops: jsonb("stops").$type<RouteStop[]>().notNull(),
  isPublished: boolean("is_published").notNull().default(false),
  createdBy: varchar("created_by").references(() => users.id),
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

// Type definitions for complex JSON fields
export interface RouteStop {
  id: string;
  name: string;
  description: string;
  image: string;
  latitude: number;
  longitude: number;
  order: number;
  estimatedTimeMinutes: number;
}

export interface RoutePhoto {
  id: string;
  stopId: string;
  imageUrl: string;
  caption?: string;
  takenAt: string;
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
