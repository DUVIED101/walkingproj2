/**
 * RouteWise Main App Component
 * 
 * Root component that sets up routing, global providers, and mobile-optimized layout.
 * Uses Wouter for lightweight routing and TanStack Query for server state management.
 * 
 * Key Features:
 * - Mobile-first responsive design
 * - Client-side routing for SPA experience
 * - Global error boundary and toast notifications
 * - Query client for API state management
 */

import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import RouteDetail from "@/pages/route-detail";
import Map from "@/pages/map";
import Camera from "@/pages/camera";
import Profile from "@/pages/profile";
import NotFound from "@/pages/not-found";

/**
 * Router Configuration
 * Defines all application routes for the mobile-first SPA
 */
function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />                                    {/* Route discovery page */}
      <Route path="/route/:id" component={RouteDetail} />                   {/* Individual route details */}
      <Route path="/map/:id?" component={Map} />                           {/* Navigation interface */}
      <Route path="/camera/:routeId/:stopId?" component={Camera} />         {/* Photo capture */}
      <Route path="/profile" component={Profile} />                        {/* User profile */}
      <Route component={NotFound} />                                       {/* 404 fallback */}
    </Switch>
  );
}

function App() {
  return (
    <div className="mobile-container bg-white min-h-screen">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
