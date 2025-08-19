import { Link, useLocation } from "wouter";
import { Compass, Map, Camera, User } from "lucide-react";
import { cn } from "@/lib/utils";

export default function BottomNavigation() {
  const [location] = useLocation();

  const isActive = (path: string) => {
    if (path === "/") {
      return location === "/";
    }
    return location.startsWith(path);
  };

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[428px] bg-white border-t border-ios-light-gray ios-blur z-50">
      <div className="flex items-center justify-around py-2 pb-safe-bottom">
        <Link
          href="/"
          data-testid="tab-discover"
          className={cn(
            "flex flex-col items-center p-2 transition-colors",
            isActive("/") ? "text-ios-blue" : "text-ios-gray"
          )}
        >
          <Compass className="w-6 h-6 mb-1" />
          <span className="text-xs font-medium">Discover</span>
        </Link>
        
        <Link
          href="/map"
          data-testid="tab-map"
          className={cn(
            "flex flex-col items-center p-2 transition-colors",
            isActive("/map") ? "text-ios-blue" : "text-ios-gray"
          )}
        >
          <Map className="w-6 h-6 mb-1" />
          <span className="text-xs font-medium">Map</span>
        </Link>
        
        <Link
          href="/camera"
          data-testid="tab-camera"
          className={cn(
            "flex flex-col items-center p-2 transition-colors",
            isActive("/camera") ? "text-ios-blue" : "text-ios-gray"
          )}
        >
          <Camera className="w-6 h-6 mb-1" />
          <span className="text-xs font-medium">Camera</span>
        </Link>
        
        <Link
          href="/profile"
          data-testid="tab-profile"
          className={cn(
            "flex flex-col items-center p-2 transition-colors",
            isActive("/profile") ? "text-ios-blue" : "text-ios-gray"
          )}
        >
          <User className="w-6 h-6 mb-1" />
          <span className="text-xs font-medium">Profile</span>
        </Link>
      </div>
    </div>
  );
}
