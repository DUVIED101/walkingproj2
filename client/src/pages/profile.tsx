import { useQuery } from "@tanstack/react-query";
import { Bookmark, Camera, Settings, Share, ChevronRight } from "lucide-react";
import { Link } from "wouter";
import { User, Route } from "@shared/schema";
import { Button } from "@/components/ui/button";
import BottomNavigation from "@/components/bottom-navigation";
import { Skeleton } from "@/components/ui/skeleton";

// Mock user data - in a real app this would come from authentication
const CURRENT_USER_ID = "user-1";

export default function Profile() {
  const { data: user, isLoading: userLoading } = useQuery<User>({
    queryKey: ["/api/users", CURRENT_USER_ID],
  });

  const { data: completedRoutes = [], isLoading: routesLoading } = useQuery<Route[]>({
    queryKey: ["/api/users", CURRENT_USER_ID, "completed-routes"],
  });

  const { data: savedRoutes = [], isLoading: savedRoutesLoading } = useQuery<Route[]>({
    queryKey: ["/api/users", CURRENT_USER_ID, "saved-routes"],
  });

  if (userLoading) {
    return (
      <div className="min-h-screen bg-white pb-24">
        <div className="px-6 py-4">
          <div className="flex items-center space-x-4 mb-6">
            <Skeleton className="w-20 h-20 rounded-full" />
            <div className="flex-1">
              <Skeleton className="h-8 w-32 mb-2" />
              <Skeleton className="h-4 w-48 mb-2" />
              <Skeleton className="h-4 w-40" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[1, 2, 3].map(i => (
              <Skeleton key={i} className="h-20 rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center">
          <h2 className="text-xl font-bold text-ios-dark mb-2">Profile not found</h2>
          <p className="text-ios-gray">Unable to load user profile</p>
        </div>
      </div>
    );
  }

  // Calculate stats
  const totalDistance = completedRoutes.reduce((sum, route) => sum + parseFloat(route.distance), 0);
  const totalPhotos = 48; // Mock data

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Status Bar Placeholder */}
      <div className="bg-black text-white px-6 py-3 flex justify-between items-center text-sm font-medium">
        <span>9:41</span>
        <div className="flex items-center space-x-2">
          <div className="w-1 h-1 bg-white rounded-full"></div>
          <div className="w-3 h-2 border border-white rounded-sm"></div>
          <div className="w-6 h-3 border border-white rounded-sm bg-white"></div>
        </div>
      </div>

      <div className="px-6 py-4">
        {/* Profile header */}
        <div className="flex items-center space-x-4 mb-6">
          <img 
            src={user.profileImage || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&w=120&h=120&fit=crop&crop=face"} 
            alt="User Profile" 
            className="w-20 h-20 rounded-full"
            data-testid="profile-image"
          />
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-ios-dark" data-testid="user-name">
              {user.name}
            </h2>
            <p className="text-ios-gray" data-testid="user-location">
              {user.location || "San Francisco Explorer"}
            </p>
            <div className="flex items-center mt-2">
              <span className="text-sm text-ios-gray mr-4" data-testid="routes-completed">
                {completedRoutes.length} routes completed
              </span>
              <span className="text-sm text-ios-gray" data-testid="photos-shared">
                {totalPhotos} photos shared
              </span>
            </div>
          </div>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-ios-light-gray rounded-2xl p-4 text-center">
            <div className="text-2xl font-bold text-ios-dark" data-testid="stat-routes">
              {completedRoutes.length}
            </div>
            <div className="text-xs text-ios-gray">Routes</div>
          </div>
          <div className="bg-ios-light-gray rounded-2xl p-4 text-center">
            <div className="text-2xl font-bold text-ios-dark" data-testid="stat-distance">
              {totalDistance.toFixed(1)}
            </div>
            <div className="text-xs text-ios-gray">km walked</div>
          </div>
          <div className="bg-ios-light-gray rounded-2xl p-4 text-center">
            <div className="text-2xl font-bold text-ios-dark" data-testid="stat-photos">
              {totalPhotos}
            </div>
            <div className="text-xs text-ios-gray">Photos</div>
          </div>
        </div>

        {/* Menu options */}
        <div className="space-y-3">
          <Button 
            variant="ghost"
            className="w-full bg-white rounded-2xl p-4 flex items-center justify-between ios-shadow hover:bg-ios-light-gray h-auto"
            data-testid="saved-routes-button"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-ios-blue bg-opacity-10 rounded-full flex items-center justify-center">
                <Bookmark className="w-5 h-5 text-ios-blue" />
              </div>
              <span className="font-medium text-ios-dark">Saved Routes</span>
            </div>
            <ChevronRight className="w-5 h-5 text-ios-gray" />
          </Button>

          <Button 
            variant="ghost"
            className="w-full bg-white rounded-2xl p-4 flex items-center justify-between ios-shadow hover:bg-ios-light-gray h-auto"
            data-testid="photo-gallery-button"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-ios-green bg-opacity-10 rounded-full flex items-center justify-center">
                <Camera className="w-5 h-5 text-ios-green" />
              </div>
              <span className="font-medium text-ios-dark">Photo Gallery</span>
            </div>
            <ChevronRight className="w-5 h-5 text-ios-gray" />
          </Button>

          <Button 
            variant="ghost"
            className="w-full bg-white rounded-2xl p-4 flex items-center justify-between ios-shadow hover:bg-ios-light-gray h-auto"
            data-testid="settings-button"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-ios-gray bg-opacity-10 rounded-full flex items-center justify-center">
                <Settings className="w-5 h-5 text-ios-gray" />
              </div>
              <span className="font-medium text-ios-dark">Settings</span>
            </div>
            <ChevronRight className="w-5 h-5 text-ios-gray" />
          </Button>

          <Button 
            variant="ghost"
            className="w-full bg-white rounded-2xl p-4 flex items-center justify-between ios-shadow hover:bg-ios-light-gray h-auto"
            data-testid="share-app-button"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-ios-orange bg-opacity-10 rounded-full flex items-center justify-center">
                <Share className="w-5 h-5 text-ios-orange" />
              </div>
              <span className="font-medium text-ios-dark">Share RouteWise</span>
            </div>
            <ChevronRight className="w-5 h-5 text-ios-gray" />
          </Button>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}
