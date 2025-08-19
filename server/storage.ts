import { type User, type InsertUser, type Route, type InsertRoute, type UserRouteProgress, type InsertUserRouteProgress, type SavedRoute, type InsertSavedRoute, type RouteStop } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Route methods
  getRoute(id: string): Promise<Route | undefined>;
  getRoutes(filters?: {
    category?: string;
    duration?: string;
    distance?: string;
    difficulty?: string;
  }): Promise<Route[]>;
  createRoute(route: InsertRoute): Promise<Route>;
  updateRoute(id: string, route: Partial<Route>): Promise<Route | undefined>;

  // User route progress methods
  getUserRouteProgress(userId: string, routeId: string): Promise<UserRouteProgress | undefined>;
  createOrUpdateUserRouteProgress(progress: InsertUserRouteProgress): Promise<UserRouteProgress>;
  getUserCompletedRoutes(userId: string): Promise<Route[]>;

  // Saved routes methods
  getUserSavedRoutes(userId: string): Promise<Route[]>;
  saveRoute(userId: string, routeId: string): Promise<SavedRoute>;
  unsaveRoute(userId: string, routeId: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private routes: Map<string, Route>;
  private userRouteProgress: Map<string, UserRouteProgress>;
  private savedRoutes: Map<string, SavedRoute>;

  constructor() {
    this.users = new Map();
    this.routes = new Map();
    this.userRouteProgress = new Map();
    this.savedRoutes = new Map();
    this.seedData();
  }

  private seedData() {
    // Seed sample user
    const sampleUser: User = {
      id: "user-1",
      username: "alexchen",
      email: "alex@example.com",
      name: "Alex Chen",
      profileImage: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&w=120&h=120&fit=crop&crop=face",
      location: "San Francisco, CA",
      createdAt: new Date(),
    };
    this.users.set(sampleUser.id, sampleUser);

    // Seed sample routes
    const sampleRoutes: Route[] = [
      {
        id: "route-1",
        title: "Mission District Street Art",
        description: "Explore vibrant murals and local culture",
        longDescription: "Discover the vibrant street art scene in San Francisco's Mission District. This curated walking tour takes you through colorful murals, local galleries, and cultural landmarks that showcase the neighborhood's rich artistic heritage.",
        category: "culture-art",
        heroImage: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&w=400&h=200&fit=crop",
        duration: 150, // 2.5 hours
        distance: "3.2",
        difficulty: "easy",
        rating: "4.8",
        reviewCount: 124,
        stops: [
          {
            id: "stop-1",
            name: "Balmy Alley Murals",
            description: "Historic mural alley with political art",
            image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&w=80&h=80&fit=crop",
            latitude: 37.748,
            longitude: -122.415,
            order: 1,
            estimatedTimeMinutes: 20
          },
          {
            id: "stop-2",
            name: "Mission Dolores Park",
            description: "Panoramic city views and local culture",
            image: "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?ixlib=rb-4.0.3&w=80&h=80&fit=crop",
            latitude: 37.760,
            longitude: -122.427,
            order: 2,
            estimatedTimeMinutes: 30
          }
        ] as RouteStop[],
        isPublished: true,
        createdBy: "user-1",
        createdAt: new Date(),
      },
      {
        id: "route-2",
        title: "Ferry Building Food Tour",
        description: "Taste local flavors and artisan foods",
        longDescription: "Experience the best of San Francisco's culinary scene at the iconic Ferry Building Marketplace. Sample artisan cheeses, fresh produce, and local specialties while learning about the city's food culture.",
        category: "food-drink",
        heroImage: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&w=400&h=200&fit=crop",
        duration: 90, // 1.5 hours
        distance: "1.8",
        difficulty: "easy",
        rating: "4.9",
        reviewCount: 89,
        stops: [
          {
            id: "stop-3",
            name: "Ferry Building Marketplace",
            description: "Historic marketplace with local vendors",
            image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&w=80&h=80&fit=crop",
            latitude: 37.795,
            longitude: -122.393,
            order: 1,
            estimatedTimeMinutes: 45
          }
        ] as RouteStop[],
        isPublished: true,
        createdBy: "user-1",
        createdAt: new Date(),
      },
      {
        id: "route-3",
        title: "Hidden Gardens & Secret Spots",
        description: "Discover SF's best-kept secrets",
        longDescription: "Uncover San Francisco's hidden gems - secret gardens, quiet viewpoints, and lesser-known architectural treasures that most visitors never see.",
        category: "hidden-gems",
        heroImage: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&w=400&h=200&fit=crop",
        duration: 180, // 3 hours
        distance: "4.1",
        difficulty: "moderate",
        rating: "4.7",
        reviewCount: 67,
        stops: [
          {
            id: "stop-4",
            name: "Secret Garden",
            description: "Hidden oasis in the heart of the city",
            image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&w=80&h=80&fit=crop",
            latitude: 37.773,
            longitude: -122.431,
            order: 1,
            estimatedTimeMinutes: 30
          }
        ] as RouteStop[],
        isPublished: true,
        createdBy: "user-1",
        createdAt: new Date(),
      }
    ];

    sampleRoutes.forEach(route => this.routes.set(route.id, route));
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id,
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  async getRoute(id: string): Promise<Route | undefined> {
    return this.routes.get(id);
  }

  async getRoutes(filters?: {
    category?: string;
    duration?: string;
    distance?: string;
    difficulty?: string;
  }): Promise<Route[]> {
    let routes = Array.from(this.routes.values()).filter(route => route.isPublished);

    if (filters?.category && filters.category !== 'all') {
      routes = routes.filter(route => route.category === filters.category);
    }

    if (filters?.duration) {
      switch (filters.duration) {
        case 'short':
          routes = routes.filter(route => route.duration < 60);
          break;
        case 'medium':
          routes = routes.filter(route => route.duration >= 60 && route.duration <= 180);
          break;
        case 'long':
          routes = routes.filter(route => route.duration > 180);
          break;
      }
    }

    if (filters?.distance) {
      switch (filters.distance) {
        case 'short':
          routes = routes.filter(route => parseFloat(route.distance) < 2);
          break;
        case 'medium':
          routes = routes.filter(route => parseFloat(route.distance) >= 2 && parseFloat(route.distance) <= 5);
          break;
        case 'long':
          routes = routes.filter(route => parseFloat(route.distance) > 5);
          break;
      }
    }

    if (filters?.difficulty) {
      routes = routes.filter(route => route.difficulty === filters.difficulty);
    }

    return routes.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
  }

  async createRoute(insertRoute: InsertRoute): Promise<Route> {
    const id = randomUUID();
    const route: Route = {
      ...insertRoute,
      id,
      rating: "0",
      reviewCount: 0,
      createdAt: new Date(),
    };
    this.routes.set(id, route);
    return route;
  }

  async updateRoute(id: string, routeUpdate: Partial<Route>): Promise<Route | undefined> {
    const existingRoute = this.routes.get(id);
    if (!existingRoute) return undefined;

    const updatedRoute = { ...existingRoute, ...routeUpdate };
    this.routes.set(id, updatedRoute);
    return updatedRoute;
  }

  async getUserRouteProgress(userId: string, routeId: string): Promise<UserRouteProgress | undefined> {
    return Array.from(this.userRouteProgress.values()).find(
      progress => progress.userId === userId && progress.routeId === routeId
    );
  }

  async createOrUpdateUserRouteProgress(insertProgress: InsertUserRouteProgress): Promise<UserRouteProgress> {
    const existingProgress = await this.getUserRouteProgress(insertProgress.userId, insertProgress.routeId);
    
    if (existingProgress) {
      const updatedProgress: UserRouteProgress = {
        ...existingProgress,
        ...insertProgress,
        completedAt: insertProgress.isCompleted ? new Date() : existingProgress.completedAt,
      };
      this.userRouteProgress.set(existingProgress.id, updatedProgress);
      return updatedProgress;
    }

    const id = randomUUID();
    const progress: UserRouteProgress = {
      ...insertProgress,
      id,
      startedAt: new Date(),
      completedAt: insertProgress.isCompleted ? new Date() : null,
    };
    this.userRouteProgress.set(id, progress);
    return progress;
  }

  async getUserCompletedRoutes(userId: string): Promise<Route[]> {
    const completedProgress = Array.from(this.userRouteProgress.values())
      .filter(progress => progress.userId === userId && progress.isCompleted);
    
    const routeIds = completedProgress.map(progress => progress.routeId);
    return Array.from(this.routes.values()).filter(route => routeIds.includes(route.id));
  }

  async getUserSavedRoutes(userId: string): Promise<Route[]> {
    const savedRouteEntries = Array.from(this.savedRoutes.values())
      .filter(saved => saved.userId === userId);
    
    const routeIds = savedRouteEntries.map(saved => saved.routeId);
    return Array.from(this.routes.values()).filter(route => routeIds.includes(route.id));
  }

  async saveRoute(userId: string, routeId: string): Promise<SavedRoute> {
    const id = randomUUID();
    const savedRoute: SavedRoute = {
      id,
      userId,
      routeId,
      createdAt: new Date(),
    };
    this.savedRoutes.set(id, savedRoute);
    return savedRoute;
  }

  async unsaveRoute(userId: string, routeId: string): Promise<boolean> {
    const savedRoute = Array.from(this.savedRoutes.entries()).find(
      ([_, saved]) => saved.userId === userId && saved.routeId === routeId
    );
    
    if (savedRoute) {
      this.savedRoutes.delete(savedRoute[0]);
      return true;
    }
    return false;
  }
}

export const storage = new MemStorage();
